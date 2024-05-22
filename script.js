'use strict';

const choices = ['🪨', '📃', '✂️'];
const wordChoices = {
  rock: '🪨',
  paper: '📃',
  scissors: '✂️',
};

const getComputerChoice = () => choices[Math.trunc(Math.random() * 3)];

const getPlayerChoice = () => {
  const playerChoice = prompt('Please choose 🪨, 📃 or ✂️ (use words).').toLowerCase();

  if (playerChoice === 'rock' || playerChoice === 'paper' || playerChoice === 'scissors') {
    return wordChoices[playerChoice];
  } else {
    getPlayerChoice();
  }
};

const evaluateRound = (computerMove, playerMove) => {
  if (computerMove === playerMove) return 2;
  else if ((computerMove === '🪨' && playerMove === '✂️') || (computerMove === '📃' && playerMove === '🪨') || (computerMove === '✂️' && playerMove === '📃')) {
    return 0;
  } else return 1;
};

const showScore = () => {
  console.log('---SCORE---');
  console.log(`🤵 ${playerScore} : ${computerScore} 💻`);
};

const playRound = () => {
  let computerChoice = getComputerChoice();
  let playerChoice = getPlayerChoice();
  let result = evaluateRound(computerChoice, playerChoice);

  console.log('PLAYER vs. PC');
  console.log(`${playerChoice} vs. ${computerChoice}`);
  if (!result) {
    console.log('COMPUTER wins!☹️');
    computerScore++;
  } else if (result === 1) {
    console.log('PLAYER wins!!😁🥳');
    playerScore++;
  } else {
    console.log("It's a TIE.👔");
  }

  showScore();
};

let computerScore = 0;
let playerScore = 0;

// console.log('========== ROCK, PAPER, SCISSORS ==========');
// for (let i = 1; i <= 5; i++) {
//   console.log(`### ROUND ${i} ###`);
//   playRound();
// }
// console.log('================= THE END =================');
