import { ImgComponent } from '../lib/ImgComponent.js'
import { Size } from '../lib/Size.js'
import { Source } from '../lib/Source.js'
import { Vector } from '../lib/Vector.js'

import { Gun } from './Gun.js'

export class Part{
    constructor(game, data){
        this.game = game
        this.data = data

        console.log(this.data);

        this.gun = new Gun(this.game)
    }

    get scene(){
        return this.game.scene
    }

    get assetsBank(){
        return this.game.assetsBank
    }

    get grid(){
        return this.data.grid
    }

    bgSize(name){
        let width = this.game.bgpercent(name) * this.assetsBank.img[name].width / 100
        return new Size(width, this.scene.size.height)
    }
    
    bgPosition(){
        let size = this.bgSize("bgPart")
        return new Vector(this.scene.center.x - (size.width / 2), 0)
    }

    draw(){
        let bgSize = this.bgSize("bgPart"),
        bgPosition = this.bgPosition()

        this.scene
        .addComponent(new ImgComponent({
            name : "bgPart",
            scene: this.scene,
            image : this.assetsBank.img.bgPart,
            size : bgSize,
            position : bgPosition,
            source : new Source ({
                size : new Size(this.assetsBank.img.bgPart.width, this.assetsBank.img.bgPart.height)
            })
        }))
        .addComponent(new ImgComponent({
            name : "tail",
            scene: this.scene,
            image : this.assetsBank.img.tail,
            size : new Size(bgSize.width, bgSize.height / 4),
            position : new Vector(bgPosition.x, (bgPosition.y + bgSize.height) - (bgSize.height / 4)),
            source : new Source ({
                size : new Size(this.assetsBank.img.tail.width, this.assetsBank.img.tail.height)
            })
        }))
        
        this.gun.draw()
        this.gun.evetHandler()
    }

    resize(){
        let bgPart = this.scene.getComponent('bgPart'),
        tail = this.scene.getComponent('tail')

        bgPart.size = this.bgSize("bgPart")
        bgPart.position = this.bgPosition()

        tail.size = new Size(bgPart.size.width, bgPart.size.height / 4)
        tail.position = new Vector(bgPart.position.x, (bgPart.position.y + bgPart.size.height) - (bgPart.size.height / 4))

        this.gun.resize()
    }

    dispose(){

    }
}