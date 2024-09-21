import { Component, Input, EventEmitter,OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnInit {
  
 
  @Input() totalItems: any ;
  @Input() itemsPerPage: any ;
  @Input() currentPage: any;
  @Output() pageChanged : EventEmitter<number> = new EventEmitter();
  totalPages: number = 100;
  pages:number[] = [];

  get pagesToDisplay(){
    if(this.currentPage < this.totalPages - 4){
    return this.pages.slice(this.currentPage -1 , this.currentPage +4);}
    else{
        return this.pages.slice(this.totalPages - 5, this.totalPages);
    }
  }

  ngOnInit(): void {
   if(this.totalItems){
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.pages = Array.from({length : this.totalPages},(_,i) => i+1)
   }
  }

  pageClicked(pageNumber: number){
    this.pageChanged.emit(pageNumber);
  } 





}