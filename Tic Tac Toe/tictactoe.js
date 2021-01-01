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
result= body.appendChild(h1);
console.log(tableArray);

function play(e){
    const lineNumber = lineArray.indexOf(e.target.parentNode);
    const scNumber = tableArray[lineNumber].indexOf(e.target);
    console.log(lineNumber,scNumber);

    if(tableArray[lineNumber][scNumber].textContent !==''){
        return;
    }else{
        tableArray[lineNumber][scNumber].textContent = turn;
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
                console.log('정답');
        }
        if(lineNumber - scNumber === 0) {   //대각선
            if(
            tableArray[0][0].textContent === turn &&
            tableArray[1][1].textContent === turn &&
            tableArray[2][2].textContent === turn
            ){
                sameTurn = true;
            }
        }
        if(Math.abs(lineNumber + scNumber) ===2){
            if(            
                tableArray[0][2].textContent === turn &&
                tableArray[1][1].textContent === turn &&
                tableArray[2][0].textContent === turn
            ){
                sameTurn =true;
            }
        }
        if(sameTurn){
            result.textContent = turn + '승리입니다.'
            tableArray.forEach(lines =>{
               lines.forEach(sections => sections.textContent ='')
            })
        }
        if(turn ==='X'){
            turn ='O'
        }else{
            turn='X';
        }
    }
}
