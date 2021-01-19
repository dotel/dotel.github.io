import Ball from '../js/ball.js';
import Game from './game.js';

let canvas = document.getElementById("mainscreen")

let ctx = canvas.getContext("2d")


const GAME_WIDTH  = 800;
const GAME_HEIGHT = 800;


let game = new Game(GAME_WIDTH, GAME_HEIGHT, 10)
game.start();

let lastTime = 0;

function gameLoop(currentTime){
    if(!game.over){
        let dt = currentTime - lastTime;
        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
        
        game.update(dt);
        
        game.draw(ctx);
        
        
        document.getElementById("numberOfBalls").oninput = function(){
            ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
            game.over = true;
            game = new Game(GAME_WIDTH, GAME_HEIGHT, this.value)
            game.start();   
            game.over = false;
            gameLoop();
            document.getElementById("ballcount").innerText = this.value
            console.log(game.balls[0].speed)
            
        }
        requestAnimationFrame(gameLoop)
    }
}


gameLoop();
