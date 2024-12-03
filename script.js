class Game {
  constructor() {
    this.playerScore = 0;
    this.computerScore = 0;
    this.options = ["Rock", "Paper", "Scissors"];
  }

  getRandomComputerResult() {
    const randomIndex = Math.floor(Math.random() * this.options.length);
    return this.options[randomIndex];
  }

  hasPlayerWonTheRound(player, computer) {
    return (
      (player === "Rock" && computer === "Scissors") ||
      (player === "Scissors" && computer === "Paper") ||
      (player === "Paper" && computer === "Rock")
    );
  }

  getRoundResults(userOption) {
    const computerResult = this.getRandomComputerResult();
    if (this.hasPlayerWonTheRound(userOption, computerResult)) {
      this.playerScore++;
      return `You win! ${userOption} beats ${computerResult}`;
    } else if (computerResult === userOption) {
      return `It's a tie! Both chose ${userOption}`;
    } else {
      this.computerScore++;
      return `Computer wins! ${computerResult} beats ${userOption}`;
    }
  }

  resetGame() {
    this.playerScore = 0;
    this.computerScore = 0;
  }

  getScores() {
    return { playerScore: this.playerScore, computerScore: this.computerScore };
  }

  isGameOver() {
    return this.playerScore === 3 || this.computerScore === 3;
  }
}

class UI {
  constructor() {
    this.playerScoreSpanElement = document.getElementById("player-score");
    this.computerScoreSpanElement = document.getElementById("computer-score");
    this.roundResultsMsg = document.getElementById("results-msg");
    this.winnerMsgElement = document.getElementById("winner-msg");
    this.optionsContainer = document.querySelector(".options-container");
    this.resetGameBtn = document.getElementById("reset-game-btn");

    this.rockBtn = document.getElementById("rock-btn");
    this.paperBtn = document.getElementById("paper-btn");
    this.scissorsBtn = document.getElementById("scissors-btn");

    this.game = new Game();
    this.attachEventListeners();
  }

  attachEventListeners() {
    this.rockBtn.addEventListener("click", () => this.handleChoice("Rock"));
    this.paperBtn.addEventListener("click", () => this.handleChoice("Paper"));
    this.scissorsBtn.addEventListener("click", () =>
      this.handleChoice("Scissors")
    );
    this.resetGameBtn.addEventListener("click", () => this.resetGame());
  }

  handleChoice(userOption) {
    const resultMessage = this.game.getRoundResults(userOption);
    this.updateUI(resultMessage);
    this.checkGameOver();
  }

  updateUI(resultMessage) {
    const { playerScore, computerScore } = this.game.getScores();
    this.roundResultsMsg.innerText = resultMessage;
    this.computerScoreSpanElement.innerText = computerScore;
    this.playerScoreSpanElement.innerText = playerScore;
  }

  checkGameOver() {
    if (this.game.isGameOver()) {
      if (this.game.playerScore === 3) {
        this.winnerMsgElement.innerText = "You have won the game!";
        this.triggerConfetti(); // Trigger confetti effect for player win
      } else {
        this.winnerMsgElement.innerText = "Computer has won the game!";
        this.triggerBadEffect(); // Trigger bad effect for computer win
      }
      this.resetGameBtn.style.display = "block";
      this.optionsContainer.style.display = "none";
    }
  }

  resetGame() {
    this.game.resetGame();
    this.updateUI("");
    this.winnerMsgElement.innerText = "";
    this.resetGameBtn.style.display = "none";
    this.optionsContainer.style.display = "block";
  }

  triggerConfetti() {
    confetti({
      particleCount: 1000,
      spread: 100,
      origin: { x: 0.5, y: 0.5 },
      colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00"],
      shapes: ["circle", "square"],
      gravity: 1,
      ticks: 200,
    });
  }

  triggerBadEffect() {
    const badEffect = document.createElement("div");
    badEffect.classList.add("bad-effect");
    badEffect.innerText = "You Lose!";
    document.body.appendChild(badEffect);

    badEffect.style.animation = "falling-bad-effect 3s ease-in-out";

    badEffect.addEventListener("animationend", () => {
      badEffect.remove();
    });
  }

  attachVolumeControl() {
    this.volumeIcon.addEventListener("click", () => {
      if (this.backgroundMusic.muted) {
        this.backgroundMusic.muted = false;
        this.volumeIcon.classList.remove("fa-volume-mute");
        this.volumeIcon.classList.add("fa-volume-up");
      } else {
        this.backgroundMusic.muted = true;
        this.volumeIcon.classList.remove("fa-volume-up");
        this.volumeIcon.classList.add("fa-volume-mute");
      }
    });
  }
}

const ui = new UI();
