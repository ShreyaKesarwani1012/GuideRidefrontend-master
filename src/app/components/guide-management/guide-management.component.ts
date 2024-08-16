import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-guide-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  templateUrl: './guide-management.component.html',
  styleUrls: ['./guide-management.component.css']
})
export class GuideManagementComponent implements OnInit {
  guideForm: FormGroup;
  ratings: number[] = [1, 2, 3, 4, 5];
  removeId: string;
  getId: string;
  guide: any;
  guides: any[] = [];
  private apiUrl = 'http://localhost:5202/api/admin/Admin/guides';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.guideForm = this.fb.group({
      name: ['', Validators.required],
      rating: ['', Validators.required],
      fare: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {this.fetchAllGuides();}

  getToken(): string {
    const token = localStorage.getItem('token');
    console.log('Retrieved token:', token); // Debugging line
    return token || '';
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  onAddGuide() {
    if (this.guideForm.valid) {
      const guideData = this.guideForm.value;
      this.http.post<any>(this.apiUrl, guideData, { headers: this.getAuthHeaders() })
        .subscribe(
          response => {
            console.log('Guide added:', response);
            alert('Guide added successfully!');
            this.guideForm.reset();
          },
          error => {
            console.error('Failed to add guide:', error);
            alert('Failed to add guide.');
          }
        );
    }
  }

  onRemoveGuide() {
    if (this.removeId) {
      this.http.delete(`${this.apiUrl}/${this.removeId}`, { headers: this.getAuthHeaders() })
        .subscribe(
          response => {
            console.log('Guide removed:', response);
            alert('Guide removed successfully!');
            this.removeId = '';
          },
          error => {
            console.error('Failed to remove guide:', error);
            alert('Failed to remove guide.');
          }
        );
    }
  }

  onGetGuideById() {
    if (this.getId) {
      this.http.get<any>(`${this.apiUrl}/${this.getId}`, { headers: this.getAuthHeaders() })
        .subscribe(
          response => {
            this.guide = response;
            console.log('Guide details:', response);
          },
          error => {
            console.error('Failed to get guide:', error);
            alert('Failed to get guide.');
          }
        );
    }
  }

  fetchAllGuides(): void {
    this.http.get<any[]>(this.apiUrl, { headers: this.getAuthHeaders() })
      .subscribe(
        response => {
          this.guides = response;
          console.log('Fetched guides:', this.guides);
        },
        error => {
          console.error('Failed to fetch guides:', error);
        }
      );
  }
}
