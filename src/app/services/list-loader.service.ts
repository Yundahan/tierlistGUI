import { Injectable } from '@angular/core'
import { ISkin, tierDict } from '../common/interfaces'
import { saveAs } from 'file-saver';
import { Subject } from 'rxjs';

import * as tierlistjson from '../../assets/resources/tierlist.json'

@Injectable({
    providedIn:'root'
})
export class ListLoaderService {
    skinList: ISkin[] = []
    tiers: string[] = []
    champions: string[] = []
    currentList: ISkin[] = []

    tierFilter: string = 'None'
    championFilter: string = 'None'

    currentListChange: Subject<ISkin[]> = new Subject<ISkin[]>()

    constructor() {
        this.init()
    }

    init() {
        let intermediate = tierlistjson
        this.skinList = intermediate.skinList
        this.currentList = [...this.skinList]
        this.tiers = intermediate.tiers
        this.champions = intermediate.champions

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

    filterList(championFilter?: string, tierFilter?: string) {
        this.currentList = [...this.skinList]

        if(championFilter) {
            this.championFilter = championFilter

            if(this.champions.includes(championFilter)){
                this.currentList = this.currentList.filter(skin => skin.champion === championFilter)
            }
        }
        if(tierFilter) {
            this.tierFilter = tierFilter

            if(this.tiers.includes(tierFilter)){
                this.currentList = this.currentList.filter(skin => skin.tier === tierFilter)
            }
        }

        this.currentListChange.next(this.currentList)
    }

    sortList(sortMode: string) {
        if(sortMode === 'Champion') {
            this.filterList(this.championFilter, this.tierFilter)
        } else if(sortMode === 'Tier') {
            this.currentList = this.currentList.sort((n1,n2) => {
                return tierDict[n1.tier] - tierDict[n2.tier]
            })
        }

        this.currentListChange.next(this.currentList)
    }
}