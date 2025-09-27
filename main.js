const emojis=['🐬', '🦀', '🦖','🦋','🕷️','🐌','🐞','🐠'];
let canFlip=true;
let flippedcard=[];
let moves=0;
function createGame(){
    const gameGrid=document.querySelector('.game-grid');
    gameGrid.innerHTML='';
    const gameEmojis=[...emojis,...emojis].sort(()=>Math.random()-0.5);
    gameEmojis.forEach(emoji=>{
        const card=document.createElement('div');
        card.className='card';
        card.innerHTML=`<div class="card-inner">
                           <div class="front"></div>
                           <div class="back">${emoji}</div>
                        </div>`
        card.addEventListener('click',()=>flipcard(card));
        gameGrid.appendChild(card);

    })
}
function flipcard(card){
    if(!canFlip||card.classList.contains('flipped') ||flippedcard.length>=2) return;
    
card.classList.add('flipped');
flippedcard.push(card);

if(flippedcard.length===2){
    canFlip=false;
    moves++;
    document.querySelector('#moves').textContent=moves;
}
checkMatch();
}
function checkMatch(){
    const [card1,card2]=flippedcard;
    const emoji1=card1.querySelector('.back').textContent;
    const emoji2=card2.querySelector('.back').textContent;

    if(emoji1===emoji2){
        flippedcard=[];
        canFlip=true;
        checkWin();
    }else{
     setTimeout(()=>{
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        flippedcard=[];
        canFlip=true;
     },800);
    }
}
function checkWin(){
    const allCards=document.querySelectorAll('.card');
    const allFlipped=[...allCards].every(card=>card.classList.contains('flipped'));
    if(allFlipped){
    setTimeout(()=>{
        alert(`Congrats!YOU WON with ${moves} moves`)
    },300);
    }
}
function RestartGame(){
    flippedcard=[];
    moves=0;
    document.getElementById('moves').textContent=moves;
    createGame();
}
createGame();