var assets = [];

addImage('bird01_300x72.png');
addImage('birdemic-poster.jpg');
addImage('leonardmaltin.jpg');
addImage('panda01.jpg');
addImage('panda02.jpg');
addImage('rogerebert.jpg');
addImage('scheer.jpg');
addImage('singer-bg.jpg');
addImage('singer-jaw.png');

var loader = new PIXI.AssetLoader(assets);
loader.load();  


function addImage(url)
{
  var baseUrl = 'images/';
  assets.push(baseUrl + url);
}

