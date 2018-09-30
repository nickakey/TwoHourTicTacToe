var player = "yellow";
var boardState = [["","",""],["","",""],["","",""]];
var playingWithBot = false;

function renderBoard(){
  const turnDisplay = document.getElementById("turnDisplay");
  turnDisplay.innerHTML = "It is " + player + "'s turn"
  const gameBoardDiv = document.getElementById("gameboard");
  for(let i = 0; i < 3; i++){
    let newRow = document.createElement("div");
    newRow.className = "row";
    gameBoardDiv.appendChild(newRow);
    for(let j = 0; j < 3; j++){
      let space = document.createElement("div");
      spaceDecorator(space, boardState[i][j], i, j);
      newRow.appendChild(space);
    }
  }
}

function deleteBoard(){
  const gameBoardDiv = document.getElementById("gameboard");
  gameBoardDiv.innerHTML = '';
}

function spaceDecorator(space, type, i, j){
   //@type is either string x, o, or "";
   //@returns the same space with click handler and css tag
   if(type === ""){
     space.className = "empty space";
   } else if (type === "red"){
     space.className = "red space";
   } else if (type === "yellow"){
     space.className = "yellow space";
   }
   space.onclick = clickHandler(i, j);
}

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
        return setTimeout(function(){winHandler(result)}, 300)
      }
      const catsGameResult = isCatsGame(boardState);
      if(catsGameResult){
        return setTimeout(function(){catsGameHandler()}, 300)
      }
  }
}

function winHandler(winner){
  alert(winner + " has won!");
  boardState = [["","",""],["","",""],["","",""]];
  deleteBoard();
  renderBoard();
}

function catsGameHandler(){
  alert(" Cats Game!");
  boardState = [["","",""],["","",""],["","",""]];
  deleteBoard();
  renderBoard();

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


renderBoard();
