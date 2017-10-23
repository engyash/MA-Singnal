import { Component } from '@angular/core';
import 'rxjs/Rx';
import { SignalsApiService } from './services/signals.service';
import 'rxjs/add/operator/toPromise';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'app';
    content: any;
  signal = {
      user: '',
      content: this.content
  };
 

  constructor(private signalsApiService: SignalsApiService, private _sanitizer: DomSanitizer) {
      this.getContent();      
  }


  checkContent() {      

      var mapObj = {
          ' and': `<span class=blue>AND</span>`, ' or': `<span class=blue>OR</span>`,
          'lower': `<strong>lower</strong>`, 'lower than': `<strong>lower than</strong>`, 'higher': `<strong>higher</strong>`, 'higher than': `<strong>higher than</strong>`,
          'exponential moving average': `<span class=green>exponential moving average</span>`,
          'moving average': `<span class=orange>moving average</span>`,
          'simple moving average': `<span class=orange>simple moving average</span>`,
      };

      var re = new RegExp(Object.keys(mapObj).join("|"), "gi");
      this.signal.content = this.signal.content.replace(re, function (matched) {          
          return mapObj[matched] ? mapObj[matched] : '';
      }); 


      console.log(' this.signal.content', this.signal.content);
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
          this.signal.content = 'testing<span class=red>ok</span>';
      }, (err) => {
          console.log('err:', err.statusCode, err.message.detail);
      });
  }

}
