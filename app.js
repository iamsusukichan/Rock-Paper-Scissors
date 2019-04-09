const WIN_CONDITION = 3;

//-- Dom Handles ------------------------------------------------------

const $reset = document.getElementById("reset");
const $result = document.getElementById("result");
const $myhands = document.querySelector(".myHands");
const $oppHands = document.querySelector(".oppHands");
const $round = document.querySelector(".round");
// const $mRock = document.querySelector(".mr");
// const $mScissors = document.querySelector(".ms");
// const $mPaper = document.querySelector(".mp");

let round = 0;
let gameState = {
  playing: "playing",
  idle: "idle",
  won: "won"
};
let globalGameState = gameState.idle;

// -- Program ----------------------------------------------------------

//handle click-->return user choice --> pass it to compare --> add .hide to hide the non chosen 2 options --> add .enlarge to the chosen one

$myhands.addEventListener("click", e => {
  const myChoice = e.target;
  myChoice.classList.add("enlarge");
  const img = document.querySelectorAll(".myHands li img");
  for (i = 0; i < img.length; i++) {
    if (img[i].classList.contains("enlarge") !== true) {
      img[i].classList.add("hide");
    }
  }

  battle(myChoice.id);
});

//shuffle opponent hands
const shuffle = () => {
  const oppChoice = ["or", "os", "op"];
  return oppChoice[Math.floor(Math.random() * 3)];
};

//display opponent hand
const getOpponentChoice = () => {
  const oppChoice = shuffle();
  const li = document.createElement("li");
  li.innerHTML = `<img src="img/${oppChoice}.png" id="${oppChoice}" />`;
  $oppHands.appendChild(li);
  return oppChoice;
};

//matching hands
//switch --> win, lose, tie situations

const battle = a => {
  const b = getOpponentChoice();
  c = a + b;
  switch (c) {
    case "mpor":
    case "msop":
    case "mros":
      setTimeout(win, 800);
      break;
    case "mpos":
    case "msor":
    case "mrop":
      setTimeout(lose, 800);
      break;
    case "mpop":
    case "msos":
    case "mror":
      setTimeout(tie, 800);
  }
};
//scoring stars
const setDefaultStars = () => {
  //3粒吉星
};

const starCounter = () => {};

//won
const win = () => {
  $result.textContent = "You Win!";
  addRound();
};

//lose
const lose = () => {
  $result.textContent = "You lose!";
  addRound();
};

//tie
const tie = () => {
  $result.textContent = "Tie!";
  addRound();
};
//reset game
const resetGame = () => {
  round = 0;
};

//round
const addRound = () => {
  round = round + 1;
  $round.textContent = round;
  return round;
};
