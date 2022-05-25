var canvas;
var backgroundImage;
var bgImg;
var database;
var form, player;
var playerCount;
var contjog;
var estadojg;
var jogs;

var carbran;
var carpre;
var pista;

var spribran;
var spripre;

var cars = [];

var dog;
var pneu;
var cone;
var gasolina;
var coin;

var groupcoin;
var groupgaso;
var groupobst;

var heart;

function preload() {
  backgroundImage = loadImage("assets/planodefundo.png");
  carbran = loadImage ("car1.png");
  carpre = loadImage ("car4.png");
  pista = loadImage ("track.jpg");

  dog = loadImage ("doguinho.png");
  pneu = loadImage ("obstacle2.png");
  cone = loadImage ("obstacle1.png");
  gasolina = loadImage ("fuel.png");
  coin = loadImage ("goldCoin.png");

  heart = loadImage ("heart.png");
 

}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
 game.pegar ();
  
  game.start();

}

function draw() {
  background(backgroundImage);

  if (contjog == 2){
    game.atualizar (1);
  }

  if (estadojg == 1){
    game.play ();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
