/*
   Funcion para obtener el nombre de usuario
*/

document.addEventListener('DOMContentLoaded', () => {
  fetch('/get-name')
    .then(response => response.json())
    .then(data => {
      if (data.name) {
        document.getElementById('usuario-nombre').textContent = data.name;
      }
    })
    .catch(error => {
      console.error('Error al obtener el nombre:', error);
    });
});
