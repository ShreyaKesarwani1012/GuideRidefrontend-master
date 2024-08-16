import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule,ValidatorFn, AbstractControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';




@Component({
  selector: 'app-book',
  standalone: true,
  imports: [ ReactiveFormsModule ,CommonModule,HttpClientModule,RouterLink],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements OnInit{

  bookForm: FormGroup;
  minEndDate: Date;
  apiUrl = 'http://localhost:5202/api/User/bookings'; // URL to post booking data

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

 

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      startDate: [null, Validators.required],
      endDate: [null, [Validators.required, this.endDateValidator.bind(this)]],
      startPosition: [null, Validators.required],
      endPosition: [null, Validators.required]
    });

    this.bookForm.get('startDate')?.valueChanges.subscribe(startDate => {
      if (startDate) {
        this.minEndDate = new Date(startDate);
        this.bookForm.get('endDate')?.updateValueAndValidity();
      }
    });
  }

  endDateValidator(control: any): { [key: string]: any } | null {
    if (control.value && this.minEndDate && new Date(control.value) < this.minEndDate) {
      return { 'endDateInvalid': true };
    }
    return null;
  }

  get endDateMin(): string {
    return this.minEndDate ? this.minEndDate.toISOString().split('T')[0] : '';
  }



  
  onSubmit(): void {
    if (this.bookForm.valid) {
      this.http.post(this.apiUrl, this.bookForm.value).subscribe({
        next: () => {
          console.log('Booking successfully submitted');
          this.router.navigate(['/bill']); 
        },
        error: (err) => {
          console.error('Error submitting booking:', err);
        }
      });
    }
  }
}
