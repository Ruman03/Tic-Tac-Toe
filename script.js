
//Music
let musicPlay = true;
let music = new Audio('music.mp3');
music.volume = 0.3;
let ting = new Audio('ting.mp3');
let gameOver = new Audio('gameover.mp3');


// Scores
let playerXScore = 0;
let playerOScore = 0;

//Gif
const gif = document.querySelector('.gif');

//Node List of Boxes
const boxes = document.querySelectorAll('.box');
// Turn
let turn = 'X';
// Turn Info
const turnInfo = document.querySelector('.turn');
// Box Text Node List
const boxText = document.querySelectorAll('.boxText')
//Line Display
const line = document.querySelector('.line');

// Reset Button
const reset = document.getElementById('reset');

// Track Game 
let gameActive=true;


// Change Turn

function changeTurn(){
    return (turn==='X')? 'O' : 'X';
}

// Change Turn Info

function changeTurnInfo(){
    turnInfo.textContent = `Turn for ${turn}`;
}

// Wining Logic Array

const winLogic = [
    [0,1,2,46,0,0],
    [3,4,5,141,0,0],
    [6,7,8,237,0,0],
    [0,3,6,0,49,90],
    [1,4,7,0,145,90],
    [2,5,8,0,243,90],
    [0,4,8,39,43,45],
    [6,4,2,51,241,135],
];

// Play with Computer
const playWithComputer = document.getElementById('computer');

// Computer Turn Function
const playerIndex = [];
const computerIndex = [];
let randomIndex;
function computerTurn(index) {
    playerIndex.push(index);
    if(playerIndex.length!==5){

        do {
            randomIndex = Math.floor(Math.random() * 9);
        } while (playerIndex.includes(randomIndex) || computerIndex.includes(randomIndex));
    }
    
    computerIndex.push(randomIndex);

    console.log(`Player Index after Loop`,playerIndex);
    console.log(`Computer Index after Loop`,computerIndex);

    if (turn === 'O' && boxText[randomIndex].textContent === '') {
        boxText[randomIndex].textContent = turn;
        ting.play();
        
        // Check if the computer won after making a move
        let isWon = winGame();
        if (isWon) {
            turnInfo.textContent = `${turn} Won!`;
            gameActive = false;
        } else {
            turn = changeTurn();
            changeTurnInfo();
        }
    }
}


// Win Function
function winGame(){
   let Won;
   winLogic.forEach(c=>{
    if(boxText[c[0]].textContent===turn && boxText[c[1]].textContent===turn && boxText[c[2]].textContent=== turn && boxText[c[0]].textContent!=='' ){
        
        Won = true;
        console.log(`Game won: ${Won}`);
        if(turn==='X'){
            playerXScore++;
            document.getElementById('X').textContent = playerXScore;
        }
        else{
            playerOScore++;
            document.getElementById('O').textContent = playerOScore;
        }

        gameOver.play();
       gif.style.display='block';

        console.log(c);
        line.style.display='block';
        line.style.top = `${c[3]}px`
        line.style.left = `${c[4]}px`
        line.style.transform = `rotate(${c[5]}deg)`
    }
})
return Won;
}

//Draw GAME
function drawGame(){
    let draw = true;
    boxText.forEach(box=>{
        if(box.textContent===''){
            draw = false;
        }
    })
    if(draw){
        turnInfo.textContent = `It's a Draw!`;
        gameActive = false;
    }
    return draw;
}

// Event Listner to Boxes

boxes.forEach((box, index)=>{
    box.addEventListener('click', ()=>{
        
        if(gameActive && box.firstChild.textContent===''){
            
            if(playWithComputer.checked && turn==='X'){
                box.firstChild.textContent=turn;
            }
            else{
                box.firstChild.textContent=turn;
               
            }
            
            if(musicPlay){
                music.play();
                musicPlay = true;
            }

            ting.play();
            console.log(`Turn before the win function: ${turn}`);
            let isWon = winGame();
            if(isWon){
                turnInfo.textContent=`${turn} Won!`;
                gameActive=false;
            }
            else{
                turn = changeTurn();
                changeTurnInfo();
                
            }
            console.log(`Turn after the win function and before computer function: ${turn}`);
            
            if(playWithComputer.checked){
                setTimeout(computerTurn(index),1000);
                console.log(`Turn after the computer function: ${turn}`);
            }
            
            drawGame();
        }
    })
})




reset.addEventListener('click', ()=>{
    boxText.forEach(box=>{
        box.textContent='';
        turn='X';
        changeTurnInfo();
        gameActive=true;
        line.style.display='none';
        gif.style.display='none';
        playerIndex.length = 0;
        computerIndex.length = 0;
    })
});


// Play Music




function musicOff(){
    if(musicPlay){
        music.pause();
        musicPlay = false;
    }
    else{
        music.play();
        musicPlay = true;
    }
    music.loop = true;
    document.querySelector('.cross').classList.toggle('crossActive');
}

