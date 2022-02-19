import { Injectable } from '@angular/core'

import * as snMapping from '../../assets/resources/skinNameMapping.json'

@Injectable({
    providedIn:'root'
})
export class SkinNameService {
    skinNameMapping: any

    constructor() {
        this.init()
    }

    init() {
        this.skinNameMapping = snMapping
    }

    getDisplayName(champion: string, skin: string) {
        if(skin + " " + champion in this.skinNameMapping) {
            if(skin === "Draven" || skin === "Bard") {
                return skin + " " + champion
            }

            return this.skinNameMapping[skin + " " + champion]
        }

        return skin + " " + champion
    }
}