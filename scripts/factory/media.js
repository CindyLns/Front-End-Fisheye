class Media {
    constructor(data) {
        this._photographersId = data.photographersId
        this._title = data.title
        this._image = data.image
        this._likes = data.likes
    }
 
    get title() {
        return this._title
    }
 
    get image() {
        return `assets/${this._name}/${this._image}`
    }

    get likes() {
        return this._likes
    }

 }