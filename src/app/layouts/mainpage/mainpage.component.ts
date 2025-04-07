import { Component } from '@angular/core';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrl: './mainpage.component.css',
  standalone: false,
})
export class MainpageComponent {
  collapsed: boolean = false;

  switch() {
    this.collapsed = !this.collapsed;
  }
}
