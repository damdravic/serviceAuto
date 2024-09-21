import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRepairOrderModalComponent } from './edit-repair-order-modal.component';

describe('EditReapirOrderModalComponent', () => {
  let component: EditReapirOrderModalComponent;
  let fixture: ComponentFixture<EditReapirOrderModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditReapirOrderModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditReapirOrderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
