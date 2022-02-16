import { Component, Input } from "@angular/core";
import { ISkin } from "../common/interfaces";

@Component({
    selector: 'skin',
    templateUrl: './skin.component.html'
})
export class SkinComponent {
    @Input() skin: ISkin = {
        champion: '',
        skin: '',
        tier: ''
    }
}