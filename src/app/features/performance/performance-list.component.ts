import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../../shared/components/search/search.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PerformanceService } from '../../services/performance.service';
import { Performance } from '../../models/performance.model';
import { AddPerformanceDialogComponent } from './add-performance-dialog.component';
import { RehearsalListComponent } from '../rehearsal/rehearsal-list.component';

@Component({
  selector: 'app-performance-list',
  templateUrl: './performance-list.component.html',
  styleUrls: ['./performance-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AddPerformanceDialogComponent,
    SearchComponent
  ]
})
export class PerformanceListComponent implements OnInit {
  rehearsals: any[] = [];
  editingPerformance: Performance | null = null;
  allActors: any[] = [];
  selectedActorIds: string[] = [];
  performances: Performance[] = [];
  newPerformanceTitle: string = '';
  newPerformanceGenre: string = '';
  newPerformanceDescription: string = '';
  newPerformanceDirector: string = '';
  newPerformanceDuration: number = 120;
  newPerformancePremiereDate: string = new Date().toISOString().slice(0, 10);
  showAddDialog: boolean = false;
  addDialogData: any = null;
  loading: boolean = true;
  errorMessage: string = '';
  searchTerm: string = '';
  expandedPerformances: Set<string> = new Set();
  performanceStatuses: Map<string, string> = new Map();
  sortBy: 'all' | 'working' | 'active' | 'month' | 'today' | 'suspended' | null = null;



  // ...existing code...


  constructor(
    private router: Router,
    private performanceService: PerformanceService,
    // Removed MatDialog, using template-driven modal
  ) {}

  ngOnInit(): void {
    this.loadPerformances();
    this.loadActors();
    this.loadRehearsals();
  }

  loadRehearsals(): void {
    // Спробуємо отримати з localStorage або з RehearsalListComponent (статично)
    const stored = localStorage.getItem('rehearsals');
    if (stored) {
      this.rehearsals = JSON.parse(stored);
    } else {
      // fallback: hardcode/demo
      this.rehearsals = [
        { id: 1, date: '2026-02-01', time: '18:00', performance: 'Гамлет', stage: 'Головна', actors: ['Іван Іванов', 'Петро Петренко'] },
        { id: 2, date: '2026-02-02', time: '19:00', performance: 'Лісова пісня', stage: 'Мала', actors: ['Олена Ковальчук', 'Марія Сидоренко'] },
        { id: 3, date: '2026-02-03', time: '17:00', performance: 'Макбет', stage: 'Головна', actors: ['Іван Іванов', 'Марія Сидоренко'] },
        { id: 4, date: '2026-02-04', time: '18:30', performance: 'Кайдашева сімʼя', stage: 'Мала', actors: ['Петро Петренко', 'Олена Ковальчук'] },
        { id: 5, date: '2026-02-05', time: '20:00', performance: 'Мартин Боруля', stage: 'Головна', actors: ['Іван Іванов', 'Олена Ковальчук'] },
        { id: 6, date: '2026-02-06', time: '19:30', performance: 'Лісова пісня', stage: 'Мала', actors: ['Марія Сидоренко', 'Петро Петренко'] },
        { id: 7, date: '2026-02-07', time: '18:00', performance: 'Гамлет', stage: 'Головна', actors: ['Олена Ковальчук', 'Іван Іванов'] },
        { id: 8, date: '2026-02-08', time: '17:30', performance: 'Макбет', stage: 'Мала', actors: ['Петро Петренко', 'Марія Сидоренко'] },
        { id: 9, date: '2026-02-09', time: '18:00', performance: 'Кайдашева сімʼя', stage: 'Головна', actors: ['Олена Ковальчук', 'Іван Іванов'] },
        { id: 10, date: '2026-02-10', time: '19:00', performance: 'Мартин Боруля', stage: 'Мала', actors: ['Марія Сидоренко', 'Петро Петренко'] }
      ];
    }
  }

  getRehearsalsForPerformance(performanceTitle: string): any[] {
    return this.rehearsals.filter(r => r.performance === performanceTitle);
  }

  loadActors(): void {
    const stored = localStorage.getItem('actors');
    if (stored) {
      this.allActors = JSON.parse(stored);
    } else {
      this.allActors = [];
    }
  }

  loadPerformances(): void {
    this.loading = true;
    const stored = localStorage.getItem('performances');
    if (stored) {
      this.performances = JSON.parse(stored);
      this.loading = false;
    } else {
      this.performanceService.getPerformances().subscribe({
        next: (data) => {
          this.performances = data;
          localStorage.setItem('performances', JSON.stringify(data));
          this.loading = false;
        },
        error: () => {
          this.errorMessage = 'Помилка завантаження вистав';
          this.loading = false;
        }
      });
    }
  }

  createPerformance(): void {
    this.addDialogData = {
      title: '',
      genre: '',
      description: '',
      director: '',
      duration: 120,
      premiere_date: new Date().toISOString().slice(0, 10),
      selectedActorIds: [],
      allActors: this.allActors
    };
    this.showAddDialog = true;
  }


  onDialogSave(result: any): void {
    if (result) {
      const selectedActors = this.allActors.filter(a => result.selectedActorIds.includes(String(a.id))).map(a => ({
        id: a.id,
        name: a.first_name + ' ' + a.last_name,
        photoUrl: a.photoUrl || ''
      }));
      if (this.editingPerformance) {
        // Edit existing performance
        const idx = this.performances.findIndex(p => (p.performanceId?.toString?.() === this.editingPerformance!.performanceId?.toString?.()) || (p.id?.toString?.() === this.editingPerformance!.id?.toString?.()));
        if (idx !== -1) {
          this.performances[idx] = {
            ...this.performances[idx],
            title: result.title,
            genre: result.genre,
            description: result.description,
            director: result.director,
            duration: result.duration,
            premiere_date: result.premiere_date,
            actors: selectedActors,
          };
        }
      } else {
        // Add new performance
        const newPerformance: Performance = {
          id: Date.now(),
          title: result.title,
          genre: result.genre,
          description: result.description,
          director: result.director,
          duration: result.duration,
          premiere_date: result.premiere_date,
          actors: selectedActors,
        };
        this.performances.push(newPerformance);
      }
      localStorage.setItem('performances', JSON.stringify(this.performances));
    }
    this.showAddDialog = false;
    this.addDialogData = null;
    this.editingPerformance = null;
  }


