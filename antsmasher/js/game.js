import Ant from '../js/ant.js';
import {fillCircle} from './utilities.js'

import {canStartHere, wallCollision, doesItCollide, collide, collideAnts} from '../js/collisiondetection.js'
export default class Game{
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.numOfAnts = 10;
        this.ants = [];
        this.gameover = false;
        
    }
    start(){
        for (var i = 0; i < this.numOfAnts; i++) {
            this.ants[i] = new Ant(this)    
        }
    }

    update(){
        this.ants.forEach(ant => ant.update());
        this.ants.forEach(ant => wallCollision(ant))
        collide(this.ants)
    }
    draw(ctx){
        this.ants.forEach(ant => {
            ant.draw(ctx, this.gameWidth, this.gameHeight)
        })
    }

}