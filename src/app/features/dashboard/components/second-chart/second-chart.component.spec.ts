import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondChartComponent } from './second-chart.component';

describe('SecondChartComponent', () => {
  let component: SecondChartComponent;
  let fixture: ComponentFixture<SecondChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SecondChartComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
