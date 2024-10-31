/*
   Funcion para obtener los datos del usuario y el formualario para el reporte
*/

document.addEventListener('DOMContentLoaded', async () => {
  const form_ID = localStorage.getItem('form_ID');
  console.log(form_ID);
  try {
    const response = await fetch(`/get-form-data?form_ID=${form_ID}`);
    const result = await response.json();

    if (result.success) {
      document.getElementById('tratamiento').textContent = result.data.tratamiento;
      document.getElementById('area').textContent = result.data.area;
      document.getElementById('fecha').textContent = result.data.date;
    } else {
      console.error(result.message);
    }
  } catch (error) {
    console.error('Error al obtener datos del formulario:', error);
  }

});
