/*
   Función para la evaluación No.8
*/

function guardarFormulario(action) {

  const form_ID = parseInt(localStorage.getItem('formID'));


  const respuestas = [];

  for (let i = 1; i <= 3; i++) {
    const porcentaje = document.getElementById(`opcion${i}`).value;
    const respuesta = document.getElementById(`input1-${i}`).value;
    const evidencia = document.getElementById(`input2-${i}`).value;
    const acciones = document.getElementById(`input3-${i}`).value;

    respuestas.push({
      porcentaje,
      respuesta,
      evidencia,
      acciones
    });
  }

  const formData = {
    respuestas: respuestas,
    secDetails: {
      evaluation_number: 8,
      form_ID: form_ID
    }
  };

  fetch('/api/guardar-evaluacion', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        if (action === 'exit') {
          window.location.href = 'home.html';
        } else if (action === 'continue') {
          alert('Formulario guardado con éxito, continúa a la siguiente evaluación');
          window.location.href = 'eval9.html';
        }
      } else {
        alert('Ocurrió un error al guardar el formulario');
      }
    })
    .catch(error => console.error('Error:', error));
}
