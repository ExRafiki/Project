var cells = [];

$(function(){

  const shipsLengths = [3,2,4,2,1];
  let generatedBoard = new Board(8,8);
  var score = 0;
  let x = null;
  let y = null;
  const DEV = true;

  let clickCount = 0;
  const clickCountMax = 5;


  function Board(width, height){
    for(let i = 0; i < width; i++){
      cells.push([]);
      for(let j = 0; j < height; j++){
        cells[i].push(0);
        $(`<div class="grid-item" id="cell_${i}_${j}" data-ship='${null}' data-x='${i}' data-y='${j}'>`).appendTo('.grid-container');
      }
    }
  }
  function findPosition(shipLength, horizontal){
    let currentTestPositions = [];
    do {
      currentTestPositions = [];
      if(horizontal){
        x = Math.floor(Math.random() * (cells.length));
        y = Math.floor(Math.random() * (cells.length - shipLength + 1));
      } else {
        x = Math.floor(Math.random() * (cells.length - shipLength + 1));
        y = Math.floor(Math.random() * (cells.length));
      }
      console.log(`finding position for ship with ${shipLength}(${horizontal}) starting from ${x}, ${y}`);
      for(let i = 0; i< shipLength ;i++){
        currentTestPositions.push(cells[x][y+i]);
      }
      console.log(currentTestPositions);
    } while (!currentTestPositions.every((cell) => cell === 0));

    return [x, y];
  }
  function makeShip(shipLength){
    var randomNumber = Math.floor(Math.random() * 2);
    let position = null;
    let way = '';
    if(randomNumber === 1) {
      way = 'H';
    } else {
      way = 'V';
    }
    if (way === 'H') {
      position = findPosition(shipLength, true); // 2nd argument is for Horizontal or Vertical, true === horizontal
    }else{
      position = findPosition(shipLength, false);
    }
    for(let i = 0; i< shipLength ;i++){
      cells[position[0]][position[1]+i] = 1;
      if (way === 'H') {
        $(`#cell_${x}_${y+i}`).data('ship', 'true');
        if(DEV)
          $(`#cell_${x}_${y+i}`).css('background', 'red');
      } else{
        $(`#cell_${x+i}_${y}`).data('ship', 'true');
        if(DEV)
          $(`#cell_${x+i}_${y}`).css('background', 'red');
      }
    }
  }
  $(shipsLengths).each(function(i, shipsLengths){
    makeShip(shipsLengths);
  });

  $('.grid-item').on('click', function() {
    clickCount++;
    if(clickCount >= clickCountMax){
      alert('YOU Really are bad');
      location.reload();
      // $( "" ).load( "ajax/test.html #container" );
      clickCount= 0;
      // $('grid-item'.css('background' , 'orange'));
      return;
    }
    if($(this).data('ship') === 'true') {
      $(this).css('background', 'yellow');
      score += 5 ;
      $('p.Score').text('Score : ').append(score);
    } else {
      $(this).css('background', 'black');
    }
  });

  // function gg(){
  //   if(score === shipsLengths.reduce)
  //     generatedBoard = new Board(8,2);
  // }
  // reset();

  // make so the click max is the total of ship lenth + variables
  // add the next level through adding a different grid after reload
});
