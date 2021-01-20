import Player from "./player.js";
// import Bots from "./bots.js"
import Bot from "./bot.js";
const GAMESTATE = {
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    NEWLEVEL: 4
  };
const GAMESPEED = 10;
export default class Game{
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.reset();
    }
    
    reset(){
        this.player = new Player();
        this.gameState = GAMESTATE.MENU;
        this.laneHeight = 0;
        this.gameSpeed = GAMESPEED;
        this.bots = []
        this.score = 0;
        this.gameObjects = {"player": this.player, "bots" : this.bots};
        this.sound = document.getElementById("mainsound");
        this.crashsound = document.getElementById("crashsound") 
        this.soundflag = false;
        this.crashsoundflag = false;
        this.gamescreen = document.getElementById("gameScreen");
    }

    start(){
        if (
            this.gameState == GAMESTATE.MENU ||
            this.gameState == GAMESTATE.GAMEOVER
            ){
                this.gameState = GAMESTATE.RUNNING;
                for(let i = 0; i < 3; i++){
                    setTimeout(() => {
                        this.bots[i] = new Bot(this, GAMESTATE);
                    }, 900* i)
                }
                this.soundflag = true;
                this.crashsoundflag = true;
                this.sound.play();
                this.sound.addEventListener('timeupdate', function(){
                    var buffer = .40
                    if(this.currentTime > this.duration - buffer){
                        this.currentTime = 0
                        this.play()
                    }
                })
        }
        
        
    }
    
    update(){
        if(this.gameState == GAMESTATE.RUNNING){
            this.gameObjects["bots"].forEach(bot => bot.update());
            this.gamescreen.style.backgroundPositionY = `${this.laneHeight}px`;
            this.laneHeight += this.gameSpeed;
            if(this.score % 10 == 0 && this.score != 0)
                this.gameSpeed += this.gameSpeed * .013;
            }
    }

    draw(ctx){
        ctx.clearRect(0, 0, this.gameWidth, this.gameHeight)
       
        this.gameObjects["player"].draw(ctx);

        if(this.gameState === GAMESTATE.RUNNING){
            this.gamescreen.style.cursor = "none"
            this.gameObjects["bots"].forEach(bot => bot.draw(ctx));
            // ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,.1)";
            ctx.fill();
      
            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "right";
            ctx.fillText(
              `Score: ${this.score}`,
              this.gameWidth,
              this.gameHeight - 30
            );
            
            let highscore = localStorage.getItem("highscore");
            highscore = this.score > highscore? this.score: highscore;

            ctx.fillText(
                `High Score: ${highscore}`,
                this.gameWidth,
                this.gameHeight
              );
        }

        if (this.gameState === GAMESTATE.MENU) {
            ctx.fillStyle = "rgba(0,0,0,.3)";
            ctx.fill();
      
            ctx.font = "40px Hachi Maru Pop";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText(
              "Play now",
              this.gameWidth / 2,
              this.gameHeight / 2
            );
          }
          if (this.gameState === GAMESTATE.GAMEOVER) {
              this.sound.pause();
              if(this.crashsoundflag){
                  this.crashsound.play();
                  this.crashsoundflag = false;

              }

            ctx.fillStyle = "rgba(0,0,0,.1)";
            ctx.fill();
      
            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText(
              `Game over. You scored ${this.score}.`,
              this.gameWidth / 2,
              this.gameHeight / 2
            );

          }
    }
    
}