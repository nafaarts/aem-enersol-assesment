import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, from, switchMap, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import hashPassword from 'src/app/shared/utils/password-hash';
import { AuthRepository, UserDoc } from '../repositories/auth.repository';
import { extractToken } from 'src/app/shared/utils';

const AUTH_KEY = 'authenticated_user'

interface AuthData {
  username: string
  token: string | null
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authRepo: AuthRepository,
    private router: Router,
  ) { }

  // LOCAL STORAGE
  private setSession(username: string, token: string | null): void {
    const authData: AuthData = { username, token }
    localStorage.setItem(AUTH_KEY, JSON.stringify(authData))
  }

  private getSession(): AuthData | null {
    const authData = localStorage.getItem(AUTH_KEY)
    return authData ? JSON.parse(authData) : null
  }

  private clearSession(): void {
    localStorage.removeItem(AUTH_KEY)
  }

  isAuthenticated(): boolean {
    return this.getSession() !== null
  }

  getToken(): string {
    return this.getSession()?.token || ''
  }

  // AUTHENTICATION
  private onlineLogin(username: string, password: string) {
    return this.http.post(`${this.baseUrl}/account/login`, { username, password }).pipe(
      tap(async res => {
        const token = extractToken(res)

        this.setSession(username, token)
        await this.authRepo.saveUser(username, password, token)
      })
    )
  }

  private offlineLogin(username: string, password: string) {
    return from(this.authRepo.getUser(username)).pipe(
      switchMap(async user => {
        if (!user) throw new Error('User not found offline')

        const authenticatedUser: UserDoc = user as UserDoc
        const hash = await hashPassword(password, environment.offlineAuthSalt)

        if (hash !== authenticatedUser.passwordHash) {
          throw new Error('Invalid credentials')
        }

        this.setSession(username, authenticatedUser.token)

        return authenticatedUser
      })
    )
  }

  login(username: string, password: string) {
    return this.onlineLogin(username, password).pipe(
      catchError(err => {
        if (err.status === 0) {
          console.info('The user may be offline, trying to validate from pouchdb')
          return this.offlineLogin(username, password)
        }

        return throwError(() => {
          console.log(err)
          return err
        })
      })
    )
  }

  logout(): void {
    this.clearSession()
    this.router.navigate(['/auth/login'])
  }
}
