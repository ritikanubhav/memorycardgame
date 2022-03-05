let hasFlipped=false;
let firstCard,secondCard;
let lockboard=false;
const cards=document.querySelectorAll('.card');
let attempt=5,score=0;
const attemptEL=document.querySelector('#attemptel');
const messageEl=document.querySelector('#messageel');
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
        heart.style.visibility = 'hidden';
        resetBoard();
    },800);
}
function resetBoard(){
    [firstCard,secondCard]=[null,null];
    [hasFlipped,lockboard]=[false,false];
    if(attempt===0||score===6)
    {
        lockboard=true;
        messagePass();
    }
}
function messagePass(){
    if(score===6) 
    {
        messageEl.textContent ="YOU WIN !!!🥳😎🥳";
        gameEl.style.opacity=".3";
        return;
    }  
    if(attempt===0)
    {
        messageEl.textContent="GAME OVER!";
        messageEl.style.transform="translate(-50%,-50%) rotate(-40deg)";
        gameEl.style.opacity=".2";
    }
}
(function shuffle(){
    cards.forEach(card=>{
        let random=Math.floor(Math.random()*12);
        card.style.order=random;
    });
})();