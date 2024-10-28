/*
   Script para generar los select e inputs automaticamente
*/

let contador = 0;
const contenedores = ['contenedor1', 'contenedor2', 'contenedor3', 'contenedor4', 'contenedor5', 'contenedor6',
  'contenedor7', 'contenedor8', 'contenedor9', 'contenedor10', 'contenedor11', 'contenedor12', 'contenedor13', 'contenedor14',
  'contenedor15', 'contenedor16', 'contenedor17', 'contenedor18', 'contenedor19', 'contenedor20', 'contenedor21', 'contenedor22',
  'contenedor23', 'contenedor24', 'contenedor25', 'contenedor26', 'contenedor27', 'contenedor28', 'contenedor29',
  'contenedor30', 'contenedor31', 'contenedor32', 'contenedor33', 'contenedor34', 'contenedor35', 'contenedor36', 'contenedor37',
  'contenedor38', 'contenedor39'];

function crearDiv(contenedorId) {
  contador++;

  const container = document.getElementById(contenedorId);

  const nuevoDiv = document.createElement('div');
  nuevoDiv.className = 'container';

  const columna1 = document.createElement('div');
  columna1.className = 'column';
  const label1 = document.createElement('label');
  label1.setAttribute('for', `opcion${contador}`);
  label1.textContent = 'Porcentaje:';
  const select = document.createElement('select');
  select.id = `opcion${contador}`;
  select.name = `opcion${contador}`;

  const placeholderOption = document.createElement('option');
  placeholderOption.value = "";
  placeholderOption.textContent = "Seleccione una opción:";
  placeholderOption.selected = true;
  placeholderOption.disabled = true;
  select.appendChild(placeholderOption);

  const opciones = [
    {valor: 0, texto: '0% -  Inexistente'},
    {valor: 1, texto: '25% - Inical'},
    {valor: 2, texto: '50% - Intermedio'},
    {valor: 3, texto: '75% - Avanzado'},
    {valor: 4, texto: '100%  - Optimo'},
    {valor: 5, texto: 'No aplica'}
  ];

  opciones.forEach(opcion => {
    const option = document.createElement('option');
    option.value = opcion.valor;
    option.textContent = opcion.texto;
    select.appendChild(option);
  });

  columna1.appendChild(label1);
  columna1.appendChild(document.createElement('br'));
  columna1.appendChild(select);

  const columna2 = document.createElement('div');
  columna2.className = 'column';
  const label2 = document.createElement('label');
  label2.setAttribute('for', `input1-${contador}`);
  label2.textContent = 'Respuesta:';
  const input1 = document.createElement('input');
  input1.type = 'text';
  input1.id = `input1-${contador}`;
  input1.name = `input1-${contador}`;
  columna2.appendChild(label2);
  columna2.appendChild(document.createElement('br'));
  columna2.appendChild(input1);

  const columna3 = document.createElement('div');
  columna3.className = 'column';
  const label3 = document.createElement('label');
  label3.setAttribute('for', `input2-${contador}`);
  label3.textContent = 'Evidencia:';
  const input2 = document.createElement('input');
  input2.type = 'text';
  input2.id = `input2-${contador}`;
  input2.name = `input2-${contador}`;
  columna3.appendChild(label3);
  columna3.appendChild(document.createElement('br'));
  columna3.appendChild(input2);

  const columna4 = document.createElement('div');
  columna4.className = 'column';
  const label4 = document.createElement('label');
  label4.setAttribute('for', `input3-${contador}`);
  label4.textContent = 'Acciones de mejora:';
  const input3 = document.createElement('input');
  input3.type = 'text';
  input3.id = `input3-${contador}`;
  input3.name = `input3-${contador}`;
  columna4.appendChild(label4);
  columna4.appendChild(document.createElement('br'));
  columna4.appendChild(input3);

  nuevoDiv.appendChild(columna1);
  nuevoDiv.appendChild(columna2);
  nuevoDiv.appendChild(columna3);
  nuevoDiv.appendChild(columna4);

  container.appendChild(nuevoDiv);
}

window.onload = function () {
  for (let i = 0; i < contenedores.length; i++) {
    crearDiv(contenedores[i]);
  }
};

function validarSelects() {
  const selects = document.querySelectorAll('select');
  for (let select of selects) {
    if (!select.value) {
      alert('Por favor selecciona una opción en todos los campos de porcentaje');
      return false;
    }
  }
  return true;
}

document.getElementById('saveAndContinueButton').addEventListener('click', function () {
  if (validarSelects()) {
    guardarFormulario('continue');

  }
});

document.getElementById('saveAndExitButton').addEventListener('click', function () {
  if (validarSelects()) {
    guardarFormulario('exit');

  }
});
