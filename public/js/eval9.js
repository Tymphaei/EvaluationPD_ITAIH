/*
   Funcion para la evaluación No.9
*/

function marcarFormularioCompleto() {
  const form_ID = parseInt(localStorage.getItem('formID'));

  if (!form_ID) {
    alert('No se encontró el form_ID en el localStorage');
    return;
  }

  fetch(`/api/marcar-formulario-completo/${form_ID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log('Formulario marcado como completo');
      } else {
        console.error('Error al marcar el formulario como completo:', data.message);
      }
    })
    .catch(error => console.error('Error al marcar el formulario como completo:', error));
}

function guardarFormulario(action) {

  const form_ID = parseInt(localStorage.getItem('formID'));

  const respuestas = [];

  for (let i = 1; i <= 7; i++) {
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
      evaluation_number: 9,
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
        marcarFormularioCompleto();
        if (action === 'exit') {
          window.location.href = 'home.html';
        } else if (action === 'continue') {
          alert('Formulario guardado con éxito, continúa al reporte de resultados');
          window.location.href = 'report-graphs.html';
        }
      } else {
        alert('Ocurrió un error al guardar el formulario');
      }
    })
    .catch(error => console.error('Error:', error));
}
