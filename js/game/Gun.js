import { ImgComponent } from '../lib/ImgComponent.js'
import { Size } from '../lib/Size.js'
import { Source } from '../lib/Source.js'
import { Vector } from '../lib/Vector.js'
import { Angle } from '../lib/Angle.js'

import { Bubble } from './bubble.js'

export class Gun{
    constructor(game){
        this.game = game

        this.angle = new Angle

        this.mousemove = e => {
            this.trackMouse(e)
        }
    }

    get scene(){
        return this.game.scene
    }

    get assetsBank(){
        return this.game.assetsBank
    }

    get part(){
        return this.game.part
    }

    get gunPosition(){
        let tail = this.scene.getComponent('tail'),
        size = this.game.percentsize('gun', 'bgPart')

        return new Vector(this.scene.center.x - (size.width / 2), tail.position.y + ((tail.size.height / 3) - size.height))
    }

    get fileGunPosition(){
        return new Vector(this.scene.center.x, this.gunPosition.y + (this.game.percentsize('gun', 'bgPart').height - (this.game.percentsize('fileGun', 'bgPart').height / 3)))
    }

    get inGunPosition(){
        return new Vector(this.scene.center.x - (this.game.percentsize('inGun', 'bgPart').width / 2), this.gunPosition.y + ((this.game.percentsize('gun', 'bgPart').height / 3) * 2) - (this.game.percentsize('inGun', 'bgPart').height / 2))
    }

    get footGunPosition(){
        return new Vector(this.scene.center.x - (this.game.percentsize('footGun', 'bgPart').width / 2), this.gunPosition.y + ((this.game.percentsize('gun', 'bgPart').height / 3) * 2))
    }

    get shadowGunPosition(){
        return new Vector(this.scene.center.x - (this.game.percentsize('shadowGun', 'bgPart').width / 2), this.footGunPosition.y + this.game.percentsize('footGun', 'bgPart').height - (this.game.percentsize('shadowGun', 'bgPart').height / 2))
    }

    get bubble1Position(){
        return new Vector(this.scene.center.x - (this.game.percentsize('bubble1', 'bgPart').width / 2), this.gunPosition.y - (this.game.percentsize('bubble1', 'bgPart').height / 2))
    }

    get bubble2Position(){
        return new Vector(this.scene.center.x - (this.game.percentsize('bubble2', 'bgPart').width / 2), this.gunPosition.y + ((this.game.percentsize('gun', 'bgPart').height / 3) * 1.9) - (this.game.percentsize('bubble2', 'bgPart').height / 2))
    }

    draw(){
        let size = this.game.percentsize('gun', 'bgPart')

        this.bubble1 = new Bubble({
            name : "bubble1",
            scene: this.scene,
            image : this.assetsBank.img.bubble1,
            size : this.game.percentsize('bubble1', 'bgPart'),
            position : this.bubble1Position,
            angle : this.angle,
            axe : new Vector(this.game.percentsize('bubble1', 'bgPart').width / 2, (size.height / 3) * 2.5),
            source : new Source ({
                size : new Size(this.assetsBank.img.bubble1.width, this.assetsBank.img.bubble1.height)
            })
        })

        this.bubble2 = new Bubble({
            name : "bubble2",
            scene: this.scene,
            image : this.assetsBank.img.bubble2,
            size : this.game.percentsize('bubble2', 'bgPart'),
            position : this.bubble2Position,
            angle : this.angle,
            axe : new Vector(this.game.percentsize('bubble2', 'bgPart').width / 2, (this.game.percentsize('bubble2', 'bgPart').height / 1.75)),
            source : new Source ({
                size : new Size(this.assetsBank.img.bubble2.width, this.assetsBank.img.bubble2.height)
            })
        })


        this.scene
        .addComponent(new ImgComponent({
            name : "shadowGun",
            scene: this.scene,
            image : this.assetsBank.img.shadowGun,
            size : this.game.percentsize('shadowGun', 'bgPart'),
            position : this.shadowGunPosition,
            source : new Source ({
                size : new Size(this.assetsBank.img.shadowGun.width, this.assetsBank.img.shadowGun.height)
            })
        }))
        .addComponent(new ImgComponent({
            name : "footGun",
            scene: this.scene,
            image : this.assetsBank.img.footGun,
            size : this.game.percentsize('footGun', 'bgPart'),
            position : this.footGunPosition,
            source : new Source ({
                size : new Size(this.assetsBank.img.footGun.width, this.assetsBank.img.footGun.height)
            })
        }))
        .addComponent(new ImgComponent({
            name : "fileGun",
            scene: this.scene,
            image : this.assetsBank.img.fileGun,
            size : this.game.percentsize('fileGun', 'bgPart'),
            position : this.fileGunPosition,
            source : new Source ({
                size : new Size(this.assetsBank.img.fileGun.width, this.assetsBank.img.fileGun.height)
            })
        }))
        .addComponent(new ImgComponent({
            name : "inGun",
            scene: this.scene,
            image : this.assetsBank.img.inGun,
            size : this.game.percentsize('inGun', 'bgPart'),
            position : this.inGunPosition,
            source : new Source ({
                size : new Size(this.assetsBank.img.inGun.width, this.assetsBank.img.inGun.height)
            })
        }))
        .addComponent(new ImgComponent({
            name : "backGun",
            scene: this.scene,
            image : this.assetsBank.img.backGun,
            size : this.game.percentsize('backGun', 'bgPart'),
            position : this.gunPosition,
            axe : new Vector(size.width / 2, (size.height / 3) * 2),
            angle : this.angle,
            source : new Source ({
                size : new Size(this.assetsBank.img.backGun.width, this.assetsBank.img.backGun.height)
            })
        }))//ici les bules
        .addComponent(this.bubble1)
        .addComponent(this.bubble2)
        .addComponent(new ImgComponent({
            name : "gun",
            scene: this.scene,
            image : this.assetsBank.img.gun,
            size : size,
            position : this.gunPosition,
            axe : new Vector(size.width / 2, (size.height / 3) * 2),
            angle : this.angle,
            source : new Source ({
                size : new Size(this.assetsBank.img.gun.width, this.assetsBank.img.gun.height)
            })
        }))

    }


