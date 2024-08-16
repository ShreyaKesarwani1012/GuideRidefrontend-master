import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule], // Ensure HttpClientModule is correctly imported
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  signupForm: FormGroup;
  registrationSuccessful: boolean = false; // Flag to show the success message

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
      address: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;

      // Replace the URL with your ASP.NET API endpoint
      const apiUrl = 'http://localhost:5202/api/Auth/register';

      this.http.post(apiUrl, formData).subscribe({
        next: (response) => {
          console.log('User signed in successfully', response);
          this.registrationSuccessful = true; // Set the flag to true on success
        },
        error: (error) => {
          console.error('Error during signin', error);
        }
      });
    }
  }
}
