import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XcompComponent } from './xcomp.component';

describe('XcompComponent', () => {
  let component: XcompComponent;
  let fixture: ComponentFixture<XcompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XcompComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(XcompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
