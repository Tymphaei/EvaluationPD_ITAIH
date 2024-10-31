// scripts.js
document.addEventListener('DOMContentLoaded', async () => {
  const formID = localStorage.getItem('form_ID');
  console.log("Form ID desde localStorage:", formID);  // Verifica si formId está presente
  if (!formID) return;

  // Mapeo de los valores de porcentaje a sus textos correspondientes
  const percentageTextMap = {
    0: '0% - Inexistente',
    1: '25% - Inicial',
    2: '50% - Intermedio',
    3: '75% - Avanzado',
    4: '100% - Óptimo',
    5: 'No aplica'
  };

  try {
    const response = await fetch(`/api/responses/${formID}`);
    const data = await response.json();
    console.log("Datos obtenidos:", data);  // Log para verificar los datos

    // Obtener todos los contenedores con ID que comiencen con 'table-container'
    const containers = document.querySelectorAll('div[id^="table-container"]');

    // Generar una tabla para cada contenedor
    containers.forEach((container, index) => {
      if (index >= data.length) return; // Evitar errores si hay más contenedores que datos

      const row = data[index]; // Obtener la fila de datos correspondiente

      const table = document.createElement('table');
      table.classList.add('response-table');

      // Crear filas y celdas
      const fields = [
        { label: 'Porcentaje', value: percentageTextMap[row.percentage] || 'Valor desconocido' },
        { label: 'Respuesta', value: row.response },
        { label: 'Evidencia', value: row.evidence },
        { label: 'Acciones de mejora', value: row.actions },
      ];

      fields.forEach(field => {
        const tr = document.createElement('tr');

        const tdLabel = document.createElement('td');
        tdLabel.textContent = field.label;

        const tdValue = document.createElement('td');
        tdValue.textContent = field.value;

        tr.appendChild(tdLabel);
        tr.appendChild(tdValue);

        table.appendChild(tr);
      });

      // Agregar la tabla al contenedor correspondiente
      container.appendChild(table);
    });
  } catch (error) {
    console.error('Error al cargar las respuestas:', error);
  }
});
