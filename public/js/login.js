/*
   Script para iniciar sesión
*/

document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const usernameError = document.getElementById('usernameError');
  const passwordError = document.getElementById('passwordError');

  usernameError.textContent = '';
  passwordError.textContent = '';

  fetch('/validate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      username: username,
      password: password
    })
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        window.location.href = '/home.html';
      } else {
        if (data.field === 'username') {
          usernameError.textContent = data.message;
        } else if (data.field === 'password') {
          passwordError.textContent = data.message;
        }
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
});
