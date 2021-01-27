var fruit1 , fruit2 , fruit3 , fruit4 ;
var sword;
var alien1,alien2;
var score;

var PLAY=1;
var END=0;
var gameState=PLAY;
var monsterImage, enemy, enemyGroup;

function preload(){
  
 fruit1Image = loadImage("fruit1.png");
 fruit2Image = loadImage("fruit2.png");
 fruit3Image = loadImage("fruit3.png");
 fruit4Image = loadImage("fruit4.png");
 swordImage=loadImage("sword.png");
monsterImage=loadAnimation("alien1.png","alien2.png")
  gameOverImage = loadImage("gameover.png")
  
  KnifeSound = loadSound("knifeSwooshSound.mp3");
  gameOverSound = loadSound("gameover.mp3");
}

function setup(){
  createCanvas(600,600);
  
  sword=createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale=0.6;
  
  sword.setCollider("rectangle",0,0,40,40);
  
  score=0;
  
  fruitGroup=new Group();
  enemyGroup=new Group();
  
}

function draw(){
  
  background("lightblue");
  
   if (gameState===PLAY){
      
     sword.x=World.mouseX;
     sword.y=World.mouseY;
     
      SpawnFruits();
      SpawnEnemy();
     
       text("Score"+score,300,30);
     
     if(fruitGroup.isTouching(sword)){
       KnifeSound.play();
       fruitGroup.destroyEach();
       score=score+2;
     }
     
     
       if(enemyGroup.isTouching(sword)){
         gameOverSound.play();
       gameState=END;
     }
       
       if(gameState===END){
         enemyGroup.setVelocityXEach(0);
         enemyGroup.destroyEach();
         fruitGroup.setVelocityXEach(0);
         fruitGroup.destroyEach();
         sword.addImage(gameOverImage);
         sword.x=250;
         sword.y=250;
       }
     
   }
 
  
drawSprites();

}
function SpawnFruits (){
    if(frameCount%80===0){
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1Image);
    } else if (r == 2) {
      fruit.addImage(fruit2Image);
    } else if (r == 3) {
      fruit.addImage(fruit3Image);
    } else {
      fruit.addImage(fruit4Image);
    }
    
    fruit.y=Math.round(random(50,340));
   
    fruit.velocityX=-7;
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
   
    }
}
   
   

function SpawnEnemy (){
  if (frameCount % 200===0){
     monster=createSprite(400,200,20,02);
        monster.addAnimation("moving", monsterImage);
        monster.y=Math.round(random (100,300));
        monster.velocityX=-8;
        monster.setLifeTime=300;
        enemyGroup.add(monster);
  }
}