document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/progreso-secciones')
    .then(res => res.json())
    .then(json => {
      if (!json.success || !json.data || json.data.length === 0) {
        return showMessage("No hay historial de evaluaciones disponible.");
      }

      const rawData = json.data;
      const dataBySection = {};

      rawData.forEach(entry => {
        const section = entry.section;
        const date = new Date(entry.date).toLocaleDateString();
        const percentageValue = entry.percentage;

        if (percentageValue === 5) {
          return;
        }

        if (!dataBySection[section]) {
          dataBySection[section] = {};
        }

        if (!dataBySection[section][date]) {
          dataBySection[section][date] = [];
        }

        dataBySection[section][date].push(percentageValue);
      });

      const sectionColors = [
        'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)',
        'rgba(199, 199, 199, 1)', 'rgba(83, 102, 255, 1)',
        'rgba(255, 99, 255, 1)'
      ];

      const datasets = Object.keys(dataBySection).map(section => {
        const sectionData = [];

        Object.keys(dataBySection[section]).forEach(date => {
          const values = dataBySection[section][date];

          const sum = values.reduce((acc, val) => acc + val, 0);
          const avg = sum / values.length;

          sectionData.push({x: date, y: avg});
        });

        if (sectionData.length === 0) {
          return null;
        }

        return {
          label: `Sección ${section}`,
          data: sectionData,
          borderColor: sectionColors[section - 1],
          fill: false,
          tension: 0.1
        };
      }).filter(Boolean);


      if (datasets.length === 0) {
        return showMessage("No hay datos disponibles para mostrar en la gráfica.");
      }

      const chartContainer = document.getElementById('grafica-contenedor');
      chartContainer.innerHTML = '';

      const canvas = document.createElement('canvas');
      chartContainer.appendChild(canvas);

      new Chart(canvas, {
        type: 'line',
        data: {
          datasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Evolución de Evaluaciones por Sección'
            },
            tooltip: {
              mode: 'nearest',
              intersect: false
            }
          },
          scales: {
            x: {
              type: 'category',
              title: {
                display: true,
                text: 'Fecha de Evaluación'
              }
            },
            y: {
              beginAtZero: true,
              max: 100,
              title: {
                display: true,
                text: 'Porcentaje'
              },
              ticks: {
                callback: value => `${value}%`
              }
            }
          }
        }
      });
    })
    .catch(err => {
      console.error('Error al obtener historial:', err);
      showMessage("Ocurrió un error al obtener el historial.");
    });

  function showMessage(text) {
    const msg = document.createElement('p');
    msg.textContent = text;
    document.getElementById('grafica-contenedor').appendChild(msg);
  }
});
