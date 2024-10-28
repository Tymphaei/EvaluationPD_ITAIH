/*
   Script para cerrar sesión
*/

document.getElementById('logoutButton').addEventListener('click', function() {
  fetch('/logout')
    .then(() => window.location.href = '/index.html')
    .catch(error => console.error('Error al cerrar la sesión:', error));
});
