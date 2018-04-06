var cells = [];
//
// window.onload = function () {
//   document.getElementsByTagName('.close').onclick = function () {
//     document.getElementById('myModal').style.display = 'none';
//   };
// };

$(function(){
//---------------VARIABLES-----------------------------------------------------
  const shipsLengths = [3,3,3,3];
  var score = 0;
  // var internalScore = 0;
  let x = null;
  let y = null;
  let clickCount = 0;
  const gg = (adding, currentValue) => adding + currentValue;
  const clickCountMax = 25;
  const DEV = true;
  //----------------BOARD LOAD--------------------------------------------------
  Board(8,8);
  //---------------BOARD FUNCTION-----------------------------------------------
  function Board(width, height){
    if(cells.length > 0){
      cells = [];
    }
    for(let i = 0; i < width; i++){
      cells.push([]);
      for(let j = 0; j < height; j++){
        cells[i].push(0);
        $(`<div class="grid-item" id="cell_${i}_${j}" data-ship='${null}' data-x='${i}' data-y='${j}'>`).appendTo('.grid-container');
      }
    }
  }
  //---------------HORIZ/VERTIC FINDER------------------------------------------
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
        const position = horizontal ? cells[x][y+i] : cells[x+i][y];
        currentTestPositions.push(position);
      }
      console.log(currentTestPositions);
    } while (!currentTestPositions.every((cell) => cell === 0));
    return [x, y];
  }
  //------------ POSITION MAKER -----------------------------------------------
  function makeShip(shipLength){
    var randomNumber = Math.floor(Math.random() * 2);
    let position = null;
    const way = randomNumber === 1 ? 'H': 'V';
    if (way === 'H') {
      position = findPosition(shipLength, true); // 2nd argument is for Horizontal or Vertical, true === horizontal
    }else{
      position = findPosition(shipLength, false);
    }
    for(let i = 0; i< shipLength ;i++){

      if (way === 'H') {
        cells[position[0]][position[1]+i] = 1;
        $(`#cell_${x}_${y+i}`).data('ship', 'true');
        if(DEV)
          $(`#cell_${x}_${y+i}`).css('background', 'red');

      } else{
        cells[position[0]+i][position[1]] = 1;
        $(`#cell_${x+i}_${y}`).data('ship', 'true');
        if(DEV)
          $(`#cell_${x+i}_${y}`).css('background', 'red');
      }
    }
  }
  //------------------CALL TO MAKE THE SHIPS-----------------------------------
  $(shipsLengths).each(function(i, shipLength){
    makeShip(shipLength);
  });
  //----//-------//------CLICK LISTENER---//------//----------//--------//-----
  $('.grid-container').on('click','.grid-item',triggerAll);
  //--------------------ATTEMPT------------------------------------------------
  function triggerAll(){
    checkBox.call(this);
    clickCounter();
    reset();
  }
  //--------------------ATTEMP REFACTOR/CLEANER FUNCTIONS----------------------
  function checkBox(){
    if($(this).data('ship') === 'true') {
      console.log('checkBox i am here');
      $(this).css('background', 'yellow');
      score += 1 ;
      $('p.Score').text('Score : ').append(score);
    } else {
      $(this).css('background', 'black');
      // score -= 1;
    }
  }
  function clickCounter() {
    clickCount++;
    console.log('clickCounter clicked!!!');
    if(clickCount >= clickCountMax){
      alert('YOU really are bad');
      clickCount= 0;
      $( '.grid-container').empty();
      Board(8,8);
      $(shipsLengths).each(function(i, shipLength){
        makeShip(shipLength);
      });
    }
  }
  function reset(){
    if ((score % shipsLengths.reduce(gg)) === 0){
      console.log('reset is here');
      $( '.grid-container').empty();
      Board(8,8);
      $(shipsLengths).each(function(i, shipLength){
        makeShip(shipLength);
        clickCount = 0;
      });
    }
  }
});
