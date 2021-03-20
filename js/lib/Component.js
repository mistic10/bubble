import { Animations } from './Animations.js'
import { Vector } from './Vector.js'
import { Size } from './Size.js'
import { Angle } from './Angle.js'

/**
 * @author vincent jeanvoine
 * @mail hypnolog@yahoo.fr
 * 
 * @version 0.0.1
 * 
 * @abstract
 * @classdesc représente un objets 2d a afficher sur le canvas
 * @augments EventTarget
 */

 //pencer a utilisé les champ privé a la place de "_" quand ils seront compatible avec touts les navigateur
export class Component extends EventTarget{
    /**
     * @param {Object} data - contient toutes les données de configuration de l'objet
     * @description constructor: crée un nouvel object 2d Component class mère de touts les object 2d
     */
    constructor(data = {}){
        super()

        if(this.constructor.name == 'Component')
            throw new TypeError('"Component" est une class abstraite et ne doit pas être instanciée directement')

        if(!'scene' in data)
            throw new Error('La "scene" est obligatoire et doit être fournie a tout les "Component"')
            
        if(!'name' in data)
            throw new Error('Tout les "Component" doivent avoir un "name""')


        this.msgErrorAfect = 'doit être un objet de la class'

        for(let key in data){
            this[key] = data[key]
        }

        /**
         * @member {Animations}
         */
        this.animations = new Animations()
    }

    /**
     * @description mise a jour de l'object 2d "Component" (est appelé de manière automatique par l'objet scene)
     * @method
     */
    update(){
        this.beforDraw(this)
        
        this.draw()
        
        this.afterDraw(this)
    }

    /**
     * @description déssine l'object 2d "Component" (est appelé de manière automatique par la method Component.update)
     * @method
     */
    draw(){
        throw new Error('La methode "draw" doit être implementé')
    }

    /**
     * @description la scene dans la quelle déssiner le "Component"
     * @member {Scene}
     */
    set scene(val){
        if(val.constructor.name != 'Scene')
            throw new Error('"scene" ' + this.msgErrorAfect + ' "Scene"')
        this._scene = val
    }
    
    get scene(){
        return this._scene
    }

    /**
     * @description le nom du "Component"
     * @member {String}
     */
    set name(val){
        if(typeof val != 'string')
            throw new Error('"name" doit être une chaine de caractere')
        this._name = val
    }
    
    get name(){
        return this._name
    }
    
    /**
     * @description la position du "Component"
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
     * @description la taille du "Component"
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
    
    /**
     * @description l'inclinaison du "Component"
     * @member {Vector}
     */
    set inclinaison(val = new Vector){
        if(val.constructor.name != 'Vector')
            throw new Error('"inclinaison" ' + this.msgErrorAfect + ' "Vector"')
        this._inclinaison = val
    }
    
    get inclinaison(){
        return typeof this._inclinaison != 'undefined' ? this._inclinaison : new Vector
    }
    
    /**
     * @description l'angle du "Component"
     * @member {Angle}
     */
    set angle(val = new Angle){
        if(val.constructor.name != 'Angle')
            throw new Error('"angle" ' + this.msgErrorAfect + ' "Angle"')
        this._angle = val
    }
    
    get angle(){
        return typeof this._angle != 'undefined' ? this._angle : new Angle
    }
    
    /**
     * @description l'axe de rotation du "Component"
     * @member {Vector}
     */
    set axe(val = new Vector){
        if(val.constructor.name != 'Vector')
            throw new Error('"axe" ' + this.msgErrorAfect + ' "Vector"')
        this._axe = val
    }
    
    get axe(){
        return typeof this._axe != 'undefined' ? this._axe : new Vector
    }
    
    /**
     * @member {Function}
     * @memberof Component
     * @callback beforDraw
     * @param {Component} c - l'objet 2d "Component" this
     * @description la function callback a appeler avant de déssiner le "Component"
     */
    set beforDraw(val = (c) => {return}){
        if(typeof val != 'function')
            throw new Error('"beforDraw" doit être une fonction')
        this._beforDraw = val
    }
    
    get beforDraw(){
        return typeof this._beforDraw != 'undefined' ? this._beforDraw : (c) => {return}
    }
    
    /**
     * @member {Function}
     * @memberof Component
     * @callback afterDraw
     * @param {Component} c - l'objet 2d "Component" this
     * @description la function callback a appeler après avoir déssiné le "Component"
     */
    set afterDraw(val = (c) => {return}){
        if(typeof val != 'function')
            throw new Error('"afterDraw" doit être une fonction')
        this._afterDraw = val
    }

    get afterDraw(){
        return typeof this._afterDraw != 'undefined' ? this._afterDraw : (c) => {return}
    }
}