
/**
 * @author vincent jeanvoine
 * @mail hypnolog@yahoo.fr
 * 
 * @version 0.0.1
 * 
 * @classdesc gère le chargement un fichier en fonctio de son type (image, audio, vidéo, json)
 */

export class FileLoader{
    /**
     * @param  {Object} data - données sur le fichier a chager
     * @description constructor: crée un nouveau loader
     */
    constructor(data){
        if(!'type' in data)
            throw new Error('Le type du fichier a charger doit être renseigné')

        if(typeof data.type != 'string')
            throw new Error('Le type du fichier doit être une chaine de caractere')

        let loadMethod = "load" + data.type.charAt(0).toUpperCase() + data.type.slice(1) + (window.fetch ? 'Fetch' : 'XHR')
        if(!loadMethod in this)
            throw new Error('Ce type de fichier n\'est pas gérer par "FileLoader"')

        if(!'url' in data)
            throw new Error('L\'url du fichier a charger doit être renseigné')

        if(typeof data.url != 'string')
            throw new Error('L\'url du fichier doit être une chaine de caractere')

        this.url = data.url
        this.fileName = data.name

        this.done = data.done
        this.progress = data.progress

        this.total = 0
        this.loaded = 0

        this[loadMethod]()
    }

    /**
     * @description charge un fichier json par la method fetch
     * @method
     */
    loadJsonFetch(){
        fetch(this.url)
        .then(response => response.json())
        .then(this.done)
        .catch(error => {
            console.error(error)
        })
    }

    /**
     * @description charge un fichier json par la method XHR
     * @method
     */
    loadJsonXHR(){
        let xhr = new XMLHttpRequest()

        xhr.addEventListener("load", (e) => {
            this.done(JSON.parse(xhr.response))
        }, false)

        xhr.addEventListener("error", (e) => {console.error(e)}, false)

        xhr.open('get', this.url)
        xhr.send()
    }

    /**
     * @description charge un fichier image par la method fetch
     * @method
     */
    loadImgFetch(){
        fetch(this.url)
        .then(response => {
            if (!response.ok)
                throw Error(response.status+' '+response.statusText)

            if (!response.body)
                throw Error('ReadableStream not yet supported in this browser.')

            const contentEncoding = response.headers.get('content-encoding')
            const contentLength = response.headers.get(contentEncoding ? 'x-file-size' : 'content-length')

            if (contentLength === null)
                throw Error('Response size header unavailable')

            this.total = parseInt(contentLength, 10)

            let al = this

            return new Response(
                new ReadableStream({
                    start(controller) {
                        const reader = response.body.getReader()

                        let read = () => {
                            reader.read().then(({done, value}) => {
                                
                                if(done){
                                    controller.close()
                                    return
                                }

                                al.loaded += value.byteLength
                                al.progress(al)

                                controller.enqueue(value)
                                read()
                            })
                            .catch(error => {
                                console.error(error)
                                controller.error(error)
                            })
                        }
                        read()
                    }
                })
            )
        })
        .then(response => response.blob())
        .then(data => {
            this.loaded = data.size
            this.progress(this)
            this.done(URL.createObjectURL(data))
        })
        .catch(error => {
            console.error(error)
        })
    }

    /**
     * @description charge un fichier image par la method XHR
     * @method
     */
    loadImgXHR(){
        let xhr = new XMLHttpRequest()
        xhr.responseType = 'blob'

        xhr.addEventListener("load", (e) => {
            this.done(URL.createObjectURL(xhr.response))
        }, false)

        xhr.addEventListener("progress", (e) =>{
            if(e.lengthComputable){
                this.loaded += e.loaded
                this.total = e.total
                this.progress(this)
            }
            else{
                console.log('La taille du fichier est inconu')
            }
        }, false)

        xhr.addEventListener("error", (e) => {console.error(e)}, false)

        xhr.open('get', this.url)
        xhr.send()
    }
}