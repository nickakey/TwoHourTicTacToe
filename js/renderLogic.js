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

renderBoard();
