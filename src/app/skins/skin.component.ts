import { Component, Input, OnInit } from "@angular/core";
import { ISkin } from "../common/interfaces";
import { SkinNameService } from "../services/skin-name.service";

@Component({
    selector: 'skin',
    templateUrl: './skin.component.html',
    styleUrls: ['./skin.component.css']
})
export class SkinComponent implements OnInit {
    @Input() skin: ISkin = {
        champion: '',
        skin: '',
        tier: ''
    }
    @Input() imageURL: string = ""
    displayName: string = ""

    constructor(private skinNameService: SkinNameService) {

    }

    ngOnInit() {
        this.displayName = this.skinNameService.getDisplayName(this.skin.champion, this.skin.skin)
    }
}