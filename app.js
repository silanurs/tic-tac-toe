const buttons= document.querySelectorAll('.board');
const game = (function(){
    const gameBoard = ["","","","","","","","",""];
    const setPlayer=()=>{}
    const calculateWinner =()=>{
        let winningIndexes =
        [[0,1,2],[3,4,5],[6,7,8],
         [0,3,6],[1,4,7],[2,5,8],
         [0,4,8],[2,4,6]]
         return winningIndexes
    } 
    return {gameBoard,setPlayer, calculateWinner}
})()
console.log(game.calculateWinner())