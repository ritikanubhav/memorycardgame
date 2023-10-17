let hasFlipped=false;
let firstCard,secondCard;
let lockboard=false;
const cards=document.querySelectorAll('.card');
const front=document.querySelectorAll('.front');
const fronts=Array.from(front);
const backs=document.querySelectorAll('.back');
const attemptEl=document.querySelector('#attemptel');
const levels=document.querySelectorAll('.level');
const themes=document.querySelectorAll('.theme');
const newGameBtn=document.querySelector('#newgamebtn');
const newGameMenu=document.querySelector('#newgamemenu');
const gameEl=document.querySelector('#gameel');
const msgImg=document.querySelector('#msgimg');
const celebrateImg=document.querySelector('#celebrate');
const menuEl=document.querySelector('#menuel');
const menuList=document.querySelector('#menulist');
const loadEl=document.querySelector('#loaderEl');
let level=+(localStorage.getItem('level')),score=0,theme=+(localStorage.getItem('theme'));
let attempt=6-level;
const images=[
    
    ["images/pokemons/p1.jpg",
     "images/pokemons/p2.webp",
     "images/pokemons/p3.jpg",
     "images/pokemons/p4.jpg",
     "images/pokemons/p5.jpg",
     "images/pokemons/p6.jpg",
     "images/pokemons/p7.png",
     "images/pokemons/p8.png",
     "images/pokemons/p9.webp",
     "images/pokemons/p10.jpg",
     "images/pokemons/pokemoncover.jpg"],
    // next  theme image set 
    ["images/hero/antman.jpg",
     "images/hero/aquaman.jpg",
     "images/hero/blackwidow.jpg",
     "images/hero/bpanther.jpg",
     "images/hero/drstrange.jpg",
     "images/hero/hulk.jpg",
     "images/hero/ironman.webp",
     "images/hero/spiderman.jpg",
     "images/hero/superman.jpeg",
     "images/hero/thor.jpg",
     "images/hero/captainamerica.png",
     "images/hero/wonderwoman.jpg",
     "images/hero/flash.jpg",
     "images/hero/krish.jpg",
     "images/hero/herocover.jpg"],
     // next  theme image set 
     ["images/actress/disha.jpg",
     "images/actress/katrina.jpg",
     "images/actress/kiara.jpg",
     "images/actress/tara.jpeg",
     "images/actress/tamannah.jpg",
     "images/actress/nora.jpg",
     "images/actress/pooja.jpg",
     "images/actress/rashmika.jpg",
     "images/actress/mouni.jpg",
     "images/actress/jacquie.jpg",
     "images/actress/alia.jpeg",
     "images/actress/shraddha.jpg",
     "images/actress/mrunal.jpg",
     "images/actress/cover.jpg"],
 ];
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
    menuEl.innerText="menu";
    menuList.style= `transform:translate(-200%)`;
    menuList.style.transition='all .5s linear';
    lockboard=false;
}
function openMenu(){
    lockboard=true;
    menuOpen=true;
    menuEl.innerText="close";
    menuList.style= `transform:translate(0%)`;
    menuList.style.transition='all .5s';
}

// if menu is open then click at any empty space to close the menu as well as you can click cross button-->

document.addEventListener('click', event => {
    // If the clicked element is not a child of #menulist and is not itself #menuEl..
    if (menuOpen===true && event.target.id != 'menuel'&&event.target.closest('#menulist') === null) {
        closeMenu();
        console.log(menuOpen,"fired");
    }
},true);

// below function is using local storage to remember what level and theme you last played 
// and set the new game to that level and theme on opening the app

function themeLevelSet(){
    localStorage.setItem("theme", theme.toString());
    localStorage.setItem("level", level.toString());
    // level set 
    for(let i=0; i<levels.length; i++) {
        if(i===level) {
            document.querySelector(`#level${i+1}`).style.display = 'inline-block';
            let hearts=``;
            attempt=6-level;
            for(let j=0; j<attempt; j++) {
                hearts+=`<i class="fa-solid fa-heart" id="heart${j+1}"></i>`
            }   
            attemptEl.innerHTML=hearts;
        }
        else
            document.querySelector(`#level${i+1}`).style.display = 'none';
    }
    // theme set
    for(let i=0; i<themes.length; i++) {
        if(i===theme) {
            theme=i;
            document.querySelector(`#theme${i+1}`).style.display ='inline-block';
        }
        else
            document.querySelector(`#theme${i+1}`).style.display ='none';
    }
}
// images set and loading-->
function randomImageSet(){
    let arr= [];
    let imgInGame =[];
    themeLevelSet();
    while(arr.length < 6){
        let r =Math.floor(Math.random() * (images[theme].length-1));//random
        if(arr.indexOf(r) === -1) 
        {
            arr.push(r);
            imgInGame.push(images[theme][r]);
        }
    }
    backs.forEach(back=>{
        back.src=images[theme][images[theme].length-1];});
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
resetBoard();

function newGame()
{
    loadEl.style.display='inline-block';
    resetBoard();
    cards.forEach(card => card.addEventListener('click',flipcard));
    cards.forEach(card => card.classList.remove('flip'));
    setTimeout(shuffle,700);
    setTimeout(function() {
        loadEl.style.display='none';
    },1000)
}

levels.forEach(level=> level.addEventListener('click',levelSetup));

function levelSetup() {
    for(let i=0; i<levels.length; i++) {
        if(levels[i]===this) {
            document.querySelector(`#level${i+1}`).style.display = 'inline-block';
            let attempt=6-i;
            level=i;
            // themeLevelSet();
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
            themeLevelSet();
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
        attemptEl.innerHTML =`<p class="animate__animated animate__rubberBand">YOU WIN !!!</p>`;
        msgImg.src='images/gif/happy.gif';
        celebrateImg.src='images/gif/celebrate.gif';
        celebrateImg.style.display="initial";
        return;
    }  
    attemptEl.innerHTML =`<p class="animate__animated animate__zoomInDown">GAME OVER!</p>`;
    msgImg.src='images/gif/msgimg.gif';
}

newGameBtn.addEventListener('click',()=>{
    window.location.reload();
});
newGameMenu.addEventListener('click',()=>{
    window.location.reload();
});

// loader disappear after loading is complete
window.onload = () => {
    loadEl.style.display='none';
  };