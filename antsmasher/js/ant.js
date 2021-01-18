import {fillCircle} from './utilities.js'
import {canStartHere} from './collisiondetection.js'
export default class Ant{
    constructor(game){
        this.image = document.getElementById("img_ant");
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.overlap = false;
        this.radius = 30;
        this.mass = this.radius;
        while(!this.overlap){
            this.x = this.radius * 2 + (Math.floor(Math.random()*game.gameWidth) - this.radius * 2);
            this.y = this.radius * 2 + (Math.floor(Math.random()*game.gameHeight) - this.radius * 2);
            this.speed = 1;
            this.angle = Math.floor(Math.random()*360);
            this.updateAntDirection();
            this.overlap = canStartHere(game.ants, this);
        }
    }

    draw(ctx){
        var cw = this.radius
        var ch = this.radius
        ctx.drawImage(
            this.image,
            this.x,
            this.y, 
            this.radius, this.radius
          );
    }

    updateAntDirection(){
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
        } else if (this.x  < 0 ) {
            this.dx = this.dx * -1;
            this.x = this.radius;
        } else if (this.y + this.radius > this.gameHeight ) {
            this.dy = this.dy * -1;
            this.y = this.gameHeight - this.radius;
        } else if(this.y < 0) {
            this.dy = this.dy * -1;
            this.y = this.radius;
            }
    }
}

