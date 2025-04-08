document.addEventListener('DOMContentLoaded', () => {
  const formID = localStorage.getItem('formID');
  const cardContainer = document.getElementById('cardContainer');
  const generalCard = document.getElementById('generalCard');

  fetch(`/api/graficas/${formID}`)
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        const groupedData = {};
        for (let i = 1; i <= 9; i++) {
          groupedData[i] = [];
        }

        data.forEach(item => {
          const page = item.evaluation_number;
          if (groupedData[page] && item.percentage !== 5) {
            groupedData[page].push(item.percentage * 25);
          }
        });

        const getColor = (value) => {
          if (value < 50) {
            return 'rgba(255, 99, 132, 0.6)';
          } else if (value < 75) {
            return 'rgba(255, 206, 86, 0.6)';
          } else {
            return 'rgba(75, 192, 192, 0.6)';
          }
        };

        Object.keys(groupedData).forEach(page => {
          const percentages = groupedData[page];

          if (percentages.length > 0) {
            const card = document.createElement('div');
            card.className = 'card';
            cardContainer.appendChild(card);

            const canvas = document.createElement('canvas');
            card.appendChild(canvas);

            new Chart(canvas, {
              type: 'bar',
              data: {
                labels: percentages.map((_, i) => `Elemento ${i + 1}`),
                datasets: [{
                  label: `Sección ${page}`,
                  data: percentages,
                  backgroundColor: percentages.map(getColor),
                  borderColor: percentages.map(value => value < 50 ? 'rgba(255, 99, 132, 1)' : (value < 75 ? 'rgba(255, 206, 86, 1)' : 'rgba(75, 192, 192, 1)')),
                  borderWidth: 1
                }]
              },
              options: {
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                      callback: (value) => `${value}%`
                    }
                  }
                }
              }
            });
          }
        });

        const pageAverages = Object.keys(groupedData).map(page => {
          const percentages = groupedData[page];
          const sum = percentages.reduce((acc, value) => acc + value, 0);
          return percentages.length > 0 ? sum / percentages.length : 0;
        });

        const generalCanvas = document.createElement('canvas');
        generalCard.appendChild(generalCanvas);

        new Chart(generalCanvas, {
          type: 'bar',
          data: {
            labels: Object.keys(groupedData).map(page => `Sección ${page}`),
            datasets: [{
              label: 'Resultados generales de la evaluación',
              data: pageAverages,
              backgroundColor: pageAverages.map(getColor),
              borderColor: pageAverages.map(value => value < 50 ? 'rgba(255, 99, 132, 1)' : (value < 75 ? 'rgba(255, 206, 86, 1)' : 'rgba(75, 192, 192, 1)')),
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                  callback: (value) => `${value}%`
                }
              }
            }
          }
        });
        createHeatmap(data);
      } else {
        const message = document.createElement('p');
        message.textContent = "No hay datos disponibles para mostrar.";
        generalCard.appendChild(message);
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      const message = document.createElement('p');
      message.textContent = "Hubo un error al obtener los datos. Intenta de nuevo más tarde.";
      generalCard.appendChild(message);
    });
});


const createHeatmap = (data) => {
  if (!data || !Array.isArray(data)) {
    console.error('Datos inválidos para el mapa de calor:', data);
    return;
  }
  const heatmapData = {};


  data.forEach(item => {
    const section = item.evaluation_number;
    const score = item.percentage;

    if (!heatmapData[section]) {
      heatmapData[section] = [0, 0, 0, 0, 0];
    }

    if (score >= 0 && score <= 4) {
      heatmapData[section][score]++;
    }
  });

  const container = document.getElementById('heatmapContainer');

  if (!container) {
    console.error('Contenedor del mapa de calor no encontrado');
    return;
  }
  const table = document.createElement('table');
  table.className = 'heatmap-table';

  const headerRow = table.insertRow();
  ['Sección', '0%', '25%', '50%', '75%', '100%'].forEach(text => {
    const th = document.createElement('th');
    th.textContent = text;
    headerRow.appendChild(th);
  });

  Object.keys(heatmapData).sort().forEach(section => {
    const scores = heatmapData[section];
    const total = scores.reduce((a, b) => a + b, 0);

    const row = table.insertRow();

    const sectionCell = row.insertCell();
    sectionCell.textContent = `Sección ${section}`;

    scores.forEach((count, index) => {
      const cell = row.insertCell();
      const percentage = total > 0 ? (count / total * 100).toFixed(1) + '%' : '0%';

      cell.textContent = `${count} (${percentage})`;
      cell.style.backgroundColor = getHeatmapColor(count / total);
    });
  });

  container.appendChild(table);
};

const getHeatmapColor = (value) => {
  const hue = value * 120;
  return `hsl(${hue}, 100%, 50%)`;
};

createHeatmap(data);

const legend = document.createElement('div');
legend.className = 'heatmap-legend';

[0, 0.25, 0.5, 0.75, 1].forEach(value => {
  const item = document.createElement('div');
  item.className = 'legend-item';

  const colorBox = document.createElement('div');
  colorBox.className = 'legend-color';
  colorBox.style.backgroundColor = getHeatmapColor(value);

  const label = document.createElement('span');
  label.textContent = `${Math.round(value * 100)}% Frecuencia`;

  item.appendChild(colorBox);
  item.appendChild(label);
  legend.appendChild(item);
});

container.appendChild(legend);
