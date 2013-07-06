var renderer, stage, bg, birds, ticks, singer, singerStage, singerRenderer;

renderer = new PIXI.CanvasRenderer(CANVASWIDTH, CANVASHEIGHT);

document.getElementById('scene').appendChild(renderer.view);


stage = new PIXI.Stage();
stage.setInteractive(true);

bg    = new PIXI.Sprite(PIXI.Texture.fromImage("images/birdemic-poster.jpg"));

stage.addChild(bg);
birds = [];

singer = new Singer();
document.getElementById('singer-scene').appendChild(singer.renderer.view);

_(15).times(function(){
  var bird = new Bird();
  stage.addChild(bird);
  birds.push(bird);
})

requestAnimationFrame(animate);

ticks = 0;
function animate(){
  _.invoke(birds,'tick',ticks);
  renderer.render(stage);
  singer.render();
  requestAnimationFrame(animate);
  ticks++;
}


