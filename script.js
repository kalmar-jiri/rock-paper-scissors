'use strict';

const roundEl = document.querySelector('h2');
const choiceBtns = document.querySelectorAll('button');
const playerScoreEl = document.querySelector('.score--player');
const computerScoreEl = document.querySelector('.score--computer');
const playerChoiceEl = document.querySelector('.choice--player');
const computerChoiceEl = document.querySelector('.choice--computer');

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
  round++;
};

const gameOver = () => {
  return playerScore >= 5 || computerScore >= 5;
};

const movePlayed = btn => {
  playRound(btn);

  if (gameOver()) {
    const winner = playerScore > computerScore ? 'PLAYER' : 'COMPUTER';
    console.log(winner);
    roundEl.textContent = `${winner} wins the game!`;
    return;
  }
};

let computerScore = 0;
let playerScore = 0;
let round = 1;

choiceBtns.forEach(btn => {
  btn.addEventListener('click', () => movePlayed(btn));
});
