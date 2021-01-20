import Game from "./game.js"
import {collideCars} from "./collisiondetection.js"
import InputHanlder from "./inputhandler.js";




const GAME_WIDTH = 600;
const GAME_HEIGHT = 950;
const PLAY_NOW_WIDTH = 220
const PLAY_NOW_HEIGHT = 30

let canvas = document.getElementById("gameScreen")
let ctx = canvas.getContext('2d')

let cursor;

ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)


let game = new Game(GAME_WIDTH, GAME_HEIGHT);

new InputHanlder(game);


function gameloop(){
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
    game.update();
    collideCars(game);
    game.draw(ctx);
    var animation_id = requestAnimationFrame(gameloop)
}

gameloop();


canvas.addEventListener('click', (event) =>{
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if(x + PLAY_NOW_WIDTH/2 > GAME_WIDTH/2 && x + PLAY_NOW_WIDTH < GAME_WIDTH && 
        y + PLAY_NOW_HEIGHT/2 < GAME_HEIGHT/2 && y > GAME_HEIGHT/2 - PLAY_NOW_HEIGHT){
        game.start();
        return;
    }  
    cursor = "url('../assets/select.svg'), auto"
})