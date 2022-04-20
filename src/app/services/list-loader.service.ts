import { Injectable } from '@angular/core'
import { ISkin } from '../common/interfaces'
import { saveAs } from 'file-saver';
import { Subject } from 'rxjs';

import * as tierlistjson from '../../assets/resources/tierlist.json'
import { SkinNameService } from './skin-name.service';

@Injectable({
    providedIn:'root'
})
export class ListLoaderService {
    skinList: ISkin[] = []
    tiers: string[] = []
    champions: string[] = []
    currentList: ISkin[] = []

    currentListChange: Subject<ISkin[]> = new Subject<ISkin[]>()

    constructor(private skinNameService: SkinNameService) {
        this.init()
    }

    init() {
        let intermediate = tierlistjson
        this.skinList = intermediate.skinList
        this.currentList = [...this.skinList]
        this.tiers = intermediate.tiers
        this.champions = intermediate.champions

        for(let skin of this.currentList) {
            skin.displayName = this.skinNameService.getDisplayName(skin.champion, skin.skin)
        }

        this.currentListChange.subscribe((value) => {
            this.currentList = value
        })
        
        this.currentListChange.next(this.currentList)
    }

    exportToJson() {//currently unused, maybe later with a createComponent
        const blob = new Blob([JSON.stringify({'tiers': this.tiers, 'champions': this.champions, 'skinList': this.skinList})], {type : 'application/json'});
        saveAs(blob, '../../assets/resources/tierlist.json');
    }

    getTiers(): string[] {
        return this.tiers
    }

    getChampions(): string[] {
        return this.champions
    }

    getCurrentList(): ISkin[] {
        return this.currentList
    }

    getCurrentListChange(): Subject<ISkin[]> {
        return this.currentListChange
    }

    filterList(championFilter?: string, tierFilter?: string, skinSearchString?: string) {
        this.currentList = [...this.skinList]

        if(championFilter) {
            if(this.champions.includes(championFilter)){
                this.currentList = this.currentList.filter(skin => skin.champion === championFilter)
            }
        }
        if(tierFilter) {
            if(this.tiers.includes(tierFilter)){
                this.currentList = this.currentList.filter(skin => skin.tier === tierFilter)
            }
        }
        if(skinSearchString && skinSearchString.length > 0) {
            this.currentList = this.currentList.filter(skin => {
                let lowerCaseSkinSearchString = skinSearchString.toLowerCase()
                return skin.displayName && skin.displayName.includes(lowerCaseSkinSearchString)//if displayName not present, something is wrong -> should've been set in init()
            })
        }

        this.currentListChange.next(this.currentList)
    }
}