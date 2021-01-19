function canStartHere(balls, ball) {
    var temp = true;
    for (var i = 0; i < balls.length; i++) {
        if (doesItCollide(ball, balls[i])) {
            temp = false;
        }
    }
    return temp;
}

function doesItCollide(ball1,ball2) {
    var temp = false;
    var dx = ball1.x - ball2.x;
    var dy = ball1.y - ball2.y;
    var distance = (dx * dx + dy * dy);
    if (distance <= Math.pow((ball1.radius + ball2.radius), 2) ) {
        temp = true;
    }
    return temp;
   }

function collide(balls) {
        var ball;
        var testBall;
        for (var i = 0; i < balls.length; i++) {
            ball = balls[i];
            for (var j = i+1; j < balls.length; j++) {
                testBall = balls[j];
                if (doesItCollide(ball,testBall)) {
                  collideBalls(ball,testBall);
                }
            }
        }
    }

function collideBalls(ball1,ball2) {
        var dx = ball1.x - ball2.x;
        var dy = ball1.y - ball2.y;

        var collisionAngle = Math.atan2(dy, dx);



        var speed1 = Math.sqrt(ball1.dx * ball1.dx +
            ball1.dy * ball1.dy);
        var speed2 = Math.sqrt(ball2.dx * ball2.dx +
        ball2.dy * ball2.dy);

        
        //Direction vectors to consider direction of balls
        var direction1 = Math.atan2(ball1.dy, ball1.dx);
        var direction2 = Math.atan2(ball2.dy, ball2.dx);

        var velocityx_1 = speed1 * Math.cos(direction1 - collisionAngle)
        var velocityy_1 = speed1 * Math.sin(direction1 - collisionAngle)
        var velocityx_2 = speed2 * Math.cos(direction2 - collisionAngle)
        var velocityy_2 = speed2 * Math.sin(direction2 - collisionAngle)


        var final_velocityx_1 = ((ball1.mass - ball2.mass) * velocityx_1 +
        (ball2.mass + ball2.mass) * velocityx_2)/(ball1.mass + ball2.mass);
        var final_velocityx_2 = ((ball1.mass + ball1.mass) * velocityx_1 +
        (ball2.mass - ball1.mass) * velocityx_2)/(ball1.mass + ball2.mass);
    
        var final_velocityy_1 = velocityy_1;
        var final_velocityy_2 = velocityy_2

        ball1.dx = Math.cos(collisionAngle) * final_velocityx_1 + 
            Math.cos(collisionAngle + Math.PI/2) * final_velocityy_1;
        ball1.dy = Math.sin(collisionAngle) * final_velocityx_1 + 
                Math.sin(collisionAngle + Math.PI/2) * final_velocityy_1;
        ball2.dx = Math.cos(collisionAngle) * final_velocityx_2 + 
                Math.cos(collisionAngle + Math.PI/2) * final_velocityy_2;
        ball2.dy = Math.sin(collisionAngle) * final_velocityx_2 + 
                Math.sin(collisionAngle + Math.PI/2) * final_velocityy_2;

        ball1.x += ball1.dx;
        ball1.y += ball1.dy;
        ball2.x += ball2.dx;
        ball2.x += ball2.dy;
}

export {canStartHere, doesItCollide, collide, collideBalls}