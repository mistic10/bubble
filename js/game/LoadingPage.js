import { Size } from '../lib/Size.js'
import { Vector } from '../lib/Vector.js'
import { Source } from '../lib/Source.js'
import { ImgComponent } from '../lib/ImgComponent.js'

/**
 * -dessiner et metre a jour la page de chargement
 * -lance le chargement des assets
 * -déclancher un Event quant touts les assets sont charger
 * 
 */
export class LoadingPage extends EventTarget{
    constructor(game){
        super()
        this.game = game
        this.load = new Event("load")
        this.drawn = false
    }

    get scene(){
        return this.game.scene
    }

    get assetsBank(){
        return this.game.assetsBank
    }

    get bgMenuSize(){
        let width = this.game.bgpercent('bgMenu') * this.assetsBank.img.bgMenu.width / 100
        return new Size(width, this.scene.size.height)
    }

    get bgMenuPosition(){
        return new Vector(this.scene.center.x - (this.bgMenuSize.width / 2), 0)
    }

    get loadTextSize(){
        return new Size((this.scene.getComponent('bgMenu').size.width / 3) * 2, this.game.percentsize('loadText', 'bgMenu').height * 3)
    }

    get loadTextPosition(){
        return new Vector(this.scene.center.x - (this.loadTextSize.width / 2), (this.scene.size.height / 3) * 1.7)
    }

    get barPosition(){
        let loadText = this.scene.getComponent('loadText')
        return new Vector(this.scene.center.x - 100, (loadText.position.y + (loadText.size.height * 2)))
    }

    get bgLoadBarPosition(){
        return this.barPosition
    }

    get bgLoadBarSize(){
        return new Size(200, 20)
    }

    get loadBarPosition(){
        return this.barPosition
    }

    get loadBarSize(){
        return new Size(0, 20)
    }

    draw(){
        this.assetsBank.addEventListener('imgLoad', (e) => {
            if("bgMenu" in this.assetsBank.img && "loadText" in this.assetsBank.img && "bgLoadBar" in this.assetsBank.img && "loadBar" in this.assetsBank.img){
                if(this.assetsBank.img.bgMenu.width > 0 && this.assetsBank.img.loadText.width > 0 && this.assetsBank.img.bgLoadBar.width > 0 && this.assetsBank.img.loadBar.width > 0){
                    if(!this.drawn){
                        this.scene
                        .addComponent(this.asset('bgMenu'))
                        .addComponent(this.asset('loadText'))
                        .addComponent(this.asset('bgLoadBar'))
                        .addComponent(this.asset('loadBar'))

                        this.drawn = true
                    }
                    
                    this.endLoad()
                }
            }
        })

        this.assetsBank.addEventListener('jsonLoad', (e) => {
            if('levels' in this.assetsBank.json){
                for(let map in this.assetsBank.json.levels){
                    for(let partName in this.assetsBank.json.levels[map].parts){
                        let part = this.assetsBank.json.levels[map].parts[partName]
                        
                        let posBtnPart = new Vector(part.posBtnPart.x, part.posBtnPart.y)
                        this.assetsBank.json.levels[map].parts[partName].posBtnPart = posBtnPart
                    }
                }
            }

            if('conf' in this.assetsBank.json){
                for(let s in this.assetsBank.json.conf.sizeElem){
                    let size = new Size(this.assetsBank.json.conf.sizeElem[s].width, this.assetsBank.json.conf.sizeElem[s].height)
                    this.assetsBank.json.conf.sizeElem[s] = size
                }
            }
        })
        
        this.progress()
    }

    asset(name){
        let data = {
            name : name,
            scene: this.scene,
            size : this[name+'Size'],
            position : this[name+'Position'],
            source : new Source ({
                size : new Size(this.assetsBank.img[name].width, this.assetsBank.img[name].height)
            }),
            image : this.assetsBank.img[name]
        }

        return new ImgComponent(data)
    }

    resize(){
        let bgMenu = this.scene.getComponent('bgMenu'),
        loadText = this.scene.getComponent('loadText'),
        bgLoadBar = this.scene.getComponent('bgLoadBar'),
        loadBar = this.scene.getComponent('loadBar')

        bgMenu.size = this.bgMenuSize
        bgMenu.position = this.bgMenuPosition

        loadText.size = this.loadTextSize
        loadText.position = this.loadTextPosition

        bgLoadBar.position = this.barPosition
        loadBar.position = this.barPosition
    }

    endLoad(){
        if(this.assetsBank.percent == 100){
            this.scene.getComponent('loadBar').size.width = this.assetsBank.percent * 2
            
            if(this.assetsBank.complete){
                this.dispatchEvent(this.load)
            }
        }
    }

    progress(){
        this.assetsBank.addEventListener('imgProgress', (e) => {
            if(this.scene.hasComponent('loadBar')){
                this.scene.getComponent('loadBar').size.width = this.assetsBank.percent * 2
            }
        })
    }

    dispose(){
        this.scene.clearComponents()
    }
}