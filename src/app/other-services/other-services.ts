import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-other-services',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterLink
  ],
  templateUrl: './other-services.html',
  styleUrls: ['./other-services.css']
})
export class OtherServices {

  activeLink: string = '';
  dropdownOpen: boolean = false;
  dropdownTimer: any;

  // Mobile menu states
  mobileMenuOpen: boolean = false;
  mobileServicesOpen: boolean = false;

  // Form fields
  name = '';
  email = '';
  company = '';
  message = '';

  particles: Array<{ x: number; y: number }> = [];

  constructor(private http: HttpClient) {
    this.generateParticles();
  }

  /* ===========================
        ACTIVE LINK
  ============================*/
  setActive(link: string) {
    this.activeLink = link;
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
        DROPDOWN (DESKTOP)
  ============================*/
  openDropdown() {
    this.clearTimer();
    this.dropdownOpen = true;
  }

  closeDropdownDelayed() {
    this.dropdownTimer = setTimeout(() => {
      this.dropdownOpen = false;
    }, 800);
  }

  clearTimer() {
    if (this.dropdownTimer) clearTimeout(this.dropdownTimer);
  }

  selectService() {
    this.dropdownOpen = false;
    this.activeLink = 'services';
  }

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
       PARTICLES
  ============================*/
  generateParticles() {
    for (let i = 0; i < 15; i++) {
      this.particles.push({
        x: Math.random() * (window.innerWidth || 1200),
        y: Math.random() * 600
      });
    }
  }

  trackByIndex(i: number) {
    return i;
  }

  /* ===========================
       CONTACT FORM
  ============================*/
  sendmessage() {
    if (!this.name || !this.email || !this.message) {
      alert("Please fill in all required fields");
      return;
    }

    this.http.post('http://localhost:3000/api/contact', {
      name: this.name,
      email: this.email,
      company: this.company,
      message: this.message
    }).subscribe({
      next: () => {
        alert("Message sent successfully");
        this.name = '';
        this.email = '';
        this.company = '';
        this.message = '';
      },
      error: () => alert("Failed to send message")
    });
  }
}