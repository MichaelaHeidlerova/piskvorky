import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

const winnerPlayingField = [
  '_', '_', '_', '_', '_', '_', '_', '_', '_', '_',
  '_', '_', '_', '_', '_', '_', '_', '_', '_', '_',
  '_', '_', '_', '_', '_', '_', '_', '_', '_', '_',
  '_', '_', '_', '_', '_', '_', '_', '_', '_', '_',
  '_', '_', '_', '_', '_', '_', '_', '_', '_', '_',
  '_', '_', '_', '_', '_', '_', '_', '_', '_', '_',
  '_', '_', '_', '_', '_', '_', '_', '_', '_', '_',
  '_', '_', '_', '_', '_', '_', '_', '_', '_', '_',
  '_', '_', '_', '_', '_', '_', '_', '_', '_', '_',
  '_', '_', '_', '_', '_', '_', '_', '_', '_', '_'
];

let currentPlayer = 'circle';
const currentPlayerInfoElement = document.getElementById('currentPlayerInfo');

const handleFieldClick = (event) => {
  const clickedField = event.target;
  const clickedFieldId = clickedField.id;
  let playerSymbol = '';

  if (currentPlayer === 'circle') {
    playerSymbol = 'o';
    clickedField.classList.add('black-circle');
    currentPlayer = 'cross';
    currentPlayerInfoElement.classList.remove('player-circle');
    currentPlayerInfoElement.classList.add('player-cross');
  } else {
    playerSymbol = 'x';
    clickedField.classList.add('black-cross');
    currentPlayer = 'circle';
    currentPlayerInfoElement.classList.remove('player-cross');
    currentPlayerInfoElement.classList.add('player-circle');
  }

  clickedField.disabled = true;

  winnerPlayingField[clickedFieldId] = playerSymbol;

  setTimeout(() => {
    const winner = findWinner(winnerPlayingField);
    console.log('Výsledek findWinner:', winner);

    if (winner === 'x') {
      alert('Vyhrál KŘÍŽEK!');
      location.reload();
    } else if (winner === 'o') {
      alert('Vyhrálo KOLEČKO!');
      location.reload();
    }
  }, 100);
};

const fields = document.querySelectorAll('.cell');

fields.forEach((field) => {
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
