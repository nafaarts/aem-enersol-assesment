import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/shared/shared.module';

import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      imports: [SharedModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sort rows by the selected field', () => {
    component.users = [
      { firstName: 'Zed', lastName: 'Alpha', username: 'zed' },
      { firstName: 'Amy', lastName: 'Zulu', username: 'amy' },
    ];

    component.onSort('firstName');

    expect(component.rows.map(user => user.firstName)).toEqual(['Amy', 'Zed']);
  });
});
