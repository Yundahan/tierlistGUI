import { Component, Input } from "@angular/core";

@Component({
    selector: 'tier-card',
    templateUrl: './tier-card.component.html'
})
export class TierCardComponent {
    @Input() tier: string = ""
}