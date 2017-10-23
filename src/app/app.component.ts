import { Component } from '@angular/core';
import 'rxjs/Rx';
import { SignalsApiService } from './services/signals.service';
import 'rxjs/add/operator/toPromise';
import { DomSanitizer } from '@angular/platform-browser';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    private toasterService: ToasterService;
    title = 'app';
    content: any;
  signal = {
      user: '69deb117-ea9a-47d2-aff6-6a66748a1d02',
      content: this.content
  };
 

  constructor(private signalsApiService: SignalsApiService, private _sanitizer: DomSanitizer, toasterService: ToasterService) {
      this.toasterService = toasterService;
      this.getContent();      
  }


  checkContent($event) {
      console.log($event.target.innerHTML);
      this.signal.content = $event.target.innerHTML;

      var mapObj = {
          ' and': `<span class=blue> AND</span>`, ' or': `<span class=blue> OR</span>`,
          ' AND': `<span class=blue> AND</span>`, ' OR': `<span class=blue> OR</span>`,
          'lower than': `<strong>lower than</strong>`, 'lower': `<strong>lower</strong>`,
          'higher than': `<strong>higher than</strong>`, 'higher': `<strong>higher</strong>`,
          'exponential moving average': `<span class=bold-green>exponential moving average</span>`,
          'moving average': `<span class=bold-orange>moving average</span>`,
          'simple moving average': `<span class=bold-orange>simple moving average</span>`,
      };
      
      var re = new RegExp(Object.keys(mapObj).join("|"), "gi");      
      this.signal.content = this.signal.content.replace(re, function (matched) {
          return mapObj[matched] ? mapObj[matched] : '';
      });
  }

  onFocus($event) {
      this.signal.content = $event.target.innerText;
  }
  
  saveContent() {
            
      this.signalsApiService.put(this.signal).subscribe((res) => {         
          this.getContent();
          this.toasterService.pop('success', 'Success', 'Content saved successfully.');  
      }, (err) => {
          this.toasterService.pop('error', 'Error', `Status:${err.statusCode}:${err.message.detail} while saving content.`);  
      });


  }

  getContent() {     
      this.signalsApiService.get(this.signal.user).subscribe((res) => {          
          this.signal = res;          
      }, (err) => {
          this.toasterService.pop('error', 'Error', `Status:${err.statusCode}:${err.message.detail} while fetching content.`);  
      });
  }

}
