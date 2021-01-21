
export default class InputHanlder{
    constructor(game, gameState){
            document.getElementById("gameScreen").addEventListener("click", () => {            
                if(game.gameState == gameState.RUNNING)    
                    game.bird.jump();  
            })

        }
}
