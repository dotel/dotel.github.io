import {canBotBeHere, bottomWallCollision} from "./collisiondetection.js"
let botPositions = [120, 270, 420]
let allBots = ["img_orangecar", "img_bluecar", "img_ambulance", "img_orangecar2",
        "img_truck", "img_yellowcar", "img_blackcar"]

export default class Bot{
    constructor(game){
        this.game = game;
        this.bots = game.bots;
        this.image =  document.getElementById(allBots[parseInt(Math.random()*6)])
        this.height = 128;
        this.width = 58;
        this.overlap = false;
        while(!this.overlap){
            this.x = botPositions[parseInt(Math.random()*3)];
            this.y = -Math.random()*600 - this.height; 
            this.overlap = canBotBeHere(this.bots, this);
        }
    }

    update(){
        bottomWallCollision(this.bots, this.game, this)
    }


    draw(ctx){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        this.y += this.game.gameSpeed;
    }
}