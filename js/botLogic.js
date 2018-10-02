function chooseRandomSpace(board){
  const emptySpaces = [];
  for(let row = 0; row < board.length; row++){
    for(let col = 0; col < board.length; col++){
      if(board[row][col] === ""){
        emptySpaces.push([row, col]);
      }
    }
  }
  return emptySpaces[Math.floor(Math.random() * emptySpaces.length)]
}
