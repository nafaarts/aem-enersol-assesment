import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DashboardService } from './services/dashboard.service';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  const dashboardService = jasmine.createSpyObj<DashboardService>('DashboardService', ['getData']);

  beforeEach(async () => {
    dashboardService.getData.and.returnValue(of({
      chartDonut: [],
      chartBar: [],
      tableUsers: [],
    }));

    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [{ provide: DashboardService, useValue: dashboardService }],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load dashboard data on init', () => {
    expect(dashboardService.getData).toHaveBeenCalled();
  });
});
