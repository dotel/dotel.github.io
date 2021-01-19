import {fillCircle} from '../js/utilities.js'
import {canStartHere} from '../js/collisiondetection.js'
export default class Ball{
    constructor(game){
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.radius = 20;
        this.overlap = false;
        this.mass = this.radius;
        while(!this.overlap){
            this.x = this.radius * 2 + (Math.floor(Math.random()*game.gameWidth) - this.radius * 2);
            this.y = this.radius * 2 + (Math.floor(Math.random()*game.gameHeight) - this.radius * 2);
            this.speed = 5;
            this.angle = Math.floor(Math.random()*360);
            this.updateBallDirection();
            this.overlap = canStartHere(game.balls, this);
        }
    }

    draw(ctx){
        fillCircle(ctx, this.x, this.y, this.radius)
    }

    updateBallDirection(){
        this.radians = this.angle * Math.PI/ 180;
        this.dx = Math.cos(this.radians) * this.speed;
        this.dy = Math.sin(this.radians) * this.speed;
    }

    update(deltaTime){
        this.x += this.dx;
        this.y += this.dy;
    }

    wallCollision(){
        if (this.x + this.radius > this.gameWidth) {
            this.dx = this.dx * -1;
            this.x = this.gameWidth - this.radius;
        } else if (this.x - this.radius < 0 ) {
            this.dx = this.dx * -1;
            this.x = this.radius;
        } else if (this.y + this.radius > this.gameHeight ) {
            this.dy = this.dy * -1;
            this.y = this.gameHeight - this.radius;
        } else if(this.y-this.radius < 0) {
            this.dy = this.dy * -1;
            this.y = this.radius;
            }
    }
}

