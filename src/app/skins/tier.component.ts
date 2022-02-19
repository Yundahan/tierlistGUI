import { Component, Input } from '@angular/core'
import { ISkin } from '../common/interfaces'
import { tierToColor } from '../common/data'
import { ImageUrlService } from '../services/image-url.service'
import { ListLoaderService } from '../services/list-loader.service'

@Component({
    selector: 'tier',
    templateUrl: 'tier.component.html',
    styleUrls: ['tier.component.css']
})
export class TierComponent {
    @Input() tier: string = ""
    skinList: ISkin[] = []
    tierToColor: { [index: string]: string } = {}

    constructor(private listLoaderService: ListLoaderService, private imageUrlService: ImageUrlService){

    }

    ngOnInit() {
        this.skinList = this.listLoaderService.getCurrentList().filter(skin => skin.tier === this.tier)
        this.listLoaderService.getCurrentListChange().subscribe(value => {
            this.skinList = value.filter(skin => skin.tier === this.tier)
        })
        this.tierToColor = tierToColor
    }

    getImageUrl(skin: ISkin) {
        return this.imageUrlService.getImageURL(skin.champion, skin.skin)
    }

    getColorForTier(tier: string) {
        return this.tierToColor[tier]
    }
}