import { Injectable } from '@angular/core'

import * as imageURLsjson from '../../assets/resources/imageURLsCommunityDragon.json'
import * as snMapping from '../../assets/resources/skinNameMapping.json'

@Injectable({
    providedIn:'root'
})
export class ImageUrlService {
    imageURLs: any
    skinNameMapping: any

    constructor() {
        this.init()
    }

    init() {
        this.imageURLs = imageURLsjson
        this.skinNameMapping = snMapping
    }

    getImageURL(champion: string, skin: string) {
        if(skin + " " + champion in this.skinNameMapping) {
            return this.imageURLs[champion][this.skinNameMapping[skin + " " + champion]]
        }

        return this.imageURLs[champion][skin + " " + champion]
    }
}