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
        $(`<div class="grid-item" id="cell_${i}_${j}" data-ship=null data-x='${i}' data-y='${j}'>`).appendTo('.grid-container');
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
      for(let i = 0; i< shipLength;i++){
        cells[x][y+i] = 1;
        // $('.grid-item').data('ship', 'true');
        // if ('data-x'-'data-x' + cells[x][y+i] = 1)

        // var matches = cells.querySelectorAll('data-ship');
        // for(let i = 0; i< shipLength;i++){
        //  $('.grid-item'),'(data-ship=true)'.appendTo('.grid-container');
        //  $(".grid-item"; data-ship=true ).appendTo('.grid-container');
        // }
      }
    }else{
      y = Math.floor(Math.random() * (cells.length));
      x = Math.floor(Math.random() * (cells.length - shipLength + 1));
      console.log('V','withX=',x, 'heightY=', y);
      for(let i = 0; i< shipLength;i++){
        cells[x+i][y] = 1;
        // $('<div class="grid-item" data-ship=true >').appendTo('.grid-container');
      }
    }
  }
  $(shipslengths).each(function(i, shipslengths){
    makeShip(shipslengths);
  });

  console.log(cells);

  // var result;
  // for( var i = 0, len = cells.length; i < len; i++ ) {
  //   if( cells[i][0] === '1' ) {
  //     result = cells[i];
  //     console.log(result);
  //     break;
  //   }
  // }


  // $('.grid-item').on('click', function() {
  //   if($(this).data('ship') === true) {
  //     $(this).css('background', 'red');
  //   } else {
  //     alert('nothing is there');
  //   }
  // });
});
// add the image to appear when the div is a hit
// add the correct hit to the score board
// high score added and saved locally

// while (cells.filter(position => generatedBoard[x][y] === 0)) {
// while (generatedBoard[x][y] === 0) {
// }
