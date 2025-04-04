/*
   Script para mostrar la lista de evaluaciones pendientes
*/

document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/eliminar-formularios-huerfanos', { method: 'DELETE' })
    .then(() => {
      return fetch('/api/evaluaciones');
    })
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

      document.querySelectorAll('.btn-seleccionar').forEach(button => {
        button.addEventListener('click', function () {
          const formID = this.getAttribute('data-form-id');

          localStorage.setItem('formID', formID);

          fetch(`/api/obtener-max-evaluacion/${formID}`)
            .then(response => response.json())
            .then(data => {
              const evaluationNumber = data.maxEvaluationNumber;

              if (evaluationNumber) {
                window.location.href = `eval${evaluationNumber + 1}.html`;
              } else {
                alert('No se encontró ninguna evaluación asociada a este formulario.');
              }
            })
            .catch(error => console.error('Error al obtener el número de evaluación:', error));
        });
      });
    })
    .catch(error => console.error('Error al obtener los formularios:', error));
});
