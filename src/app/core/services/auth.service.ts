import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

interface LoginPayload {
  username: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router,
  ) { }

  login(username: string, password: string): Observable<unknown> {
    const payload: LoginPayload = { username, password };
    return this.http
      .post<unknown>(`${this.baseUrl}/account/login`, payload)
      .pipe(tap(res => this.tokenService.set(this.extractToken(res))));
  }

  private extractToken(res: unknown): string {
    let raw = '';

    if (typeof res === 'string') {
      raw = res;
    } else if (res && typeof res === 'object') {
      const r = res as Record<string, unknown>;
      raw = String(r['token'] ?? r['accessToken'] ?? r['access_token'] ?? '');
    }

    // Strip "Bearer " prefix if the API already includes it
    return raw.startsWith('Bearer ') ? raw.slice(7) : raw;
  }

  logout(): void {
    this.tokenService.clear();
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    return this.tokenService.isAuthenticated();
  }
}
