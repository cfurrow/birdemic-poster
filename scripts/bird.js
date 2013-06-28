function Bird() {

  var birdTexture = PIXI.Texture.fromImage("images/bird01_300x72.png");
  PIXI.Sprite.call(this,birdTexture);

  this.anchor.x = 0.5;
  this.anchor.y = 0.5;
  this.position.x = 300;
  this.position.y = 72;
  this.width = 300;
  this.height = 72;

  this.shakeAmount = 15;
  this.movement = {};
  this.movement.up = false;
  this.movement.right = false;
}
Bird.constructor = Bird;
Bird.prototype   = Object.create(PIXI.MovieClip.prototype);

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
