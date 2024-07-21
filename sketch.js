var PLAY = 1;
var START = 0
var END = 0;
var gameState = PLAY;
var score = 0
var flappy,flappyImg,flappyflyImg
var backgroundImg,background1
var world,engine
var obstacle2Img
var obstacle1Img
var obstaclesGroup
var resetImg,reset
var gameOverImg,gameOver 
var Win
function preload() {
    backgroundImg = loadImage("background2.jpg")
    flappyImg = loadImage("FlappyBird.png")
    obstacle1Img = loadImage("obstacle1.png")
    obstacle2Img = loadImage("obstacle2.png")
    flappyflyImg = loadAnimation("FlappyBirdFly.png")
    gameOverImg = loadImage("gameOver.png")
    resetImg = loadImage("restart.png")
}
function setup(){
    createCanvas(600,400)
    background1 = createSprite(width/2,height/2,canvas.width,canvas.height)
    background1.addImage(backgroundImg)     
    background1.velocityX = -9
    flappy = createSprite(80,100,80,80)
    flappy.addImage(flappyImg);
    flappy.scale = 0.2
   
   obstaclesGroup = new Group();
    score = 0
    

}
function draw(){
   textSize(20); 
   fill("black")
   text("Score: "+ score,30,50);
   if(gameState === START){
    textSize(30);
    fill("black")
    text("Press up arrow key to start the game. have fun :)",200,200)
    flappy.velocityX = 0
    obstaclesGroup.velocityX = 0
    background1.velocityX = 0
     if(keyDown(UP_ARROW)){
      gameState = PLAY
     }}
   
    if(gameState === PLAY){
     flappy.velocityY = +5
      if(background1.x < 0 ){
        background1.x = background1.width/2;
      }
  if(keyDown(UP_ARROW)){
      flappy.velocityY = -5
      flappy.velocityX = +1
  }

  if(obstaclesGroup.isTouching(flappy)|| flappy.collide(obstaclesGroup)){
    gameState = END
  }
  if(flappy.x > 400){
    gameWon();
  }
    if(gameState  === END){
     flappy.velocityX = 0
     flappy.velocityY  = 0
     obstaclesGroup.velocityX = 0
  }
spawnObstacles();
createEdgeSprites();
 drawSprites();
    
}

function spawnObstacles() {
   if(frameCount % 20 === 0) {
     var obstacle = createSprite(600,50,20,30);
     obstacle.setCollider("rectangle",0,0,100,100)
     obstacle.debug = true
     obstacle.velocityX = -8
     var rand = Math.round(random(1,2));
     switch(rand) {
       case 1:
         obstacle.y = 50
         obstacle.addImage(obstacle1Img);
        break;
       case 2: 
       obstacle.y = 300
       obstacle.addImage(obstacle2Img);
               break;
       default: break;
     }           
     obstacle.scale = 0.9;
     obstacle.lifetime = 300;
     obstaclesGroup.add(obstacle);
   }
 }
 function gameWon (){
   swal({
    title:`You Won`,
    text:"Good Game",
    imageUrl:"https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
    imageSize:"100x100",
    confirmButtontext:"OK"
   })
 }
}
  
 
  



