function TicTacToeGame(score = { player1: 0, player2: 0 }) {
    this.gameArray = [
      [CellState.Empty, CellState.Empty, CellState.Empty],
      [CellState.Empty, CellState.Empty, CellState.Empty],
      [CellState.Empty, CellState.Empty, CellState.Empty],
    ];
    this.score = score;
  }
  
  TicTacToeGame.prototype = {
    playerToCellState: function(player) {
      return player === Player.Player1 ? CellState.Player1 : CellState.Player2;
    },
  
    numberToRowAndCol: function(num) {
      return { row: parseInt(num / 3), col: num % 3 };
    },
  
    addUserInput: function(num, player) {
      const { row, col } = this.numberToRowAndCol(num);
      if (
        this.gameArray[row] === undefined ||
        this.gameArray[row][col] === undefined ||
        this.gameArray[row][col] !== CellState.Empty
      ) {
        return false;
      }
  
      this.gameArray[row][col] = this.playerToCellState(player);
      return true;
    },
  
    getGameState: function(player) {
      const playerState = this.playerToCellState(player);
      const result = {};
      let isAnyEmpty = false;
  
      for (let i = 0; i < this.gameArray.length; i++) {
        const row = this.gameArray[i];
  
        // Diagonal Left
        if (this.gameArray[i][i] === playerState) {
          result["diagonal-left"] = (result["diagonal-left"] || 0) + 1;
        }
  
        for (let j = 0; j < row.length; j++) {
          const cell = row[j];
          if (cell === CellState.Empty) {
            isAnyEmpty = true;
          }
  
          // Left to Right
          if (cell === playerState) {
            result[`left-to-right-${i}`] = (result[`left-to-right-${i}`] || 0) + 1;
          }
  
          // Up to Down
          if (this.gameArray[j][i] === playerState) {
            result[`up-to-down-${i}`] = (result[`up-to-down-${i}`] || 0) + 1;
          }
  
          // Diagonal Right
          if ((i === 0 && j === 2) || (i === 1 && j === 1) || (i === 2 && j === 0)) {
            if (cell === playerState) {
              result["diagonal-right"] = (result["diagonal-right"] || 0) + 1;
            }
          }
        }
      }
  
      return Math.max(...Object.values(result)) === 3
        ? GameState.Win
        : isAnyEmpty
        ? GameState.InProgress
        : GameState.Draw;
    },
  
    // ... other methods if needed (updateScore, printBoard etc.)
  };
  