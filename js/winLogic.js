function clickHandler(i, j){
  return function(){
      if(boardState[i][j] !== ""){
        return alert("there is already a color here!");
      }
      boardState[i][j] = player;
      console.log(boardState)
      if(player === "yellow"){
        player = "red";
      } else {
        player = "yellow"
      }
      deleteBoard();
      renderBoard();
      const result = winChecker(boardState);
      if(result){
        return winHandler(result);
      }
      const catsGameResult = isCatsGame(boardState);
      if(catsGameResult){
        return catsGameHandler()
      }
  }
}

function winHandler(winner){
  const turnDisplay = document.getElementById("turnDisplay");
  const continueBox = document.getElementById("continueBox");
  continueBox.onclick = playAgainClicked;
  turnDisplay.className = winner + "Win";
  turnDisplay.innerHTML = winner + " has won!"
  continueBox.className = "";
}

function playAgainClicked(){
  continueBox.className = "hide";
  console.log("play again clicked is being called")
  boardState = [["","",""],["","",""],["","",""]];
  turnDisplay.className = "turnDisplay";
  deleteBoard();
  renderBoard();
}

function catsGameHandler(){
  const turnDisplay = document.getElementById("turnDisplay");
  const continueBox = document.getElementById("continueBox");
  continueBox.onclick = playAgainClicked;
  turnDisplay.innerHTML = "Cat's Game!"
  continueBox.className = "";
}

function isCatsGame(board){
  var emptySpacesFound = 0;
  for(let row = 0; row < board.length; row++){
    for(let col = 0; col < board.length; col++){
      if(board[row][col] === ""){
        emptySpacesFound++;
      }
    }
  }
  return emptySpacesFound === 0;
}


function colChecker(board, colIndex){
  let redFound = 0;
  let yellowFound = 0;
  for(let i = 0; i < board.length; i++){
    if(board[i][colIndex] === "yellow"){
      yellowFound++;
    }
    if(board[i][colIndex] === "red"){
      redFound++;
    }
  }
  if(redFound > 2){
    return "red";
  }
  if(yellowFound > 2){
    return "yellow";
  }
  return false;
}

function checkAllColumns(board){
  for(let i = 0; i < board.length; i++){
    let colContainsConflicts = colChecker(board, i)
    if(colContainsConflicts){
      return colContainsConflicts;
    }
  }
  return false;
}

function rowChecker(board, rowIndex){
  let redFound = 0;
  let yellowFound = 0;
  for(let i = 0; i < board.length; i++){
    if(board[rowIndex][i] === "yellow"){
      yellowFound++;
    }
    if(board[rowIndex][i] === "red"){
      redFound++;
    }
  }
  if(redFound > 2){
    return "red";
  }
  if(yellowFound > 2){
    return "yellow";
  }
  return false;
}

function checkAllRows(board){
  for(let i = 0; i < board.length; i++){
    let rowContainsConflicts = rowChecker(board, i)
    if(rowContainsConflicts){
      return rowContainsConflicts;
    }
  }
  return false;
}

function checkMajorDiagonal(board){
  var redFound = 0;
  var yellowFound = 0;

  for(let i = 0; i < board.length; i++){
    if(board[i][i] === "red"){
      redFound++;
    }
    if(board[i][i] === "yellow"){
      yellowFound++;
    }
  }

  if(redFound > 2){
    return "red";
  }
  if(yellowFound > 2){
    return "yellow";
  }
  return false;
}

function checkMinorDiagonal(board){
  var redFound = 0;
  var yellowFound = 0;
  var j = 0;

  for(let i = board.length-1; i > -1 ; i--){
    if(board[j][i] === "red"){
      redFound++;
    }
    if(board[j][i] === "yellow"){
      yellowFound++;
    }
    j++;
  }

  if(redFound > 2){
    return "red";
  }
  if(yellowFound > 2){
    return "yellow";
  }
  return false;
}

function winChecker(board){
  var winner = false;
  if(checkAllColumns(board)){winner = checkAllColumns(board)}
  if(checkAllRows(board)){winner = checkAllRows(board)}
  if(checkMajorDiagonal(board)){winner = checkMajorDiagonal(board)}
  if(checkMinorDiagonal(board)){winner = checkMinorDiagonal(board)}
  return winner;
}
