import { Component, OnInit } from '@angular/core';
import { feedbacks } from '../../../shared/interfaces/feedbacks.interface';
import { FeedbacksService } from '../../../shared/services/feedbacks.service';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrl: './feedbacks.component.scss'
})
export class FeedbacksComponent implements OnInit {
  public feedbacks!: feedbacks[];
  public filterFeedbacks!: feedbacks[];
  public sortPositive: boolean = true;
  public createdFrom!: Date;
  public createdUntil!: Date;
  public Today: Date = new Date();
  public show: boolean = false;
  constructor(private feedbacksService: FeedbacksService, private router: ActivatedRoute) { }
  async ngOnInit() {
    this.filterFeedbacks = await firstValueFrom(this.feedbacksService.getAllFeedbacksFromForm(this.router.snapshot.params['id']));
    this.feedbacks = this.filterFeedbacks;
    this.show = true;
  }

  public filterRating() {
    if (this.sortPositive) {
      this.filterFeedbacks = this.feedbacks.sort((a: any, b: any) => { return b.rating - a.rating });
      this.sortPositive = false;
    } else {
      this.filterFeedbacks = this.feedbacks.sort((a: any, b: any) => { return a.rating - b.rating });
      this.sortPositive = true;
    }
  }

  public filterCreatedUntil(event: any) {
    const filterDate = new Date(event.target.value);

    if (filterDate) {
      this.filterFeedbacks = this.feedbacks.filter(feedback => new Date(feedback.createdAt) <= filterDate);
      if (this.createdFrom) {
        this.filterFeedbacks = this.feedbacks.filter(feedback => new Date(feedback.createdAt) <= filterDate && new Date(feedback.createdAt) >= this.createdFrom);
      }
    } else {
      this.filterFeedbacks = [...this.feedbacks];
    }

  }
  public filterCreatedFrom(event: any) {
    const filterDate = new Date(event.target.value);

    if (filterDate) {
      this.filterFeedbacks = this.feedbacks.filter(feedback => new Date(feedback.createdAt) >= filterDate);
      if (this.createdUntil) {
        this.filterFeedbacks = this.feedbacks.filter(feedback => new Date(feedback.createdAt) <= filterDate && new Date(feedback.createdAt) >= this.createdFrom);
      }
    } else {
      this.filterFeedbacks = [...this.feedbacks];
    }
  }
  public filterRatingType(event: any) {
    const option = event.target.value;
    switch (option) {
      case "positive":
        this.filterFeedbacks = this.feedbacks.filter(feedback => feedback.rating > 3);
        break;
      case "negative":
        this.filterFeedbacks = this.feedbacks.filter(feedback => feedback.rating <= 3);

        break;
      case "all":
        this.filterFeedbacks = this.feedbacks
        break;
    }
  }
}
