var mouthOpen = false,
    words = ["I've", "been", "waiting", "for", "a", "girl", "like", "you", "to", "come", "into", "my", "life", "I've", "been", "waiting", "for", "a", "girl", "like", "you,", "your", "loving", "will", "survive", "I've", "been", "waiting", "for", "someone", "new", "to", "make", "me", "feel", "alive", "Yeah,", "waiting", "for", "a", "girl", "like", "you", "to", "come", "into", "my", "life"],
    len   = words.length,
    i     = 0;

function Singer(){
  var texture = PIXI.Texture.fromImage("images/singer-bg.jpg");
  var mouthTexture = PIXI.Texture.fromImage("images/singer-jaw.png");

  this.INITIAL_MOUTH_Y = 87;
  
  this.mouthSprite  = new PIXI.Sprite(mouthTexture);
  this.mouthSprite.position.x = 95;
  this.mouthSprite.position.y = this.INITIAL_MOUTH_Y;

  PIXI.Sprite.call(this,texture);

  this.addChild(this.mouthSprite);

  this.singing = false;
  this.width = 230;
  this.height = 230;
  this.position.x = 0; //CANVASWIDTH - this.width;
  this.position.y = 0; //CANVASHEIGHT - this.height;
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
