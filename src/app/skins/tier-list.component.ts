import { Component } from "@angular/core";
import { tiers } from "../common/data";

@Component({
    selector: 'tier-list',
    templateUrl: './tier-list.component.html',
    styleUrls: ['./tier-list.component.css']
})
export class TierListComponent {
    tiers: string[] = []

    ngOnInit() {
        this.tiers = tiers
    }
}