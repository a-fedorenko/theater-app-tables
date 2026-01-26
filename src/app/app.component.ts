import { Component } from '@angular/core';
import { SidebarComponent } from './features/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-layout">
      <app-sidebar></app-sidebar>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [
    `.app-layout {
      display: flex;
      min-height: 100vh;
      background: #f8f9fc;
    }

    .main-content {
      flex: 1;
      margin-left: 280px;
      overflow-x: hidden;
    }
  `],
  standalone: true,
  imports: [SidebarComponent, RouterModule]
})
export class AppComponent {
  title = 'angular-components';
}
