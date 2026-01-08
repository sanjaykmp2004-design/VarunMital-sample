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
  // Desktop dropdown
  dropdownOpen: boolean = false;
  private dropdownTimeout: any = null;

  // Navigation
  activeLink: string = 'home';
  
  // Mobile menu states
  mobileMenuOpen: boolean = false;
  mobileServicesOpen: boolean = false;

  // Form fields
  name = '';
  email = '';
  company = '';
  message = '';

  constructor(private http: HttpClient) {}

  /* ===========================
       SMOOTH SCROLL
  ============================*/
  scrollTo(sectionId: string, duration: number = 600) {
    const target = document.getElementById(sectionId);
    if (!target) return;

    const start = window.pageYOffset;
    const targetOffset = target.getBoundingClientRect().top;
    const startTime = performance.now();

    const easeInOut = (t: number) =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeInOut(progress);

      window.scrollTo(0, start + targetOffset * ease);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);

    this.activeLink = sectionId;
    this.closeMobileMenu();
  }

  /* ===========================
       DESKTOP DROPDOWN
  ============================*/
  onMouseEnterServices() {
    this.clearDropdownTimer();
    this.dropdownOpen = true;
  }

  onMouseLeaveServices() {
    this.dropdownTimeout = setTimeout(() => {
      this.dropdownOpen = false;
    }, 800);
  }

  clearDropdownTimer() {
    if (this.dropdownTimeout) {
      clearTimeout(this.dropdownTimeout);
      this.dropdownTimeout = null;
    }
  }

  setActive(link: string) {
    this.activeLink = link;
    this.dropdownOpen = false;
    this.clearDropdownTimer();
  }

  /* ===========================
       MOBILE MENU
  ============================*/
  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
    this.mobileServicesOpen = false;
  }

  toggleMobileServices() {
    this.mobileServicesOpen = !this.mobileServicesOpen;
  }

  /* ===========================
       CONTACT FORM
  ============================*/
  sendmessage() {
    if (!this.name || !this.email || !this.message) {
      alert('Please fill in all required fields');
      return;
    }

    this.http.post('http://localhost:3000/api/contact', {
      name: this.name,
      email: this.email,
      company: this.company,
      message: this.message
    }).subscribe({
      next: () => {
        alert('Message sent successfully ✅');
        this.name = '';
        this.email = '';
        this.company = '';
        this.message = '';
      },
      error: () => alert('Failed to send message ❌')
    });
  }
}