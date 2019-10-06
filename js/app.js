

 let arr = document.querySelectorAll('.card');
 let moves = 0; // number of moves player has done
 let firstCard;
 let secondCard;
 let start = new Date().getTime(); // timer begins
 let matched = 0; // how many matched cards does the player have
 let numberOfStars = 3;


 // shufle the cards
function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    
    let temporaryValue = document.createElement('div');
    while (0 !== currentIndex) {
  
      
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue.innerHTML = array[currentIndex].innerHTML;
      array[currentIndex].innerHTML = array[randomIndex].innerHTML;
      array[randomIndex].innerHTML = temporaryValue.innerHTML;
    }
  }


  // this function checks if 2 cards are matched or not
  function areMatched(){
    if(firstCard.innerHTML==secondCard.innerHTML){
        firstCard.classList.add('match');
        secondCard.classList.add('match');
        matched++;
        if(matched == 8)
        congratulation();
    }
    else{
        //close the Cards
        firstCard.classList.remove('show','open');
        secondCard.classList.remove('show','open');
        firstCard.classList.add('closed');
        secondCard.classList.add('closed');
    }

    firstCard = null;
    secondCard = null;
}



function respondToTheClick(evt){

    //here we check if the evt is a card and it's not matched and and only 2 cards can be opend in a time also the card can't be clicked twice
    if(evt.target.classList.contains('card') && !evt.target.classList.contains('match') && (firstCard==null || secondCard==null) && evt.target !=firstCard){
    
    evt.target.classList.remove('closed');
    evt.target.classList.add('open');
    evt.target.classList.add('show');
    if(firstCard == null){
        firstCard = evt.target;
    }
    else{
    secondCard = evt.target;
    moves++;
    document.querySelector('.moves').textContent = moves;
    setTimeout(areMatched,600);

    if(moves==15 || moves == 25)
        removeStar();
    }
    
    }
    
    else
    //if the user want pressed the restart button or the play again button
    if(evt.target.classList.contains('fa-repeat') ||evt.target.textContent == 'Play Again'){
        location.reload(true);
    }

}

function removeStar(){
        document.querySelector('.stars').querySelector('li').remove();
        numberOfStars--;
}

// this method is used to count the time 

//https://www.w3schools.com/howto/howto_js_countdown.asp
function counter(){

    let end = new Date().getTime();

    let difference = end-start;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    document.querySelector('.timer').innerHTML = `${hours}: ${minutes}: ${seconds}`;
}

// wining message appears
function congratulation(){
    clearInterval(intervaID);
    document.querySelector('.container').style = 'display: none;';
    let el = document.createElement('div');
    let time =document.querySelector(".timer").textContent;
    el.innerHTML = `<h1>Congratulation! you have won!</h1> <p>with ${moves} moves and ${numberOfStars} Stars</p><p> you took ${time} </p> <p>whooooo!</p> <button>Play Again</button>`;
    el.classList.add('congratulation');
    document.body.appendChild(el);
}

//*********************************running begins here**************************************

shuffle(arr);
// update every 1s
const intervaID = setInterval(counter,1000);
document.body.addEventListener('click',respondToTheClick);

