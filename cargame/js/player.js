
let botPositions = [120, 270, 420]
export default class Player{
    constructor(id){
        this.width = 58;
        this.height = 128;
        this.image = document.getElementById("img_maincar");
        this.x = botPositions[parseInt(Math.random()*2)];
        this.y = 750;
    }

    update(){

    }

    draw(ctx){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }

    moveRight(){
        this.x += 150;
    }

    moveLeft(){
        this.x -= 150;
    }
}