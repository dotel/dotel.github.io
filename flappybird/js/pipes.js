const PIPE_GAP = 175;
const PIPE_HEIGHT = 450;
const PIPE_WIDTH = 52;
const GAME_SPEED = 1;
export default class Pipe{
    constructor(gameWidth, gameHeight, game){
        this.game = game;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.topPipe = new Image();
        this.bottomPipe = new Image();
        this.bottomPipe.src = "/flappybird/assets/topipe.png";
        this.topPipe.src = "/flappybird/assets/bottompipe.png";
        this.gap = PIPE_HEIGHT + PIPE_GAP;
        this.width = 52;
        this.height = PIPE_HEIGHT;
        this.pipes = []
        this.pipes[0] = {
            x: gameWidth,
            y: -Math.random()*100
        }

    }
    draw(ctx){
        this.pipes.forEach((pipe, i) =>{
            ctx.drawImage(this.topPipe,  pipe.x, pipe.y);
            ctx.drawImage(this.bottomPipe, this.pipes[i].x, this.pipes[i].y + this.gap);
        })
    }
    update(){
        this.pipes.forEach((pipe, i) =>{
            pipe.x = pipe.x - GAME_SPEED;
            if(pipe.x == 0){
                this.pipes.push({
                    x: this.gameWidth,
                    y: parseInt((Math.random() * PIPE_HEIGHT) - PIPE_HEIGHT)
                })
                this.game.score++;
                var highscore = localStorage.getItem("highscore")
                
                localStorage.setItem("highscore", highscore? Math.max(this.game.score, highscore): 0)
            }
            if(this.pipes.length > 3){
                this.pipes.shift();
            }
        })
        
    }
}