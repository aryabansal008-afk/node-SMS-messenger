  const dot = document.getElementById('statusDot');
  const txt = document.getElementById('statusText');
  const btn = document.getElementById('btn');

  function setStatus(state, message) {
    dot.className = 'status-dot ' + state;
    txt.textContent = message;
  }

  document.getElementById('btn').addEventListener('click', function() {
    const num = document.getElementById('phoneno').value.replace(/\D/g,'');
    const msg = document.getElementById('msg').value.trim();

    if (!num || !msg) {
      setStatus('error', 'Please fill in both fields before sending.');
      return;
    }

    setStatus('sending', 'Sending your message…');
    btn.disabled = true;
    btn.style.opacity = '0.7';

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ number: num, text: msg })
    })
    .then(r => r.json())
    .then(data => {
      btn.disabled = false;
      btn.style.opacity = '1';
      if (data.success) {
        setStatus('success', 'Message sent successfully to +' + num);
      } else {
        setStatus('error', 'Send failed - check your Vonage credentials.');
      }
    })
    .catch(() => {
      btn.disabled = false;
      btn.style.opacity = '1';
      setStatus('error', 'Network error — is the server running?');
    });
  }, false);

