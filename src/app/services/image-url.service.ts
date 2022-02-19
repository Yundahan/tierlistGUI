import { Injectable } from '@angular/core'

import * as imageURLsjson from '../../assets/resources/imageURLsCommunityDragon.json'

@Injectable({
    providedIn:'root'
})
export class ImageUrlService {
    imageURLs: any

    constructor() {
        this.init()
    }

    init() {
        this.imageURLs = imageURLsjson
    }

    getImageURL(champion: string, skin: string) {
        return this.imageURLs[champion][skin + " " + champion]
    }
}