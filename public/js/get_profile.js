/*
   Función para obtener los datos del usuario
*/

document.addEventListener('DOMContentLoaded', () => {
  fetch('/get-profile')
    .then(response => response.json())
    .then(data => {
      if (data.success && data.data) {
        const user = data.data;
        document.getElementById('nombre-completo').textContent = user.name;
        document.getElementById('nombre-usuario').textContent = user.username;
        document.getElementById('direccion-usuario').textContent = user.address;
        document.getElementById('email-usuario').textContent = user.email;
      } else {
        console.error('Error al obtener el perfil:', data.message);
      }
    })
    .catch(error => {
      console.error('Error en la petición del perfil:', error);
    });
});
