import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { User } from '../models/user-model';

export interface Response {
  successful: boolean,
  result: string,
  user: User
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(
    private router: Router
  ) { }

  login(user: {
    email: string,
    password: string
  }): void {
    const userReg = window.localStorage.getItem('user');
    if (userReg && this.registeredUser(user)) {
      this.user$.next(JSON.parse(userReg));
      this.router.navigate(['/']);
    } else {
      window.alert('Email or password is invalid');
    }
  }

  registeredUser(
    user: {
      email: string,
      password: string
    }
  ): boolean {
    const userReg = window.localStorage.getItem('user');
    if (userReg 
      && JSON.parse(userReg).email === user.email 
      && JSON.parse(userReg).password === user.password) {
        return true;
    }
    return false;
  }

  logout(): void {
    this.user$.next(null);
  }

  register(user: User): void {
    window.localStorage.setItem('user', JSON.stringify(user));
    this.user$.next(user);
  }

}
