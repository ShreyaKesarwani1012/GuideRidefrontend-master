import { Component, OnInit} from '@angular/core';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [RouterLink,RouterOutlet,CommonModule,HttpClientModule],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css'
})
export class CarsComponent implements OnInit {
  apiUrl = 'http://localhost:5202/api/User/available-cars';  // URL to fetch car data
  cars: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.fetchCars();
  }

  fetchCars() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.cars = data;
        console.log('Cars data:', this.cars); // Debugging line
      },
      error: (err) => {
        console.error('Error fetching car data:', err);
      }
    });
  }

  viewDetails(car: any) {
    this.router.navigate(['/details'], { state: { car: car } });
  }
}