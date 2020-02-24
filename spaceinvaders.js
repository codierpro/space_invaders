const COOLDOWN = 30; 
var shuttle; 
var score;
var aliens = []; 
var speed;
var movement; 

function setup() {
	createCanvas(600, 400);
	shuttle = new Saucer(width / 2, height - 20, 20, 3, "#FFFFFF", false);
	aliens = initializeFleet(10, 1, 20);
	score = 0;
	speed = 0.01;
	movement = 0;
	textAlign(CENTER);
}

function draw(){
  background(51);
  handleAliens();
  handleLevel();
  handleShuttle();
  handleKeys();
  drawScore();
}

function handleAliens(){
	var xChange = sin(movement * 0.01);
	var yChange = (Math.abs(xChange) < 0.1) ? random(speed * 25) : 0; 
	for(var i = aliens.length - 1; i >= 0; i--){
		if(random() < aliens[i].shape * 0.001){
			aliens[i].shoot();
		}
		if(aliens[i].intact){
			aliens[i].move(sin(movement * 0.01) * 0.3, yChange);
	        aliens[i].update(aliens.concat(shuttle));
	        aliens[i].draw();

	        if(!aliens[i].onScreen){
	        	endGame();
	        } 
	        } else{
	        	score += (aliens[i].alien) ? aliens[i].shape : 0;
	        	aliens.splice(i, 1);
		}
		
	}
	movement++;
}

function handleShuttle(){
	shuttle.update(aliens.concat(shuttle));
	 shuttle.draw();
	  if (!shuttle.intact) {
	    endGame();
	  }
}

function handleLevel(){
	if(aliens.length < 1){
		speed += 0.01;
		aliens = initializeFleet(10, speed * 100, 20);
		movement = 0;
	}
}

function handleKeys(){
	if(keyIsDown(LEFT_ARROW))
		shuttle.move(-1, 0);
	if(keyIsDown(RIGHT_ARROW))
		shuttle.move(1, 0);
}

function keyPressed(){
	if(keyCode === 32){
		shuttle.shoot();
	}
}

function randomColor(){
	return color(random(255), random(255), random(255));
}

function initializeFleet(rows, cols, size){
	var fleet = []; 
    var yOffset = height / 2;
    for(var x = 0; x < rows; x++){
    	for(var y = 0; y < cols; y++){
    		var xPosition = x * size * 2 + size;
			var yPosition = yOffset - (y * size * 2);
			var shape = Math.floor(random(9)) + 3;
			var saucer = new Saucer(xPosition, yPosition, size, shape, randomColor(), true);
			fleet.push(saucer);
    	}
    }
    return fleet;
}

function drawScore(){
	textSize(35);
    fill(255);
    noStroke();
    text(score, width / 2, 40);
}

function endGame(){
  noLoop();
  textSize(100);
  fill(255);
  noStroke();
  text("Game Over!", width / 2, height / 2);
}