// The controller is how the user interacts with the model and world

module.exports = class Controller{
    constructor() {
        this.down  = new Controller.ButtonInput();
        this.left  = new Controller.ButtonInput();
        this.right = new Controller.ButtonInput();
        this.up    = new Controller.ButtonInput();

        // Bindings for when we need to reference this class. Sets 'this' to this class.
        this.handleKeyDownUp =  this.handleKeyDownUp.bind(this)
        this.keyDownUp =        this.keyDownUp.bind(this)
    }
    

    keyDownUp(event){
        var down = (event.type == "keydown") ? true : false;
        switch(event.keyCode) {

            case 37: this.left.getInput(down);  break;
            case 38: this.up.getInput(down);    break;
            case 39: this.right.getInput(down); break;
            case 40: this.down.getInput(down);
        }
    }

    handleKeyDownUp(event){
        this.keyDownUp(event);
    }



    static get ButtonInput(){
        return ButtonInput;
    }

}

class ButtonInput{
    constructor(){
        this.active = this.down = false;
    }

    getInput(down){
        if (this.down != down) this.active = down;
        this.down = down;    
    }
}