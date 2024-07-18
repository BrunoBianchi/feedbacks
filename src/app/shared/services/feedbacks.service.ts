import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const token = localStorage.getItem("authorizationToken");

@Injectable({
  providedIn: 'root'
})
export class FeedbacksService {

  constructor(private http: HttpClient) { }

  public getAllFeedbacksFromForm(formId: string) {
    return this.http.get<any>(`api/v1/dashboard/form/${formId}/feedbacks`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  }

}
