import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {environment} from '../environments/environment';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './home/home.component';
import {reducers} from './store/app.states';
import {ProcessService} from './process/process.service';

@NgModule(<NgModule>{
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),

    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  bootstrap: [AppComponent],
  providers: [ProcessService]
})
export class AppModule { }
