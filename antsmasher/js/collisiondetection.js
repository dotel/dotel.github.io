function canStartHere(ants, ant) {
    var temp = true;
    for (var i = 0; i < ants.length; i++) {
        if (doesItCollide(ant, ants[i])) {
            temp = false;
        }
    }
    return temp;
}

function doesItCollide(ant1,ant2) {
    var temp = false;
    var dx = ant1.x - ant2.x;
    var dy = ant1.y - ant2.y;
    var distance = (dx * dx + dy * dy);
    if (distance <= Math.pow((ant1.radius + ant2.radius), 2) ) {
        temp = true;
    }
    return temp;
   }

function collide(ants) {
        var ant;
        var testAnt;
        for (var i = 0; i < ants.length; i++) {
            ant = ants[i];
            for (var j = i+1; j < ants.length; j++) {
                testAnt = ants[j];
                if (doesItCollide(ant,testAnt)) {
                  collideAnts(ant,testAnt);
                }
            }
        }
    }

function collideAnts(ant1,ant2) {
        var dx = ant1.x - ant2.x;
        var dy = ant1.y - ant2.y;

        var collisionAngle = Math.atan2(dy, dx);

        var speed1 = Math.sqrt(ant1.dx * ant1.dx +
            ant1.dy * ant1.dy);
        var speed2 = Math.sqrt(ant2.dx * ant2.dx +
        ant2.dy * ant2.dy);


        var direction1 = Math.atan2(ant1.dy, ant1.dx);
        var direction2 = Math.atan2(ant2.dy, ant2.dx);

        var velocityx_1 = speed1 * Math.cos(direction1 - collisionAngle)
        var velocityy_1 = speed1 * Math.sin(direction1 - collisionAngle)
        var velocityx_2 = speed2 * Math.cos(direction2 - collisionAngle)
        var velocityy_2 = speed2 * Math.sin(direction2 - collisionAngle)


        var final_velocityx_1 = ((ant1.mass - ant2.mass) * velocityx_1 +
        (ant2.mass + ant2.mass) * velocityx_2)/(ant1.mass + ant2.mass);
        var final_velocityx_2 = ((ant1.mass + ant1.mass) * velocityx_1 +
        (ant2.mass - ant1.mass) * velocityx_2)/(ant1.mass + ant2.mass);
    
        var final_velocityy_1 = velocityy_1;
        var final_velocityy_2 = velocityy_2

        ant1.dx = Math.cos(collisionAngle) * final_velocityx_1 + 
            Math.cos(collisionAngle + Math.PI/2) * final_velocityy_1;
        ant1.dy = Math.sin(collisionAngle) * final_velocityx_1 + 
                Math.sin(collisionAngle + Math.PI/2) * final_velocityy_1;
        ant2.dx = Math.cos(collisionAngle) * final_velocityx_2 + 
                Math.cos(collisionAngle + Math.PI/2) * final_velocityy_2;
        ant2.dy = Math.sin(collisionAngle) * final_velocityx_2 + 
                Math.sin(collisionAngle + Math.PI/2) * final_velocityy_2;

        ant1.x += ant1.dx;
        ant1.y += ant1.dy;
        ant2.x += ant2.dx;
        ant2.x += ant2.dy;
}

export {canStartHere, doesItCollide, collide, collideAnts}