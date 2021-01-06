let screen=document.querySelector('#screen');
let start;
let end;
const record = [];
let count =0;


screen.addEventListener('click',()=>{
    if(screen.classList.contains('waiting')){
        screen.classList.remove('waiting');
        screen.classList.add('ready');
        screen.textContent ='초록색이 되면 눌러주세요';
        let change =  setTimeout(()=>{
            start= new Date();
            screen.click();
        },Math.floor(Math.random()*1000)+2000);
    }else if(screen.classList.contains('ready')){
        if(!start){
            clearTimeout()
            screen.classList.remove('ready');
            screen.classList.add('waiting');
            screen.textContent='성급하시네요';
        }else{
        screen.classList.remove('ready');
        screen.classList.add('now');
        screen.textContent ='클릭하세요'
        }
    }else if(screen.classList.contains('now')){
        count++;
        end = new Date();
        console.log(end-start);
        record.push(end-start);
        screen.classList.remove('now');
        screen.classList.add('result');
        screen.textContent=(end-start) + 'ms'
        start=null;
        end=null;
        setTimeout(()=>{
            if(count<3){
            screen.classList.remove('result');
            screen.classList.add('waiting');
            screen.textContent = '클릭해서 시작하세요';
            }else{
                clearTimeout();
                const sum = record.reduce(function add(sum,currValue){
                    return sum+ currValue;
                },0);
                const average = sum/record.length;
                screen.classList.remove('result');
                screen.classList.add('average');
                screen.textContent='평균속도는' + average + '입니다.'
            }
        },2000);

    }

})


