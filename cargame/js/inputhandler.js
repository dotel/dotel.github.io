
export default class InputHanlder{
    constructor(game){
        document.addEventListener("keydown", event => {
            switch (event.key) {
          
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
                case 'Enter':
                        console.log(game)
                        game.reset();
                        game.start();
                    break;
            }
        })
    }
}