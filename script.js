'use strict';

const roundEl = document.querySelector('h2');
const choiceBtns = document.querySelectorAll('button');
const playerScoreEl = document.querySelector('.score--player');
const computerScoreEl = document.querySelector('.score--computer');
const playerChoiceEl = document.querySelector('.choice--player');
const computerChoiceEl = document.querySelector('.choice--computer');
const modalWindow = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const winnerEl = document.querySelector('.winner');
const finalScore = document.querySelector('.final-score');
const btnCloseModal = document.querySelector('.close-modal');
const btnNewGame = document.querySelector('.fa-rotate-right');

const choices = ['🪨', '📃', '✂️'];

const getComputerChoice = () => choices[Math.trunc(Math.random() * 3)];

const evaluateRound = (computerMove, playerMove) => {
  if (computerMove === playerMove) return 2;
  else if ((computerMove === '🪨' && playerMove === '✂️') || (computerMove === '📃' && playerMove === '🪨') || (computerMove === '✂️' && playerMove === '📃')) {
    return 0;
  } else return 1;
};

const showScore = () => {
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
};

const playRound = btn => {
  round++;
  roundEl.textContent = `Round ${round}`;

  // Computer choice
  let computerChoice = getComputerChoice();
  computerChoiceEl.textContent = computerChoice;

  // Player choice assignment
  let playerChoice = btn.textContent;
  playerChoiceEl.textContent = btn.textContent;

  let result = evaluateRound(computerChoice, playerChoice);
  if (!result) {
    computerScore++;
  } else if (result === 1) {
    playerScore++;
  } else {
  }

  showScore();
};

const gameOver = () => {
  return playerScore === 5 || computerScore === 5;
};

const endgameMessage = () => {
  const winner = playerScore > computerScore ? 'PLAYER' : 'COMPUTER';
  overlay.classList.toggle('hidden');
  modalWindow.classList.toggle('hidden');

  winnerEl.textContent = `${winner} wins the game!`;
  finalScore.textContent = `${playerScore} : ${computerScore}`;
};

const movePlayed = btn => {
  if (gameOver()) {
    endgameMessage();
    return;
  }

  playRound(btn);

  if (gameOver()) {
    endgameMessage();
    return;
  }
};

const closeModal = () => {
  overlay.classList.add('hidden');
  modalWindow.classList.add('hidden');
};

const newGame = () => {
  closeModal();
  computerScore = 0;
  playerScore = 0;
  round = 0;
  showScore();
  roundEl.textContent = 'Make a 1st choice';
  playerChoiceEl.textContent = '❔';
  computerChoiceEl.textContent = '❔';
};

let computerScore = 0;
let playerScore = 0;
let round = 0;

// CHOICE BUTTONS event listeners
choiceBtns.forEach(btn => {
  btn.addEventListener('click', () => movePlayed(btn));
});

// Closing the modal window
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modalWindow.classList.contains('hidden')) {
    closeModal();
  }
});

// Start new game
btnNewGame.addEventListener('click', newGame);
