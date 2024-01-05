const buttons= document.querySelector('.game-board');
const playerX = document.querySelector(".player-x");
const playerO = document.querySelector(".player-o");
const btns = Array.from(document.querySelectorAll(".board"));
const msg = document.getElementById("message");

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
            msg.textContent= "X Won!"
        }
        else if (winningIndexes.some(arr => arr.every((val, index) => val === oIndexes[index]))){
            msg.textContent= "O Won!"
        } 
        else if(!gameBoard.includes(" ")){
            msg.textContent="It's a draw!"
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
        if(player==="X"){        
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
            target.classList.add("active");  
        }else {
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
            target.classList.add("active");  
        }
        
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
            compChoice(gameBoard);
            calculateWinner()
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
   
    return {gameBoard,setPlayerX, setPlayerO, calculateWinner, handleClick}
})()

btns.map(btn => btn.addEventListener("click", game.handleClick))
playerO.addEventListener("click", game.setPlayerO);
