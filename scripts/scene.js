 var renderer = new PIXI.WebGLRenderer(CANVASWIDTH, CANVASHEIGHT);
document.getElementById('scene').appendChild(renderer.view);

var stage = new PIXI.Stage();
var bird  = new Bird();
stage.addChild(bird);

requestAnimationFrame(animate);

var ticks = 0;
function animate(){
  // move, place birds in stage
  bird.tick(ticks);
  renderer.render(stage);
  requestAnimationFrame(animate);
  ticks++;
}
