import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  badge?: number;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class SidebarComponent {
  userName = 'Театральний адмін';
  userAvatar = 'assets/icons/user.svg';

  menuItems: MenuItem[] = [
    { label: 'Вистави', icon: 'table', route: '/performances' },
    { label: 'Актори', icon: 'users', route: '/actors' },
    { label: 'Сцени', icon: 'layout', route: '/stages' },
    { label: 'Репетиції', icon: 'calendar', route: '/rehearsals' }
  ];

  constructor(private router: Router) {}

  isActiveRoute(route?: string): boolean {
    if (!route) return false;
    return this.router.url === route;
  }

  navigateTo(item: MenuItem): void {
    if (item.route) {
      this.router.navigate([item.route]);
    }
  }

  openSettings(): void {
    alert('Налаштування');
  }

  showSupport(): void {
    alert('Підтримка');
  }

  signOut(): void {
    if (confirm('Ви впевнені, що хочете вийти?')) {
      alert('Вихід із системи');
    }
  }
}