  onDialogCancel(): void {
    this.showAddDialog = false;
    this.addDialogData = null;
    this.editingPerformance = null;
  }

  // saveNewPerformance більше не потрібен, логіка перенесена у createPerformance


  cancelAddPerformance(): void {
    this.showAddDialog = false;
    this.resetPerformanceFields();
  }

  private resetPerformanceFields(): void {
    this.newPerformanceTitle = '';
    this.newPerformanceGenre = '';
    this.newPerformanceDescription = '';
    this.newPerformanceDirector = '';
    this.newPerformanceDuration = 120;
    this.newPerformancePremiereDate = new Date().toISOString().slice(0, 10);
    this.selectedActorIds = [];
  }

  get filteredPerformances(): Performance[] {
    let filtered = this.performances;
    
    // Фільтрування за пошуком
    if (this.searchTerm) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        p.genre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (p.director && p.director.toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
    }
    
    // Фільтрування за статусом
    if (this.sortBy === 'working') {
      filtered = filtered.filter(p => this.getStatus(p) === 'В роботі');
    } else if (this.sortBy === 'active') {
      filtered = filtered.filter(p => this.getStatus(p) === 'Активні');
    } else if (this.sortBy === 'suspended') {
      filtered = filtered.filter(p => this.getStatus(p) === 'Призупинені');
    } else if (this.sortBy === 'month') {
      // Вистави цього місяця
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      filtered = filtered.filter(p => {
        const premiere = new Date(p.premiere_date);
        return premiere.getMonth() === currentMonth && premiere.getFullYear() === currentYear;
      });
    } else if (this.sortBy === 'today') {
      // Вистави сьогодні
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      filtered = filtered.filter(p => {
        const premiere = new Date(p.premiere_date);
        premiere.setHours(0, 0, 0, 0);
        return premiere.getTime() === today.getTime();
      });
    }
    
    return filtered;
  }

  getCountByStatus(status: string): number {
    return this.performances.filter(p => this.getStatus(p) === status).length;
  }

  getCountThisMonth(): number {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    return this.performances.filter(p => {
      const premiere = new Date(p.premiere_date);
      return premiere.getMonth() === currentMonth && premiere.getFullYear() === currentYear;
    }).length;
  }

  getCountToday(): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.performances.filter(p => {
      const premiere = new Date(p.premiere_date);
      premiere.setHours(0, 0, 0, 0);
      return premiere.getTime() === today.getTime();
    }).length;
  }

  getInitials(title: string): string {
    return title
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  getUniqueGenres(): number {
    const genres = new Set(this.performances.map(p => p.genre));
    return genres.size;
  }

  getStatus(performance: Performance): string {
    if (!performance.performanceId) return 'В роботі';
    
    if (!this.performanceStatuses.has(performance.performanceId)) {
      const statuses = ['В роботі', 'Активні', 'Призупинені', 'В розробці'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      this.performanceStatuses.set(performance.performanceId, randomStatus);
    }
    
    return this.performanceStatuses.get(performance.performanceId) || 'В роботі';
  }

  getStatusClass(performance: Performance): string {
    const status = this.getStatus(performance);
    if (status === 'Активні') return 'active';
    if (status === 'Призупинені') return 'suspended';
    if (status === 'В роботі') return 'working';
    return 'development';
  }

  toggleExpand(performanceKey: string, event: Event): void {
    event.stopPropagation();
    if (this.expandedPerformances.has(performanceKey)) {
      this.expandedPerformances.delete(performanceKey);
    } else {
      this.expandedPerformances.add(performanceKey);
    }
  }

  isExpanded(performanceKey: string): boolean {
    return this.expandedPerformances.has(performanceKey);
  }

  setSortBy(sortType: 'all' | 'working' | 'active' | 'month' | 'today' | 'suspended'): void {
    this.sortBy = this.sortBy === sortType ? null : sortType;
  }

  viewDetails(performanceId: string): void {
    this.router.navigate(['/performances', performanceId]);
  }


  editPerformance(performanceId: string, event: Event): void {
    event.stopPropagation();
    const performance = this.performances.find(p => (p.performanceId?.toString?.() === performanceId) || (p.id?.toString?.() === performanceId));
    if (performance) {
      this.editingPerformance = { ...performance };
      this.addDialogData = {
        title: performance.title,
        genre: performance.genre,
        description: performance.description,
        director: performance.director,
        duration: performance.duration,
        premiere_date: performance.premiere_date,
        selectedActorIds: (performance.actors || []).map(a => String(a.id)),
        allActors: this.allActors
      };
      this.showAddDialog = true;
    }
  }

  deletePerformance(performanceId: string, event: Event): void {
    event.stopPropagation();
    if (confirm('Ви впевнені, що хочете видалити цю виставу?')) {
      const index = this.performances.findIndex(p => (p.performanceId?.toString?.() === performanceId) || (p.id?.toString?.() === performanceId));
      if (index !== -1) {
        this.performances.splice(index, 1);
        localStorage.setItem('performances', JSON.stringify(this.performances));
      }
    }
  }
}
