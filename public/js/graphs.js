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

        // Agrupar datos, excluyendo valores de '5'
        data.forEach(item => {
          const page = item.evaluation_number;
          if (groupedData[page] && item.percentage !== 5) {
            // Escalar porcentaje de 0-4 a 0-100
            groupedData[page].push(item.percentage * 25);
          }
        });

        // Función para determinar el color del fondo
        const getColor = (value) => {
          if (value < 50) {
            return 'rgba(255, 99, 132, 0.6)'; // Rojo para bajo
          } else if (value < 75) {
            return 'rgba(255, 206, 86, 0.6)'; // Amarillo para intermedio
          } else {
            return 'rgba(75, 192, 192, 0.6)'; // Verde para alto
          }
        };

        // Crear gráficas individuales por sección
        Object.keys(groupedData).forEach(page => {
          const percentages = groupedData[page];

          if (percentages.length > 0) {
            const card = document.createElement('div');
            card.className = 'card';
            cardContainer.appendChild(card);

            const canvas = document.createElement('canvas');
            card.appendChild(canvas);

            // Crear gráfica
            new Chart(canvas, {
              type: 'bar',
              data: {
                labels: percentages.map((_, i) => `Opción ${i + 1}`),
                datasets: [{
                  label: `Sección ${page}`,
                  data: percentages,
                  backgroundColor: percentages.map(getColor), // Usar colores según los valores
                  borderColor: percentages.map(value => value < 50 ? 'rgba(255, 99, 132, 1)' : (value < 75 ? 'rgba(255, 206, 86, 1)' : 'rgba(75, 192, 192, 1)')),
                  borderWidth: 1
                }]
              },
              options: {
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100, // Establecer el máximo de la escala en 100
                    ticks: {
                      callback: (value) => `${value}%` // Mostrar porcentaje en el eje Y
                    }
                  }
                }
              }
            });
          }
        });

        // Calcular promedios por sección para la gráfica general
        const pageAverages = Object.keys(groupedData).map(page => {
          const percentages = groupedData[page];
          const sum = percentages.reduce((acc, value) => acc + value, 0);
          return percentages.length > 0 ? sum / percentages.length : 0;
        });

        // Crear gráfica general
        const generalCanvas = document.createElement('canvas');
        generalCard.appendChild(generalCanvas);

        new Chart(generalCanvas, {
          type: 'bar',
          data: {
            labels: Object.keys(groupedData).map(page => `Sección ${page}`),
            datasets: [{
              label: 'Resultados generales de la evaluación',
              data: pageAverages,
              backgroundColor: pageAverages.map(getColor), // Usar colores según los promedios
              borderColor: pageAverages.map(value => value < 50 ? 'rgba(255, 99, 132, 1)' : (value < 75 ? 'rgba(255, 206, 86, 1)' : 'rgba(75, 192, 192, 1)')),
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                max: 100, // Establecer el máximo de la escala en 100
                ticks: {
                  callback: (value) => `${value}%` // Mostrar porcentaje en el eje Y
                }
              }
            }
          }
        });
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
