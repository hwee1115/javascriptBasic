const tbody = document.querySelector('#table tbody');
const dataset=[]; //scope

document.querySelector('#exec').addEventListener('click',()=>{
    tbody.innerHTML='';     //tbody의 html 태그 비우기 (실행버튼 클릭 시 테이블 새로고침)
    const hor = parseInt(document.querySelector('#hor').value);
    const ver = parseInt(document.querySelector('#ver').value);
    const mine = parseInt(document.querySelector('#mine').value);
    console.log(hor,ver,mine);


for(let i=0;i<ver; i++){
    const arr =[];
    const tr= document.createElement('tr');
    dataset.push(arr);
    for(let j=0; j<hor; j++){
        arr.push(1);
        const td= document.createElement('td');
        //오른쪽클릭 (깃발,물음표)
        td.addEventListener('contextmenu',(e)=>{
            e.preventDefault();
            let parentTr = e.currentTarget.parentNode;  //e.currentTarget = > 이벤트리스너를 준 대상 , e.target => 이벤트가 발생하는 대상 
            let parentTbody = e.currentTarget.parentNode.parentNode;
            const section = Array.prototype.indexOf.call(parentTr.children,td);     //.children() =>  자식 유사배열
            const line = Array.prototype.indexOf.call(parentTbody.children,tr); //Array.prototype.indexOf.call() => 유사배열의 인덱스를 확인하기 위한 방법
            console.log(section, line);
            let target=e.currentTarget;
            if(target.textContent===''||target.textContent==='X'){
                target.textContent='!';
            }
            else if( target.textContent==='!'){
                target.textContent ='?';
            }else if(target.textContent==='?'){
                if(dataset[line][section]==='X'){
                    target.textContent='X'
                }else if(dataset[line][section]===1){
                    target.textContent='';
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
const mineCandidate =[];
while(tableArray.length> tableSize-mine){
    let randomArray = tableArray.splice(Math.floor(Math.random()*tableArray.length),1)[0];
    mineCandidate.push(randomArray);
}

console.log(mineCandidate);
//지뢰 심기
for(let k =0; k<mineCandidate.length; k++){
    mineHor = Math.floor(mineCandidate[k]/ver);
    mineVer = mineCandidate[k]%ver;
    tbody.children[mineHor].children[mineVer].textContent='X'
    dataset[mineHor][mineVer]='X'
}
console.log(tbody.children);
});