import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Labor } from 'src/app/interface/labor';
import { OrderItem } from 'src/app/interface/orderItem';
import { Part } from 'src/app/interface/part';
import { RepairOrder } from 'src/app/interface/repair-order';
import { RepairOrderService } from 'src/app/core/services/repair-order.service';
import { OrderLaborItem } from 'src/app/interface/order-labor-item';

@Component({
  selector: 'app-edit-reapir-order-modal',
  templateUrl: './edit-repair-order-modal.component.html',
  styleUrl: './edit-repair-order-modal.component.css',
})
export class EditRepairOrderModalComponent implements OnInit, AfterViewInit {
  @Input() order: RepairOrder;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('searchInput2') searchInput2: ElementRef;
  @ViewChild('checkPart') checkPart: ElementRef;
  @ViewChild('partsTable') partsTable: ElementRef;
  filteredLabors: any[];
  activeTab: string = 'parts';
  addPart: boolean = false;
  addLabor: boolean = false;
  searchTerm: string = '';
  quantity: number = 1;
  discount: number = 0;
  filteredParts: Part[] = [];
  selectedPart: Part;
  selectedLabor: Labor | null = null;
  repairOrderItems: OrderItem[] = [];
  repairOrderLaborItem: OrderLaborItem[] = [];
  totalParts: number = 0;

  constructor(private repairOrderService: RepairOrderService) {}

  ngOnInit() {}
  ngAfterViewInit() {}

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  filterParts() {
    if (this.searchTerm === '') {
      this.filteredParts = [];
    } else {
      this.filteredParts = this.repairOrderService.parts.filter(
        (part) =>
          part.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          part.code.includes(this.searchTerm)
      );
    }
  }

  addParts() {
    this.addPart = !this.addPart;
  }
  addLabors() {
    this.addLabor = !this.addLabor;
  }

  deletePart() {}
  deleteLabors() {}

  selectPart(part: Part, event: Event) {
    this.selectedPart = part;
    let target = event.target as HTMLInputElement;
    while (target && target.tagName !== 'TR') {
      target = target.parentElement as HTMLInputElement;
    }

    if (target) {
      const table = target.closest('table');
      if (table) {
        const checkboxes = table.querySelectorAll('input[type="checkbox');
        checkboxes.forEach((chechbox) => {
          (chechbox as HTMLInputElement).checked = false;
        });
      }
      const checkbox = target.querySelector(
        'input[type="checkbox"]'
      ) as HTMLInputElement;
      if (checkbox) {
        checkbox.checked = true;
      }
    }

    this.filteredParts = this.filteredParts.filter(
      (part) => part == this.selectedPart
    );
  }
  selectLabor(lobor: Labor, event: Event) {
    this.selectedLabor = lobor;
    let target = event.target as HTMLInputElement;
    while (target && target.tagName !== 'TR') {
      target = target.parentElement as HTMLInputElement;
    }

    if (target) {
      const table = target.closest('table');
      if (table) {
        const checkboxes = table.querySelectorAll('input[type="checkbox');
        checkboxes.forEach((chechbox) => {
          (chechbox as HTMLInputElement).checked = false;
        });
      }
      const checkbox = target.querySelector(
        'input[type="checkbox"]'
      ) as HTMLInputElement;
      if (checkbox) {
        checkbox.checked = true;
      }
    }

    this.filteredLabors  = this.filteredLabors.filter(
      (labor) => labor == this.selectedLabor
    );
  }

  focusFirstRow(index: number) {
    console.log('bau ', index);
    const firstRow = document.getElementById('row-' + index);

    if (firstRow) {
      firstRow.focus();
    }
  }

  handleKeyDown(event: KeyboardEvent, index: number) {
    console.log('bau k index', index);
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.focusNextRow(index);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.focusPreviousRow(index);
    }
  }
  focusPreviousRow(index: number) {
    const nextIndex = index - 1;
    console.log('bau ', nextIndex);
    if (nextIndex >= 0) {
      this.focusFirstRow(nextIndex);
    }
  }
  focusNextRow(index: number) {
    let nextIndex = index + 1;
    console.log('bau nextIndex', nextIndex);
    if (nextIndex < this.filteredParts.length) {
      this.focusFirstRow(nextIndex);
    } else if (nextIndex === this.filteredParts.length) {
      nextIndex = 0;
      this.focusFirstRow(nextIndex);
    }
  }

  addSelectedPart() {
    if (this.selectedPart) {
      this.repairOrderItems.push(
        new OrderItem(this.selectedPart, this.quantity, this.discount)
      );
      this.selectedPart = null;
      this.searchInput.nativeElement.value = '';
      this.filteredParts = [];
      this.searchInput.nativeElement.focus();
    }
  }

  addSelectedLabor() {
    if (this.selectedLabor) {
     
      this.repairOrderLaborItem.push(this.processOrderLaborItem());
      this.selectedLabor = null;
      this.searchInput2.nativeElement.value = '';
      this.filteredLabors = [];
      this.searchInput.nativeElement.focus();
    }
  }

  getTotalPartsPrice(): number {
    return this.repairOrderItems.reduce(
      (total, item) => total + item.part.price * item.quantity,
      0
    );
  }

  getTotalOrderPrice(): number {
    return this.getTotalPartsPrice() + this.getTotalLaborPrice();
  }

  getTotalLaborPrice(): number {
    return this.repairOrderLaborItem.reduce(
      (total, item) => total + item.labor.price,
      0
    );
  }

  /*       Labor    */

  filterLabors() {
    if (this.searchTerm === '') {
      this.filteredLabors = [];
    } else {
      this.filteredLabors = this.repairOrderService.fakeLabors.filter(
        (labor) =>
          labor.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          labor.code.includes(this.searchTerm)
      );
    }
  }

  processOrderLaborItem() : OrderLaborItem {
    const oli = {labor : this.selectedLabor, quantity: this.quantity, discount: this.discount};
   return oli
  }

  quantityIncrement(){
    
  }
  quantityDecrement(){}


}


