import Ball from '../js/ball.js';

import {canStartHere, doesItCollide, collide, collideBalls} from '../js/collisiondetection.js'
export default class Game{
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.numOfBalls = 15;
        this.balls = [];
        
    }
    start(){

        for (var i = 0; i < this.numOfBalls; i++) {
            this.balls[i] = new Ball(this)    
        }
    }

    update(){
        this.balls.forEach(ball => ball.update());
        this.balls.forEach(ball => ball.wallCollision())
        collide(this.balls)
    }
    draw(ctx){
        this.balls.forEach(ball => {
            ball.draw(ctx, this.gameWidth, this.gameHeight)
        })
    }
}