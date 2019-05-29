//-- Constants---------------------------------------------------------
const WIN_CONDITION = 3;
const CHOICES = ["r", "s", "p"];

const Star = {
  solid: '<i class="fas fa-star fa-lg"></i>',
  regular: '<i class="far fa-star fa-lg"></i>'
};

const GameModes = {
  playing: "playing",
  idle: "idle",
  won: "won"
};

const GameMsgs = {
  win: "You win",
  lose: "You lose",
  tie: "Tie",
  empty: ""
};

//-- Dom Handles ------------------------------------------------------
const $reset = document.getElementById("js-reset-btn");
const $result = document.getElementById("js-result--output");

const $player = document.getElementById("player");
const $playerScore = $player.querySelector(".js-score");
const $playerChoices = $player.querySelector(".js-choices");

const $opponent = document.getElementById("opponent");
const $opponentScore = $opponent.querySelector(".js-score");
const $opponentChoices = $opponent.querySelector(".js-choices");

const $round = document.getElementById("js-round");

const $modal = document.getElementById("js-modal");
const $modalWrapper = $modal.querySelector("#js-modal__wrapper");
const $modalBtn = $modalWrapper.querySelector("#js-modal__btn");
const $modalContent = $modalWrapper.querySelector("#js-modal__content");

let globalState;

const State = {
  set: f => {
    const stateNew = f(State.get());
    globalState = stateNew;
    return globalState;
  },
  get: () => globalState,
  new: () => ({
    mode: GameModes.idle,
    playerPoints: 0,
    playerChoice: null,
    opponentPoints: 0,
    opponentChoice: null,
    round: 0,
    msg: GameMsgs.empty
  })
};

const logState = () => {
  console.info(State.get());
};

//-- Helpers -----------------------------------------------------------
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

//-- Modal -------------------------------------------------------------
const Modal = {
  enable: () => {
    $modal.style.display = "flex";
  },
  disable: () => {
    $modal.style.display = "none";
  },
  controls: e => {
    Modal.disable();
    startNewGame();
  },
  setup: () => {
    $modalBtn.addEventListener("click", Modal.controls);
  },
  mkContent: (msg, rounds) => `
    <p>Thanks for playing with me!</p>
    <p>
      You
      <span>${msg}</span> the game in
      <span>${rounds}</span> rounds!
    </p>
  `
};

// -- Program ----------------------------------------------------------
const playerChoicesView = `
  <li>
    <img data-clickable="1" src="./img/mp.png" id="p" class="option" />
  </li>
  <li>
    <img data-clickable="1" src="./img/ms.png" id="s" class="option" />
  </li>
  <li>
    <img data-clickable="1" src="./img/mr.png" id="r" class="option" />
  </li>
`;

const opponentChoicesView = `
  <li>
    <img src="./img/op.png" id="p" class="option" />
  </li>
  <li>
    <img src="./img/os.png" id="s" class="option" />
  </li>
  <li>
    <img src="./img/or.png" id="r" class="option" />
  </li>
`;

const renderChoice = ($elem, { choice }) => {
  const focusCls = "option--focus";
  const blurCls = "option--blur";

  if (choice === null) {
    CHOICES.forEach(c => {
      $elem.querySelector(`#${c}`).classList.remove(blurCls, focusCls);
    });
  } else {
    const xs = new Set(CHOICES);
    xs.delete(choice);

    $elem.querySelector(`#${choice}`).classList.add(focusCls);
    xs.forEach(c => {
      $elem.querySelector(`#${c}`).classList.add(blurCls);
    });
  }
};

const renderGame = state => {
  const { playerPoints, playerChoice, opponentPoints, opponentChoice } = state;

  renderScore($playerScore, playerPoints);
  renderScore($opponentScore, opponentPoints);

  renderChoice($playerChoices, { choice: playerChoice });
  renderChoice($opponentChoices, { choice: opponentChoice });

  $round.textContent = state.round;
  $result.textContent = state.msg;

  if (state.mode === GameModes.won) {
    let msg = "";

    if (playerPoints === WIN_CONDITION) {
      msg = "win";
    } else if (opponentPoints === WIN_CONDITION) {
      msg = "lose";
    } else {
      msg = "<impossible case>";
    }

    $modalContent.innerHTML = Modal.mkContent(msg, state.round);
    Modal.enable();
  }
};

const getOpponentChoice = () => {
  return CHOICES[Math.floor(Math.random() * 3)];
};

//matching hands
//switch --> win, lose, tie situations
const mkBattle = (a, b, state) => {
  const c = a + b;

  switch (c) {
    case "pr":
    case "sp":
    case "rs": {
      // Player Win
      return {
        ...state,
        playerPoints: state.playerPoints + 1,
        msg: GameMsgs.win
      };
    }
    case "ps":
    case "sr":
    case "rp": {
      // Player Lose
      return {
        ...state,
        opponentPoints: state.opponentPoints + 1,
        msg: GameMsgs.lose
      };
    }
    case "pp":
    case "ss":
    case "rr": {
      // Player Tie
      return {
        ...state,
        msg: GameMsgs.tie
      };
    }
  }
};

const renderScore = ($elem, num) => {
  const stars = [
    ...Array.from({ length: num }, () => Star.solid),
    ...Array.from({ length: WIN_CONDITION - num }, () => Star.regular)
  ];

  $elem.innerHTML = stars.map(s => `<li>${s}</li>`).join("");
};

const onPlayerSelection = e => {
  logState();
  let state = State.get();

  if (
    state.mode === GameModes.playing ||
    !Boolean(parseInt(e.target.dataset.clickable, 10))
  ) {
    return;
  }

  const playerChoice = e.target.id;
  const opponentChoice = getOpponentChoice();

  renderGame(
    State.set(state => ({
      ...state,
      mode: GameModes.playing,
      round: state.round + 1,
      playerChoice,
      opponentChoice
    }))
  );

  state = State.set(state => mkBattle(playerChoice, opponentChoice, state));

  delay(600)
    .then(() => {
      renderGame(state);
      return delay(1800);
    })
    .then(() => {
      const mode =
        state.playerPoints === WIN_CONDITION ||
        state.opponentPoints === WIN_CONDITION
          ? GameModes.won
          : GameModes.idle;

      renderGame(
        State.set(state => ({
          ...state,
          mode,
          msg: GameMsgs.empty,
          playerChoice: null,
          opponentChoice: null
        }))
      );
    });
};

const startNewGame = () => {
  const state = State.set(State.new);
  renderGame(state);
};

const main = () => {
  $playerChoices.innerHTML = playerChoicesView;
  $playerChoices.addEventListener("click", onPlayerSelection);

  $opponentChoices.innerHTML = opponentChoicesView;
  $reset.addEventListener("click", startNewGame);
  Modal.setup();
  startNewGame();
};

main();
