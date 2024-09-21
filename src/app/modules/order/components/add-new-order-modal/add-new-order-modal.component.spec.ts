import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewOrderModalComponent } from './add-new-order-modal.component';

describe('AddNewOrderModalComponent', () => {
  let component: AddNewOrderModalComponent;
  let fixture: ComponentFixture<AddNewOrderModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewOrderModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddNewOrderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
