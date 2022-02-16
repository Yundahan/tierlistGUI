import { Injectable, OnInit } from '@angular/core'
import { ISkin } from '../common/interfaces'
import { saveAs } from 'file-saver';
import * as tierlistjson from '../../assets/resources/tierlist.json'
import { Subject } from 'rxjs';

@Injectable({
    providedIn:'root'
})
export class ListLoaderService {
    skinList: ISkin[] = []
    tiers: string[] = []
    champions: string[] = []
    filteredList: ISkin[] = []

    filteredListChange: Subject<ISkin[]> = new Subject<ISkin[]>()

    constructor() {
        this.init()
    }

    init() {
        let intermediate = tierlistjson
        this.skinList = intermediate.skinList
        this.filteredList = [...this.skinList]
        this.tiers = intermediate.tiers
        this.champions = intermediate.champions

        this.filteredListChange.subscribe((value) => {
            this.filteredList = value
        })
        
        this.filteredListChange.next(this.filteredList)
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

    filterList(championFilter?: string, tierFilter?: string) {
        this.filteredList = [...this.skinList]

        if(championFilter) {
            if(this.champions.includes(championFilter)){
                this.filteredList = this.filteredList.filter(skin => skin.champion === championFilter)
            }
        }
        if(tierFilter) {
            console.log(tierFilter)
            if(this.tiers.includes(tierFilter)){
                this.filteredList = this.filteredList.filter(skin => skin.tier === tierFilter)
            }
        }

        this.filteredListChange.next(this.filteredList)
    }

    getFilteredList(): ISkin[] {
        return this.filteredList
    }

    getFilteredListChange(): Subject<ISkin[]> {
        return this.filteredListChange
    }
}