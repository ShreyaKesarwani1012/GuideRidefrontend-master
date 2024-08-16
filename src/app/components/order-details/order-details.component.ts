
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { ActivatedRoute, RouterLink } from '@angular/router';
@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule,HttpClientModule,RouterLink],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent {
  apiUrl = 'http://localhost:5202/api/User/bills';  // URL to fetch order data
  orders: any[] = [];
  bookingId: string | null = null;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.bookingId = params.get('bookingId');
      if (this.bookingId) {
        this.fetchOrderDetails(this.bookingId);
      }
    });
  }

  fetchOrderDetails(bookingId: string): void {
    const url = `${this.apiUrl}?bookingId=${bookingId}`;
    this.http.get<any[]>(url).subscribe({
      next: (data) => {
        this.orders = data;
        console.log('Received order data:', data); // Debugging line
      },
      error: (err) => {
        console.error('Error fetching order data:', err);
      }
    });
  }
}
