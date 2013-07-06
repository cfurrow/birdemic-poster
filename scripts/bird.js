function Bird() {

  var birdTexture = PIXI.Texture.fromImage("images/bird01_300x72.png");
  PIXI.Sprite.call(this,birdTexture);

  this.anchor.x = 0.5;
  this.anchor.y = 0.5;

  this.position.x = Math.random()*CANVASWIDTH;
  this.position.y = Math.random()*CANVASHEIGHT;
  
  this.width = 200;
  this.height = 55;

  this.shakeAmount = 15;
  this.movement = {};
  this.movement.up = false;
  this.movement.right = false;

  this.setInteractive(true);
  this.buttonMode = true;
  this.hitArea    = new PIXI.Rectangle(-(this.width/2),-(this.height/2),this.width,this.height);

  this.loadSound();
}
Bird.constructor = Bird;
Bird.prototype   = Object.create(PIXI.MovieClip.prototype);

Bird.prototype.loadSound = function(){
  this.sound = new Audio();
  if(Modernizr.audio)
  {
    if(Modernizr.audio.mp3){
      this.sound.src = 'audio/bird.mp3';
    }
    else if(Modernizr.audio.ogg){
      this.sound.src = 'audio/bird.ogg';
    }
    else{
      this.sound.src = 'audio/bird.m4a';
    }  
  }
}

Bird.prototype.tick = function(ticks){
  if(ticks % 5 === 0){
    if(this.movement.up){
      this.position.y += Math.random() * this.shakeAmount * -1;
    }
    else{
     this.position.y += Math.abs(Math.random() * this.shakeAmount); 
    }
    if(this.movement.right){
      this.position.x += Math.abs(Math.random() * this.shakeAmount);  
    }
    else{
      this.position.x += -Math.abs(Math.random() * this.shakeAmount);   
    }
  }

  if(this.position.x > CANVASWIDTH){
    this.movement.right = false;
  }
  else if(this.position.x < 0){
    this.movement.right = true;
  }
  if(this.position.y > CANVASHEIGHT){
    this.movement.up = true;
  }
  else if(this.position.y < 0){
    this.movement.up = false;
  }
}

Bird.prototype.click = function(){
  this.sound.play();
}
