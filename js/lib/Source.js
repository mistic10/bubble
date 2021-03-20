import { Vector } from './Vector.js'
import { Size } from './Size.js'

/**
 * @author vincent jeanvoine
 * @mail hypnolog@yahoo.fr
 * 
 * @version 0.0.1
 * 
 * @classdesc représente les données utile a l'exploitation d'une image source
 */

export class Source {
    /**
     * @param  {Object} data - les données
     * @description constructor: crée des nouvelles données d'image source
     */
    constructor(data){
        this.msgErrorAfect = 'doit être un objet de la class'

        for(let key in data){
            this[key] = data[key]
        }
    }

    /**
     * @description position du coin superieur gauche a partire du quel l'image doit être exploité (seulement si tile n'est pas définit)
     * @member {Vector}
     */
    set position(val = new Vector){
        if(val.constructor.name != 'Vector')
            throw new Error('"position" ' + this.msgErrorAfect + ' "Vector"')
        this._position = val
    }

    get position(){
        return typeof this._position != 'undefined' ? this._position : new Vector
    }

    /**
     * @description position de la tuile a afficher en "Vector" {x : ligne, y : colone} (découpage de l'image en tileset)
     * @member {Vector}
     */
    set tile(val = new Vector){
        if(val.constructor.name != 'Vector')
            throw new Error('"tile" ' + this.msgErrorAfect + ' "Vector"')
        this._tile = val
    }

    get tile(){
        return typeof this._tile != 'undefined' ? this._tile : new Vector
    }

    /**
     * @description les dimensions de la tuile de tileset si "tile" est définit, si non dimensions de la portion d'image a exploiter (donne la position du coin inférieur droit)
     * @member {Size}
     */
    set size(val = new Size){
        if(val.constructor.name != 'Size')
            throw new Error('"size" ' + this.msgErrorAfect + ' "Size"')
        this._size = val
    }

    get size(){
        return typeof this._size != 'undefined' ? this._size : new Size
    }

}