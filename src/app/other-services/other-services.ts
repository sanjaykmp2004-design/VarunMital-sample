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

  mobileMenuOpen: boolean = false;

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
  }

  /* ===========================
        DROPDOWN (HOME-LIKE)
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
  }

  /* ===========================
       SMOOTH SCROLL
  ============================*/
 scrollTo(sectionId: string) {
  const target = document.getElementById(sectionId);
  if (!target) return;

  const start = window.pageYOffset;
  const end = target.getBoundingClientRect().top;
  const duration = 700;
  const startTime = performance.now();

  const animate = (now: number) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const ease = progress < 0.5
      ? 2 * progress * progress
      : -1 + (4 - 2 * progress) * progress;

    window.scrollTo(0, start + end * ease);

    if (progress < 1) requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);

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
      alert("Please fill in all fields");
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
