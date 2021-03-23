import { ImgComponent } from '../lib/ImgComponent.js'

export class Bubble extends ImgComponent{
    constructor(data){
        super(data)

        this.rayon = data.rayon
    }

    stopAnim(){
        this.beforDraw = undefined
        this.animations.deleteAnimation(this.animations.curentAnim)
        this.animations.curentAnim = undefined
    }

    intersection(bubble) {
        var dx = (this.position.x + this.rayon) - (bubble.position.x + bubble.rayon)
        var dy = (this.position.y + this.rayon) - (bubble.position.y + bubble.rayon)

        var len = Math.sqrt(dx * dx + dy * dy);
        
        if (len < this.rayon + bubble.rayon)
            return true
        
        return false
    }
}