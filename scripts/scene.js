var renderer, stage, bg, birds, ticks, song, songPlaying;

renderer = new PIXI.WebGLRenderer(CANVASWIDTH, CANVASHEIGHT);
document.getElementById('scene').appendChild(renderer.view);

stage = new PIXI.Stage();
bg    = new PIXI.Sprite(PIXI.Texture.fromImage("images/birdemic-poster.jpg"));
stage.addChild(bg);
birds = [];

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
  requestAnimationFrame(animate);
  ticks++;
}

function setupTheTunes(){
  song = new Audio('audio/waiting-for-a-bird.ogg');
  songPlaying = true;
  song.addEventListener('play', function() { songPlaying = true } );
  song.addEventListener('pause', function() { songPlaying = false } );
  song.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
  }, false);
  song.play();
}

function toggleMusic(){
  if(songPlaying){
    song.pause();
  }
  else{
    song.play();
  }
}
