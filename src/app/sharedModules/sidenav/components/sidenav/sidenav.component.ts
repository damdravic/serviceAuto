import { AfterViewInit, Component, Input ,ElementRef, ViewChildren, QueryList} from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  standalone: false,
})
export class SidenavComponent {
  @ViewChildren('but') buttons: QueryList<ElementRef>;
  @ViewChildren('subMenu') subMenus: QueryList<ElementRef>;
  @Input() collapsed: boolean;
  constructor(private el: ElementRef) {}

  ngOnChanges() {
    this.collapsed = !this.collapsed;
  }

  clicked(element: HTMLElement) {
    this.buttons.forEach((but) => but.nativeElement.classList.remove('active'));
    this.subMenus.forEach(
      (subMenu) => (subMenu.nativeElement.style.height = '0px')
    );

    if (!element.nextElementSibling) {
      element.classList.add('active');
      return;
    }
    const subMenu = element.nextElementSibling as HTMLElement,
      ul = subMenu.querySelector('ul');

    if (!subMenu.clientHeight) {
      subMenu.style.height = ul.clientHeight + 'px';
      element.classList.add('active');
    } else {
      subMenu.style.height = '0px';
      element.classList.remove('active');
    }
  }
}
