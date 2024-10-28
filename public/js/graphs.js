/*
   Funcion para graficar los resultados
*/

document.addEventListener('DOMContentLoaded', () => {
  const formID = localStorage.getItem('form_ID'); // Obtener form_ID de localStorage
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
            groupedData[page].push(item.percentage);
          }
        });

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
                labels: percentages.map((_, i) => `Option ${i + 1}`),
                datasets: [{
                  label: `Sección ${page}`,
                  data: percentages,
                  backgroundColor: 'rgba(54, 162, 235, 0.6)',
                  borderColor: 'rgba(54, 162, 235, 1)',
                  borderWidth: 1
                }]
              },
              options: {
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 4
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
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                max: 4
              }
            }
          }
        });
      } else {
        const message = document.createElement('p');
        message.textContent = "No data available to display.";
        generalCard.appendChild(message);
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});
