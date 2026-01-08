import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-assurance-services',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    HttpClientModule
  ],
  templateUrl: './assurance-services.html',
  styleUrl: './assurance-services.css'
})
export class AssuranceServices {

  activeLink: string = 'home';
  mobileMenuOpen: boolean = false;

  // Dropdown hover state
  dropdownOpen: boolean = false;
  private dropdownTimer: any = null;
  mobileServicesOpen: boolean = false;  

  name = '';
  email = '';
  company = '';
  message = '';

  constructor(private http: HttpClient) {}

  /* ====================================================
       SMOOTH SCROLL (VISIBLE, CONTROLLED SPEED)
     ==================================================== */
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

  /* ====================================================
       MENU ACTIVE HANDLING
     ==================================================== */
  setActive(link: string) {
    this.activeLink = link;
    this.closeDropdown();
  }

  /* ====================================================
       DROPDOWN (HOVER OPEN + DELAYED CLOSE)
     ==================================================== */
  onMouseEnterServices() {
    this.clearDropdownTimer();
    this.dropdownOpen = true;
  }

  onMouseLeaveServices() {
    this.dropdownTimer = setTimeout(() => {
      this.dropdownOpen = false;
    }, 600); // delay for smooth UX
  }

  clearDropdownTimer() {
    if (this.dropdownTimer) {
      clearTimeout(this.dropdownTimer);
      this.dropdownTimer = null;
    }
  }

  closeDropdown() {
    this.dropdownOpen = false;
    this.clearDropdownTimer();
  }

  /* ====================================================
       MOBILE MENU
     ==================================================== */
  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
    this.mobileServicesOpen = false; 
  }

  /* ====================================================
       CONTACT FORM (UNCHANGED)
     ==================================================== */
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
        alert('Message sent successfully!');
        this.name = '';
        this.email = '';
        this.company = '';
        this.message = '';
      },
      error: () => alert('Failed to send message')
    });
  }
   toggleMobileServices() {  // ADD THIS METHOD
    this.mobileServicesOpen = !this.mobileServicesOpen;
  }
}
