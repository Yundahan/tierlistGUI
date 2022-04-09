import { Component, Output, EventEmitter } from '@angular/core'
import { FormControl } from '@angular/forms'

@Component({
    selector: 'skin-search',
    templateUrl: './skin-search.component.html',
    styleUrls: ['skin-search.component.css']
})
export class SkinSearchComponent {
    @Output() skinSearchValue = new EventEmitter<string>()

    skinSearchForm = new FormControl('')

    ngOnInit() {
        this.skinSearchForm.valueChanges.subscribe(() => {
            this.skinSearchValue.emit(this.skinSearchForm.value)
        })
    }
}