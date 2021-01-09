const ver = 3;
const hor =4;
let colors = ['red', 'red', 'orange', 'orange', 'green', 'green', 'yellow', 'yellow', 'white', 'white', 'pink', 'pink'];
let cardColor=[];
let copyColor = colors.slice(); 
let clickCard =[];
let pairCard = [];
let flag =false;
let starTime;
console.log(colors.length);

function shuffle(){
    for(let i=0; copyColor.length>0; i++){

        cardColor = cardColor.concat(copyColor.splice(Math.floor(Math.random()*copyColor.length),1));
    } 
    console.log(cardColor);
}
function cardPlay(ver,hor){
for(let i=0; i<ver*hor; i++){
    const card = document.createElement('div');
    card.className='card';
    const cardInner = document.createElement('div');
    cardInner.className='card-inner';
    const cardFront = document.createElement('div');;
    cardFront.className='card-front';
    const cardBack = document.createElement('div');;
    cardBack.className='card-back';
    cardBack.style.backgroundColor=cardColor[i];
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    document.body.appendChild(card);
    (function (c){
        card.addEventListener('click',()=>{
            if(card.classList.contains('flipped')){
                flag=false;
            }else{
                flag=true;
            }
            if(flag && !pairCard.includes(c)){
                card.classList.toggle('flipped');
                clickCard.push(c);
                if(clickCard.length===2){
                    console.log('a')
                    if(clickCard[0].querySelector('.card-back').style.backgroundColor===clickCard[1].querySelector('.card-back').style.backgroundColor){
                        pairCard.push(clickCard[0]);
                            pairCard.push(clickCard[1]);
                            clickCard=[];
                        if(pairCard.length===12){
                            setTimeout(()=>{
                                let endTime = new Date();
                                alert('축하합니다! 성공! ' + (endTime - startTime) / 1000 + '초 걸렸습니다.');
                                document.querySelector('#wrapper').innerHTML='';
                                pairCard=[];
                                cardColor=[];
                                copyColor = colors.slice(); 
                                startTime=null;
                                shuffle();
                                cardPlay(ver,hor);
                            },1000)
                        }
                    }else{
                        flag=false;
                        setTimeout(()=>{
                            clickCard[0].classList.remove('flipped');
                            clickCard[1].classList.remove('flipped');
                            clickCard=[];
                            flag=true
                        },1000)
                        
                    } 
                }
            }
        
            
        });
    })(card);
        document.querySelector('#wrapper').appendChild(card);
    }
    document.querySelectorAll('.card').forEach((card,index)=>{
        setTimeout(()=>{
            card.classList.add('flipped');
        },1000 +100*index)
    });

    document.querySelectorAll('.card').forEach((card,index)=>{
        setTimeout(()=>{
            card.classList.remove('flipped');
            flag=true;
            startTime =new Date();
        },5000)
    })

        
}




shuffle();

cardPlay(ver,hor)
