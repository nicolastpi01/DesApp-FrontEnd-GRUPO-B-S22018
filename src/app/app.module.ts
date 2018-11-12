import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { AuctionDetailComponent } from './auction-detail/auction-detail.component';
import { MessagesComponent } from './messages/messages.component'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { AuctionSearchComponent } from './auction-search/auction-search.component';
import { AppBootstrapModule } from './app-bootstrap/app-bootstrap.module';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AllAuctionsComponent } from './all-auctions/all-auctions.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuctionDetailComponent,
    MessagesComponent,
    AuctionSearchComponent,
    UserDetailComponent,
    NavbarComponent,
    AllAuctionsComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AppBootstrapModule
  ],
    
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
