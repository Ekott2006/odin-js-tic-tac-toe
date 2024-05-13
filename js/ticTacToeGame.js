class TicTacToeGame {
    gameArray;
    score;

    PlayerToCellState(player) {
        return player === Player.Player1 ? CellState.Player1 : CellState.Player2;
    }

    constructor(score = {player1: 0, player2: 0}) {
        this.gameArray = [
            [CellState.Empty, CellState.Empty, CellState.Empty],
            [CellState.Empty, CellState.Empty, CellState.Empty],
            [CellState.Empty, CellState.Empty, CellState.Empty],
        ];
        this.score = score;
    }


    numberToRowAndCol(num) {
        return {row: parseInt(num / 3), col: num % 3}
    }
    addUserInput(num, player) {
        const {row, col} = this.numberToRowAndCol(num);
        if (
            this.gameArray[row] === undefined ||
            this.gameArray[row][col] === undefined ||
            this.gameArray[row][col] !== CellState.Empty
        )
            return false;

        this.gameArray[row][col] = this.PlayerToCellState(player);
        return true;
    }

    getGameState(player) {
        const playerState = this.PlayerToCellState(player);
        let result = {};
        let isAnyEmpty = false;
        for (let i = 0; i < this.gameArray.length; i++) {
            const row = this.gameArray[i];
            // Diagonal Left
            if (this.gameArray[i][i] === playerState)
                result = this.addToResult(result, "diagonal-left");
            for (let j = 0; j < row.length; j++) {
                const cell = row[j];
                if (cell === CellState.Empty) isAnyEmpty = true;
                // Left to Right
                if (cell === playerState)
                    result = this.addToResult(result, `left-to-right-${i}`);
                // Up to Down
                if (this.gameArray[j][i] === playerState)
                    result = this.addToResult(result, `up-to-down-${i}`);
                // Diagonal Right
                if ((i === 0 && j === 2) || (i === 1 && j === 1) || (i === 2 && j === 0)) {
                    if (cell === playerState)
                        result = this.addToResult(result, "diagonal-right");
                }
            }
        }
        if (Math.max(...Object.values(result)) === 3)
            return GameState.Win;
        return isAnyEmpty ? GameState.InProgress : GameState.Draw;
    }

    addToResult(result, key) {
        if (result.hasOwnProperty(key)) result[key]++;
        else result[key] = 1;

        return result;
    }
}

  