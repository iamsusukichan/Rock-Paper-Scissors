const WIN_CONDITION = 3;

//-- Dom Handles ------------------------------------------------------

const $reset = document.getElementById("reset");
const $result = document.getElementById("result");
const $myhands = document.querySelector(".myHands");
const $oppHands = document.querySelector(".oppHands");
const $round = document.querySelector(".round");
const $myStars = document.getElementById("myStars");
const $oppStars = document.getElementById("oppStars");
const $stars = document.querySelectorAll(".stars");
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
let myPoints = 0;
let oppPoints = 0;

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
  $oppHands.innerHTML = `<img src="img/${oppChoice}.png" id="${oppChoice}" class="enlarge"/>`;

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
// const setDefaultStars = () => {
//   $stars.forEach(star => {
//     star.innerHTML = "";
//     star.appendChild(createStar(true));
//     star.appendChild(createStar(false));
//     star.appendChild(createStar(false));
//   });
// };

// const createStar = isEmpty => {
//   const $ele = document.createElement("li");
//   $ele.innerHTML = `<i class="${isEmpty ? "fas" : "far"} fa-star fa-lg"></i>`;
//   return $ele;
// };

// const starCounter = () => {
//   if(myPoints===0 && )

//   //if my stars/oppstars ===3 handleWon();
// };

const iWinThisRound = myPoints => {
  if (myPoints === WIN_CONDITION) {
    globalGameState = gameState.won;
    setTimeout(handleWon, 800);
  }
  $myStars.children[myPoints - 1].innerHTML =
    '<i class="fas fa-star fa-lg"></i>';
};

const iLoseThisRound = oppPoints => {
  if (oppPoints === WIN_CONDITION) {
    globalGameState = gameState.won;
    setTimeout(handleWon, 800);
  }
  $oppStars.children[oppPoints - 1].innerHTML =
    '<i class="fas fa-star fa-lg"></i>';
};
// const iLoseThisRound = oppPoints => {
//   $oppStars.innerHTML = "";
//   if (oppPoints === 1) {
//     $oppStars.appendChild(createStar(true));
//     $oppStars.appendChild(createStar(false));
//     $oppStars.appendChild(createStar(false));
//   }
//   if (oppPoints === 2) {
//     $oppStars.appendChild(createStar(true));
//     $oppStars.appendChild(createStar(true));
//     $oppStars.appendChild(createStar(false));
//   }
//   if (oppPoints === WIN_CONDITION) {
//     $oppStars.appendChild(createStar(true));
//     $oppStars.appendChild(createStar(true));
//     $oppStars.appendChild(createStar(true));
//   }
// };
//won
const win = () => {
  $result.textContent = "You Win!";
  addRound();
  myPoints += 1;
  iWinThisRound(myPoints);
};

//lose
const lose = () => {
  $result.textContent = "You lose!";
  addRound();
  oppPoints += 1;
  iLoseThisRound(oppPoints);
};

//tie
const tie = () => {
  $result.textContent = "Tie!";
  addRound();
};
//reset game

const nextGame = () => {};

const restartGame = () => {
  globalGameState = gameState.idle;
  makeGame();
  //setdefault star
  //set default round
};
const clickResetButton = () => {
  makeGame();
  $reset.addEventListener("click", restartGame);
};

//round
const addRound = () => {
  round = round + 1;
  $round.textContent = round;
  return round;
};

const handleWon = () => {
  //reset counting?
  //modal (set time out: You won/lose the game in X rounds! with mickey love hands)
};
