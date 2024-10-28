/*
   Script para mostrar la lista de evaluaciones completadas
*/

document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/resultados')
    .then(response => response.json())
    .then(data => {
      const lista = document.getElementById('listaFormularios');
      lista.innerHTML = '';

      console.log('Data recibida del servidor:', data);

      data.forEach(formulario => {
        console.log('Formulario:', formulario);

        const fila = document.createElement('tr');
        fila.innerHTML = `
          <td>${formulario.tratamiento_nombre}</td>
          <td>${formulario.area_nombre}</td>
          <td>${new Date(formulario.date).toLocaleDateString()}</td>
          <td><button class="btn-seleccionar" data-form-id="${formulario.form_ID}">Seleccionar</button></td>
        `;
        lista.appendChild(fila);
      });

      setTimeout(() => {
        document.querySelectorAll('.btn-seleccionar').forEach(button => {
          button.addEventListener('click', function () {
            const formID = this.getAttribute('data-form-id');
            console.log('form_ID seleccionado:', formID);
            localStorage.setItem('form_ID', formID);
            window.location.href = `report.html`;
          });
        });
        console.log('Eventos de clic asignados a botones');
      }, 100);
    })
    .catch(error => console.error('Error al obtener los formularios:', error));
});
