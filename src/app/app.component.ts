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
      var yourstring = 'and';
      this.signal.content = this._sanitizer.bypassSecurityTrustHtml('<strong>testing</strong> <span class=red>oks</span>');//this.signal.content.replace(yourstring, '<span style="color:Red"><strong>' + yourstring + '</strong></span>');
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
          this.signal.content = '<strong>testing</strong> <span class=red>ok</span>';
      }, (err) => {
          console.log('err:', err.statusCode, err.message.detail);
      });
  }

}
