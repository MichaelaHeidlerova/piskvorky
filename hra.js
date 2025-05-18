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
const fields = document.querySelectorAll('.cell');

const playerMove = async (board) => {
  const response = await fetch(
    'https://piskvorky.czechitas-podklady.cz/api/suggest-next-move',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ board: board, player: 'x' }),
    },
  );
  if (!response.ok) {
    return null;
  }
  const data = await response.json();
  return data;
};

const aiMove = async () => {
  fields.forEach((field) => {
    field.disabled = true;
  });

  const playerMoved = await playerMove(winnerPlayingField);

  fields.forEach((field, index) => {
    if (winnerPlayingField[index] === '_') {
      field.disabled = false;
    }
  });

  if (playerMoved && currentPlayer === 'cross') {
    const { x, y } = playerMoved.position;
    const index = x + y * 10;
    const aiField = document.getElementById(index.toString());
    if (aiField && winnerPlayingField[index.toString()] === '_') {
      aiField.click();
    }
  }
};

const handleFieldClick = (event) => {
  const clickedField = event.target;
  const clickedFieldId = clickedField.id;
  let playerSymbol = '';

  if (currentPlayer === 'circle') {
    playerSymbol = 'o';
    clickedField.classList.add('black-circle');
    clickedField.disabled = true;
    winnerPlayingField[clickedFieldId] = playerSymbol;

    const winner = findWinner(winnerPlayingField);

    if (winner === 'o') {
      alert('Vyhrálo KOLEČKO!');
      location.reload();
      return;
    }

    currentPlayer = 'cross';
    currentPlayerInfoElement.classList.remove('player-circle');
    currentPlayerInfoElement.classList.add('player-cross');

    aiMove();
  } else if (currentPlayer === 'cross') {
    playerSymbol = 'x';
    clickedField.classList.add('black-cross');
    clickedField.disabled = true;
    winnerPlayingField[clickedFieldId] = playerSymbol;

    currentPlayer = 'circle';

    currentPlayerInfoElement.classList.remove('player-cross');
    currentPlayerInfoElement.classList.add('player-circle');

    setTimeout(() => {
      const winner = findWinner(winnerPlayingField);

      if (winner === 'x') {
        alert('Vyhrál KŘÍŽEK!');
        location.reload();
      } else if (winner === 'o') {
        alert('Vyhrálo KOLEČKO!');
        location.reload();
      }
    }, 100);
  }
};

fields.forEach((field) => {
  field.addEventListener('click', handleFieldClick);
});

currentPlayerInfoElement.classList.add('player-circle');

const restartButton = document.getElementById('restartGameButton');

restartButton.addEventListener('click', () => {
  const confirmation = confirm('Opravdu chcete restartovat hru?');
  if (confirmation) {
    location.reload();
  }
});
