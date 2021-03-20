/**
 * @author vincent jeanvoine
 * @mail hypnolog@yahoo.fr
 * 
 * @version 0.0.1
 * 
 * @classdesc représente une coordonnée 2d
 */

export class Vector {
    /**
     * @param {Number} x - coordonnée sur l'axe "x"
     * @param {Number} y - coordonnée sur l'axe "y"
     * @description constructor: crée une nouvelle coordonnée 2d
     */
    constructor(x = 0, y = 0){
        this.x = x
        this.y = y
    }
}