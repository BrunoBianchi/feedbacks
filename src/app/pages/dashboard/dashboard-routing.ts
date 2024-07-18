import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OverviewComponent } from './overview/overview.component';
import { IntegrationComponent } from './integration/integration.component';
import { FeedbacksComponent } from './feedbacks/feedbacks.component';


const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: ':id/overview', component: OverviewComponent },
    { path: ':id/integration', component: IntegrationComponent },
    { path: ':id/feedbacks', component: FeedbacksComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
