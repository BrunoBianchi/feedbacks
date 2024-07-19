import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { SidebarDashboardComponent } from './shared/components/sidebar-dashboard/sidebar-dashboard.component';
import { HeaderInfoBarComponent } from './shared/components/header-info-bar/header-info-bar.component';
import { OverviewComponent } from './pages/dashboard/overview/overview.component';
import { WebpageSimulatorComponent } from './shared/components/webpage-simulator/webpage-simulator.component';
import { IntegrationComponent } from './pages/dashboard/integration/integration.component';
import { SkeletonLoadingComponent } from './shared/components/skeleton-loading/skeleton-loading.component';
import { FeedbacksComponent } from './pages/dashboard/feedbacks/feedbacks.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormBuilderComponent } from './shared/components/form-builder/form-builder.component';
import { HtmlPipe } from './shared/pipes/html.pipe';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    SidebarDashboardComponent,
    HeaderInfoBarComponent,
    OverviewComponent,
    WebpageSimulatorComponent,
    IntegrationComponent,
    SkeletonLoadingComponent,
    FeedbacksComponent,
    FormBuilderComponent,
    HtmlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    DragDropModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
