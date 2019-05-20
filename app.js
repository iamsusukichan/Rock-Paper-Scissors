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
const $modal = document.querySelector(".modal");
const $overlay = document.querySelector(".overlay");
const $modalButton = document.querySelector(".modal_button");
const $closeButton = document.querySelector(".close_modal");
const $winORlose = document.getElementById("winORlose");
const $roundsToEnd = document.getElementById("roundsToEnd");

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
  addRound();
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

const setDefaultStars = () => {
  $stars.forEach(star => {
    star.innerHTML =
      '<li><i class="far fa-star fa-lg"></i></li><li><i class="far fa-star fa-lg"></i></li><li><i class="far fa-star fa-lg"></i></li>';
  });
};

const iWinThisRound = myPoints => {
  if (myPoints === WIN_CONDITION) {
    $myStars.children[myPoints - 1].innerHTML =
      '<i class="fas fa-star fa-lg"></i>';
    globalGameState = gameState.won;
    setTimeout(handleWon, 800);
  }
  $myStars.children[myPoints - 1].innerHTML =
    '<i class="fas fa-star fa-lg"></i>';
  setTimeout(makeGame, 1500);
};

const iLoseThisRound = oppPoints => {
  if (oppPoints === WIN_CONDITION) {
    $oppStars.children[oppPoints - 1].innerHTML =
      '<i class="fas fa-star fa-lg"></i>';
    globalGameState = gameState.won;
    setTimeout(handleWon, 800);
  }
  $oppStars.children[oppPoints - 1].innerHTML =
    '<i class="fas fa-star fa-lg"></i>';
  setTimeout(makeGame, 1500);
};

//won
const win = () => {
  $result.textContent = "You Win!";
  myPoints += 1;
  iWinThisRound(myPoints);
};

//lose
const lose = () => {
  $result.textContent = "You lose!";
  oppPoints += 1;
  iLoseThisRound(oppPoints);
};

//tie
const tie = () => {
  $result.textContent = "Tie!";
  setTimeout(makeGame, 1500);
};

//makeGame

const makeGame = () => {
  const img = document.querySelectorAll(".myHands li img");
  for (i = 0; i < img.length; i++) {
    img[i].classList.remove("enlarge", "hide");
  }
  $oppHands.innerHTML =
    '<li><img src="img/op.png" id="op" /></li><li><img src="img/os.png" id="os" /></li><li><img src="img/or.png" id="or" /></li>';
  $result.textContent = "";
};

//reset game
const restartGame = () => {
  globalGameState = gameState.idle;
  makeGame();
  $round.textContent = "0";
  round = 0;
  setDefaultStars();
};
const clickResetButton = () => {
  $reset.addEventListener("click", restartGame);
};

//round
const addRound = () => {
  round = round + 1;
  $round.textContent = round;
  return round;
};

const handleWon = () => {
  $modal.style.display = "block";
  $overlay.style.display = "block";

  if (myPoints === WIN_CONDITION) {
    $winORlose.innerHTML = "win";
  }
  if (oppPoints === WIN_CONDITION) {
    $winORlose.innerHTML = "lose";
  }
  $roundsToEnd.innerHTML = $round.textContent;

  $modalButton.addEventListener("click", e => {
    $modal.style.display = "none";
    $overlay.style.display = "none";
  });
  $closeButton.addEventListener("click", e => {
    $modal.style.display = "none";
    $overlay.style.display = "none";
  });
  restartGame();
};
