const buttons= document.querySelector('.game-board');
const playerX = document.querySelector(".player-x");
const playerO = document.querySelector(".player-o");
const btns = Array.from(document.querySelectorAll(".board"));
const msg = document.getElementById("message");
const endGamePart = document.getElementById("endGamePart");
const overlay = document.querySelector(".overlay");
const restart = document.getElementById("restart")

const game = (function(){
    const gameBoard = [" "," "," "," "," "," "," "," "," "];
    let player="X";
    let computer = "O"
    const setPlayerX=()=>{
        playerX.classList.add("active");
        playerO.classList.remove("active");
        player="X";
        computer="O"
        if(playerX.classList.contains("active")){
            gameBoard.splice(0,9," "," "," "," "," "," "," "," "," ");
            btns.forEach(btn => {
                btn.textContent="";
                btn.classList.remove("active");
                btn.classList.remove("active-computer")
                btn.addEventListener("click",handleClick)})
        } 
        removeHandlerX();
        playerO.addEventListener("click", game.setPlayerO);
    }
    const setPlayerO = ()=>{
        playerO.classList.add("active");
        playerX.classList.remove("active");
        player="O";
        computer="X"
        if(playerO.classList.contains("active")){
            gameBoard.splice(0,9," "," "," "," "," "," "," "," "," ");
            btns.forEach(btn => {
                btn.textContent="";
                btn.classList.remove("active");
                btn.classList.remove("active-computer");
                btn.addEventListener("click",handleClick)
            })
        } 
        compChoice(gameBoard)
        removeHandlerO()
        playerX.addEventListener("click",game.setPlayerX)

    }        
    const removeHandlerX= ()=>{
        playerX.removeEventListener("click",setPlayerX)
    }
    const removeHandlerO=()=>{
        playerO.removeEventListener("click", setPlayerO)
    }
    const calculateWinner =()=>{
        let winningIndexes =
        [[0,1,2],[3,4,5],[6,7,8],
         [0,3,6],[1,4,7],[2,5,8],
         [0,4,8],[2,4,6]]
        let xIndexes = getAllIndexes(gameBoard, "X");
        let oIndexes = getAllIndexes(gameBoard, "O");
        if(winningIndexes.some(arr => arr.every((val, index) => val === xIndexes[index]))){
            overlay.classList.add("active");
            endGamePart.classList.add("active");
            msg.textContent= "X Won!"
        }
        else if (winningIndexes.some(arr => arr.every((val, index) => val === oIndexes[index]))){
            overlay.classList.add("active");
            endGamePart.classList.add("active");
            msg.textContent= "O Won!"
        } 
        else if(winningIndexes.some(arr => arr.every((val, index) => val === xIndexes[index])) &&
        winningIndexes.some(arr => arr.every((val, index) => val === oIndexes[index]))){
            overlay.classList.add("active");
            endGamePart.classList.add("active");
            msg.textContent="It's a draw!";
        }
        else if(!gameBoard.includes(" ")){
            overlay.classList.add("active");
            endGamePart.classList.add("active");
            msg.textContent="It's a draw!";
        }
         
    } 
    const getAllIndexes =(arr, val)=>{
        let indexes =[];
        for (let i=0; i <arr.length ;i++){
            if(arr[i]==val){
                indexes.push(i);   
            }
        }
        return indexes;

    }
    const compChoice = (arr)=>{
        let indexes =[];
        for (let i=0;i<arr.length;i++){
            if(arr[i]===" "){
                indexes.push(i)
            }
        }
        let length =indexes.length
        let compIndex=Math.floor(Math.random()*length)
        let x = indexes[compIndex] 
        arr[x]=computer;  
        let target = document.querySelector(`[data-index="${x}"]`);
        target.textContent=computer;
        target.classList.add("active-computer");  
        
    }

    const updateArray = (arr, inx, target)=>{
          arr[inx]=player;
          target.textContent=player;
          target.classList.add("active");
    }
    const handleClick = (e)=>{
        if(player==="X"){       
             if(e.target.textContent === "" || e.target.textContent=== null){   
            let index = e.target.dataset.index;
            let target = e.target;
            updateArray(gameBoard,index,target)
            calculateWinner()
            compChoice(gameBoard);
            e.target.removeEventListener("click", handleClick)
        } else {
            e.target.removeEventListener("click", handleClick)
        }
    } else {
        if(e.target.textContent ==="" || e.target.textContent=== null){   
            compChoice(gameBoard);
            let index = e.target.dataset.index;
            let target = e.target;
            updateArray(gameBoard,index,target)
            e.target.removeEventListener("click", handleClick);
            calculateWinner()
        } else {
            e.target.removeEventListener("click", handleClick)
        }

    }
    }
    const restart =()=>{
        gameBoard.splice(0,9," "," "," "," "," "," "," "," "," ");
        btns.map(btn => {
            btn.textContent="";
            btn.addEventListener("click",handleClick);
            btn.classList.remove("active");
            btn.classList.remove("active-computer");
})
overlay.classList.remove("active");
endGamePart.classList.remove("active");
playerO.classList.remove("active");
playerX.classList.add("active");
playerX.removeEventListener("click", setPlayerX);
playerO.addEventListener("click",setPlayerO)
player="X";
computer="O"
    }
   
    return {setPlayerX, setPlayerO, calculateWinner, handleClick,restart}
})()

btns.map(btn => btn.addEventListener("click", game.handleClick))
playerO.addEventListener("click", game.setPlayerO);
restart.addEventListener("click", game.restart)
