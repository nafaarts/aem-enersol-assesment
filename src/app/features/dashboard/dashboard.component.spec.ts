import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { NetworkService } from 'src/app/core/services/network.service';
import { DashboardService } from './services/dashboard.service';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  const dashboardService = jasmine.createSpyObj<DashboardService>('DashboardService', ['getData']);
  let onlineState$: BehaviorSubject<boolean>;

  beforeEach(async () => {
    onlineState$ = new BehaviorSubject<boolean>(true);
    dashboardService.getData.and.returnValue(of({
      data: {
        chartDonut: [],
        chartBar: [],
        tableUsers: [],
      },
      source: 'network',
      updatedAt: '2026-04-26T16:00:00.000Z',
      message: 'Data terakhir diperbarui pada 2026-04-26T16:00:00.000Z.',
    }));

    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [
        { provide: DashboardService, useValue: dashboardService },
        { provide: NetworkService, useValue: { online$: onlineState$.asObservable() } },
      ],
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

  it('should show dashboard status message', () => {
    expect(component.statusMessage).toContain('Data terakhir diperbarui');
  });

  it('should reload data when connection comes back online', () => {
    dashboardService.getData.calls.reset();

    onlineState$.next(false);
    onlineState$.next(true);

    expect(dashboardService.getData).toHaveBeenCalledTimes(1);
  });
});
