import { Animation } from './Animation.js'

/**
 * @author vincent jeanvoine
 * @mail hypnolog@yahoo.fr
 * 
 * @version 0.0.1
 * 
 * @classdesc gère une colection d'animations pour un objet 2d "Component"
 */

export class Animations{
    /**
     * @description constructor: crée une nouvelle colection d'animations
     */
    constructor(){
        this.as = {}//colection d'animation
        /**
         * @var {String} - nom de l'animation en cour
         */
        this.curentAnim = undefined//animation en cour
    }

    /**
     * @param  {String} name - nom de l'animation
     * @param  {Object} data - données de l'animation
     * @description ajout d'une animation a la colection
     * @method
     */
    add(name, data){
        if(this.hasAnimation(name))
            return
            
        this.setAnimation(name, data)
    }

    /**
     * @param  {String} name - nom de l'animation
     * @param  {Object} data - noelle données de l'animation
     * @description modiffication d'une animation
     * @method
     */
    setAnimation(name, data){
        this.deleteAnimation(name)

        this.as[name] = new Animation(data) 
    }

    /**
     * @param  {String} name - nom de l'animation
     * @description supréssion d'une animation
     * @method
     */
    deleteAnimation(name){
        if(!this.hasAnimation(name))
            return
        
        delete this.as[name]
    }

    /**
     * @param  {String} name - nom de l'animation
     * @description verification de l'existence d'une animation
     * @method
     */
    hasAnimation(name){
        return name in this.as
    }
    
    /**
     * @description animation en cours
     * @member {Object}
     * @readonly
     */
    get curent(){
        return this.as[this.curentAnim]
    }
}