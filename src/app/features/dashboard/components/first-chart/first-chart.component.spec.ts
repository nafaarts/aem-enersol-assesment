import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstChartComponent } from './first-chart.component';

describe('FirstChartComponent', () => {
  let component: FirstChartComponent;
  let fixture: ComponentFixture<FirstChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FirstChartComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
