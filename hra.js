let currentPlayer = 'circle';
const currentPlayerInfoElement = document.getElementById('currentPlayerInfo');

const handleFieldClick = (event) => {
  const clickedField = event.target;

  if (currentPlayer === 'circle') {
    clickedField.classList.add('black-circle');
    currentPlayer = 'cross';
    currentPlayerInfoElement.classList.remove('player-circle');
    currentPlayerInfoElement.classList.add('player-cross');
  } else {
    clickedField.classList.add('black-cross');
    currentPlayer = 'circle';
    currentPlayerInfoElement.classList.remove('player-cross');
    currentPlayerInfoElement.classList.add('player-circle');
  }

  clickedField.disabled = true;
}

const fields = document.querySelectorAll('.cell');

fields.forEach(field => {
  field.addEventListener('click', handleFieldClick);
});

currentPlayerInfoElement.classList.add('player-circle');

const restartButton = document.getElementById('restartGameButton');

restartButton.addEventListener('click', (event) => {
  const confirmation = confirm('Opravdu chcete restartovat hru?');
  if (!confirmation) {
    event.preventDefault();
  }
});
