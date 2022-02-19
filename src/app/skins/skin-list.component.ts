import { Component } from "@angular/core";
import { ISkin } from "../common/interfaces";
import { ImageUrlService } from "../services/image-url.service";
import { ListLoaderService } from "../services/list-loader.service";

@Component({
    selector: 'skin-list',
    templateUrl: './skin-list.component.html'
})
export class SkinListComponent {
    skinList: ISkin[] = []

    constructor(private listLoaderService: ListLoaderService, private imageUrlService: ImageUrlService){

    }

    ngOnInit() {
        this.skinList = this.listLoaderService.getCurrentList()
        this.listLoaderService.getCurrentListChange().subscribe(value => {
            this.skinList = value
        })
    }

    getImageUrl(skin: ISkin) {
        return this.imageUrlService.getImageURL(skin.champion, skin.skin)
    }
}