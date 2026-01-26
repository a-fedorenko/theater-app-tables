import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../../shared/components/search/search.component';
import { AddRehearsalDialogComponent } from './add-rehearsal-dialog.component';

@Component({
  selector: 'app-rehearsal-list',
  templateUrl: './rehearsal-list.component.html',
  styleUrls: ['./rehearsal-list.component.scss'],
  standalone: true,
  imports: [CommonModule, SearchComponent, AddRehearsalDialogComponent]
})
export class RehearsalListComponent {
  searchTerm = '';
  rehearsals = [
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

  showAddRehearsalDialog = false;
  addRehearsalEditMode = false;
  addRehearsalEditData: any = null;
  editRehearsalId: number | null = null;

  deleteRehearsal(id: number, event: Event) {
    event.stopPropagation();
    if (confirm('Ви впевнені, що хочете видалити цю репетицію?')) {
      const idx = this.rehearsals.findIndex(r => r.id === id);
      if (idx > -1) {
        this.rehearsals.splice(idx, 1);
      }
    }
  }

  editRehearsal(id: number, event: Event) {
    event.stopPropagation();
    const rehearsal = this.rehearsals.find(r => r.id === id);
    if (rehearsal) {
      this.addRehearsalEditMode = true;
      this.addRehearsalEditData = { ...rehearsal };
      this.editRehearsalId = id;
      this.showAddRehearsalDialog = true;
    }
  }

  createRehearsal() {
    this.addRehearsalEditMode = false;
    this.addRehearsalEditData = null;
    this.editRehearsalId = null;
    this.showAddRehearsalDialog = true;
  }

  onAddRehearsalSave(rehearsal: any) {
    if (this.addRehearsalEditMode && this.editRehearsalId !== null) {
      // Оновлення існуючої репетиції
      const idx = this.rehearsals.findIndex(r => r.id === this.editRehearsalId);
      if (idx !== -1) {
        this.rehearsals[idx] = { ...this.rehearsals[idx], ...rehearsal, id: this.editRehearsalId };
      }
    } else {
      // Додавання нової репетиції
      this.rehearsals.push({
        ...rehearsal,
        id: Date.now()
      });
    }
    this.showAddRehearsalDialog = false;
    this.addRehearsalEditMode = false;
    this.addRehearsalEditData = null;
    this.editRehearsalId = null;
  }

  onAddRehearsalCancel() {
    this.showAddRehearsalDialog = false;
    this.addRehearsalEditMode = false;
    this.addRehearsalEditData = null;
    this.editRehearsalId = null;
  }


}
