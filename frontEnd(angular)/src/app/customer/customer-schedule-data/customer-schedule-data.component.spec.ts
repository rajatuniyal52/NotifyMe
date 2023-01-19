import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerScheduleDataComponent } from './customer-schedule-data.component';

describe('CustomerScheduleDataComponent', () => {
  let component: CustomerScheduleDataComponent;
  let fixture: ComponentFixture<CustomerScheduleDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerScheduleDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerScheduleDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
