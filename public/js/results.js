/*
   Script para mostrar la lista de evaluaciones completadas
*/

document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/resultados')
    .then(response => response.json())
    .then(data => {
      const lista = document.getElementById('listaFormularios');
      lista.innerHTML = '';


      data.forEach(formulario => {

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
            localStorage.setItem('formID', formID);
            window.location.href = `report-graphs.html`;
          });
        });
      }, 100);
    })
    .catch(error => console.error('Error al obtener los formularios:', error));
});
