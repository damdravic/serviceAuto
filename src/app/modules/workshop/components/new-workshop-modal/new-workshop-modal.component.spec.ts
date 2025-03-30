import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWorkshopModalComponent } from './new-workshop-modal.component';

describe('NewWorkshopModalComponent', () => {
  let component: NewWorkshopModalComponent;
  let fixture: ComponentFixture<NewWorkshopModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewWorkshopModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewWorkshopModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
