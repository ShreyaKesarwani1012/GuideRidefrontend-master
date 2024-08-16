import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators,FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClient ,HttpClientModule} from '@angular/common/http';
@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,HttpClientModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  contactForm: FormGroup;

  // constructor(private fb: FormBuilder, private http: HttpClient) { }

  constructor(private fb: FormBuilder, private http: HttpClient){
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  // onSubmit(){
  //   if (this.contactForm.valid) {


  //     this.http.post('https:/localhost:5202/api/Query', this.contactForm.value)
  //       .subscribe(response => {
  //         console.log('Message sent successfully', response);
  //         this.contactForm.reset();
  //       }, error => {
  //         console.error('Error sending message', error);
  //       });
  //   }
  // }

  onSubmit() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;

      // Replace the URL with your ASP.NET API endpoint
      const apiUrl = 'http://localhost:5202/api/Query';
      

      this.http.post(apiUrl, formData).subscribe({
        next: (response) => {
          console.log('User Login Success', response);
        },
        error: (error) => {
          console.error('Error during Login', error);
        }
      });
    }
  }
}
