import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('Client');
  protected members = signal<any[]>([]);
  private httpClient = inject(HttpClient);
  ngOnInit(): void {
    this.httpClient.get('https://localhost:5005/api/members').subscribe({
      next: (response: any) => {
        console.log('API is healthy:', response);
        this.members.set(response);
      },
      error: (error: any) => {
        console.error('API health check failed:', error);
      },
      complete: () => {
        console.log('API call completed.');
      },
    });
  }
}
