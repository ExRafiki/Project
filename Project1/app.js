var cells = [];
$(function(){

  const shipLength = 3;
  const shipsLengths = [5,3,2,1];
  const generatedBoard = new Board(8,8);
  var score = 0;
  let x = null;
  let y = null;

  function Board(width, height){
    for(let i = 0; i < width; i++){
      cells.push([]);
      for(let j = 0; j < height; j++){
        cells[i].push(0);
        $(`<div class="grid-item" id="cell_${i}_${j}" data-ship='${null}' data-x='${i}' data-y='${j}'>`).appendTo('.grid-container');
      }
    }
  }
  function makeShip(shipsLengths){
    var randomNumber = Math.floor(Math.random() * 2);
    let way = '';
    if(randomNumber === 1) {
      way = 'H';
    } else {
      way = 'V';
    }
    if (way === 'H') {
      x = Math.floor(Math.random() * (cells.length));
      y = Math.floor(Math.random() * (cells.length - shipsLengths + 1));
      for(let i = 0; i< shipsLengths;i++){
        cells[x][y+i] = 1;
        console.log(`#cell_${x}_${y+i}`);
        $(`#cell_${x}_${y+i}`).data('ship', 'true');

      }
    }else{
      y = Math.floor(Math.random() * (cells.length));
      x = Math.floor(Math.random() * (cells.length - shipsLengths + 1));
      console.log('V','withX=',x, 'heightY=', y);
      for(let i = 0; i< shipsLengths;i++){
        cells[x+i][y] = 1;
        $(`#cell_${x+i}_${y}`).data('ship', 'true');
      }
    }
  }
  $(shipsLengths).each(function(i, shipsLengths){
    makeShip(shipsLengths);
  });

  console.log(cells);

  $('.grid-item').on('click', function() {
    if($(this).data('ship') === 'true') {
      $(this).css('background', 'red');
      score += 5 ;
      $('p.Score').text('Score').text(score);
    } else {
      $(this).css('background', 'blue');
    }
  });
});
// add the image to appear when the div is a hit
// add the correct hit to the score board
// high score added and saved locally
