import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LandingLayoutComponent } from './components/landing-layout/landing-layout.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ReportLostComponent } from './components/report-lost/report-lost.component';
import { ReportFoundComponent } from './components/report-found/report-found.component';
import { ViewItemsComponent } from './components/view-items/view-items.component';
import { MatchingComponent } from './components/matching/matching.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    LandingLayoutComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    ReportLostComponent,
    ReportFoundComponent,
    ViewItemsComponent,
    MatchingComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
