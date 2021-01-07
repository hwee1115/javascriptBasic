const body = document.body;
const table = document.createElement('table');
const tableArray = [];
const lineArray = []
let turn ='X'
for(let i=0; i<3; i++){
    const line = document.createElement('tr');
    tableArray.push([]);
    lineArray.push(line);
    for(let j=0; j<3; j++){
        const section = document.createElement('td')
        section.addEventListener('click', play);
        tableArray[i].push(section);
        line.appendChild(section);
    }
    table.appendChild(line);
}
body.appendChild(table);
const h1 = document.createElement('h1');
result= body.appendChild(h1)

function check(lineNumber,scNumber){ 
    let sameTurn = false;
        if(                                 //가로검사
            tableArray[lineNumber][0].textContent === turn &&
            tableArray[lineNumber][1].textContent === turn &&
            tableArray[lineNumber][2].textContent === turn)
            {
                sameTurn = true;
        }
        if(                                 //세로검사
            tableArray[0][scNumber].textContent === turn &&
            tableArray[1][scNumber].textContent === turn &&
            tableArray[2][scNumber].textContent === turn
        ){
                sameTurn = true;
        }
        //대각선 검사
        if(                                             
            tableArray[0][0].textContent === turn &&
            tableArray[1][1].textContent === turn &&
            tableArray[2][2].textContent === turn
            ){
                sameTurn = true;  
            }
        
        if(            
            tableArray[0][2].textContent === turn &&
            tableArray[1][1].textContent === turn &&
            tableArray[2][0].textContent === turn
            ){
                sameTurn =true;
            }
            return sameTurn;
    }
    
function reset(draw){
    if(draw){
        result.textContent = '비겼습니다.'
    }else{
        result.textContent = turn + '승리입니다.'
        }
    setTimeout(()=>{
        result.textContent='';
        tableArray.forEach(lines=>{
            lines.forEach(section=>{
                section.textContent=''
            });
        });
    
    },1000);  

}

function play(e){
    let emptySection = [];
    if(turn ==='O'){
        return;
    }
   
    const lineNumber = lineArray.indexOf(e.target.parentNode);
    const scNumber = tableArray[lineNumber].indexOf(e.target);
    if(tableArray[lineNumber][scNumber].textContent !==''){
        return;
    }else{
        tableArray[lineNumber][scNumber].textContent = turn;
        const win=check(lineNumber,scNumber);
        tableArray.forEach(lines=>{
            lines.forEach(section=>{
                emptySection.push(section);
            })
        });
        emptySection = emptySection.filter(section=>{
             return !section.textContent
         });
         if(win){
            console.log('다참');
             reset();
         }
         else if(emptySection.length===0){
            console.log('칸없음');
             reset(true);
         }else{
            console.log('진행');
            if(turn ==='X'){
                turn ='O'    
            }
         
    
        //컴퓨터
        setTimeout(()=>{
            let comSection=emptySection[Math.floor(Math.random()*emptySection.length)];
             comSection.textContent=turn; 
             const lineNumber = lineArray.indexOf(comSection.parentNode);
             const scNumber = tableArray[lineNumber].indexOf(comSection);
            const win= check(lineNumber,scNumber);
             if(win){
                 reset();
                 clearTimeout();
             }
             //턴돌리기
             turn='X';
        },1000)
    }
    }
}
