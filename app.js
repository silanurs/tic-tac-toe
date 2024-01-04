const buttons= document.querySelector('.game-board');
const playerX = document.querySelector(".player-x");
const playerO = document.querySelector(".player-o");
const btns = Array.from(document.querySelectorAll(".board"))
const game = (function(){
    const gameBoard = ["","","","","","","","",""];
    const setPlayerX=()=>{
        playerX.classList.add("active");
        playerO.classList.remove("active");
        if(playerX.classList.contains("active")){
            gameBoard.splice(0,9,"","","","","","","","","");
            btns.forEach(btn => gameBoard.map(x=>btn.textContent=x))
        } 
        removeHandlerX();
        playerO.addEventListener("click", game.setPlayerO)
    }
    const setPlayerO = ()=>{
        playerO.classList.add("active");
        playerX.classList.remove("active");
        if(playerO.classList.contains("active")){
            gameBoard.splice(0,9,"","","","","","","","","");
            btns.forEach(btn => gameBoard.map(x=>btn.textContent=x))
        } 
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
        let oIndexes = getAllIndexes(gameBoard, "O")
        if(winningIndexes.some(arr => arr.every((val, index) => val === xIndexes[index]))){
            return "X Won!"
        }
        else if (winningIndexes.some(arr => arr.every((val, index) => val === oIndexes[index]))){
            return "O Won!"
        } else {
            return "It's a draw!"
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
    const handleClick = (e)=>{
        gameBoard.splice(e.target.dataset.index,1,"X")
        e.target.textContent=gameBoard[e.target.dataset.index]
        e.target.classList.add("active")
        console.log(e.target.textContent)
        console.log(gameBoard)
        console.log(calculateWinner())
    }
    return {gameBoard,setPlayerX, setPlayerO, calculateWinner, handleClick}
})()


playerO.addEventListener("click", game.setPlayerO)
buttons.addEventListener("click", game.handleClick)
console.log(game.calculateWinner())