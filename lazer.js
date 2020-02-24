function Lazer(x, y, velocity, alien, color) {
  this.position = createVector(x, y);
  this.velocity = velocity;
  this.color = color; 
  this.alien = alien;  
  this.onScreen = true;
}

Lazer.prototype.update = function(ships) {
	this.position.y += this.velocity;
	for(var j = 0; j < ships.length; j++){
		if(this.hits(ships[j]) && this.alien != ships[j].alien){
			ships[j].intact = false;
			this.onScreen = false;
			return;
		}
	}
	this.onScreen = !(this.position.y < 0 || this.position.y > height);
};

Lazer.prototype.draw = function() {
  stroke(this.color);
  strokeWeight(5);
  point(this.position.x, this.position.y);
};

Lazer.prototype.hits = function(saucer) {
	var d = dist(this.position.x, this.position.y, saucer.position.x, saucer.position.y);
    return (d < saucer.size);
};