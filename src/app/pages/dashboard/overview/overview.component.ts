import { Component, OnInit } from '@angular/core';
import { FormsService } from '../../../shared/services/forms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';
import { Form } from '../../../shared/interfaces/forms.interface';
import { feedbacks } from '../../../shared/interfaces/feedbacks.interface';
import { FeedbacksService } from '../../../shared/services/feedbacks.service';
import { feedback } from '../../../../../server/dist/controller/feedback.controller';
import { ViewportScroller } from '@angular/common';
import { User } from '../../../shared/interfaces/user.interface';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent implements OnInit {
  constructor(private auth: AuthService, private viewportScroller: ViewportScroller, private r: Router, private formService: FormsService, private router: ActivatedRoute, private feedbackService: FeedbacksService) { }
  public feedbacks!: feedbacks[];
  public user: User | null = this.auth.user;
  public positiveFeedbacks!: feedbacks[];
  public negativeFeedbacks!: feedbacks[];
  public feedbacksToday!: feedbacks[];
  public form!: Form;
  public showInformation: boolean = false;
  navigateToFragment(fragment: string) {
    this.r.navigate([], { fragment: fragment }).then(() => {
      this.viewportScroller.scrollToAnchor(fragment);
    });
  }
  async ngOnInit() {
    this.form = await firstValueFrom(this.formService.getFormById(this.router.snapshot.params['id']));
    this.feedbacks = await firstValueFrom(this.feedbackService.getAllFeedbacksFromForm(this.router.snapshot.params['id']));
    this.positiveFeedbacks = this.feedbacks.filter(feedback => feedback.rating > 3);
    this.negativeFeedbacks = this.feedbacks.filter(feedback => feedback.rating <= 3);
    this.feedbacksToday = this.feedbacks.filter(feedback => { return new Date(feedback.createdAt).getDate() == new Date().getDate() });
    this.showInformation = true;
  }
}
