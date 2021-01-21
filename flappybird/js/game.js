import Bird from "./bird.js";
import Pipe from "./pipes.js";
const GAMESTATE = {
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
};

export default class Game{
    constructor(gameWidth, gameHeight){
        this.image = new Image();
        this.image.src = "/assets/background.png"
        this.bottomimage = new Image();
        this.bottomimage.src = "/assets/bottombackground.png"
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.gameState = GAMESTATE.MENU;
        this.reset();
    }
    
    reset(){
        this.score = 0;
        this.pipes = new Pipe(this.gameWidth, this.gameHeight, this);
        this.bird = new Bird(this.gameWidth, this.gameHeight, GAMESTATE);
        this.gameObjects = [this.pipes, this.bird]
        this.bottomimage.style.position = "relative";
    }
    
    start(){
        if(this.gameState === GAMESTATE.MENU){
            document.getElementById("menuimages").classList = "menuimages"
        }

        if(this.gameState === GAMESTATE.GAMEOVER){
            document.getElementById("gameoverimages").classList = "gameoverimages"
        }
        this.gameState = GAMESTATE.RUNNING;
        document.getElementById("runningScore").style.display = "block";
        this.reset();
    }
    
    update(dt){
        if(this.gameState === GAMESTATE.MENU){
            document.getElementById("menuimages").classList = "menuimages active"
        }

        if(this.gameState === GAMESTATE.GAMEOVER){
            document.getElementById("runningScore").style.display = "none"
            document.getElementById("gameoverimages").classList = "gameoverimages active"
            let score = document.getElementById("score");
            score.innerText = this.score
            let highscore = document.getElementById("highscore");
            highscore.innerText = localStorage.getItem("highscore");
        }

        if(this.gameState == GAMESTATE.RUNNING){
            this.bird.update(this, GAMESTATE);
            this.pipes.update();
        }
    }

    draw(ctx){
            
        ctx.drawImage(this.image, 0, 0);
        this.pipes.draw(ctx);
        ctx.drawImage(this.bottomimage, 0, this.gameHeight - this.bottomimage.height);
        this.bird.draw(ctx);        



        if(this.gameState === GAMESTATE.GAMEOVER){
            ctx.font = "30px Arial";
            ctx.fillStyle = "#808080";
            ctx.textAlign = "left";
            ctx.fillText(
              `${this.score}`,
              310,
              310
            );
            var highscore = localStorage.getItem("highscore")
            ctx.fillText(
                `${highscore? 0: highscore}`,
                310,
                365
              );

        }

        if(this.gameState === GAMESTATE.RUNNING){
            document.getElementById("runningScore").innerText = this.score
        }
    }
    
}