    evetHandler(){
        this.scene.canvas.addEventListener('mousemove', this.mousemove)
    }

    removeEvet(){
        this.scene.canvas.removeEventListener('mousemove', this.mousemove)
    }

    trackMouse(e){
        let gun = this.scene.getComponent('gun'),
        backGun = this.scene.getComponent('backGun'),
        bubble1 = this.scene.getComponent('bubble1'),
        bubble2 = this.scene.getComponent('bubble2'),
        pos = this.scene.mousePosition(e),
        angle = Math.atan2((gun.position.y + (gun.size.height / 2)) - pos.y, pos.x - (gun.position.x + gun.size.width / 2)) - Math.PI / 2

        
        if(angle < -(Math.PI /3) && angle > -(Math.PI + .001))
            angle = -(Math.PI /3)

        if(angle > Math.PI /3 ||  angle < -(Math.PI) && angle > -(Math.PI + (Math.PI/2)))
            angle = Math.PI / 3
        
        this.angle.value = - angle
        
        gun.angle = this.angle
        backGun.angle = this.angle
        bubble1.angle = this.angle
        bubble2.angle = this.angle
    }

    resize(){
        let gun = this.scene.getComponent('gun'),
        backGun = this.scene.getComponent('backGun'),
        fileGun = this.scene.getComponent('fileGun'),
        inGun = this.scene.getComponent('inGun'),
        footGun = this.scene.getComponent('footGun'),
        shadowGun = this.scene.getComponent('shadowGun'),
        bubble1 = this.scene.getComponent('bubble1'),
        bubble2 = this.scene.getComponent('bubble2')

        gun.size = this.game.percentsize('gun', 'bgPart')
        gun.position = this.gunPosition
        gun.axe = new Vector(gun.size.width / 2, (gun.size.height / 3) * 2)

        backGun.size = this.game.percentsize('backGun', 'bgPart')
        backGun.position = gun.position
        backGun.axe = new Vector(gun.size.width / 2, (gun.size.height / 3) * 2)

        fileGun.size = this.game.percentsize('fileGun', 'bgPart')
        fileGun.position = this.fileGunPosition

        inGun.size = this.game.percentsize('inGun', 'bgPart')
        inGun.position = this.inGunPosition

        footGun.size = this.game.percentsize('footGun', 'bgPart')
        footGun.position = this.footGunPosition

        shadowGun.size = this.game.percentsize('shadowGun', 'bgPart')
        shadowGun.position = this.shadowGunPosition

        bubble1.size = this.game.percentsize('bubble1', 'bgPart')
        bubble1.position = this.bubble1Position
        bubble1.axe = new Vector(this.game.percentsize('bubble1', 'bgPart').width / 2, (gun.size.height / 3) * 2.5)

        bubble2.size = this.game.percentsize('bubble2', 'bgPart')
        bubble2.position = this.bubble2Position
        bubble2.axe =  new Vector(this.game.percentsize('bubble2', 'bgPart').width / 2, (this.game.percentsize('bubble2', 'bgPart').height / 1.75))
    }

    dispose(){
    }
}