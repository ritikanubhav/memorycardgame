let hasFlipped=false;
let firstCard,secondCard;
let lockboard=false;
const cards=document.querySelectorAll('.card');
const front=document.querySelectorAll('.front');
const fronts=Array.from(front);
const backs=document.querySelectorAll('.back');
let attempt=5,score=0;
const attemptEl=document.querySelector('#attemptel');
const newGameBtn=document.querySelector('#newgamebtn');
const gameEl=document.querySelector('#gameel');
const msgImg=document.querySelector('#msgimg');
cards.forEach(card => card.addEventListener('click',flipcard));
const imagesForActress=[
    "images/sunnyleone.jpg",
    "images/disha.jpg",
    "images/katrina.jpg",
    "images/kiara.jpg",
    "images/kiara2.jpg",
    "images/tamannah.jpg",
    "images/nora1.jpg",
    "images/nora2.jpg",
    "images/rashmika.jpg",
    "images/rashmika2.jpg",
    "images/jacquie1.jpg",
    "images/jacquie2.jpg",
    "images/shraddha.jpg",
    "images/cover.jpg"
];

let imgInGame =[];
(function randomImageSet(){
    let arr= [];
    while(arr.length < 6){
        let r = Math.floor(Math.random() * 13);
        if(arr.indexOf(r) === -1) 
        {
            arr.push(r);
            imgInGame.push(imagesForActress[r]);
        }
    }
    backs.forEach(back=>{
        back.src=imagesForActress[13];        
    });
    for(let i=0; i<6;i++)
    {
        fronts[i].src=imgInGame[i];
        fronts[11-i].src=imgInGame[i];
    }
})();

(function shuffle(){
    cards.forEach(card=>{
        let random=Math.floor(Math.random()*12);
        card.style.order=random;
    });
})();

function flipcard (){
    if(lockboard)return;
    if(this===firstCard)return;
    this.classList.add('flip');
    // first click
    if(!hasFlipped)
    {
        hasFlipped=true;
        firstCard=this;
    }
    // second click
    else
    {   
        hasFlipped=false;
        secondCard=this;
        // matching
        checkMatch();
    }
}
function checkMatch()
{
    let hasmatch=firstCard.dataset.framework===secondCard.dataset.framework;
    hasmatch?disableCard():unflipCard();
}
function disableCard()
{
    firstCard.removeEventListener('click',flipcard);
    secondCard.removeEventListener('click',flipcard);
    score++;
    resetBoard();
}
function unflipCard()
{
    lockboard=true;
    let heart=document.querySelector(`#heart${attempt}`);
    attempt--;
    setTimeout(()=>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        heart.style= `transform:scale(0) rotate(.5turn)`;
        heart.style.transition='all .5s';
        resetBoard();
    },700);
}
function resetBoard(){
    [firstCard,secondCard]=[null,null];
    [hasFlipped,lockboard]=[false,false];
    if(attempt===0||score===6)
    {
        lockboard=true;
        setTimeout(messagePass,500);
    }
}
function messagePass(){
    gameEl.style.opacity=".2";
    newGameBtn.style.display='initial';
    if(score===6) 
    {
        attemptEl.innerHTML =`<p>YOU WIN !!!🥳😎🥳`;
        msgImg.src='images/gif/happy.gif';
        return;
    }  
    attemptEl.innerHTML =`<p>GAME OVER!</p>`;
    msgImg.src='images/gif/msgimg.gif';
}
newGameBtn.addEventListener('click',()=>{
    window.location.reload();
});