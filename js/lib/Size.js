
/**
 * @author vincent jeanvoine
 * @mail hypnolog@yahoo.fr
 * 
 * @version 0.0.1
 * 
 * @classdesc représente une taille en pixel
 */

export class Size {
    /**
     * @param {Number} width - nombres de pixel en largeur
     * @param {Number} height - nombres de pixel en hauteur
     * @description constructor: crée une nouvelle taille (dimention d'un objet 2d)
     */
    constructor(width = 0, height = 0){
        this.width = width
        this.height = height
    }
}