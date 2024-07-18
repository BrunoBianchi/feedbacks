import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-webpage-simulator',
  templateUrl: './webpage-simulator.component.html',
  styleUrl: './webpage-simulator.component.scss'
})
export class WebpageSimulatorComponent {
  public feedbackValue = 'This is just a test!';
  public response!: string;

  constructor(private http: HttpClient) { }
  public verifyFeedback() {
    this.http.post('/api/v1/feedback/send-feedback', {
      user: 'teste2',
      comments: [this.feedbackValue],
      rating: 3,
    }).subscribe((data: any) => {
      this.response = data.response
    })
  }
}
