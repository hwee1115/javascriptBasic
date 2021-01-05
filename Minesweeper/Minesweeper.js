const tbody = document.querySelector('#table tbody');
let dataset=[]; //scope
let stopflag =false;
let openSection = 0;
const result =document.querySelector('#result');

const code={
    question:-2,
    flag:-3,
    mineFlag:-4,
    questionMine:-5,
    mine:1
}

document.querySelector('#exec').addEventListener('click',()=>{
    tbody.innerHTML='';     //tbody의 html 태그 비우기 (실행버튼 클릭 시 테이블 새로고침)
    dataset=[];
    stopflag=false;
    result.textContent='';
    openSection=0;
    const hor = parseInt(document.querySelector('#hor').value);
    const ver = parseInt(document.querySelector('#ver').value);
    const mine = parseInt(document.querySelector('#mine').value);
    console.log(hor,ver,mine);


for(let i=0;i<ver; i++){
    const arr =[];
    const tr= document.createElement('tr');
    dataset.push(arr);
    for(let j=0; j<hor; j++){
        arr.push(0);
        const td= document.createElement('td');
        //오른쪽클릭 (깃발,물음표)
        td.addEventListener('contextmenu',(e)=>{
            if(stopflag){
                return;
            }
            e.preventDefault();
            let parentTr = e.currentTarget.parentNode;  //e.currentTarget = > 이벤트리스너를 준 대상 , e.target => 이벤트가 발생하는 대상 
            let parentTbody = e.currentTarget.parentNode.parentNode;
            const section = Array.prototype.indexOf.call(parentTr.children,td);     //.children() =>  자식 유사배열
            const line = Array.prototype.indexOf.call(parentTbody.children,tr); //Array.prototype.indexOf.call() => 유사배열의 인덱스를 확인하기 위한 방법
            console.log(section, line);
            let target=e.currentTarget;
            if(target.textContent===''||target.textContent==='X'){
                target.textContent='!';
                if(dataset[line][section]==='X'){
                    console.log('gi')
                    dataset[line][section] = code.mineFlag
                }else{
                    dataset[line][section] = code.flag
                }
            }
            else if( target.textContent==='!'){
                target.textContent ='?';
                if(dataset[line][section]===code.mineFlag){
                    dataset[line][section] = code.questionMine;
                }else{
                    dataset[line][section] = code.question;
                }
            }else if(target.textContent==='?'){
                if(dataset[line][section]===code.questionMine){
                    target.textContent='X';
                    dataset[line][section] = 'X'
                }else {
                    target.textContent='';
                    dataset[line][section] = 0;
                }
            }
        })
        //테이블 왼쪽클릭(지뢰찾기, 주변지뢰)
        td.addEventListener('click',(e)=>{
            if(stopflag){
                return;
            }
            e.preventDefault();
            let parentTr = e.currentTarget.parentNode;   
            let parentTbody = e.currentTarget.parentNode.parentNode;
            const section = Array.prototype.indexOf.call(parentTr.children,td);
            const line = Array.prototype.indexOf.call(parentTbody.children,tr);
            if([1,code.question,code.flag,code.questionMine,code.mineFlag].includes(dataset[line][section])){
                return;
            }
            e.currentTarget.classList.add('opened');
            openSection+=1;
            console.log(openSection);
            if(dataset[line][section]==='X'){
                e.currentTarget.textContent='펑';
                result.textContent ='실패';
                stopflag=true;
            }else{
                around=[
                    dataset[line][section-1],dataset[line][section+1]
                ];
                 //테이블의 가장자리 클릭 시 배열의[-1]값이 들어가기 때문에 이것에 대한 예외처리
                if(dataset[line-1]){      //맨윗줄 클릭 시 예외처리
                   around=around.concat([dataset[line-1][section-1],dataset[line-1][section],dataset[line-1][section+1]]); //concat() 배열과 배열을 합치는 동작, 새로운 배열을 만듬
                }
                if(dataset[line+1]){    //맨아랫줄 클릭 시 예외처리
                    around=around.concat([dataset[line+1][section-1],dataset[line+1][section],dataset[line+1][section+1]]);
                }
                aroundMines=around.filter((v)=>{            //filter() =>주어진 함수의 테스트를 통과하는 요소를 모아 배열을 새로 만듬
                    return v==='X'
                }).length;
                e.currentTarget.textContent= aroundMines || '';     //false,0,nuull이나 undenifed값을 보여주지 않기
                dataset[line][section]=1
                //0인칸 주변열기
                if(aroundMines === 0){
                    aroundSection=[];
                    if(tbody.children[line-1]){
                        aroundSection = aroundSection.concat([
                            tbody.children[line-1].children[section-1],
                            tbody.children[line-1].children[section],
                            tbody.children[line-1].children[section+1]]);
                    }
                    aroundSection= aroundSection.concat([
                        tbody.children[line].children[section-1],
                        tbody.children[line].children[section+1]
                    ]);
                    if(tbody.children[line+1]){
                        aroundSection = aroundSection.concat([
                            tbody.children[line+1].children[section-1],
                            tbody.children[line+1].children[section],
                            tbody.children[line+1].children[section+1]]);
                    }
                    
                    aroundSection.filter((v)=>{
                        return !!v
                    }).forEach((next)=>{
                        console.log(next);
                        let parentTr = next.parentNode;   
                        let parentTbody = next.parentNode.parentNode;
                        const nextSection = Array.prototype.indexOf.call(parentTr.children,next);
                        const nextLine = Array.prototype.indexOf.call(parentTbody.children,parentTr);
                        if(dataset[nextLine][nextSection]!==1){
                            next.click();
                        }
                    }); 
                }
                if(openSection === hor*ver-mine){
                    stopflag=true;
                    result.textContent='승리';
                }
            }
        })
        tr.appendChild(td);
    }
    tbody.appendChild(tr);
}
//지뢰 위치 뽑기
const tableArray = Array(hor*ver).fill().map((element,index)=>{
    return index;
});
const tableSize = tableArray.length;
console.log(tableSize-mine)
const mineCandidate =[];
while(tableArray.length> tableSize-mine){
    let randomArray = tableArray.splice(Math.floor(Math.random()*tableArray.length),1)[0];
    mineCandidate.push(randomArray);
}

console.log(mineCandidate);
//지뢰 심기
for(let k =0; k<mineCandidate.length; k++){
    mineVer = Math.floor(mineCandidate[k]/ver);
    mineHor = mineCandidate[k]%ver;
    console.log(mineVer,mineHor)
    tbody.children[mineVer].children[mineHor].textContent='X'
    dataset[mineVer][mineHor]='X'
}
console.log(tbody.children);
});
