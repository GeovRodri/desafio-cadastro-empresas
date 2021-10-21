import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
    selector: 'pagination',
    templateUrl: './pagination.html',
    styleUrls: ['./pagination.scss']
})
export class PaginationComponent implements OnChanges {
    @Input() public totalPages: number = 0;
    @Input() public currentPage = 1;
    @Input() public count = 1;

    @Output() public change: EventEmitter<number> = new EventEmitter<number>();

    private pagesAux: Array<number> = [];
    pages: Array<number> = [];

    constructor() {

    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.totalPages) {
            this.pagesAux = Array.from({length: this.totalPages}, (v, k) => k + 1);
            this.changePage(1);
        } else if (changes.actualPage) {
            this.changePage(this.currentPage);
        }
    }

    nextPage() {
        this.changePage(this.currentPage + 1);
    }

    previousPage() {
        this.changePage(this.currentPage - 1);
    }

    changePage(page: number) {
        this.currentPage = page;
        this.change.emit(this.currentPage);

        const minPage = Math.max(Math.min((this.currentPage - 1), (this.totalPages - 3)), 0);
        this.pages = this.pagesAux.slice(minPage, Math.min((minPage + 3), this.totalPages));
    }
}
