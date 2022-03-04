let hasFlipped=false;
let firstCard,secondCard;
let lockboard=false;
const cards=document.querySelectorAll('.card');
let attempt=10,score=0;
const attemptEL=document.querySelector('#attemptel');
cards.forEach(card => card.addEventListener('click',flipcard));
const messageEl=document.querySelector('#messageel');
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
    setTimeout(()=>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    },800);
    
}
function resetBoard(){
    [firstCard,secondCard]=[null,null];
    [hasFlipped,lockboard]=[false,false];
    attempt--;
    if(attempt===0||score===6)
    {
        lockboard=true;
        messagePass();
        messageEl.style.visibility="visible";
    }
    attemptEL.innerText =`ATTEMPTS: 0${ attempt}`;
}
function messagePass(){
    if(score===6)   
        messageEl.textContent ="YOU WIN 🥳😎🥳";
}

(function shuffle(){
    cards.forEach(card=>{
        let random=Math.floor(Math.random()*12);
        card.style.order=random;
    });
})();