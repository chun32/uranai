const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 1376;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.static(__dirname));
app.use(bodyParser.json());

// テキスト保存API（必ずtxtdetaフォルダに保存）
app.post('/save', (req, res) => {
  const folder = 'txtdeta';
  const filename = req.body.filename || 'saved.txt';
  const saveDir = path.join(__dirname, folder);

  // フォルダがなければ作成
  if (!fs.existsSync(saveDir)) {
    fs.mkdirSync(saveDir, { recursive: true });
  }

  fs.writeFileSync(path.join(saveDir, filename), req.body.text, 'utf8');
  res.json({ status: 'ok' });
});

// ファイル一覧API（必ずtxtdetaフォルダ）
app.get('/list', (req, res) => {
  const folder = 'txtdeta';
  const saveDir = path.join(__dirname, folder);
  let files = [];
  if (fs.existsSync(saveDir)) {
    files = fs.readdirSync(saveDir);
  }
  res.json({ files });
});

// テキスト取得API（必ずtxtdetaフォルダ）
app.get('/load', (req, res) => {
  const folder = 'txtdeta';
  const filename = req.query.filename || 'saved.txt';
  const filePath = path.join(__dirname, folder, filename);
  let text = '';
  if (fs.existsSync(filePath)) {
    text = fs.readFileSync(filePath, 'utf8');
  }
  res.json({ text });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});