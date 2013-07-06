function Singer(){
  var texture = PIXI.Texture.fromImage("images/singer-bg.jpg"),
      mouthTexture = PIXI.Texture.fromImage("images/singer-jaw.png"),
      stage, renderer;

  PIXI.Sprite.call(this,texture);

  this.renderer = new PIXI.CanvasRenderer(230, 230);
  this.stage = new PIXI.Stage();
  this.stage.setInteractive(true);

  this.INITIAL_MOUTH_Y = 87;
  
  this.mouthSprite  = new PIXI.Sprite(mouthTexture);
  this.mouthSprite.position.x = 95;
  this.mouthSprite.position.y = this.INITIAL_MOUTH_Y;

  this.addChild(this.mouthSprite);

  this.singing = false;
  this.width = 230;
  this.height = 230;
  this.position.x = 0; 
  this.position.y = 0; 

  this.buttonMode  = true;
  this.setInteractive(true);
  this.hitArea     = PIXI.Rectangle(0,0,this.width,this.height);

  this.setupTheTunes();
  this.stage.addChild(this);
}

Singer.constructor = Singer;
Singer.prototype   = Object.create(PIXI.Sprite.prototype);

Singer.prototype.sing = function()
{
  var self, downs, ups, i, len, timeoutIds;
  self = this;
  timeoutIds = [];
  this.singing = true;

  function upEvent(){
    self.closeMouth();
  }
  function downEvent(){
    self.openMouth();
  }

  // Relative ms offsets of when space was pressed 'down' and let 'up' during listening of "waiting for a bird" song
  // * generated from custom js script that listened for the key down/up events
  downs = [0, 213, 493, 805, 2548, 2845, 3156, 3740, 3957, 5069, 5340, 5676, 6277, 7173, 7468, 9220, 9533, 9820, 10148, 11956, 12212, 12508, 13052, 13308, 14444, 14732, 15132, 15676, 16524, 16844, 18605, 18876, 19188, 19516, 21892, 22852, 23276, 23740, 24284, 25077, 25396, 27164, 27828, 28124, 29844, 30156, 30420, 31172, 31444, 32676, 32988, 33308, 33868, 34732, 35060];
  ups   = [92, 316, 604, 1412, 2684, 2956, 3636, 3828, 4628, 5180, 5444, 5972, 6940, 7276, 8732, 9348, 9652, 9924, 11244, 12060, 12324, 12940, 13156, 14164, 14548, 14852, 15340, 16236, 16636, 18244, 18708, 18988, 19292, 20636, 22412, 23132, 23412, 23836, 24844, 25188, 26644, 27676, 27924, 29059, 29948, 30259, 30907, 31268, 32484, 32787, 33108, 33611, 34548, 34852, 36459];  
  
  i     = 0;
  len   = downs.length;
  for(;i<len;i++){
    timeoutIds.push( setTimeout(downEvent,downs[i]) );
  }
  
  i   = 0;
  len = ups.length
  for(;i<len;i++){
    timeoutIds.push( setTimeout(upEvent,ups[i]) );
  }
  this.timeoutIds = timeoutIds;
}

Singer.prototype.shutUp = function(){
  this.singing = false;
  var i = 0, len = this.timeoutIds.length;
  for(;i<len;i++){
    clearTimeout(this.timeoutIds[i]);
  }
}

Singer.prototype.openMouth = function(){
  if(this.singing){
    this.mouthSprite.position.y = this.INITIAL_MOUTH_Y + 10;
  }
}

Singer.prototype.closeMouth = function(){
  if(this.singing){
    this.mouthSprite.position.y = this.INITIAL_MOUTH_Y;
  }
}

Singer.prototype.click = function(){
  
}

Singer.prototype.setupTheTunes = function(){
  var self = this, songUrl;
  this.song = new Audio();
  if(Modernizr.audio.mp3){
    songUrl = 'audio/waiting-for-a-bird.mp3';
  }
  else if(Modernizr.audio.ogg){
    songUrl = 'audio/waiting-for-a-bird.ogg';
  }
  else{
   songUrl = 'audio/waiting-for-a-bird.m4a';
  }
  this.song.src = songUrl;
  songPlaying = false;
  function playCallback(){
    songPlaying = true; 
    setTimeout(function(){self.sing.call(self)},1100); 
  }
  function pauseCallback(){
    songPlaying = false; self.shutUp();
  }
  this.song.addEventListener('play', playCallback );
  this.song.addEventListener('pause', pauseCallback );
  this.song.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
  }, false);

}

Singer.prototype.toggleMusic = function(){
  var stopMusic, text, on, off;
  stopMusic = document.getElementById('music');
  text      = stopMusic.getElementsByTagName('p')[0];
  on = "Turn off music";
  off = "Turn on music";
  if(songPlaying){
    this.song.pause();
    text.innerHTML = off;
  }
  else{
    if(this.song.currentTime !== 0){
      this.song.currentTime = 0;
    }
    this.song.play();
    text.innerHTML = on;
  }
}

Singer.prototype.render = function()
{
  this.renderer.render(this.stage);
}
