import { Component } from '@angular/core';
import { ConfirmDialogService } from 'src/app/shared/services/confirm-dialog.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.scss']
})
export class LogoutButtonComponent {
  constructor(
    private dialogService: ConfirmDialogService,
    private authService: AuthService,
  ) { }

  confirm(): void {
    this.dialogService.confirm({
      title: 'Confirm logout',
      message: 'Are you sure you want to log out?',
      confirmLabel: 'Logout',
      cancelLabel: 'Cancel',
      type: 'danger',
    }).subscribe(confirmed => {
      if (confirmed) this.authService.logout();
    });
  }
}
