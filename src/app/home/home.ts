import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {

  activeLink: string = 'home';

  mobileMenuOpen: boolean = false;
  mobileServicesOpen: boolean = false;

  dropdownOpen: boolean = false;
  private dropdownTimeout: any = null;

  name = '';
  email = '';
  company = '';
  message = '';

  particles: Array<{ x: number; y: number }> = [];

  constructor(private http: HttpClient) {
    this.generateParticles();
  }

  /* =====================
     NAVIGATION
     ===================== */

  scrollTo(sectionId: string, duration: number = 600) {
    const target = document.getElementById(sectionId);
    if (!target) return;

    const startPosition = window.pageYOffset;
    const targetPosition = target.getBoundingClientRect().top;
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      const ease = progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;

      window.scrollTo(0, startPosition + targetPosition * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
    this.activeLink = sectionId;
    this.closeMobileMenu();
  }

  setActive(link: string) {
    this.activeLink = link;
    this.dropdownOpen = false;
    this.clearDropdownTimer();
  }

  /* =====================
     DESKTOP SERVICES DROPDOWN
     ===================== */

  onMouseEnterServices() {
    this.clearDropdownTimer();
    this.dropdownOpen = true;
  }

  onMouseLeaveServices() {
    this.dropdownTimeout = setTimeout(() => {
      this.dropdownOpen = false;
    }, 1000);
  }

  clearDropdownTimer() {
    if (this.dropdownTimeout) {
      clearTimeout(this.dropdownTimeout);
      this.dropdownTimeout = null;
    }
  }

  /* =====================
     MOBILE MENU
     ===================== */

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;

    // Close services submenu when main menu closes
    if (!this.mobileMenuOpen) {
      this.mobileServicesOpen = false;
    }
  }

  toggleMobileServices() {
    this.mobileServicesOpen = !this.mobileServicesOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
    this.mobileServicesOpen = false;
  }

  /* =====================
     PARTICLES
     ===================== */

  generateParticles() {
    this.particles = [];
    for (let i = 0; i < 15; i++) {
      this.particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * 600
      });
    }
  }

  trackByIndex(i: number) {
    return i;
  }

  /* =====================
     CONTACT FORM
     ===================== */

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
        alert('Message sent ✔');
        this.name = '';
        this.email = '';
        this.company = '';
        this.message = '';
      },
      error: () => alert('Failed to send message ❌')
    });
  }
}
