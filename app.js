const buttons= document.querySelectorAll('.board');
const playerX = document.querySelector(".player-x");
const playerO = document.querySelector(".player-o");
const game = (function(){
    const gameBoard = ["","","","","","","","",""];
    const setPlayerX=()=>{
        playerX.classList.add("active");
        playerO.classList.remove("active")
    }
    const setPlayerO = ()=>{
        playerO.classList.add("active");
        playerX.classList.remove("active")
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
    return {gameBoard,setPlayerX, setPlayerO, calculateWinner}
})()
playerX.addEventListener("click",game.setPlayerX)
playerO.addEventListener("click", game.setPlayerO)
console.log(game.calculateWinner())