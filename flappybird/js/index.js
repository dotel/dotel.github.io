import Game from "./game.js"
import InputHanlder from "./inputhandler.js";
import {collideBird} from "./collisiondetection.js"

const GAMESTATE = {
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
};

const GAME_WIDTH = 450;
const GAME_HEIGHT = 800;

let canvas = document.getElementById("gameScreen")
let ctx = canvas.getContext('2d')


ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)


let game = new Game(GAME_WIDTH, GAME_HEIGHT);
// game.start();

new InputHanlder(game, GAMESTATE);

function gameloop(){
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
    game.update();
    collideBird(game, GAMESTATE, game.pipes.gap);
    game.draw(ctx);
    requestAnimationFrame(gameloop)
}

var toggleBirdDirection = true;

setInterval(() => {
    if(toggleBirdDirection){
        game.bird.image.src = "../assets/flappybird.png"
    }
    else{
        game.bird.image.src = "../assets/birdnormal.png"
    }
    toggleBirdDirection = !toggleBirdDirection;
}, 500)

gameloop();

if(game.gameState != GAMESTATE.RUNNING){
    var startButton = Array.from(document.getElementsByClassName("startimg"));
    startButton.forEach(startButton => {
        startButton.addEventListener('click', () =>{
            game.start();
        })
    })
}

