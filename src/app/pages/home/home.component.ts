import { Component, OnInit } from '@angular/core';
import { projects } from './projects';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  projects = projects
  contactForm!: FormGroup;
  serviceId = 'service_zg7xpe6';
  templateId = 'template_wobdtfv';
  publicKey = 'OOlwa_y0sNGytYP2Q'; // Replace with your actual public key

  constructor(private fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  sendEmail(event: Event) {
    event.preventDefault();

    if (this.contactForm.invalid) {
      this.toastr.error('Please fill all required fields.');
      return;
    }

    emailjs.send(this.serviceId, this.templateId, this.contactForm.value, this.publicKey)
      .then((result: EmailJSResponseStatus) => {
        console.log('Email sent:', result.text);
        this.toastr.success('Thanks for reaching out!');
        this.contactForm.reset();
      }, (error) => {
        console.error('Error:', error.text);
        this.toastr.error('Something went wrong. Try again!');
      });
  }


}