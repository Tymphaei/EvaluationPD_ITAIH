document.addEventListener('DOMContentLoaded', async () => {
  const formID = localStorage.getItem('formID');
  if (!formID) return;

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

    const containers = document.querySelectorAll('div[id^="table-container"]');

    containers.forEach((container, index) => {
      if (index >= data.length) return;

      const row = data[index];

      const table = document.createElement('table');
      table.classList.add('response-table');

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

      container.appendChild(table);
    });
  } catch (error) {
    console.error('Error al cargar las respuestas:', error);
  }
});
