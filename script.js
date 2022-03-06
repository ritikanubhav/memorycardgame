let hasFlipped=false;
let firstCard,secondCard;
let lockboard=false;
const cards=document.querySelectorAll('.card');
let attempt=5,score=0;
const attemptEl=document.querySelector('#attemptel');
const messageEl=document.querySelector('#messageel');
const newGameBtn=document.querySelector('#newgamebtn');
const gameEl=document.querySelector('#gameel');
cards.forEach(card => card.addEventListener('click',flipcard));
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
        messageEl.textContent ="YOU WIN !!!🥳😎🥳";
        return;
    }  
    messageEl.textContent="GAME OVER!";
    attemptEl.innerHTML =`<p>BETTTER LUCK! NEXT TIME</p>`;
}
(function shuffle(){
    cards.forEach(card=>{
        let random=Math.floor(Math.random()*12);
        card.style.order=random;
    });
})();