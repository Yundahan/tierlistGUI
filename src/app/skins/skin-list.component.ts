import { Component } from "@angular/core";
import { ISkin } from "../common/interfaces";
import { ListLoaderService } from "../services/list-loader.service";

@Component({
    selector: 'skin-list',
    templateUrl: './skin-list.component.html'
})
export class SkinListComponent {
    skinList: ISkin[] = []

    constructor(private listLoaderService: ListLoaderService){

    }

    ngOnInit() {
        this.skinList = this.listLoaderService.getFilteredList()
        this.listLoaderService.getFilteredListChange().subscribe(value => {
            this.skinList = value
        })
    }
}