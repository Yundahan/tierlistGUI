import { Component, OnInit } from "@angular/core";
import { ListLoaderService } from "../services/list-loader.service";

const NOFILTER: string = 'None'

@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
    championFilter?: string = NOFILTER
    tierFilter?: string = NOFILTER
    tiers: string[] = [NOFILTER]
    champions: string[] = [NOFILTER]

    public tierDropDown: boolean = false
    public championDropDown: boolean = false

    constructor(private listLoaderService: ListLoaderService) {

    }

    ngOnInit(): void {
        this.tiers = this.tiers.concat(this.listLoaderService.getTiers())
        this.champions = this.champions.concat(this.listLoaderService.getChampions())
    }

    toggleTierDropDown() {
        this.tierDropDown = !this.tierDropDown
        this.championDropDown = false
    }

    toggleChampionDropDown() {
        this.championDropDown = !this.championDropDown
        this.tierDropDown = false
    }

    filterList(championFilter?: string, tierFilter?: string) {
        if(championFilter) {
            this.championFilter = championFilter
        }
        if(tierFilter) {
            this.tierFilter = tierFilter
        }
        this.tierDropDown = false
        this.championDropDown = false

        this.listLoaderService.filterList(this.championFilter, this.tierFilter)
    }
}