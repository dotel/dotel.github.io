const BIRD_HEIGHT = 35;
const BIRD_WIDTH = 40
const BOTTOM_IMAGE_HEIGHT = 182
const GRAVITY = .2;
const ANTI_GRAVITY = -5;
export default class Bird{
    constructor(gameWidth, gameHeight, GAMESTATE){
        this.GAMESTATE = GAMESTATE;
        this.gameHeight = gameHeight;
        this.gameWidth = gameWidth;
        this.image = new Image();
        this.image.src = "/flappybird/assets/birdnormal.png"
        this.x = 20;
        this.y = 170;
        this.dy = 0;
        this.width = BIRD_WIDTH;
        this.height = BIRD_HEIGHT;
        this.rotation = 10 * Math.PI/180;  
    }
    draw(ctx){
        ctx.save();
        // ctx.translate(this.x, this.y);
        // ctx.rotate(this.rotation);
        ctx.drawImage(this.image, this.x, this.y, BIRD_WIDTH, BIRD_HEIGHT);
        ctx.restore();
    }
    update(game){
        this.dy += GRAVITY;
        this.y += this.dy;
        if(this.y + this.height > this.gameHeight - BOTTOM_IMAGE_HEIGHT || this.y <= 0)
            game.gameState = this.GAMESTATE.GAMEOVER
    }
    jump(){
        this.y -= 20;
        this.dy = ANTI_GRAVITY;
    }
}

