 var renderer = new PIXI.WebGLRenderer(CANVASWIDTH, CANVASHEIGHT);
document.getElementById('scene').appendChild(renderer.view);

var stage = new PIXI.Stage();
var birds = [];

_(10).times(function(){
  var bird = new Bird();
  stage.addChild(bird);
  birds.push(bird);
})

requestAnimationFrame(animate);

var ticks = 0;
function animate(){
  _.invoke(birds,'tick',ticks);
  renderer.render(stage);
  requestAnimationFrame(animate);
  ticks++;
}
