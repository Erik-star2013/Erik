document.getElementById('ask-button').addEventListener('click', async () => {
  const question = document.getElementById('question').value;
  const res = await fetch('/api/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question })
  });
  const data = await res.json();
  document.getElementById('response').textContent = '🤖 ' + data.answer;
});
