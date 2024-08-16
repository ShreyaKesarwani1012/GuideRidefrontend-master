import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-guide-availability',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './guide-availability.component.html',
  styleUrl: './guide-availability.component.css'
})
export class GuideAvailabilityComponent {
  apiUrl = 'http://localhost:5202/api/User/available-guides'
  guides: any[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.fetchGuides();
  }

  fetchGuides(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        console.log('Received guide data:', data); // Debugging line
        this.guides = data;
      },
      error: (err) => {
        console.error('Error fetching guide data:', err);
      }
    });
  }

  bookGuide(guide: any): void {
    
    // Implement booking logic here
    console.log('Booking guide:', guide);
  }

}
