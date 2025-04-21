import { Component, Input, EventEmitter,OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
  standalone: false,
})
export class PaginationComponent implements OnChanges {
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 1 ;
  @Input() currentPage: number = 1;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter();
 
  totalPages: number = 1;
  pages: number[] = [];

  getPagesToDisplay() {
    if (this.totalPages <= 5) {
     return this.pages
    }
    if (this.currentPage < this.totalPages - 4) {
      return this.pages.slice(this.currentPage -2,this.currentPage +2)
    } else {
      return this.pages.slice(Math.max(this.totalItems -5 ,0), this.totalPages)
    }
 }

  ngOnChanges(): void {
          
    
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);

  }



  pageClicked(pageNumber: number) {
    if (pageNumber < 1 || pageNumber > this.totalPages) return;
    this.pageChanged.emit(pageNumber);
  }
}