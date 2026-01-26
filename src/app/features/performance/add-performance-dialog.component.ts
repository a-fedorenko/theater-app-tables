import { Renderer2, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-performance-dialog',
  template: `
    <div class="modal" *ngIf="showAddPerformanceDialog">
      <div>
        <h3>{{ editMode ? 'Редагувати виставу' : 'Нова вистава' }}</h3>
        <form class="modal-form-grid">
          <div class="form-group">
            <label>Назва:</label>
            <input [(ngModel)]="newPerformanceTitle" name="title" class="form-control" placeholder="Назва" />
          </div>
          <div class="form-group">
            <label>Жанр:</label>
            <input [(ngModel)]="newPerformanceGenre" name="genre" class="form-control" placeholder="Жанр" />
          </div>
          <div class="form-group form-group--full">
            <label>Опис:</label>
            <textarea [(ngModel)]="newPerformanceDescription" name="description" class="form-control" placeholder="Опис"></textarea>
          </div>
          <div class="form-group">
            <label>Режисер:</label>
            <input [(ngModel)]="newPerformanceDirector" name="director" class="form-control" placeholder="Режисер" />
          </div>
          <div class="form-group">
            <label>Тривалість (хв):</label>
            <input type="number" [(ngModel)]="newPerformanceDuration" name="duration" class="form-control" placeholder="Тривалість (хв)" />
          </div>
          <div class="form-group">
            <label>Дата прем'єри:</label>
            <input type="date" [(ngModel)]="newPerformancePremiereDate" name="premiereDate" class="form-control" />
          </div>
          <div class="form-group form-group--full">
            <label>Актори:</label>
            <div class="actor-list">
              <div *ngFor="let actor of allActors" class="actor-list-item">
                <span>{{actor.first_name}} {{actor.last_name}}</span>
                <button type="button" class="btn btn-sm btn-outline-primary" (click)="addActor(actor.id)" [disabled]="newPerformanceSelectedActorIds.includes(actor.id)">
                  Додати актора
                </button>
              </div>
            </div>
            <div class="selected-actors" *ngIf="newPerformanceSelectedActorIds.length > 0">
              <label>Додані актори:</label>
              <ul>
                <li *ngFor="let actorId of newPerformanceSelectedActorIds">
                  {{ getActorName(actorId) }}
                  <button type="button" class="btn btn-sm btn-outline-danger" (click)="removeActor(actorId)">Видалити</button>
                </li>
              </ul>
            </div>
          </div>
        </form>
        <div style="margin-top: 16px; display: flex; gap: 8px;">
          <button class="btn btn-success" (click)="saveNewPerformance()">Зберегти</button>
          <button class="btn btn-secondary" (click)="cancelAddPerformance()">Скасувати</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./add-performance-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ]
})

export class AddPerformanceDialogComponent implements OnChanges, OnDestroy {
      constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2) {}

      ngOnDestroy(): void {
        this.enableBodyScroll();
      }

      private disableBodyScroll(): void {
        this.renderer.addClass(this.document.body, 'modal-open');
      }

      private enableBodyScroll(): void {
        this.renderer.removeClass(this.document.body, 'modal-open');
      }

  @Input() showAddPerformanceDialog = false;
  @Input() allActors: any[] = [];
  @Input() editMode = false;
  @Input() editData: any = null;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  newPerformanceTitle = '';
  newPerformanceGenre = '';
  newPerformanceDescription = '';
  newPerformanceDirector = '';
  newPerformanceDuration: number | null = null;
  newPerformancePremiereDate = '';
  newPerformanceSelectedActorIds: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (this.showAddPerformanceDialog) {
      this.disableBodyScroll();
    } else {
      this.enableBodyScroll();
    }
    if ((changes['editMode'] || changes['editData'] || changes['showAddPerformanceDialog']) && this.showAddPerformanceDialog) {
      if (this.editMode && this.editData) {
        this.newPerformanceTitle = this.editData?.title || '';
        this.newPerformanceGenre = this.editData?.genre || '';
        this.newPerformanceDescription = this.editData?.description || '';
        this.newPerformanceDirector = this.editData?.director || '';
        this.newPerformanceDuration = this.editData?.duration || null;
        this.newPerformancePremiereDate = this.editData?.premiere_date || '';
        this.newPerformanceSelectedActorIds = this.editData?.selectedActorIds || [];
      } else {
        this.newPerformanceTitle = '';
        this.newPerformanceGenre = '';
        this.newPerformanceDescription = '';
        this.newPerformanceDirector = '';
        this.newPerformanceDuration = null;
        this.newPerformancePremiereDate = '';
        this.newPerformanceSelectedActorIds = [];
      }
    }
  }

  getActorName(actorId: any): string {
    const actor = this.allActors.find(a => a.id === actorId);
    return actor ? `${actor.first_name} ${actor.last_name}` : '';
  }

  addActor(actorId: any): void {
    if (!this.newPerformanceSelectedActorIds.includes(actorId)) {
      this.newPerformanceSelectedActorIds = [...this.newPerformanceSelectedActorIds, actorId];
    }
  }

  removeActor(actorId: any): void {
    this.newPerformanceSelectedActorIds = this.newPerformanceSelectedActorIds.filter(id => id !== actorId);
  }

  cancelAddPerformance(): void {
    this.cancel.emit();
  }

  saveNewPerformance(): void {
    this.save.emit({
      title: this.newPerformanceTitle,
      genre: this.newPerformanceGenre,
      description: this.newPerformanceDescription,
      director: this.newPerformanceDirector,
      duration: this.newPerformanceDuration,
      premiere_date: this.newPerformancePremiereDate,
      selectedActorIds: this.newPerformanceSelectedActorIds
    });
  }
}
