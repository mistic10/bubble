
/**
 * @author vincent jeanvoine
 * @mail hypnolog@yahoo.fr
 * 
 * @version 0.0.1
 * 
 * @classdesc reprsente une animation d'un objet 2d "Component"
 */

export class Animation{
    /**
     * @description constructor: crée une nouvelle animation
     */
    constructor(data){
        this.data = data
    }

    /**
     * @description position a ajouter a Component par frame
     * @member {Vector}
     * @readonly
     */
    get position(){
        return this.data.position
    }

    /**
     * @description inclinaison a ajouter a Component par frame
     * @member {Angle}
     * @readonly
     */
    get angle(){
        return this.data.angle
    }

    /**
     * @description inclinaison a ajouter a Component par frame
     * @member {Vector}
     * @readonly
     */
    get inclinaison(){
        return this.data.inclinaison
    }

    /**
     * @description inclinaison a ajouter a Component par frame
     * @member {Size}
     * @readonly
     */
    get size(){
        return this.data.size
    }
}