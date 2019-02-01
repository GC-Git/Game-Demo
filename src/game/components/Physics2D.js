module.exports = function Physics2D(){
    this.x          = 100;
    this.old_x      = this.x;
    this.y          = 100;
    this.old_y      = this.y;
    this.velocity_x = 0;
    this.velocity_y = 0;
    this.speed      = .4;

    
    // Magic from stack overflow to get angle in degrees from velocities
    this.angle = function() {
        var addDeg = 0;
        if (this.velocity_x < 0)
            addDeg = this.velocity_y >= 0 ? 180 : 270;
        else if (this.velocity_y <= 0) addDeg = 360;

        let deg = Math.abs(Math.abs(Math.atan(this.velocity_y / this.velocity_x) * 180 / Math.PI) - addDeg)
        return deg;
    }

    this.direction = function(){
        let playerVel_X = this.velocity_x;
        let playerVel_Y = this.velocity_y;  

        // RIGHT
        if(playerVel_X > playerVel_Y && playerVel_X > -playerVel_Y){
            return 1;
        } // LEFT
        else if(-playerVel_X > playerVel_Y && -playerVel_X > -playerVel_Y){ 
            return 3
        } // DOWN
        else if(playerVel_Y > playerVel_X && playerVel_Y > -playerVel_X){
            return 2
        } // UP
        else if(-playerVel_Y > playerVel_X && -playerVel_Y > -playerVel_X){
            return 0
        } // DEFAULT (DOWN)
        else {return 2}
    }

    this.moveUp = function() {
        if(this.velocity_y <= 0 && this.y == this.old_y){
            this.velocity_y = -this.speed*15;
        }
    }

    this.moveDown = function() {
        this.velocity_y += this.speed;
    }

    this.moveRight = function() {
        if(this.velocity_y <= 0 && this.y == this.old_y){
            this.velocity_x += this.speed;            
        }
    }

    this.moveLeft = function() {
        if(this.velocity_y <= 0 && this.y == this.old_y){
            this.velocity_x -= this.speed;
        }    
    }
}