
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
console.log(boxes);
// Turn
let turn = 'X';
// Turn Info
const turnInfo = document.querySelector('.turn');
// Box Text Node List
const boxText = document.querySelectorAll('.boxText')
console.log(boxText);
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

// Win Function
function winGame(){
   let Won;
   winLogic.forEach(c=>{
    if(boxText[c[0]].textContent===turn && boxText[c[1]].textContent===turn && boxText[c[2]].textContent=== turn && boxText[c[0]].textContent!=='' ){
        
        Won = true;
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

// Event Listner to Boxes

boxes.forEach(box=>{
    box.addEventListener('click', ()=>{
        
        if(gameActive && box.firstChild.textContent===''){
            box.firstChild.textContent=turn;
            if(musicPlay){
                music.play();
                musicPlay = true;
            }
            ting.play();
            let isWon = winGame();
            console.log(isWon);
            if(isWon){
                turnInfo.textContent=`${turn} Won!`;
                gameActive=false;
            }
            else{
                turn = changeTurn();
                changeTurnInfo();
            }
            
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