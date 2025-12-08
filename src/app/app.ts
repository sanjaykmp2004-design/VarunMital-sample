import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router'; // <-- Import RouterModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule], 
  templateUrl: './app.html',
  styleUrls: ['./app.css'] 
})
export class App {
  protected readonly title = signal('assurion_services');
}
