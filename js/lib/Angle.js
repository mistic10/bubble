
/**
 * @author vincent jeanvoine
 * @mail hypnolog@yahoo.fr
 * 
 * @version 0.0.1
 * 
 * @classdesc représente un angle sur le canvas
 */

export class Angle{
    
    /**
     * @param  {Number} value=0 - valeur de l'angle
     * @param  {String} unite='rad' - l'unitée de mesure a utiliser rad/deg pour (radien/degré)
     * @description constructor: crée un nouvel angle
     */
    constructor(value = 0, unite = 'rad'){
        this.unite = unite
        this.value = value
    }

    /**
     * @description unité de mesure de l'angle. "rad" par défault, ou "deg"
     * @member {String}
     */
    set unite(val){
         this._unite = val == 'rad' || val == 'deg' ? val : 'rad'
    }

    get unite(){
        return typeof this._unite == 'string' ? this._unite : 'rad'
    }

    /**
     * @description valeur de l'angle
     * @member {Number}
     */
    set value(val = 0){
        if(typeof val != "number")
            throw new Error('La valeur de l\'angle doit être de type number')

        this._value =  val
    }

    get value(){
        return this._value
    }

    /**
     * @description valeur de l'angle en degrés
     * @member {Number}
     * @readonly
     */
    get deg() {
        return this.unite == 'rad' ? this.value * (180 / Math.PI) : this.value
    }

    /**
     * @description valeur de l'angle en radian
     * @member {Number}
     * @readonly
     */
    get rad() {
        return this.unite == 'deg' ? this.value * (Math.PI / 180) : this.value
    }
}