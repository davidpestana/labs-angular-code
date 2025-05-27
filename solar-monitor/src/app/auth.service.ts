import { computed, Injectable, signal } from '@angular/core';

export interface User {
  username: string;
  role: 'admin' | 'editor' | 'viewer';
  token: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user = signal<User | null>(null);

  login(username: string, role: User['role']) {
    this.user.set({ username, role, token: 'mock-token' });
  }

  logout() {
    this.user.set(null);
  }

  isAuthenticated = computed(() => this.user() !== null);
  currentUser = computed(() => this.user());
  hasRole = (role: string) => this.user()?.role === role;
}
