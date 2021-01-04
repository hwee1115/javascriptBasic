const choice = document.querySelector('.choice');
let imageLeft='0';
const dictionary={
    rock:'0',
    scissor:'-142px',
    paper:'-284px'
};

/*const dictionary2={
    '0':rock,
    '-142px':scissor,
    '-284px':paper
}밑에 함수로 대체(하드코딩 방지)*/
console.log(Object.entries(dictionary));
function computerChoice(imageLeft){     //객체의 value값을 나타내기 위한 함수
    return Object.entries(dictionary).find((v)=>{       //Object.entries()는 객체가 가지고 있는 모든 property를 키와 값 쌍으로된 배열형태로 반환 
        return v[1]=== imageLeft;                       //find 메서드는 callback함수가 참을 반환할때가지 해당 배열의 각 요소를 실행
    })[0];
}

const score={
    scissor:-1,
    rock:0,
    paper:1
}
let interval;
function intervalMake(){
     interval=setInterval(()=>{               //setInterval() 지정된 시간마다 코드를 반복적으로 실행
        if(imageLeft=== dictionary.rock){
            imageLeft=dictionary.scissor
        }else if(imageLeft === dictionary.scissor){
            imageLeft = dictionary.paper
        }else{
            imageLeft = dictionary.rock;
        }
    document.querySelector('#computer').style.background=
        'url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ' + imageLeft + ' 0';
    },100);
}

intervalMake();

const result = document.createElement('h2');
choice.appendChild(result);

document.querySelectorAll('.btn').forEach((btn)=>{      //querySelectorAll은 forEach()를 이용하여 비동기 사용
    btn.addEventListener('click',function(){
        clearInterval(interval);        //setInterval정지
        setTimeout(()=>{
            intervalMake();
        },1000);
        const myChoice = this.textContent;
        console.log(myChoice);
        const myNumber = score[myChoice];
        const comNumber = score[computerChoice(imageLeft)];
        console.log(myNumber, comNumber);
        const scoreDiff= myNumber - comNumber;
        if(scoreDiff === 0){
            result.textContent='비겼습니다'
        }else if([1,-2].includes(scoreDiff)){       //[1,-2].includes(scoreDiff) => scoreDiff값에 1이나-2값이 포함되어있으면 true
            result.textContent='이겼습니다'
        }else{
            result.textContent='졌습니다'
        }
    })
})


