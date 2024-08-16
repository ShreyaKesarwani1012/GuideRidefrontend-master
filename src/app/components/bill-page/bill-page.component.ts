import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router ,RouterLink} from '@angular/router';

@Component({
  selector: 'app-bill-page',
  standalone: true,
  imports: [RouterLink,HttpClientModule,CommonModule],
  templateUrl: './bill-page.component.html',
  styleUrl: './bill-page.component.css'
})
export class BillPageComponent {
  apiUrl = 'http://localhost:5202/api/User/Booking'; // URL to fetch bill details
  billDetails: any = {};

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.fetchBillDetails();
  }

  fetchBillDetails(): void {
    // Assuming we get the booking ID from the route or service
    const bookingId = this.router.url.split('/').pop(); // Get booking ID from URL
    this.http.get<any>(`${this.apiUrl}/${bookingId}`).subscribe({
      next: (data) => {
        this.billDetails = data;
      },
      error: (err) => {
        console.error('Error fetching bill details:', err);
      }
    });
  }
}
