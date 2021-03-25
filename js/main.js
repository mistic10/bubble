/*
if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
    .then(function(reg){
        if(reg.installing) {
            console.log('Service worker installing')
        }
        else if(reg.waiting) {
            console.log('Service worker installed')
        }
        else if(reg.active) {
            console.log('Service worker active')
        }

    })
    .catch(function(err){
        console.log('erreur d\'enregistrement du service worker avec l\'erreur:' + err)
    })
}

else{
    console.log('serviceWorker n\'est pas pris en charge par le navigateur')
}

*/





import { Game } from './game/Game.js'

window.addEventListener('load', (e) => {
    new Game
    /**
     * 
 var scene = new Scene(undefined, 768, 768, document.querySelector('#game')),
    assetsBank = new AssetsBank({img : ['asets/img/bubbles.png']}),

    padding = 4,
    

    angle = new Angle,
    state = 0,//1 == en déplacement

    rBubble = 20,
    sizeBuble =  new Size(rBubble * 2, rBubble * 2),
    sizeSource = new Size(rBubble * 2, rBubble * 2),
    speed = 7,


    
    randomColor = () => {
        return Math.floor(Math.random() * 7)
    },

    player = new Player()// -- object Game --



    fetch('js/game/parts/part-1.json')
    .then((rep) => {
        return rep.json()
    })
    .then((json) => {
        json.scene = scene
        json.assetsBank = assetsBank
        json.player = player

        new Part(json)
    })


















    scene.addComponent(new Bubble({
        name : 'bl1',
        scene: scene,
        image : assetsBank.img.bubbles,
        position : new Vector((scene.canvas.width / 2) - (sizeBuble.width / 2), scene.canvas.height - sizeBuble.height - padding),
        size : sizeBuble,
        rayon : rBubble,
        source : new Source ({
            tile : new Vector(randomColor()),
            size : sizeSource
        })
    }))













    //calcule de l'angle entre la sourie et la bulle (player) -- Object "part" --
    scene.canvas.addEventListener('mousemove', (e) => {
        if(!state){
            var pos = scene.mousePosition(e)
            angle.value = Math.atan2((scene.getComponent('bl1').position.y + sizeBuble.height / 2) - pos.y, pos.x - (scene.getComponent('bl1').position.x + sizeBuble.width / 2))
        }
    })


    //mise en movement de la bulle -- Object "part" --
    var position = (elt) => {
        elt.position.x += speed * Math.cos(angle.rad)
        elt.position.y += speed * -1 * Math.sin(angle.rad)
        return elt.position
    }

    // -- Object "part" --
    scene.canvas.addEventListener('click', (e) => {
        if(!state){
            state = 1
            scene.getComponent('bl1').beforDraw = (bl) => {
                bl.animations.add('toto', {position : position})
                bl.animations.curentAnim = 'toto'
            }
        }

        scene.getComponent('bl1').afterDraw = (bl) => {
            //calcule des rebond sur les bord droit et gauche du canvas
            if(bl.position.x <= padding || bl.position.x+ bl.size.width >= scene.canvas.width - padding){
                angle.value = Math.PI - angle.rad
            }

            //verifier si contacte entre "bl1" et chaque bubble
            let componentsArr = Object.values(scene.components),

            bubbles = componentsArr.filter((bubble) => {
                if(bubble.name != 'bl1'){
                   if (bl.intersection(bubble)){
                        return bubble
                    }
                }
            })
            
            //contact avec les autres bulles ou le bord haut du canvas
            if(bl.position.y <= 0 || bubbles.length){
                if(bubbles.length)
                    var position = new Vector(bl.position.x < bubbles[0].position.x ? bubbles[0].position.x - bubbles[0].rayon : bubbles[0].position.x + bubbles[0].rayon , bubbles[0].position.y + sizeBuble.height  )
                else
                    var position = new Vector(bl.position.x, padding)

                state = 0
                bl.stopAnim()
                bl.position = position
            }
            
        }
        
    })




     */
})