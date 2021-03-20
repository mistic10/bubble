import { EventComponent } from './EventComponent.js'
import { Vector } from './Vector.js'
import { Size } from './Size.js'

/**
 * @author vincent jeanvoine
 * @mail hypnolog@yahoo.fr
 * 
 * @version 0.0.1
 * 
 * @classdesc représente un objets image a afficher sur le canvas
 * @augments EventComponent
 */

export class ImgComponent extends EventComponent{
    /**
     * @param {Object} data - contient toutes les données de configuration de l'objet
     * @description constructor: crée un nouvel object 2d ImgComponent
     */
    constructor(data){
        super(data)

        //source 
        this.source = data.source

        this.image = data.image;
        this.image.addEventListener('load', (e) => {
            if(this.source.size.width == 0 && this.source.size.height == 0)
                this.source.size = new Size(this.image.width, this.image.height)

            if(typeof data.size == 'undefined')
                data.size = new Size(this.image.width, this.image.height)
            this.size = data.size
        })
    }

    /**
     * @description les données de l'image source
     * @member {Source}
     */
    set source(val = new Source){
        if(val.constructor.name != 'Source')
            throw new Error('"source" ' + this.msgErrorAfect + ' "Source"')
        this._source = val
    }

    get source(){
        return typeof this._source != 'undefined' ? this._source : new Source
    }

    /**
     * @description déssine l'object 2d "ImgComponent" (est appelé de manière automatique par la method Component.update)
     * @override
     * @method
     */
    draw(){
        this.transform()

        this.rotate()

        this.drawImage()
        
        this.resetTransform()
    }

    /**
     * @description prepare la position et l'inclinaison de l'objet pour le déssiner sur le canvas (est appelé de manière automatique par la method ImgComponent.draw)
     * @method
     */
    transform(){
        let inclinaison = this.inclinaison,
        position = this.position
        if(typeof this.animations.curent != 'undefined'){
            inclinaison = typeof this.animations.curent.inclinaison == 'function' ? this.animations.curent.inclinaison(this) : inclinaison
            position = typeof this.animations.curent.position == 'function' ? this.animations.curent.position(this) : position
        }

        this.scene.context.setTransform(
            1,
            inclinaison.x,
            inclinaison.y,
            1,
            position.x,
            position.y
        )
    }

    /**
     * @description prepare la rotate de l'objet pour le déssiner sur le canvas (est appelé de manière automatique par la method ImgComponent.draw)
     * @method
     */
    rotate(){
        let angle = this.angle.rad
        if(typeof this.animations.curent != 'undefined'){
            angle = typeof this.animations.curent.angle == 'function' ? this.animations.curent.angle(this) : angle
        }

        this.scene.context.translate(this.axe.x, this.axe.y)
        this.scene.context.rotate(angle)
        this.scene.context.translate(-this.axe.x, -this.axe.y)
    }

    /**
     * @description déssiner l'objet 2d  sur le canvas (est appelé de manière automatique par la method ImgComponent.draw)
     * @method
     */
    drawImage(){
        let size = this.size,
        sourcePos = new Vector(
            this.source.tile.x > 0 ? this.source.size.width * this.source.tile.x : this.source.position.x > 0 ? this.source.position.x : 0,
            this.source.tile.y > 0 ? this.source.size.height * this.source.tile.y : this.source.position.y > 0 ? this.source.position.y : 0
        )


        if(typeof this.animations.curent != 'undefined'){
            size = typeof this.animations.curent.size == 'function' ? this.animations.curent.size(this) : size
        }


        this.scene.context.drawImage(
            this.image,
            sourcePos.x,
            sourcePos.y,
            this.source.size.width,
            this.source.size.height,
            0,// la position est placer dans "transform"
            0,
            size.width,
            size.height
        )
    }

    /**
     * @description restor les transformation après avoir déssiné l'object 2d (est appelé de manière automatique par la method ImgComponent.draw)
     * @method
     */
    resetTransform(){
        this.scene.context.setTransform(1, 0, 0, 1, 0, 0)
    }
}