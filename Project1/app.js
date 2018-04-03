const cells = [];
$(function(){

  const shipLength = 3;
  const shipslengths = [1,4,5];

  const generatedBoard = new Board(8, 8);
  // const guessPosition = [];
  // const hit = [''];

  let x = null;
  let y = null;

  function Board(width, height){
    for(let i = 0; i < width; i++){
      cells.push([]);
      for(let j = 0; j < height; j++){
        cells[i].push(0);

        $(`<div class="grid-item" id="cell_${i}_${j}" 'data-x='${i}' data-y='${j}'>`).appendTo('.grid-container');
      }
    }
  }
  function makeShip(shipLength){ // Horiz/vertical ship
    var randomNumber = Math.floor(Math.random() * 2);
    let way = '';
    if(randomNumber === 1) {
      way = 'H';
    } else {
      way = 'V';
    }
    if (way === 'H') {
      x = Math.floor(Math.random() * (cells.length));
      y = Math.floor(Math.random() * (cells.length - shipLength + 1));
      console.log('H', 'widthY=', y, 'heightX=', x);
      // while (cells.filter(position => [x][y] === 0)) {
      // while (generatedBoard[x][y] === 0) {
      for(let i = 0; i< shipLength;i++){
        cells[x][y+i] = 1;
      }
      // }
    }else{
      y = Math.floor(Math.random() * (cells.length));
      x = Math.floor(Math.random() * (cells.length - shipLength + 1));
      console.log('V','withX=',x, 'heightY=', y);
      for(let i = 0; i< shipLength;i++){
        cells[x+i][y] = 1;
      }
    }
  }
  // function userGuess() {
  //   for(var x = 0; x <guessPosition.length; x++) {
  //     if (guessPosition[x] === userGuess) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }
  // generatedBoard.bind('click', getHit, false);
  // $(`cell_${random}`).click();
  // function getHit(h) {
  //   if (h.target !== h.currentTarget) {



  // coloring of the div component
  $(shipslengths).each(function(i, shipLength){
    makeShip(shipLength);
  });
  console.log(cells);

  $('.grid-item').on('click', function() {
    $(this).css('background', 'red');
  });

});
