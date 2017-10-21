import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SignalsApiService } from './services/signals.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,   
      FormsModule,
      HttpModule
  ],
  providers: [
      SignalsApiService    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
