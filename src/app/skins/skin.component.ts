import { Component, Input, OnInit } from "@angular/core";
import { ISkin } from "../common/interfaces";

@Component({
    selector: 'skin',
    templateUrl: './skin.component.html',
    styleUrls: ['./skin.component.css']
})
export class SkinComponent {
    @Input() skin: ISkin = {
        champion: '',
        skin: '',
        tier: '',
        displayName: ''
    }
    @Input() imageURL: string = ""
}