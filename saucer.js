function  Saucer(x, y, size, shape, color, alien) {
  this.position = createVector(x, y);
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);
  this.size = size;
  this.shape = shape;
  this.color = color;
  this.alien = alien; 
  this.cooldown = 30; 
  this.intact = true; 
  this.onScreen = true; 
  this.lazers = [];  
}

Saucer.prototype.update = function(allShips) {
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.position.x = constrain(this.position.x, 0, width);
  this.acceleration = createVector(0, 0); 
  this.velocity.mult(0.7); 

  for(var i = this.lazers.length - 1; i >= 0; i--){
  	if(this.lazers[i].onScreen){
  	  this.lazers[i].update(allShips);
      this.lazers[i].draw();
  	} else{
  		this.lazers.splice(i, 1); 
        continue;
  	}
  }
  this.onScreen = (this.position.y + this.size < height);
  this.cooldown++;
};

Saucer.prototype.draw = function() {
  stroke(255);
  strokeWeight(3);
  fill(this.color);
  var step = TWO_PI / this.shape; 
  beginShape();
  for(var i = PI; i < TWO_PI + PI; i += step){
  	var x = (sin(i) * this.size) + this.position.x;
    var y = (cos(i) * this.size) + this.position.y;
	vertex(x, y);
  }
  endShape(CLOSE);
};

Saucer.prototype.shoot = function() {
	if(this.cooldown > COOLDOWN){
		var x = this.position.x;
		var	y = this.position.y;
		var trajectory = (this.alien) ? 3 : -3;
		var lazer = new Lazer(x, y, trajectory, this.alien, randomColor());
	    this.lazers.push(lazer);
	    this.cooldown = 0;
	}
};

Saucer.prototype.move = function(x, y) {
	this.acceleration = createVector(x, y);
};