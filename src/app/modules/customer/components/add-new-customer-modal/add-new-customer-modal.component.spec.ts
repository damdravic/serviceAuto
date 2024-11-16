import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewCustomerModalComponent } from './add-new-customer-modal.component';

describe('AddNewCustomerModalComponent', () => {
  let component: AddNewCustomerModalComponent;
  let fixture: ComponentFixture<AddNewCustomerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewCustomerModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewCustomerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
