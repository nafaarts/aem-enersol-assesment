// confirm-dialog.component.ts
import { Component, OnInit } from '@angular/core';
import { ConfirmDialogService, ConfirmDialogConfig } from '../../../services/confirm-dialog.service';

@Component({
  selector: 'confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit {
  isOpen = false;
  config: ConfirmDialogConfig = {
    title: '',
    message: '',
    confirmLabel: 'Yes',
    cancelLabel: 'Cancel',
    type: 'danger',
  };

  constructor(private dialogService: ConfirmDialogService) { }

  ngOnInit(): void {
    this.dialogService.isOpen$.subscribe(state => {
      this.isOpen = state;
    });

    this.dialogService.config$.subscribe(config => {
      this.config = config;
    });
  }

  confirm(): void {
    this.dialogService.answer(true);
  }

  cancel(): void {
    this.dialogService.answer(false);
  }
}