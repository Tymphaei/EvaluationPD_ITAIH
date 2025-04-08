/*
   Script para mostrar, añadir y eliminar áreas y tratamientos para iniciar una evaluación
*/

async function cargarAreas() {
  try {
    const response = await fetch('/api/areas');
    const data = await response.json();
    const selectAreas = document.getElementById('areasSelect');
    selectAreas.innerHTML = '<option value="" disabled selected>Lista de áreas</option>';
    data.forEach(area => {
      const option = document.createElement('option');
      option.value = area.area_ID;
      option.textContent = area.name;
      selectAreas.appendChild(option);
    });
  } catch (error) {
    console.error('Error al cargar las áreas:', error);
  }
}

async function cargarTratamientos() {
  try {
    const response = await fetch('/api/tratamientos');
    const data = await response.json();
    const selectTratamientos = document.getElementById('tratamientosSelect');
    selectTratamientos.innerHTML = '<option value="" disabled selected>Lista de tratamientos</option>';
    data.forEach(tratamiento => {
      const option = document.createElement('option');
      option.value = tratamiento.processing_ID;
      option.textContent = tratamiento.name;
      selectTratamientos.appendChild(option);
    });
  } catch (error) {
    console.error('Error al cargar los tratamientos:', error);
  }
}

document.getElementById('formArea').addEventListener('submit', async (e) => {
  e.preventDefault();

  const nombreArea = document.getElementById('nombreArea').value;

  if (!nombreArea) {
    alert("El campo nombre del área no puede estar vacío");
    return;
  }

  const response = await fetch('/api/areas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name: nombreArea})
  });

  const data = await response.json();

  if (response.status === 409) {
    alert(data.message);
  } else {
    alert(data.message);
    document.getElementById('nombreArea').value = '';
    cargarAreas();
  }
});

document.getElementById('formTratamiento').addEventListener('submit', async (e) => {
  e.preventDefault();

  const nombreTratamiento = document.getElementById('nombreTratamiento').value;

  if (!nombreTratamiento) {
    alert("El campo nombre del tratamiento no puede estar vacío");
    return;
  }

  const response = await fetch('/api/tratamientos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name: nombreTratamiento})
  });

  const data = await response.json();

  if (response.status === 409) {
    alert(data.message);
  } else {
    alert(data.message);
    document.getElementById('nombreTratamiento').value = '';
    cargarTratamientos();
  }
});

async function eliminarTratamiento() {

  const tratamientoId = document.getElementById('tratamientosSelect').value;

  if (!tratamientoId) {
    alert("Selecciona un tratamiento válido");
    return;
  }

  const response = await fetch(`/api/tratamientos/${tratamientoId}`, {
    method: 'DELETE'
  });

  const data = await response.json();

  if (response.status === 404) {
    alert(data.message);
  } else if (response.status === 500) {
    alert("Ocurrió un error al eliminar el tratamiento");
  } else {
    alert(data.message);
    cargarTratamientos();
  }
}

async function eliminarArea() {
  const areaId = document.getElementById('areasSelect').value;

  if (!areaId) {
    alert("Selecciona una area válida");
    return;
  }

  const response = await fetch(`/api/areas/${areaId}`, {
    method: 'DELETE'
  });

  const data = await response.json();

  if (response.status === 404) {
    alert(data.message);
  } else if (response.status === 500) {
    alert("Ocurrió un error al eliminar el area");
  } else {
    alert(data.message);
    cargarAreas();
  }
}

window.onload = function () {
  cargarAreas();
  cargarTratamientos();
};


function crearFormulario(processing_ID, area_ID) {
  return new Promise((resolve, reject) => {

    const formData = {
      formDetails: {
        complete: 0,
        processing_ID: processing_ID,
        area_ID: area_ID
      }
    };


    fetch('/api/crear-formulario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => {
            throw new Error(text);
          });
        }
        return response.json();
      })
      .then(data => {
        if (data.formID) {
          localStorage.setItem('formID', data.formID);
          resolve();
        } else {
          alert('Ocurrió un error al guardar el formulario');
          reject('Error al guardar el formulario');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        reject(error);
      });
  });
}

document.querySelector('.bt_welcome').addEventListener('click', (event) => {
  const tratamientoSeleccionado = document.getElementById('tratamientosSelect').value;
  const areaSeleccionada = document.getElementById('areasSelect').value;

  if (!tratamientoSeleccionado || !areaSeleccionada) {
    event.preventDefault();
    alert('Por favor, selecciona un tratamiento y un área antes de continuar.');
  } else {

    let complete = false;

    crearFormulario(parseInt(tratamientoSeleccionado), parseInt(areaSeleccionada)).then(() => {
      window.location.href = 'eval1.html';
    }).catch((error) => {
      console.error('Error al crear el formulario:', error);
      alert('Ocurrió un error al crear el formulario.');
    });
  }

});
