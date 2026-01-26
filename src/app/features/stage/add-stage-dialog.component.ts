import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, Renderer2, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-stage-dialog',
  template: `
    <div class="modal" *ngIf="showAddStageDialog">
      <div>
        <h3>{{ editMode ? 'Редагувати сцену' : 'Нова сцена' }}</h3>
        <form class="modal-form-grid">
          <div class="form-group">
            <label>Назва:</label>
            <input [(ngModel)]="stageName" name="name" class="form-control" placeholder="Назва" />
          </div>
          <div class="form-group">
            <label>Тип:</label>
            <input [(ngModel)]="stageType" name="type" class="form-control" placeholder="Тип (Основна/Камерна)" />
          </div>
          <div class="form-group form-group--full">
            <label>Опис:</label>
            <textarea [(ngModel)]="stageDescription" name="description" class="form-control" placeholder="Опис"></textarea>
          </div>
          <div class="form-group">
            <label>Менеджер:</label>
            <input [(ngModel)]="stageManager" name="manager" class="form-control" placeholder="Менеджер" />
          </div>
          <div class="form-group">
            <label>Місткість:</label>
            <input type="number" [(ngModel)]="stageCapacity" name="capacity" class="form-control" placeholder="Місткість" />
          </div>
          <div class="form-group form-group--full">
            <label>Обладнання (через кому):</label>
            <input [(ngModel)]="stageEquipment" name="equipment" class="form-control" placeholder="Світло, звук, декорації..." />
          </div>
        </form>
        <div style="margin-top: 16px; display: flex; gap: 8px;">
          <button class="btn btn-success" (click)="saveStage()">Зберегти</button>
          <button class="btn btn-secondary" (click)="cancelStage()">Скасувати</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./add-stage-dialog.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AddStageDialogComponent implements OnChanges, OnDestroy {
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
  @Input() showAddStageDialog = false;
  @Input() editMode = false;
  @Input() editData: any = null;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  stageName = '';
  stageType = '';
  stageDescription = '';
  stageManager = '';
  stageCapacity: number | null = null;
  stageEquipment = '';

  ngOnChanges(changes: SimpleChanges) {
    if (this.showAddStageDialog) {
      this.disableBodyScroll();
    } else {
      this.enableBodyScroll();
    }
    if ((changes['editMode'] || changes['editData'] || changes['showAddStageDialog']) && this.showAddStageDialog) {
      if (this.editMode && this.editData) {
        this.stageName = this.editData?.name || '';
        this.stageType = this.editData?.type || '';
        this.stageDescription = this.editData?.description || '';
        this.stageManager = this.editData?.manager || '';
        this.stageCapacity = this.editData?.capacity || null;
        this.stageEquipment = this.editData?.equipment || '';
      } else {
        this.stageName = '';
        this.stageType = '';
        this.stageDescription = '';
        this.stageManager = '';
        this.stageCapacity = null;
        this.stageEquipment = '';
      }
    }
  }

  saveStage() {
    const equipmentArr = this.stageEquipment.split(',').map((e: string) => e.trim()).filter(Boolean);
    this.save.emit({
      name: this.stageName,
      type: this.stageType,
      description: this.stageDescription,
      manager: this.stageManager,
      capacity: this.stageCapacity,
      equipment: equipmentArr
    });
  }

  cancelStage() {
    this.cancel.emit();
  }
}
