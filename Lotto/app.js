const form=document.querySelector('.form');
const input= document.querySelector('.input');
const btn = document.querySelector('button');
const info = document.querySelector('.info');
const rank = document.querySelector('.rank');
const dpLotto = document.querySelector('.lottoNumber');
const dpBonus = document.querySelector('.bonusNumber');

const userNumber = [];
let count;


const lottoArray = Array(45).fill().map(function(value,index){
    return index+1;
});
console.log(lottoArray);

let shuffle =[];
while(lottoArray.length>0){
    let randomArray = lottoArray.splice(Math.floor(Math.random()*lottoArray.length),1)[0]
    shuffle.push(randomArray);
  }
  console.log(shuffle)

  let bonus = shuffle[shuffle.length-1];
  ballNumber = shuffle.slice(0,6).sort(function(p,c){
      return p-c;
  });
  console.log(ballNumber, bonus);

  const result = document.getElementById('result');

  function play(number,dpresult){
    const ball = document.createElement('div')
    ball.textContent = number;
    ball.style.display='inline-block';
    ball.style.border ='1px solid black';
    ball.style.borderRadius= '40px';
    ball.style.width= '80px';
    ball.style.height = '80px';
    ball.style.textAlign = 'center';
    ball.style.marginRight='10px';
    ball.style.fontSize='40px'
    let color;
    if(number<=10){
        color='red'
    }
    else if(number<=20){
        color ='orange';
    }
    else if(number<=30){
        color='yellow'
    }
    else if(number<=40){
        color='blue'
    }else{
        color='green'
    }
    ball.style.background=color;
    dpresult.appendChild(ball);
  }
function start(e){
  setTimeout(function(){
    play(ballNumber[0],result);
  }, 1000);
  setTimeout(function(){
    play(ballNumber[1],result)
  }, 2000)
  setTimeout(function(){
    play(ballNumber[2],result)
  },3000)
  setTimeout(function(){
    play(ballNumber[3],result)
  },4000)
  setTimeout(function(){
    play(ballNumber[4],result)
  },5000)
  setTimeout(function(){
    play(ballNumber[5],result)
  },6000)
  setTimeout(function(){
    let bonusResult = document.querySelector('.bonus');
    dpBonus.textContent='보너스';
    play(bonus,bonusResult)
  },7000);
 
}

function myNumber(e){
    e.preventDefault()
    const number = Number(input.value);
    userNumber.push(number);
    userNumber.sort(function(p,c){
        return p-c;
    })
    input.focus();
    input.value='';
    if(userNumber.length===6){
      dpLotto.textContent='결과번호';
        start();
        compareNumber();
        setTimeout(function(){
          rank.textContent= count + '개 맞았습니다.';
        },8000);
        info.textContent='내 번호는' + userNumber +'입니다.'
    }
    console.log(userNumber);
}

function compareNumber(){
     count =0;
    for(i=0;i<userNumber.length; i++){
        if(ballNumber.indexOf(userNumber[i])>-1||userNumber[i]===bonus){
            count++;
        }
    }
    
}



btn.addEventListener('click',myNumber);

