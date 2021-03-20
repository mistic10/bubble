import { Scene } from '../lib/Scene.js'
import { AssetsBank } from '../lib/AssetsBank.js'
import { Size } from '../lib/Size.js'

import { LoadingPage } from './LoadingPage.js'
import { Map } from './Map.js'
import { Part } from './Part.js'
import { Player } from './Player.js'

/**
 * -verifi la bonne connection du player
 * -crée et affiche les diférante page/popup (loadPage, map, part, shop, setting...) en fonction des events lanssé
 */

export class Game{
    constructor(){
        this.scene = new Scene(undefined,  document.querySelector('#game'))
        this.setSize()

        this.assetsBank = new AssetsBank('assets/manifest/assets.json')
        this.player = new Player(this)

        this.loadingPage = new LoadingPage(this)
        this.map = new Map(this)
        this.part = undefined

        this.loadingPage.draw()
        this.curentPage = 'loadingPage'

        this.loadingPage.addEventListener('load', (e) => {
            this.loadingPage.dispose()
            this.map.evetHandler()
            this.map.draw()
            this.curentPage = 'map'
        })

        this.map.addEventListener('runPart', (e) => {
            this.map.removeEvet()
            this.map.dispose()
            this.part = new Part(this, e.dataPart)
            this.part.draw()
            
            this.curentPage = 'part'
        })

        window.addEventListener('resize', (e) => {
            this.setSize()
            this[this.curentPage].resize()
        })
    }

    setSize(){
        this.scene.size = new Size(window.innerWidth, window.innerHeight)
    }

    percentsize(name, bgName){
        return new Size(this.bgpercent(bgName) * this.assetsBank.img[name].width / 100, this.bgpercent(bgName) * this.assetsBank.img[name].height / 100)
    }

    bgpercent(bgName){
        return this.scene.size.height < this.scene.size.width ? 100 * this.scene.size.height / this.assetsBank.img[bgName].height : 100 * this.scene.size.width / this.assetsBank.img[bgName].width
    }//percent = 100 * partiel / total
}