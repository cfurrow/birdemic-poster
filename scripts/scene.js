var renderer, stage, bg, birds, ticks, song, songPlaying, singer, singerStage, singerRenderer;

renderer = new PIXI.CanvasRenderer(CANVASWIDTH, CANVASHEIGHT);
singerRenderer = new PIXI.CanvasRenderer(230, 230);
document.getElementById('scene').appendChild(renderer.view);
document.getElementById('singer-scene').appendChild(singerRenderer.view);

stage = new PIXI.Stage();
stage.setInteractive(true);

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
  var songUrl;
  song = new Audio();
  if(Modernizr.audio.mp3){
    songUrl = 'audio/waiting-for-a-bird.mp3';
  }
  else if(Modernizr.audio.ogg){
    songUrl = 'audio/waiting-for-a-bird.ogg';
  }
  else{
   songUrl = 'audio/waiting-for-a-bird.m4a';
  }
  song.src = songUrl;
  songPlaying = false;
  song.addEventListener('play', function() { songPlaying = true; setTimeout(function(){singer.sing.call(singer)},1100); } );
  song.addEventListener('pause', function() { songPlaying = false; singer.shutUp(); } );
  song.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
  }, false);

}

function toggleMusic(){
  var stopMusic, text, on, off;
  stopMusic = document.getElementById('music');
  text      = stopMusic.getElementsByTagName('p')[0];
  on = "Turn off music";
  off = "Turn on music";
  console.log('togglemusic()')
  if(songPlaying){
    song.pause();
    text.innerHTML = off;
  }
  else{
    if(song.currentTime !== 0){
      song.currentTime = 0;
    }
    song.play();
    text.innerHTML = on;
  }
}
