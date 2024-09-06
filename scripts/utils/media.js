class Media {
    constructor(data) {
        this._photographerId = data.photographerId;
        this._title = data.title;
        this._likes = data.likes;
        this._image = data.image;
        this._video = data.video;
    }
 
    get title() {
        return this._title
    }
 
    get image() {
        return `assets/${this._photographerId}/${this._image}`
    }

    get video() {
        return `assets/${this._photographerId}/${this._video}`
    }

    get likes() {
        return this._likes
    }

 }