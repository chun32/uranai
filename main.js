document.getElementById('saveBtn').onclick = function() {
  const text = document.getElementById('textInput').value;
  let filename = document.getElementById('filenameInput').value.trim();

  // .txtが末尾についていなければ追加
  if (!filename.endsWith('.txt')) {
    filename += '.txt';
  }

  // グローバルIPに変更
  fetch('http://153.134.48.1:1376/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, filename })
  })
  .then(res => res.json())
  .then(data => {
    alert('保存しました');
  })
  .catch(err => {
    alert('保存に失敗しました: ' + err);
  });
};