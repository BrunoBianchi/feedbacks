import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Form } from '../interfaces/forms.interface';
const token = localStorage.getItem("authorizationToken");

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor(private http: HttpClient) { }

  public get forms(): Observable<Form[]> {
    return this.http.get<any>("/api/v1/dashboard/forms", {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  }

  public getFormById(id: string): Observable<Form> {
    return this.http.get<any>(`api/v1/dashboard/form/${id}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  }

  public updateForm(id: string, form: Form) {
    return this.http.put<any>(`api/v1/dashboard/form/${id}/update-form`, form, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  }
}
