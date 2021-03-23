import { ImgComponent } from '../lib/ImgComponent.js'
import { Size } from '../lib/Size.js'
import { Source } from '../lib/Source.js'
import { Vector } from '../lib/Vector.js'


/**
 * dessiner la map des levels
 *      -positionner la map en fonction du niveau du player
 *      -créer les bouttons de levels (parties)
 *          -positionner par raport a la position de la map
 *          -créer en fonction de l'état de la partie(pas encore joué, déjà joué avec telle niveau de réussite)
 *      
 *      déclanche des Events pour les bouttons de partie
 * 
 */

export class Map extends EventTarget{
    constructor(game){
        super()
        this.game = game
        
        this.runPart = new Event("runPart")

        this.posYMap = 0
        this.posYMouse = 0

        this.mousedown = e => {
            this.startMove(this.scene.mousePosition(e))
        }

        this.touchstart = e => {
            this.startMove(this.scene.touchePosition(e))
        }

        this.mousemove = e => {
            if(e.buttons == 1){
                this.move(this.scene.mousePosition(e))
            }
        }

        this.touchmove = e => {
            this.move(this.scene.touchePosition(e))
        }
    }

    get scene(){
        return this.game.scene
    }

    get assetsBank(){
        return this.game.assetsBank
    }

    get levels(){
        return this.assetsBank.json.levels
    }

    skyPosition(name){
        let size = this.bgSize(name),
        y = name == 'sky1' ? this.scene.getComponent('sky1') ? this.scene.getComponent('sky1').position.y : 0 : this.scene.getComponent('sky1').position.y - size.height
        
        return new Vector(this.scene.center.x - (size.width / 2), y)
    }

    bgSize(name){
        let width = this.game.bgpercent(name) * this.assetsBank.img[name].width / 100
        return new Size(width, this.scene.size.height)
    }
    
    bgPosition(mapName){
        let size = this.bgSize(this.levels[mapName].ground),
        y = -(size.height * this.levels[mapName].map)

        if(this.scene.getComponent('map_1'))//les map sont créé
            y += this.scene.getComponent('map_1').position.y

        return new Vector(this.scene.center.x - (size.width / 2), y)
    }

    partSize(imgName, mapName){
        return this.game.percentsize(imgName, this.levels[mapName].asset)
    }

    partPosition(mapName, partNam){
        let posBtnPart = this.levels[mapName].parts[partNam].posBtnPart,
        map = this.scene.getComponent(mapName),
        imgName = 'btn_1',//info a recuperer dans les infos de gamer
        partSize = this.partSize(imgName, mapName),

        xPartielle = posBtnPart.x * map.size.width / 100,
        yPartielle = posBtnPart.y * map.size.height / 100

        return new Vector((map.position.x + xPartielle) - (partSize.width / 2), map.position.y + (yPartielle - (partSize.height / 2)))
    }

    numSize(mapName, part, i){
        let strPart = this.levels[mapName].parts[part].part.toString()

        return this.game.percentsize("num_"+strPart[i], this.levels[mapName].asset)
    }

    numPosition(mapName, part, i){
        let  size = this.numSize(mapName, part, i),
        btn = this.levels[mapName].parts[part].btnPart,
        centerXbtn = btn.position.x + (btn.size.width / 2),
        centerNum = (size.width * this.levels[mapName].parts[part].part.toString().length) / 2


        return new Vector((centerXbtn  + (size.width * i)) - centerNum , btn.position.y - size.height)
    }

    draw(){
        this.addSky()
        this.addGround()
        let keys = Object.keys(this.levels)
        keys.map((mapName) => {
            this.addPart(mapName)
        })
    }

    addSky(){
        this.scene.addComponent(new ImgComponent({
            name : 'sky1',
            scene: this.scene,
            image : this.assetsBank.img.sky1,
            position : this.skyPosition('sky1'),
            size : this.bgSize('sky1'),
            source : new Source ({
                size : new Size(this.assetsBank.img.sky1.width, this.assetsBank.img.sky1.height)
            })
        }))
        .addComponent(new ImgComponent({
            name : 'sky2',
            scene: this.scene,
            image : this.assetsBank.img.sky2,
            position : this.skyPosition('sky2'),
            size : this.bgSize('sky2'),
            source : new Source ({
                size : new Size(this.assetsBank.img.sky2.width, this.assetsBank.img.sky2.height)
            })
        }))
    }

    addGround(){
        for(let mapName in this.levels){
            let groundName = this.levels[mapName].ground,
            decoName = this.levels[mapName].deco,
            ground = new ImgComponent({
                name : mapName,
                scene: this.scene,
                image : this.assetsBank.img[groundName],
                position : this.bgPosition(mapName),
                size : this.bgSize(groundName),
                source : new Source ({
                    size : new Size(this.assetsBank.img[groundName].width, this.assetsBank.img[groundName].height)
                })
            }),
            deco = new ImgComponent({
                name : mapName+"_"+decoName,
                scene: this.scene,
                image : this.assetsBank.img[decoName],
                position : ground.position,
                size : ground.size,
                source : new Source ({
                    size : new Size(this.assetsBank.img[decoName].width, this.assetsBank.img[decoName].height)
                })
            })

            this.scene.addComponent(ground)
            .addComponent(deco)

        }
    }

