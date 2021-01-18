function fillCircle (ctx,x,y,r) {
    // ctx.clearRect(0, 0, 800, 800);
    ctx.beginPath();
    ctx.arc (x,y,r,0,2*Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.closePath();
  };

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}



export {fillCircle, getRandomArbitrary}