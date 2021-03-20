import { FileLoader } from './FileLoader.js'

/**
 * @author vincent jeanvoine
 * @mail hypnolog@yahoo.fr
 * 
 * @version 0.0.1
 * 
 * @classdesc gère les assets présent dans le jeux (image, audio, vidéo, json)
 * @augments EventTarget
 */

export class AssetsBank extends EventTarget{
    /**
     * @param  {String} manifest - url du manifest qui décrit le contenu du jeux
     * @description constructor: crée une nouelle banque d'actifs
     */
    constructor(manifest){
        super()

        this.imgLoad = new Event("imgLoad")
        this.imgProgress = new Event("imgProgress")

        this.jsonLoad = new Event("jsonLoad")

        this.manifest = {}
        this.getManifest(manifest)

        this.i = 0

        this.img = {}
        this.audio = {}
        this.video = {}
        this.json = {}
    }

    /**
     * @description taille total des fichiers a charger en octet
     * @member {Number}
     * @readonly
     */
    get total(){
        let total = 0

        for(let Name in this.manifest){
            if(typeof this.manifest[Name].size == 'number')
                total += this.manifest[Name].size
        }

        return total
    }

    /**
     * @description quantité d'octet total chargé
     * @member {Number}
     * @readonly
     */
    get loaded(){
        let loaded = 0

        for(let Name in this.manifest){
            if(typeof this.manifest[Name].loaded == 'number')
                loaded += this.manifest[Name].loaded
        }

        return loaded
    }

    /**
     * @description poucentage de chargement
     * @member {Number}
     * @readonly
     */
    get percent(){
        return Math.round(this.loaded / this.total * 100)
    }

    /**
     * @description totalité des fichiers a chargé (booléan) 
     * @member {Boolean}
     * @readonly
     */
    get complete(){
        return this.i == Object.keys(this.manifest).length
    }

    /**
     * @param  {String} url - url du manifest
     * @method
     */
    getManifest(url){
        new FileLoader({
            url : url,
            type : "json",
            done : (json) => {
                this.manifest = json
                for(let fileName in this.manifest){
                    if(!'type' in this.manifest[fileName])
                        throw new Error('Le type du fichier "'+fileName+'" doit être renseigné dans le manifest')

                    if(typeof this.manifest[fileName].type != 'string')
                        throw new Error('Le type du fichier "'+fileName+'" dans le manifest doit être une chaine de caractere')

                    let loadMethod = "add" + this.manifest[fileName].type.charAt(0).toUpperCase() + this.manifest[fileName].type.slice(1)
                    if(!loadMethod in this)
                        throw new Error('Ce type de fichier n\'est pas gérer par "AssetsBank"')

                    this.manifest[fileName].name = fileName
                    this.manifest[fileName].loaded = 0
                    this[loadMethod](this.manifest[fileName])
                }
            }
        })
    }

    /**
     * @param {Object} jsonData - données sur le fichier json a chargé
     * @description charge et ajoute un fichier json a la banque
     * @method
     */
    addJson(jsonData){
        let data = {}

        Object.assign(data, jsonData, {
            done : (json) => {
                this.i ++
                this.manifest[jsonData.name].loaded = this.manifest[jsonData.name].size
                this.json[jsonData.name] = json
                this.dispatchEvent(this.jsonLoad)
            }
        })
        
    
        new FileLoader(data)
    }

    /**
     * @param {Object} imgData - données sur le fichier image a chargé
     * @description charge et ajoute un fichier image a la banque
     * @method
     */
    addImg(imgData){
        this.img[imgData.name] = new Image()

        this.img[imgData.name].addEventListener('load', (e) => {
            this.i ++
            this.manifest[imgData.name].loaded = this.manifest[imgData.name].size
            this.imgLoad.originalEvent = e
            this.dispatchEvent(this.imgLoad)
        })

        if(imgData.preload){
            let data = {}
            Object.assign(data, imgData, {
                done : (url) => {
                    this.img[imgData.name].src = url
                },
                progress : (loader) => {
                    this.manifest[imgData.name].loaded = loader.loaded
                    this.imgProgress.loader = loader
                    this.dispatchEvent(this.imgProgress)
                }
            })
            new FileLoader(data)
        }
        else{
            this.img[imgData.name].src = imgData.url
        }
    }









    /**
     * ajouté l'audio et la vidéo
     */
}