import Bot from "./bot.js";
const GAMESTATE = {
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    NEWLEVEL: 4
  };

function canBotBeHere(bots, bot) {
   for (var i = 0; i < bots.length; i++) {
        if (doesItCollide(bot, bots[i])) {
            return false;
        }
    }
    return true;
}

function doesItCollide(bot1, bot2){
    var temp = false;
    if(bot1.x == bot2.x) return true;
    
    var tempBot2Height = bot2.height + 20;
    var tempBot1Height = bot1.height + 20;
    if (bot1.y < bot2.y + tempBot2Height &&
        bot1.y + tempBot1Height > bot2.y) {
        temp = true;
    }

    return temp;
}

function bottomWallCollision(bots, game, bot){
    if(bot.y  >= game.gameHeight){
        const index = bots.indexOf(bot);
        bots.splice(index, 1);
        setTimeout(() => {
            bots.push(new Bot(game))
        }, 400)
        game.score++;
    }
}

function collideCars(game){
    game.bots.forEach(bot => {
        if(playerCollision(bot, game.player)){
            let highscore = localStorage.getItem("highscore");
            highscore = game.score > highscore? game.score: highscore;
            localStorage.setItem("highscore", highscore)
            game.gameState = GAMESTATE.GAMEOVER;
        }
    })
}
function playerCollision(bot, player){
    if (bot.x < player.x + player.width &&
        bot.x + bot.width > player.x &&
        bot.y < player.y + player.height &&
        bot.y + bot.height > player.y) {
         return true;
     }
     return false;     
}

export {canBotBeHere, bottomWallCollision, collideCars}