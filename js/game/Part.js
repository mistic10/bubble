import { ImgComponent } from '../lib/ImgComponent.js'
import { Size } from '../lib/Size.js'
import { Source } from '../lib/Source.js'
import { Vector } from '../lib/Vector.js'

import { Gun } from './Gun.js'
import { Grid } from './Grid.js'

export class Part{
    constructor(game, data){
        this.game = game
        this.data = data

        this.gun = new Gun(this.game)
        this.grid = new Grid(this.game)

        this.mousemove = e => {
            this.gun.trackMouse(this.scene.mousePosition(e))
        }

        this.touchmove = e => {
            this.gun.trackMouse(this.scene.touchePosition(e))
        }

        this.click = e => {
            console.log('envoi de:')
            console.log(this.gun.bubble1)
            console.log('sur l\'angle')
            console.log(this.gun.angle)
        }
    }

    get scene(){
        return this.game.scene
    }

    get assetsBank(){
        return this.game.assetsBank
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
        this.grid.draw()
    }

    evetHandler(){
        this.scene.canvas.addEventListener('mousemove', this.mousemove)
        this.scene.canvas.addEventListener('touchmove', this.touchmove)

        this.scene.canvas.addEventListener('click', this.click)
    }

    resize(){
        let bgPart = this.scene.getComponent('bgPart'),
        tail = this.scene.getComponent('tail')

        bgPart.size = this.bgSize("bgPart")
        bgPart.position = this.bgPosition()

        tail.size = new Size(bgPart.size.width, bgPart.size.height / 4)
        tail.position = new Vector(bgPart.position.x, (bgPart.position.y + bgPart.size.height) - (bgPart.size.height / 4))

        this.gun.resize()
        this.grid.resize()
    }

    dispose(){

    }
}