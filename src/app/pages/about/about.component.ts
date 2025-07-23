import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  downloadResume() {
    const link = document.createElement('a');
    link.href = 'assets/files/resume.pdf';
    link.download = 'Junaid-Mehmood-Resume.pdf';
    link.click();
  }
}
