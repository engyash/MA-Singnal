import { Component } from '@angular/core';
import 'rxjs/Rx';
import { SignalsApiService } from './services/signals.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  signal = {
      user: '',
      content: ''
  };
 

  constructor(private signalsApiService: SignalsApiService, ) {
      this.getContent();
  }


  saveContent() {
            
      this.signalsApiService.put(this.signal).subscribe((res) => {
          console.log('save content:', res);
          this.getContent();
      }, (err) => {
          console.log('save content err:', err.statusCode, err.message.detail);
      });


  }

  getContent() {
      this.signalsApiService.get(this.signal.user).subscribe((res) => {
          console.log('user:', res);
          this.signal = res;
      }, (err) => {
          console.log('err:', err.statusCode, err.message.detail);
      });
  }

}
