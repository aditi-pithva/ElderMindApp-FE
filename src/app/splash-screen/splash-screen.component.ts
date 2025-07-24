import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-splash-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss']
})
export class SplashScreenComponent {
  
  constructor(private router: Router) {}
  
  startAssessment() {
    // Navigate to the conversation screen
    this.router.navigate(['/assessment']);
  }
}