    addPart(mapName){
        let parts = this.levels[mapName].parts

        for(let part in parts){
            let imgName = 'btn_1'//info a recuperer dans les infos de gamer

            parts[part].btnPart = new ImgComponent({
                name : "btn_" + parts[part].part,
                scene: this.scene,
                image : this.assetsBank.img[imgName],
                size : this.partSize(imgName, mapName),
                position : this.partPosition(mapName, part),
                source : new Source ({
                    size : new Size(this.assetsBank.img.btn_1.width, this.assetsBank.img.btn_1.height)
                })
            })

            this.scene.addComponent(parts[part].btnPart)

            this.num(mapName, part)
        }
    }

    num(mapName, part){

        let dataPart = this.levels[mapName].parts[part],
        strPart = dataPart.part.toString()

        dataPart.btnPart.num = []
        for(let i = 0;  i < strPart.length; i ++){
            dataPart.btnPart.num[i] = new ImgComponent({
                name : "num_"+strPart+"_"+i,
                scene: this.scene,
                image : this.assetsBank.img["num_"+strPart[i]],
                size : this.numSize(mapName, part, i),
                position : this.numPosition(mapName, part, i),
                source : new Source ({
                    tile : new Vector,
                    size : new Size(30, 48)
                })
            })
            
            this.scene.addComponent(dataPart.btnPart.num[i])
        }
    }

    evetHandler(){
        this.scene.canvas.addEventListener('mousedown', this.mousedown)

        this.scene.canvas.addEventListener('touchstart', this.touchstart)
        
        this.scene.canvas.addEventListener('mousemove', this.mousemove)
        
        this.scene.canvas.addEventListener('touchmove', this.touchmove)

        for(let mapName in this.levels){
            for(let part in this.levels[mapName].parts){
                this.levels[mapName].parts[part].btnPart.addEventListener('click',  e => {
                    this.runPart.dataPart = this.levels[mapName].parts[part]
                    this.dispatchEvent(this.runPart)
                })
            }
        }
    }

    removeEvet(){
        this.scene.canvas.removeEventListener('mousedown', this.mousedown)

        this.scene.canvas.removeEventListener('touchstart', this.touchstart)
        
        this.scene.canvas.removeEventListener('mousemove', this.mousemove)
        
        this.scene.canvas.removeEventListener('touchmove', this.touchmove)

        for(let mapName in this.levels){
            for(let part in this.levels[mapName].parts){
                this.levels[mapName].parts[part].btnPart.removeEventListener('click', e => {
                    this.runPart.dataPart = this.levels[mapName].parts[part]
                    this.dispatchEvent(this.runPart)
                })
            }
        }
    }

    startMove(evetPose){
        this.posYMap = this.scene.getComponent('map_1').position.y
        this.posYMouse = evetPose.y
    }

    move(evetPose){
        let map1 = this.scene.getComponent('map_1'),
        keys = Object.keys(this.levels),
        dif = evetPose.y - this.posYMouse

        if(this.posYMap + dif < 0){
            map1.position.y = 0
            this.scene.getComponent('sky1').position.y = 0
        }
            
        else if(this.posYMap + dif > map1.size.height * (keys.length - 1)){
            map1.position.y = map1.size.height * (keys.length - 1)
            this.scene.getComponent('sky2').position.y = 0
        }

        else{
            map1.position.y = this.posYMap + dif
            let totalSize = map1.size.height * (Object.keys(this.levels).length + 1),
            percent = 100 * (this.scene.getComponent('sky1').size.height * 2) / totalSize

            this.scene.getComponent('sky1').position.y = percent * map1.position.y / 100
        }
        
        this.resize()
    }

    resize(){
        let sky1 = this.scene.getComponent('sky1'),
        sky2 = this.scene.getComponent('sky2')

        sky1.size = this.bgSize('sky1')
        sky2.size = this.bgSize('sky2')

        sky1.position = this.skyPosition('sky1')
        sky2.position = this.skyPosition('sky2')

        for(let mapName in this.levels){
            let decoName = this.levels[mapName].deco,
            map = this.scene.getComponent(mapName),
            mapDeco = this.scene.getComponent(mapName+"_"+decoName),
            parts = this.levels[mapName].parts

            map.position = mapDeco.position = this.bgPosition(mapName)
            map.size = mapDeco.size = this.bgSize(this.levels[mapName].asset)

            for(let part in parts){
                let imgName = 'btn_1',//info a recuperer dans les infos de gamer
                strPart = parts[part].part.toString()

                parts[part].btnPart.position = this.partPosition(mapName, part)
                parts[part].btnPart.size = this.partSize(imgName, mapName)
                
                for(let i = 0;  i < strPart.length; i ++){
                    parts[part].btnPart.num[i].position = this.numPosition(mapName, part, i)
                    parts[part].btnPart.num[i].size = this.numSize(mapName, part, i)
                }
            }
        }
    }

    dispose(){
        this.scene
        .deleteComponent("sky1")
        .deleteComponent("sky2")

        for(let mapName in this.levels){
            let decoName = this.levels[mapName].deco
            this.scene
            .deleteComponent(mapName)
            .deleteComponent(mapName+"_"+decoName)

            for(let partName in this.levels[mapName].parts){
                this.scene.deleteComponent(this.levels[mapName].parts[partName].btnPart.name)
                this.levels[mapName].parts[partName].btnPart.num.map((num) => {
                    this.scene.deleteComponent(num.name)
                })
            }
        }
    }
}