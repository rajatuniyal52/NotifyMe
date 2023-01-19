import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSchedulePopupComponent } from './customer-schedule-popup.component';

describe('CustomerSchedulePopupComponent', () => {
  let component: CustomerSchedulePopupComponent;
  let fixture: ComponentFixture<CustomerSchedulePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerSchedulePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerSchedulePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
