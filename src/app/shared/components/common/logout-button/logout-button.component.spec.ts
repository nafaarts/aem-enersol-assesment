import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ConfirmDialogService } from 'src/app/shared/services/confirm-dialog.service';

import { LogoutButtonComponent } from './logout-button.component';

describe('LogoutButtonComponent', () => {
  let component: LogoutButtonComponent;
  let fixture: ComponentFixture<LogoutButtonComponent>;
  const dialogService = jasmine.createSpyObj<ConfirmDialogService>('ConfirmDialogService', ['confirm']);
  const authService = jasmine.createSpyObj<AuthService>('AuthService', ['logout']);

  beforeEach(async () => {
    dialogService.confirm.and.returnValue(of(true));

    await TestBed.configureTestingModule({
      declarations: [LogoutButtonComponent],
      providers: [
        { provide: ConfirmDialogService, useValue: dialogService },
        { provide: AuthService, useValue: authService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();

    fixture = TestBed.createComponent(LogoutButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log out after confirmation', () => {
    component.confirm();

    expect(dialogService.confirm).toHaveBeenCalled();
    expect(authService.logout).toHaveBeenCalled();
  });
});
