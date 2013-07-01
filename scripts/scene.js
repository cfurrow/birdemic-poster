var renderer, stage, bg, birds, ticks;

renderer = new PIXI.WebGLRenderer(CANVASWIDTH, CANVASHEIGHT);
document.getElementById('scene').appendChild(renderer.view);

stage = new PIXI.Stage();
bg    = new PIXI.Sprite(PIXI.Texture.fromImage("images/birdemic_mayhem.jpg"));
stage.addChild(bg);
birds = [];

_(10).times(function(){
  var bird = new Bird();
  stage.addChild(bird);
  birds.push(bird);
})

requestAnimationFrame(animate);

var song = new Audio('audio/waiting-for-a-bird.ogg');
song.play();
song.addEventListener('ended', function() {
  this.currentTime = 0;
  this.play();
}, false);

ticks = 0;
function animate(){
  _.invoke(birds,'tick',ticks);
  renderer.render(stage);
  requestAnimationFrame(animate);
  ticks++;
}
