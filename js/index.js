const CellState = Object.freeze({
    Empty: 0,
    Player1: 1,
    Player2: 2,
});
const Player = Object.freeze({
    Player1: 0,
    Player2: 1,
});
const GameState = Object.freeze({
    Draw: 0,
    Win: 1,
    InProgress: 2,
});

let lastPlayer = Player.Player2
let game = new TicTacToeGame();

const dialog = document.getElementById("dialog");
const dialogText = document.getElementById("dialog_heading");
const closeDialog = document.getElementById("close-img")
closeDialog.addEventListener("click", () => dialog.close());

document.querySelector("#player-1-score").textContent = game.score.player1
document.querySelector("#player-2-score").textContent = game.score.player2

document.querySelectorAll(".input").forEach((elem) => {
    elem.onclick = () => {
        const currentPlayer = lastPlayer === Player.Player1 ? Player.Player2 : Player.Player1;
        const didUpdate = game.addUserInput(parseInt(elem.dataset.id) - 1, currentPlayer)
        lastPlayer = didUpdate ? currentPlayer : lastPlayer;

        // UPDATE THE UI
        const condition = lastPlayer === Player.Player1
        const state = game.getGameState(lastPlayer)

        const img = document.createElement("img")
        img.src = condition ? "/img/icons8-x-96.png" : "/img/icons8-o-100.png";
        if (didUpdate) elem.appendChild(img);

        if (state === GameState.InProgress) return;

        // Update the score
        const score = game.score
        if (state === GameState.Win) {
            if (condition) score.player1 += 1
            else score.player2 += 1
        }
        dialogText.textContent = state === GameState.Win ? `${condition ? "Player 1" : "Player 2"} Wins` : "Game is draw";
        dialog.showModal()

        game = new TicTacToeGame(score);
        // Refresh the UI

        document.querySelector("#player-1-score").textContent = game.score.player1
        document.querySelector("#player-2-score").textContent = game.score.player2
        document.querySelectorAll(".input").forEach(elem => elem.replaceChildren())
    }
})
