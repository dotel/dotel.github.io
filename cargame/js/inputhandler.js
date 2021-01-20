const GAMESTATE = {
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    NEWLEVEL: 4
  };
export default class InputHanlder{
    constructor(game){
        document.addEventListener("keydown", event => {
            switch (event.key) {
              case 'Enter':
                game.start();
                break;
          
                case 'ArrowRight' :
                    case 'd':
                    if(game.player.x < 400)
                    game.player.moveRight();
                    break;

                case 'ArrowLeft':
                    case 'a':
                    if(game.player.x > 120)
                    game.player.moveLeft();
                    break;
                case ' ':
                    if(game.gameState === GAMESTATE.GAMEOVER)
                    game.start();
                    break;
            }
        })
    }
}