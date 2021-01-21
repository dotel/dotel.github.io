function collideBird(game, gameState, gap){
    let bird = game.bird;
    let pipes = game.pipes.pipes;
    pipes.forEach((pipe, index) =>{
        var topBarCollision = bird.x < pipe.x + game.pipes.width &&
            bird.x + bird.width > pipe.x &&
            bird.y < pipe.y + game.pipes.height &&
            bird.y + bird.height > pipe.y;
        var bottomBarCollision = bird.x < pipe.x + game.pipes.width &&
            bird.x + bird.width > pipe.x &&
            bird.y < pipe.y + game.pipes.height + gap &&
            bird.y + bird.height > pipe.y + gap;
        if(topBarCollision || bottomBarCollision){
            game.gameState = gameState.GAMEOVER;
        }
    })
    return false;
}

export {collideBird}