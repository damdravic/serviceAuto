import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInfoOrderComponent } from './edit-info-order.component';

describe('EditInfoOrderComponent', () => {
  let component: EditInfoOrderComponent;
  let fixture: ComponentFixture<EditInfoOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditInfoOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditInfoOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
