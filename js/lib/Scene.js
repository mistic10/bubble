import { Vector } from './Vector.js'
import { Size } from './Size.js'

/**
 * @author vincent jeanvoine
 * @mail hypnolog@yahoo.fr
 * 
 * @version 0.0.1
 * 
 * @classdesc contient et gére la colection d'objets a afficher sur le canvas
 */

export class Scene{
    /**
     * @param  {HTMLCanvasElement} canvas=document.createElement("canvas") - canavas qui affiche le jeux
     * @param  {Number} width=undefined - largeur du canvas
     * @param  {Number} height=undefined - hauteur du canvas
     * @param  {HTMLElement} elt=document.body - élément parent du canvas
     * @description constructor: crée une nouvelle scene
     */
    constructor(canvas = document.createElement("canvas"), elt = document.body){
        this.canvas = canvas

        this.context = this.canvas.getContext('2d')
        
        elt.insertBefore(this.canvas, elt.childNodes[0])

        this.components = {}

        this.zorder = []

        this.timestamp = 0

        this.run()
    }

    set size(val){
        if(val.constructor.name != 'Size')
            throw new Error('"Scene.size" doit être un objet de la class "Size"')

        this.canvas.width = val.width
        this.canvas.height = val.height
    }

    get size(){
        return new Size(this.canvas.width, this.canvas.height)
    }

    get center(){
        return new Vector(this.size.width / 2, this.size.height / 2)
    }


    /* géstion de la lecture des fram */

    /**
     * @description nétoye le canevas (éfface son contenu)
     * @method
     */
    clear(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    /**
     * @param {Number} timestamp - temps à partir duquel l'annimation du canvas a commencer
     * @description met le canevas a jour (avance d'une frame)
     * @method
     */
    update(timestamp){
        this.timestamp = timestamp
        this.clear()

        //for(let key in this.components){
        for(let key of this.zorder){
            this.components[key].update()
        }
        
        this.run()
    }

    /**
     * @description démare la lecture de l'annimation du canvas
     * @method
     */
    run(){
        this.raf = window.requestAnimationFrame((timestamp) => {this.update(timestamp)})
    }

    /**
     * @description arrete la lecture de l'annimation du canvas
     */
    pause(){
        window.cancelAnimationFrame(this.raf)
        this.timestamp = 0
    }


    /* gestion des objets */

    /**
     * @param {Component} component - objet a ajouter a la scene
     * @returns {Scene} retourn la scene "this" pour le chainage
     * @description ajout un objet a la scène si un objet de même nom n'existe pas
     * @method
     */
    addComponent(component){
        if(this.hasComponent(component.name))
            return this
        
        return this.setComponent(component)
    }

    /**
     * @param {Component} component - objet a ajouter/éditer
     * @returns {Scene} retourn la scene "this" pour le chainage
     * @description ajout ou modifi (écrase) un objet de la scène
     * @method
     */
    setComponent(component){
        this.zorder.push(component.name)
        this.components[component.name] = component
        return this
    }

    /**
     * @param {String} name - nom de l'objet a retourner
     * @returns {Component} component ou null si il n'exist pas
     * @description retour l'objet "name" de la scène si il existe ou null si non
     * @method
     */
    getComponent(name){
        if(! this.hasComponent(name))
            return null
        
        return this.components[name]
    }

    /**
     * @description retir et détruis touts les objets de la scène
     * @returns {Scene} retourn la scene "this" pour le chainage
     * @method
     */
    clearComponents(){
        for(let name in this.components){
            this.deleteComponent(name)
        }
        return this
    }

    /**
     * @param {String} name - nom de l'objet a détruire
     * @returns {Scene} retourn la scene "this" pour le chainage
     * @description retir et détruis l'objet "name" de la scène si il existe
     * @method
     */
    deleteComponent(name){
        if(! this.hasComponent(name))
            return this
        
        this.zorder.splice(this.zorder.indexOf(name), 1)
        this.components[name] = undefined
        delete this.components[name]
        return this
    }

    /**
     * @param {String} name - nom de l'objet
     * @returns {Boolean}
     * @description verifi si un objet existe
     * @method
     */
    hasComponent(name){
        return name in this.components
    }

    /**
     * @param {String} name - nom de l'objet
     * @returns {Scene} retourn la scene "this" pour le chainage
     * @description l'objet sera déssiné au dessu des autre
     * @method
     */
    goToTop(name){
        if(this.zorder.indexOf(name)  < 0)
            return this
        
        this.zorder.splice(this.zorder.indexOf(name), 1)
        this.zorder.push(name)
        return this
    }

    /**
     * @param {String} name - nom de l'objet
     * @returns {Scene} retourn la scene "this" pour le chainage
     * @description l'objet sera déssiné en dessou des autre
     * @method
     */
    goToBottom(name){
        if(this.zorder.indexOf(name) < 0)
            return this
        
        this.zorder.splice(this.zorder.indexOf(name), 1)
        this.zorder.unshift(name)
        return this
    }

    /**
     * @param {String} name - nom de l'objet
     * @returns {Scene} retourn la scene "this" pour le chainage
     * @description l'objet sera remonté d'un niveau dans l'ordre dans le quel ils sont déssiné
     * @method
     */
    goUp(name){
        let index = this.zorder.indexOf(name)
        if(index  < 0 || index == this.zorder.length - 1)
            return this
        
        let next = this.zorder[index + 1]
        this.zorder[index + 1] = name
        this.zorder[index] = next
        return this
    }

    /**
     * @param {String} name - nom de l'objet
     * @returns {Scene} retourn la scene "this" pour le chainage
     * @description l'objet sera déscendu d'un niveau dans l'ordre dans le quel ils sont déssiné
     * @method
     */
    goDown(name){
        let index = this.zorder.indexOf(name)
        if(index  < 1)
            return this
        
            let next = this.zorder[index - 1]
            this.zorder[index - 1] = name
            this.zorder[index] = next
            return this
    }


    /* gestion des Event Mouse/Touch */

    /**
     * @param {Event} e - l'Event
     * @returns {Vector} position de l'Event
     * @description retourn la position d'un Event Mouse/Touch
     * @method
     */
    evtPosition(e){
        let rect = this.canvas.getBoundingClientRect(),
        x = Math.round((e.clientX - rect.left)/(rect.right - rect.left) * this.canvas.width),
        y = Math.round((e.clientY - rect.top)/(rect.bottom - rect.top) * this.canvas.height)
        
        return new Vector(x, y)
    }

    /**
     * @param  {MouseEvent} e - l'Event
     * @returns {Vector} position du curseur de la sourie
     * @description retourn la position d'un Event Mouse
     * @method
     */
    mousePosition(e){
        return this.evtPosition(e)
    }

    /**
     * @param  {TouchEvent} e - l'Event
     * @returns {Vector} position du touché sur l'écran
     * @description retourn la position d'un Event Touch
     * @method
     */
    touchePosition(e){
        return this.evtPosition(e.touches[0])
    }
}