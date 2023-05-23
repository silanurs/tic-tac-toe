const buttons= document.querySelectorAll('.board');
buttons.forEach(button => button.addEventListener('click', (e) => console.log(e.target.dataset.index)))

const gameBoardModule = (() => {
let gameBoard= [0, 1, 2, 3, 4, 5, 6, 7, 8];
return {gameBoard}
})();
const playerX = () => {
   
}
const playerO = () => {
    
}