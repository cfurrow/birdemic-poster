var renderer, stage, bg, birds, ticks, song, songPlaying, singer, singerStage, singerRenderer;

renderer = new PIXI.WebGLRenderer(CANVASWIDTH, CANVASHEIGHT);
singerRenderer = new PIXI.CanvasRenderer(230, 230);
document.getElementById('scene').appendChild(renderer.view);
document.getElementById('singer-scene').appendChild(singerRenderer.view);

stage = new PIXI.Stage();

bg    = new PIXI.Sprite(PIXI.Texture.fromImage("images/birdemic-poster.jpg"));

stage.addChild(bg);
birds = [];

singerStage = new PIXI.Stage();
singer = new Singer();
singerStage.addChild(singer);

_(15).times(function(){
  var bird = new Bird();
  stage.addChild(bird);
  birds.push(bird);
})

requestAnimationFrame(animate);

setupTheTunes();

ticks = 0;
function animate(){
  _.invoke(birds,'tick',ticks);
  renderer.render(stage);
  singerRenderer.render(singerStage);
  requestAnimationFrame(animate);
  ticks++;
}

function setupTheTunes(){
  song = new Audio('audio/waiting-for-a-bird.ogg');
  songPlaying = true;
  song.addEventListener('play', function() { songPlaying = true; setTimeout(function(){singer.sing.call(singer)},1100); } );
  song.addEventListener('pause', function() { songPlaying = false; singer.shutUp(); } );
  song.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
  }, false);
  song.play();

  setTimeout(function(){singer.sing.call(singer)},1100);
}

function toggleMusic(){
  if(songPlaying){
    song.pause();
  }
  else{
    song.currentTime = 0;
    song.play();
  }
}
