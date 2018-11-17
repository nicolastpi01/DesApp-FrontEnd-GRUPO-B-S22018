import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuctionDetailComponent } from './auction-detail/auction-detail.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AllAuctionsComponent } from './all-auctions/all-auctions.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'detail/:id', component: AuctionDetailComponent, canActivate: [AuthGuard] },
    { path: 'user/detail/:id', component: UserDetailComponent, canActivate: [AuthGuard] },
    { path: 'auctions', component: AllAuctionsComponent, canActivate: [AuthGuard] },
    
    
    // otherwise redirect to home
    //{ path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
