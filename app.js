const buttons= document.querySelectorAll('.board');
const game = (function(){
    const gameBoard = ["X","X","X","","","","","",""];
    const setPlayer=()=>{}
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
    return {gameBoard,setPlayer, calculateWinner}
})()
console.log(game.calculateWinner())