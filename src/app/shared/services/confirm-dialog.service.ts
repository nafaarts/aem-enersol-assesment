import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export interface ConfirmDialogConfig {
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    type?: 'danger' | 'warning' | 'info';
}

@Injectable({
    providedIn: 'root'
})
export class ConfirmDialogService {
    private isOpenSubject = new BehaviorSubject<boolean>(false);
    private configSubject = new BehaviorSubject<ConfirmDialogConfig>({
        title: '',
        message: '',
    });
    private answerSubject = new Subject<boolean>();

    isOpen$ = this.isOpenSubject.asObservable();
    config$ = this.configSubject.asObservable();

    confirm(config: ConfirmDialogConfig): Observable<boolean> {
        this.configSubject.next({
            confirmLabel: 'Yes',
            cancelLabel: 'Cancel',
            type: 'danger',
            ...config
        });
        this.isOpenSubject.next(true);
        document.body.style.overflow = 'hidden';

        return this.answerSubject.asObservable();
    }

    answer(value: boolean): void {
        this.isOpenSubject.next(false);
        document.body.style.overflow = '';
        this.answerSubject.next(value);
    }
}