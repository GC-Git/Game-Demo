module.exports = function Physics2D(){
    this.x          = 100;
    this.y          = 100;
    this.velocity_x = 0;
    this.velocity_y = 0;
    this.speed = .4;

    
    // Magic from stack overflow to get angle in degrees from velocities
    this.angle = function() {
        var addDeg = 0;
        if (this.velocity_x < 0)
            addDeg = this.velocity_y >= 0 ? 180 : 270;
        else if (this.velocity_y <= 0) addDeg = 360;

        let deg = Math.abs(Math.abs(Math.atan(this.velocity_y / this.velocity_x) * 180 / Math.PI) - addDeg)
        return deg;
    }

    this.update = function() {
        this.x += this.velocity_x;
        this.y += this.velocity_y;
    }

    this.moveUp = function() {
        this.velocity_y -= this.speed;
    }

    this.moveDown = function() {
        this.velocity_y += this.speed;
    }

    this.moveRight = function() {
        this.velocity_x += this.speed;
    }

    this.moveLeft = function() {
        this.velocity_x -= this.speed;
    }
}