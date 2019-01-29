module.exports = function Animation(frameSet, delay){
    this.count = 0; // A counter to compare against the delay
    this.delay = 15; // How long between animation frames
    this.frame = 0; // The value of the current frame
    this.frameIndex = 0; // The current spot in the frame set
    this.frameSet = [0]; // In the assemblage, this should be a set of frames from a sprite sheet.

    this.change = function(frameSet, delay=15){
        // Check if the frame set is the same as the frame set being passed in.
        if(this.frameSet != frameSet){
            this.count = 0;
            this.delay = delay;
            this.frameIndex = 0;
            this.frameSet = frameSet;
            this.frame = this.frameSet[this.frameIndex]
        }
    }

    this.update = function(){
        this.count++;

        if(this.count >= this.delay){
            this.count = 0;
            /* If the frame index is on the last value in the frame set, reset to 0.
            If the frame index is not on the last value, just add 1 to it. 
            Source: Line 59 - https://github.com/frankarendpoth/frankarendpoth.github.io/blob/master/content/pop-vlog/javascript/2017/025-animation/animation.js */
            this.frameIndex = (this.frameIndex == this.frameSet.length - 1) ? 0 : this.frameIndex + 1;
            this.frame = this.frameSet[this.frameIndex];
        }
    }
}