
import { Component, OnInit, Renderer2, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../../shared/components/search/search.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActorService } from '../../services/actor.service';
import { Actor } from '../../models/performance.model';

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrls: ['./actor-list.component.scss'],
  standalone: true,
  imports: [CommonModule, SearchComponent, FormsModule]
})
export class ActorListComponent implements OnInit, OnDestroy {
  editingActor: Actor | null = null;
  showAddActorDialog: boolean = false;
  newActorFirstName: string = '';
  newActorLastName: string = '';
  newActorBirthDate: string = '';
  newActorPhotoUrl: string = '';
  newActorPhotoPreview: string = '';
  newActorBiography: string = '';
  actors: Actor[] = [];
  loading: boolean = true;
  errorMessage: string = '';
  searchTerm: string = '';
  expandedActors: Set<number> = new Set();


  constructor(
    private router: Router,
    private actorService: ActorService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {}

  ngOnDestroy(): void {
    this.enableBodyScroll();
  }

  private disableBodyScroll(): void {
    this.renderer.addClass(this.document.body, 'modal-open');
  }

  private enableBodyScroll(): void {
    this.renderer.removeClass(this.document.body, 'modal-open');
  }

  ngOnInit(): void {
    this.loadActors();
  }

  loadActors(): void {
    this.loading = true;
    const stored = localStorage.getItem('actors');
    if (stored) {
      this.actors = JSON.parse(stored);
      this.loading = false;
    } else {
      this.actorService.getActors().subscribe({
        next: (data) => {
          this.actors = data;
          localStorage.setItem('actors', JSON.stringify(data));
          this.loading = false;
        },
        error: () => {
          this.errorMessage = 'Помилка завантаження акторів';
          this.loading = false;
        }
      });
    }
  }

  get filteredActors(): Actor[] {
    if (!this.searchTerm) {
      return this.actors;
    }
    return this.actors.filter(a =>
      a.first_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      a.last_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      (a.biography && a.biography.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  getInitials(firstName: string, lastName: string): string {
    return (firstName[0] + lastName[0]).toUpperCase();
  }

  getFullName(actor: Actor): string {
    return `${actor.first_name} ${actor.last_name}`;
  }

  getAge(birthDate: string): number {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }

  toggleExpand(actorId: number, event: Event): void {
    event.stopPropagation();
    if (this.expandedActors.has(actorId)) {
      this.expandedActors.delete(actorId);
    } else {
      this.expandedActors.add(actorId);
    }
  }

  isExpanded(actorId: number): boolean {
    return this.expandedActors.has(actorId);
  }

  navigateToPerformance(actor: Actor, index: number, event: Event): void {
    event.stopPropagation();
    if (actor.performanceIds && actor.performanceIds[index]) {
      // TODO: Створити сторінку деталей вистави
      // this.router.navigate(['/performances', actor.performanceIds[index]]);
      console.log('Navigate to performance:', actor.performances?.[index], 'ID:', actor.performanceIds[index]);
      alert(`Перехід до вистави "${actor.performances?.[index]}" буде доданий пізніше`);
    }
  }

  viewDetails(actorId: number): void {
    this.router.navigate(['/actors', actorId]);
  }

  createActor(): void {
    this.showAddActorDialog = true;
    this.disableBodyScroll();
    this.editingActor = null;
  }

  editActor(actorId: number, event: Event): void {
    event.stopPropagation();
    const actor = this.actors.find(a => a.id === actorId);
    if (actor) {
      this.editingActor = { ...actor };
      this.newActorFirstName = actor.first_name;
      this.newActorLastName = actor.last_name;
      this.newActorBirthDate = actor.birth_date;
      this.newActorPhotoPreview = actor.photoUrl || '';
      this.newActorBiography = actor.biography || '';
      this.showAddActorDialog = true;
    }
  }

  saveNewActor(): void {
    if (!this.newActorFirstName || !this.newActorLastName) return;
    if (this.editingActor) {
      // Редагування існуючого актора
      const idx = this.actors.findIndex(a => a.id === this.editingActor!.id);
      if (idx !== -1) {
        this.actors[idx] = {
          ...this.actors[idx],
          first_name: this.newActorFirstName,
          last_name: this.newActorLastName,
          birth_date: this.newActorBirthDate || '',
          photoUrl: this.newActorPhotoPreview || '',
          biography: this.newActorBiography || '',
        };
      }
    } else {
      // Додавання нового актора
      const newActor: Actor = {
        id: Date.now(),
        first_name: this.newActorFirstName,
        last_name: this.newActorLastName,
        birth_date: this.newActorBirthDate || '',
        photoUrl: this.newActorPhotoPreview || '',
        biography: this.newActorBiography || '',
        specialty: '',
        performances: [],
      };
      this.actors.push(newActor);
    }
    localStorage.setItem('actors', JSON.stringify(this.actors));
    this.showAddActorDialog = false;
    this.editingActor = null;
    this.newActorFirstName = '';
    this.newActorLastName = '';
    this.newActorBirthDate = '';
    this.newActorPhotoUrl = '';
    this.newActorPhotoPreview = '';
    this.newActorBiography = '';
  }

  onPhotoFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newActorPhotoPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      this.newActorPhotoPreview = '';
    }
  }

  cancelAddActor(): void {
    this.showAddActorDialog = false;
    this.enableBodyScroll();
    this.editingActor = null;
    this.newActorFirstName = '';
    this.newActorLastName = '';
    this.newActorBirthDate = '';
    this.newActorPhotoUrl = '';
    this.newActorPhotoPreview = '';
    this.newActorBiography = '';
  }


  deleteActor(actorId: number, event: Event): void {
    event.stopPropagation();
    if (confirm('Ви впевнені, що хочете видалити цього актора?')) {
      const index = this.actors.findIndex(a => a.id === actorId);
      if (index > -1) {
        this.actors.splice(index, 1);
      }
    }
  }
}
