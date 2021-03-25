import { ImgComponent } from '../lib/ImgComponent.js'
import { Size } from '../lib/Size.js'
import { Source } from '../lib/Source.js'
import { Vector } from '../lib/Vector.js'

import { Bubble } from './Bubble.js'

export class Grid{
    constructor(game){
        this.game = game
        this.marge = 8
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

    draw(){
        let l = 0
        for(let line of this.part.data.grid){
            let c = 0
            for(let bubble of line){

                if(bubble){
                    let type = bubble,
                    assetName = 'bubble'+type,
                    size = this.game.percentsize(assetName, 'bgPart'),
                    bg = this.scene.getComponent('bgPart'),
                    decal = line.length < 12 ? size.width / 2 : 0

                    this.part.data.grid[l][c] = new Bubble({
                        name : 'b_'+l+'_'+c,
                        type : type,
                        scene: this.scene,
                        image : this.assetsBank.img[assetName],
                        size : size,
                        position : new Vector((bg.position.x + this.marge + decal) + (size.width * c), size.height * l),
                        source : new Source ({
                            size : new Size(this.assetsBank.img[assetName].width, this.assetsBank.img[assetName].height)
                        })
                    })
                    
                    this.scene
                    .addComponent(this.part.data.grid[l][c])
                }
                c ++
            }
            l ++
        }
    }

    resize(){
        let bg = this.scene.getComponent('bgPart'),
        l = 0

        for(let line of this.part.data.grid){
            let c = 0
            for(let bubble of line){
                if(typeof bubble == 'object' && bubble.constructor.name == 'Bubble'){
                    bubble.size = this.game.percentsize('bubble'+bubble.type, 'bgPart')
                    let decal = line.length < 12 ? bubble.size.width / 2 : 0
                    bubble.position = new Vector((bg.position.x + this.marge + decal) + (bubble.size.width * c), (bubble.size.height * l) - this.marge)
                }
                c ++
            }
            l ++
        }
    }
}