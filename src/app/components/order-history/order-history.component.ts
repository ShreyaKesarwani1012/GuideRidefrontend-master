import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent implements OnInit {

  apiUrl = 'http://localhost:5202/api/User/bookings'; // URL to fetch booking history data
  bookings: any[] = [];
  userId: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchBookingHistory();
  }

  fetchBookingHistory(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.bookings = data;
        console.log('Received booking data:', data); // Debugging line
      },
      error: (err) => {
        console.error('Error fetching booking data:', err);
      }
    });
  }
}
