import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { AuthGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: LandingLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'report-lost', component: ReportLostComponent, canActivate: [AuthGuard] },
  { path: 'report-found', component: ReportFoundComponent, canActivate: [AuthGuard] },
  { path: 'view-items', component: ViewItemsComponent, canActivate: [AuthGuard] },
  { path: 'matching', component: MatchingComponent, canActivate: [AuthGuard, adminGuard] },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
