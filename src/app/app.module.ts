import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SignalsApiService } from './services/signals.service';
import { ToasterModule } from 'angular2-toaster';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule,  
    FormsModule,
    HttpModule,
    ToasterModule
  ],
  providers: [
      SignalsApiService    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
