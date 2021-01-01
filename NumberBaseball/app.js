const result = document.querySelector(".result");
const form = document.querySelector(".form");
const input = document.querySelector("input");
const btn = document.querySelector("button");
const h2 = document.querySelector(".chance");

let numberArray;
let resultArray;
let chance=0;


function resultNumber(){
     numberArray = [1,2,3,4,5,6,7,8,9]
     resultArray = []
    for(let i=0; i<4; i++){
        let number = numberArray.splice(Math.floor(Math.random()*(9-i)),1)[0];
        resultArray.push(number);
        console.log(resultArray);
    }
}


function play(e){
    e.preventDefault();
    let answer = input.value;
    if(answer === resultArray.join('')){  //답이 맞을 때
        result.textContent = "HOMERUN!"
        input.value='';
        input.focus();
        resultNumber();
    }else{                              //답이 틀리면
      let strike=0;
      let ball =0;
      chance++;
      let answerArray = answer.split('');
      if(chance>=5){
        result.textContent = "기회를 모두 소진하였습니다. 답은" + resultArray.join('') + "이었습니다."; 
        h2.textContent = "남은 기회 : 0" 
      }else{
        for(let i=0; i<4; i++){
            if(Number(answerArray[i])===resultArray[i]){  //스트라이크
                strike++;
            }else if(resultArray.indexOf(Number(answerArray[i]))>-1){     //indexOf() -1은 값이없다는 뜻
                ball++;
            }
        }
        result.textContent = strike + "스트라이크" + ball + "볼입니다" 
        h2.textContent = "남은 기회 : " + (5-chance) 
    }
      
      
      input.value = '';
      input.focus();
      resultNumber();
    }

}

resultNumber();
form.addEventListener('submit', play)
