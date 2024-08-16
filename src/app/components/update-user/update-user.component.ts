import { Compiler, Component,OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule



@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule,ReactiveFormsModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent implements OnInit{
  profileForm: FormGroup;
  apiUrl = 'https://localhost:5202/api/User'; // Replace with your API URL

  user: any = {
    name: '',
    city: '',
    dob: '',
    email: '',
    password: '*******'
  };

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    // Initialize the form with validators
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      city: ['', Validators.required],
      dob: ['', Validators.required] // Date of Birth field
    });

    // Load user data
    this.loadUserData();
  }
private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  loadUserData(): void {
    this.http.get<any>(`${this.apiUrl}/profile`).subscribe(user => {
      this.profileForm.patchValue({
        name: user.name,
        email: user.email,
        city: user.address,
        dob: user.dateOfBirth
      });
    });
  }

  

  


  onSubmit(): void {
    if (this.profileForm.valid) {
      this.http.put<any>(`${this.apiUrl}/update`, this.profileForm.value).subscribe(response => {
        console.log('Profile updated successfully', response);
      }, error => {
        alert("Not updated!")
        console.error('Error updating profile', error);
      });
    }
  }
}
