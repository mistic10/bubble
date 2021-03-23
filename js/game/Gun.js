import { ImgComponent } from '../lib/ImgComponent.js'
import { Size } from '../lib/Size.js'
import { Source } from '../lib/Source.js'
import { Vector } from '../lib/Vector.js'
import { Angle } from '../lib/Angle.js'

export class Gun{
    constructor(game){
        this.game = game
        

        this.scene.canvas.addEventListener('mousemove', (e) => {
            let gun = this.scene.getComponent('gun'),
            backGun = this.scene.getComponent('backGun'),
            pos = this.scene.mousePosition(e),
            angle = Math.atan2((gun.position.y + (gun.size.height / 2)) - pos.y, pos.x - (gun.position.x + gun.size.width / 2)) - Math.PI / 2

            
            if(angle < -(Math.PI /3) && angle > -(Math.PI + .001))
                angle = -(Math.PI /3)

            if(angle > Math.PI /3 ||  angle < -(Math.PI) && angle > -(Math.PI + (Math.PI/2)))
                angle = Math.PI / 3
            
            gun.angle.value = - angle
            backGun.angle.value = gun.angle.value
        })
    }

    get scene(){
        return this.game.scene
    }

    get assetsBank(){
        return this.game.assetsBank
    }

    draw(){
        let size = this.game.percentsize('gun', 'bgPart'),
        angle = new Angle,
        position = this.gunPosition()

        this.scene
        .addComponent(new ImgComponent({
            name : "shadowGun",
            scene: this.scene,
            image : this.assetsBank.img.shadowGun,
            size : this.game.percentsize('shadowGun', 'bgPart'),
            position : this.shadowGunPosition(),
            source : new Source ({
                size : new Size(this.assetsBank.img.shadowGun.width, this.assetsBank.img.shadowGun.height)
            })
        }))
        .addComponent(new ImgComponent({
            name : "footGun",
            scene: this.scene,
            image : this.assetsBank.img.footGun,
            size : this.game.percentsize('footGun', 'bgPart'),
            position : this.footGunPosition(),
            source : new Source ({
                size : new Size(this.assetsBank.img.footGun.width, this.assetsBank.img.footGun.height)
            })
        }))
        .addComponent(new ImgComponent({
            name : "fileGun",
            scene: this.scene,
            image : this.assetsBank.img.fileGun,
            size : this.game.percentsize('fileGun', 'bgPart'),
            position : this.fileGunPosition(),
            source : new Source ({
                size : new Size(this.assetsBank.img.fileGun.width, this.assetsBank.img.fileGun.height)
            })
        }))
        .addComponent(new ImgComponent({
            name : "inGun",
            scene: this.scene,
            image : this.assetsBank.img.inGun,
            size : this.game.percentsize('inGun', 'bgPart'),
            position : this.inGunPosition(),
            source : new Source ({
                size : new Size(this.assetsBank.img.inGun.width, this.assetsBank.img.inGun.height)
            })
        }))
        .addComponent(new ImgComponent({
            name : "backGun",
            scene: this.scene,
            image : this.assetsBank.img.backGun,
            size : this.game.percentsize('backGun', 'bgPart'),
            position : position,
            axe : new Vector(size.width / 2, (size.height / 3) * 2),
            angle : angle,
            source : new Source ({
                size : new Size(this.assetsBank.img.backGun.width, this.assetsBank.img.backGun.height)
            })
        }))//ici les bules
        .addComponent(new ImgComponent({
            name : "gun",
            scene: this.scene,
            image : this.assetsBank.img.gun,
            size : size,
            position : position,
            axe : new Vector(size.width / 2, (size.height / 3) * 2),
            angle : angle,
            source : new Source ({
                size : new Size(this.assetsBank.img.gun.width, this.assetsBank.img.gun.height)
            })
        }))

    }

    gunPosition(){
        let tail = this.scene.getComponent('tail'),
        size = this.game.percentsize('gun', 'bgPart')

        return new Vector(this.scene.center.x - (size.width / 2), tail.position.y + ((tail.size.height / 3) - size.height))
    }

    fileGunPosition(){
        return new Vector(this.scene.center.x, this.gunPosition().y + (this.game.percentsize('gun', 'bgPart').height - (this.game.percentsize('fileGun', 'bgPart').height / 3)))
    }

    inGunPosition(){
        return new Vector(this.scene.center.x - (this.game.percentsize('inGun', 'bgPart').width / 2), this.gunPosition().y + ((this.game.percentsize('gun', 'bgPart').height / 3) * 2) - (this.game.percentsize('inGun', 'bgPart').height / 2))
    }

    footGunPosition(){
        return new Vector(this.scene.center.x - (this.game.percentsize('footGun', 'bgPart').width / 2), this.gunPosition().y + ((this.game.percentsize('gun', 'bgPart').height / 3) * 2))
    }

    shadowGunPosition(){
        return new Vector(this.scene.center.x - (this.game.percentsize('shadowGun', 'bgPart').width / 2), this.footGunPosition().y + this.game.percentsize('footGun', 'bgPart').height - (this.game.percentsize('shadowGun', 'bgPart').height / 2))
    }

    resize(){
        let gun = this.scene.getComponent('gun'),
        backGun = this.scene.getComponent('backGun'),
        fileGun = this.scene.getComponent('fileGun'),
        inGun = this.scene.getComponent('inGun'),
        footGun = this.scene.getComponent('footGun'),
        shadowGun = this.scene.getComponent('shadowGun')

        gun.size = this.game.percentsize('gun', 'bgPart')
        gun.position = this.gunPosition()
        gun.axe = new Vector(gun.size.width / 2, (gun.size.height / 3) * 2)

        backGun.size = this.game.percentsize('backGun', 'bgPart')
        backGun.position = gun.position
        backGun.axe = new Vector(gun.size.width / 2, (gun.size.height / 3) * 2)

        fileGun.size = this.game.percentsize('fileGun', 'bgPart')
        fileGun.position = this.fileGunPosition()

        inGun.size = this.game.percentsize('inGun', 'bgPart')
        inGun.position = this.inGunPosition()

        footGun.size = this.game.percentsize('footGun', 'bgPart')
        footGun.position = this.footGunPosition()

        shadowGun.size = this.game.percentsize('shadowGun', 'bgPart')
        shadowGun.position = this.shadowGunPosition()
    }

    dispose(){
    }
}