import { Component, Input } from "@angular/core";
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
        tier: ''
    }
    @Input() imageURL: string = ""
    
    ngOnInit() {
        console.log(this.imageURL)
    }
}