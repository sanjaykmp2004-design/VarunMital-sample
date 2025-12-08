import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterLink
  ],
  templateUrl: './services.html',
  styleUrls: ['./services.css']
})
export class Services {

  activeLink: string = 'home';
  mobileMenuOpen = false;

  name = '';
  email = '';
  company = '';
  message = '';

  constructor(private http: HttpClient) {}

  // ✅ Smooth scroll function
 scrollTo(sectionId: string) {
  const target = document.getElementById(sectionId);
  if (!target) return;

  this.activeLink = sectionId;

  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;

  const duration = 900; // ⬅️ increase value for slower scroll (1200 = slower, 1500 = very slow)
  let start: number | null = null;

  const animation = (currentTime: number) => {
    if (start === null) start = currentTime;

    const timeElapsed = currentTime - start;
    const run = this.easeInOut(timeElapsed, startPosition, distance, duration);

    window.scrollTo(0, run);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
}

// ✅ Smooth animation formula
easeInOut(t: number, b: number, c: number, d: number) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
}


  sendmessage() {
    if (!this.name || !this.email || !this.message) {
      alert('Please fill all fields');
      return;
    }

    this.http.post('http://localhost:3000/api/contact', {
      name: this.name,
      email: this.email,
      company: this.company,
      message: this.message
    }).subscribe({
      next: () => {
        alert('Message sent ✅');
        this.name = '';
        this.email = '';
        this.company = '';
        this.message = '';
      },
      error: () => alert('Failed ❌')
    });
  }
}
