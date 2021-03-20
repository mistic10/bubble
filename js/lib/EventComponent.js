import { Component } from './Component.js'

/**
 * @author vincent jeanvoine
 * @mail hypnolog@yahoo.fr
 * 
 * @version 0.0.1
 * 
 * @abstract
 * @classdesc gère les evenements déclanché sur les objet 2d "Component"
 * @augments Component
 */

export class EventComponent extends Component {
    /**
     * @param {Object} data - contient toutes les données de configuration de l'objet
     * @description constructor: crée un nouvel object 2d EventComponent
     */
    constructor(data){
        super(data)

        if(this.constructor.name == 'Component')
            throw new TypeError('"EventComponent" est une class abstraite et ne doit pas être instanciée directement')

        this.cursorIn = false

        this.click = new Event("click")
        this.mousedown = new Event("mousedown")
        this.mouseup = new Event("mouseup")
        this.mousemove = new Event("mousemove")
        this.mouseenter = new Event("mouseenter")
        this.mouseout = new Event("mouseout")

        this.touchstart = new Event("touchstart")
        this.touchend = new Event("touchend")
        this.touchmove = new Event("touchmove")
        this.touchenter = new Event("touchenter")
        this.touchout = new Event("touchout")


        this.handlerClick()
        this.handlerMouseMove()
        this.handlerMouseDown()
        this.handlerMouseUp()

        this.handlerTouchStart()
        this.handlerTouchEnd()
        this.handlerTouchMove()
    }

    /**
     * @description test si l'evenemmet "e" a été déclancher sur l'object "EventComponent"
     * @param {Event} e - l'evenemmet a tester
     * @method
     */
    hover(e){
        return (e.x > this.position.x && e.x < this.position.x + this.size.width) && (e.y > this.position.y && e.y < this.position.y + this.size.height)
    }

    /**
     * @description gère les evenements de mouvements de sourie
     * @method
     */
    handlerMouseMove(){
        this.scene.canvas.addEventListener('mousemove', (e) => {
            if(this.hover(this.scene.mousePosition(e))){
                if(!this.cursorIn){
                    this.cursorIn = true
                    this.mouseenter.originalEvent = e
                    this.dispatchEvent(this.mouseenter)
                }

                this.mousemove.originalEvent = e
                this.dispatchEvent(this.mousemove)
            }
            else{
                if(this.cursorIn){
                    this.cursorIn = false
                    this.mouseout.originalEvent = e
                    this.dispatchEvent(this.mouseout)
                }
            }
        }, false)
    }

    /**
     * @description gère les evenements de click de sourie
     * @method
     */
    handlerClick(){
        this.scene.canvas.addEventListener('click', (e) => {
            if(this.cursorIn){
                this.click.originalEvent = e
                this.dispatchEvent(this.click)
            }
        }, false)
    }

    /**
     * @description gère les evenements d'appuis sur le boutton de la sourie
     * @method
     */
    handlerMouseDown(){
        this.scene.canvas.addEventListener('mousedown', (e) => {
            if(this.cursorIn){
                this.mousedown.originalEvent = e
                this.dispatchEvent(this.mousedown)
            }
        }, false)
    }

    /**
     * @description gère les evenements de relachemment du boutton de la sourie
     * @method
     */
    handlerMouseUp(){
        if(typeof this.mouseup === "function"){
            this.scene.canvas.addEventListener('mouseup', (e) => {
                if(this.cursorIn){
                    this.mouseup.originalEvent = e
                    this.dispatchEvent(this.mouseup)
                }
            }, false)
        }
    }



    /**
     * @description gère les evenements de début de touché (écran tactile)
     * @method
     */
    handlerTouchStart(){
        this.scene.canvas.addEventListener('touchstart', (e) => {
            if(this.hover(this.scene.touchePosition(e))){
                this.cursorIn = true
                this.touchstart.originalEvent = e
                this.dispatchEvent(this.touchstart)
            }
        }, false)
    }
    
    /**
     * @description gère les evenements de fin de touché (écran tactile)
     * @method
     */
    handlerTouchEnd(){
        this.scene.canvas.addEventListener('touchend', (e) => {
            if(this.cursorIn){
                this.cursorIn = false
                this.touchend.originalEvent = e
                this.dispatchEvent(this.touchend)
            }
                
        }, false)
    }
    /**
     * @description gère les evenements de déplacemment d'un touché (écran tactile)
     * @method
     */
    handlerTouchMove(){
        this.scene.canvas.addEventListener("touchmove", (e) => {
            if(this.hover(this.scene.touchePosition(e))){
                if(!this.cursorIn){
                    this.cursorIn = true
                    this.touchenter.originalEvent = e
                    this.dispatchEvent(this.touchenter)
                }

                this.touchmove.originalEvent = e
                this.dispatchEvent(this.touchmove)
            }
            else{
                if(this.cursorIn){
                    this.cursorIn = false
                    this.touchout.originalEvent = e
                    this.dispatchEvent(this.touchout)
                }
            }
        }, false);
    }
}