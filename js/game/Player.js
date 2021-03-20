export class Player{
    constructor(game){
        this.game = game
    }

    set angle(val){
        this._angle = val
    }

    get angle(){
        return this._angle
    }
}