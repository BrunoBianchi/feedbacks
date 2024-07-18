import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../../../server/dist/interfaces/User.interface';
import { Observable } from 'rxjs';
import * as jose from "jose"
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public signUp(user: User) {
    return new Observable(subscriber => {
      this.http.post('/api/v1/auth/sign-up', user).subscribe((data: any) => {
        localStorage.setItem('authorizationToken', data.authorization_token.split('Bearer')[1]);
        subscriber.next('User Created!')
      }, error => {
        subscriber.error(error)
      })
    })
  }

  public login(credentials: { password: string, email: string }) {
    return new Observable(subscriber => {
      this.http.post('/api/v1/auth/sign-in', credentials).subscribe(async (data: any) => {
        await localStorage.setItem('authorizationToken', data.authorization_token.split('Bearer')[1]);
        subscriber.next('User Logged In!')
      }, error => {
        subscriber.error(error)
      })
    })
  }

  public get user(): User | null {
    const token = localStorage.getItem('authorizationToken');
    if (token) {
      const decodedToken = jose.decodeJwt(token) as User;
      return decodedToken;
    } else {
      return null;
    }
  }

}
