import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `<div class="spiner-overlay">
    Loading ...
    <div class="spinner">Loading ...</div>
  </div>`,
  styleUrl: './spinner.component.css',
  standalone: false
})
export class SpinnerComponent {}
