var dog,sadDog,happyDog;
var foodObj;
var foodstock, foods;
var fedtime, lastfeed, feed, addfood;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}



function setup() {
  database = firebase.database()
  createCanvas(1000,400);
 
  foodObj = new Food();

  foodstock = database.ref('Food');
  foodstock.on("value", readStock);
  
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed = createButton("feed the dog");
  feed.position(800, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("add the food");
  addFood.position(800,95);
  addFood.mousePressed(addFood);


}

function draw() {
  background(46,139,87);

  foodObj.display();

  fedtime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  })
  fill("orange");
  textSize(13);
  if (lastFed >= 12) {
    text("Last Feed: " + lastFed %12 + "PM", 350, 30);
  }
  else if(lastFed == 0) {
    text("Last Feed: 12AM", 350, 30);
  }
  else {
    text("Last Feed: " + lastFed + "AM", 350,30);
  }

  drawSprites();
}

//function to read food Stock
function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

//function to update food stock and last fed time
function feedDog() {
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime : hour()
  })
}

//function to add food in stock
function addFoods() {
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}
