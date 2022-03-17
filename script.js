let hasFlipped=false;
let firstCard,secondCard;
let lockboard=false;
const cards=document.querySelectorAll('.card');
const front=document.querySelectorAll('.front');
const fronts=Array.from(front);
const backs=document.querySelectorAll('.back');
let attempt=5,score=0,theme=0;
const attemptEl=document.querySelector('#attemptel');
const levels=document.querySelectorAll('.level');
const themes=document.querySelectorAll('.theme');
const newGameBtn=document.querySelector('#newgamebtn');
const newGameMenu=document.querySelector('#newgamemenu');
const gameEl=document.querySelector('#gameel');
const msgImg=document.querySelector('#msgimg');
const menuEl=document.querySelector('#menuel');
const menuList=document.querySelector('#menulist');

let menuOpen=false;
menuEl.addEventListener('click', function()
{
    if(menuOpen===false)
        openMenu();
    else
        closeMenu();
})
function closeMenu(){
    menuOpen=false;
    menuList.style= `transform:translate(-200%)`;
    menuList.style.transition='all .5s linear';
}
function openMenu(){
    menuOpen=true;
    menuList.style= `transform:translate(0%)`;
    menuList.style.transition='all .5s';
}
const images=[
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
    "images/cover.jpg", 
    // next theme image set
    "images/antman.jpg",
    "images/batman.jpg",
    "images/blackwidow.jpg",
    "images/bpanther.jpg",
    "images/drstrange.jpg",
    "images/hulk.jpg",
    "images/ironman.jpg",
    "images/spiderman.jpg",
    "images/superman.jpg",
    "images/thor.jpg",
    "images/captainamerica.png",
    "images/wonderwoman.jpg",
    "images/captainamerica.png",
    "images/herocover.jpg",
    // next  theme image set 
    "images/antman.jpg",
    "images/batman.jpg",
    "images/blackwidow.jpg",
    "images/bpanther.jpg",
    "images/drstrange.jpg",
    "images/hulk.jpg",
    "images/ironman.jpg",
    "images/spiderman.jpg",
    "images/superman.jpg",
    "images/thor.jpg",
    "images/captainamerica.png",
    "images/wonderwoman.jpg",
    "images/captainamerica.png",
    "images/herocover.jpg"
];

function randomImageSet(){
    let arr= [];
    let imgInGame =[];
    while(arr.length < 6){
        let r = (Math.floor(Math.random() * 13))+(14*theme);
        if(arr.indexOf(r) === -1) 
        {
            arr.push(r);
            imgInGame.push(images[r]);
        }
    }
    backs.forEach(back=>{
        back.src=images[13+(14*theme)];       
    });
    for(let i=0; i<6;i++)
    {
        fronts[i].src=imgInGame[i];
        fronts[11-i].src=imgInGame[i];
    }
}

function shuffle(){
    randomImageSet();
    cards.forEach(card=>{
        let random=Math.floor(Math.random()*12);
        card.style.order=random;
    });
}
shuffle();

function resetBoard(){
    [firstCard,secondCard]=[null,null];
    [hasFlipped,lockboard]=[false,false];
    if(attempt===0||score===6)
    {
        lockboard=true;
        setTimeout(messagePass,1000);
    }
}


function newGame()
{
    resetBoard();
    cards.forEach(card => card.addEventListener('click',flipcard));
    cards.forEach(card => card.classList.remove('flip'));
    setTimeout(shuffle,700);
}


levels.forEach(level=> level.addEventListener('click',levelSetup));

function levelSetup() {
    for(let i=0; i<levels.length; i++) {
        if(levels[i]===this) {
            document.querySelector(`#level${i+1}`).style.display = 'inline-block';
            attempt=6-i;
            let hearts=``;
            for(let j=0; j<attempt; j++) {
                hearts+=`<i class="fa-solid fa-heart" id="heart${j+1}"></i>`
            }   
            attemptEl.innerHTML=hearts;
        }
        else
            document.querySelector(`#level${i+1}`).style.display = 'none';
    }
    newGame();
}


themes.forEach(theme=> theme.addEventListener('click',themeSetup));

function themeSetup() {
    for(let i=0; i<themes.length; i++) {
        if(themes[i]===this) {
            theme=i;
            document.querySelector(`#theme${i+1}`).style.display ='inline-block';
        }
        else
            document.querySelector(`#theme${i+1}`).style.display ='none';
    }
    newGame();
}


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
        heart.style.animation="heartattack 1s forwards";
        resetBoard();
    },700);
}

function messagePass(){
    gameEl.style.opacity=".2";
    newGameBtn.style.display='initial';
    if(score===6) 
    {
        attemptEl.innerHTML =`<p>YOU WIN !!!`;
        msgImg.src='images/gif/happy.gif';
        return;
    }  
    attemptEl.innerHTML =`<p>GAME OVER!</p>`;
    msgImg.src='images/gif/msgimg.gif';
}

newGameBtn.addEventListener('click',()=>{
    window.location.reload();
});
newGameMenu.addEventListener('click',()=>{
    window.location.reload();
});