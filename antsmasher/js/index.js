import Ant from '../js/ant.js';
import Game from './game.js';
import InputHandler from './inputhandler.js';

let canvas = document.getElementById("mainscreen")

let ctx = canvas.getContext("2d")

const GAME_WIDTH  = 800;
const GAME_HEIGHT = 800;

let game = new Game(GAME_WIDTH, GAME_HEIGHT)
game.start();

handleGameOver();


let lastTime = 0;

function gameLoop(currentTime){
    if(!game.gameover){
        let dt = currentTime - lastTime;
        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
        
        game.update(dt);
        
        game.draw(ctx);
        
        

        requestAnimationFrame(gameLoop)
    }
}

gameLoop();



canvas.addEventListener('click', (event) =>{
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    clickAnt(x, y);
    setTimeout(() => {
        if(game.ants.length === 0){
            ctx.rect(0, 0, GAME_WIDTH, GAME_HEIGHT);
            ctx.fillStyle = "rgba(0,0,0,.1)";
            ctx.fill();
      
            ctx.font = "30px Arial";
            ctx.fillStyle = "#000";
            ctx.textAlign = "center";
            ctx.fillText(
              `Jesus, you killed ${game.numOfAnts} ants today. Press enter to kill more.`,
              GAME_WIDTH / 2,
              GAME_HEIGHT / 2
            );
            game.gameover = true;
        }
    }, 100)    
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

function handleGameOver(){
    document.addEventListener("keyup", event =>{
        switch(event.key){
            case "Enter":
                ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
                game = new Game(GAME_WIDTH, GAME_HEIGHT)
                game.start();
                gameLoop();
        }
    })
}