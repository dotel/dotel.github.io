import Ant from '../js/ant.js';
import Game from './game.js';

let canvas = document.getElementById("mainscreen")

let ctx = canvas.getContext("2d")

const GAME_WIDTH  = 800;
const GAME_HEIGHT = 800;

let game = new Game(GAME_WIDTH, GAME_HEIGHT)
game.start();

let lastTime = 0;

function gameLoop(currentTime){
    let dt = currentTime - lastTime;
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
    
    game.update(dt);
    
    game.draw(ctx);
    
    

    requestAnimationFrame(gameLoop)
}

gameLoop();

canvas.addEventListener('click', (event) =>{
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    clickAnt(x, y)
})

function clickAnt(x, y){
    game.ants.forEach((ant, index)=>{
        if(x > ant.x && x < ant.x + ant.radius && 
            y > ant.y && y < ant.y + ant.radius){
            game.ants.splice(index, 1);
        }
    }
    )
}