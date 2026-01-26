import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StageService } from '../../services/stage.service';
import { Stage } from '../../models/stage.model';

import { CommonModule } from '@angular/common';
import { SearchComponent } from '../../shared/components/search/search.component';
import { AddStageDialogComponent } from './add-stage-dialog.component';
@Component({
  selector: 'app-stage-list',
  templateUrl: './stage-list.component.html',
  styleUrls: ['./stage-list.component.scss'],
  standalone: true,
  imports: [CommonModule, SearchComponent, AddStageDialogComponent]
})
export class StageListComponent implements OnInit {
  stages: Stage[] = [];
  searchTerm: string = '';
  expandedStages: Set<string> = new Set();
  sortBy: 'all' | 'available' | 'occupied' | 'maintenance' | 'main' | 'chamber' | null = null;
  showAddStageDialog = false;
  addStageEditData: any = null;
  addStageEditMode = false;

  constructor(
    private stageService: StageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.stageService.getStages().subscribe(stages => {
      this.stages = stages;
    });
  }

  get filteredStages(): Stage[] {
    let filtered = this.stages;
    // Фільтрування за пошуком
    if (this.searchTerm) {
      filtered = filtered.filter(s =>
        s.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        s.type.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (s.manager && s.manager.toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
    }
    // Фільтрування за статусом
    if (this.sortBy === 'available') {
      filtered = filtered.filter(s => s.status === 'Доступна');
    } else if (this.sortBy === 'occupied') {
      filtered = filtered.filter(s => s.status === 'Зайнята');
    } else if (this.sortBy === 'maintenance') {
      filtered = filtered.filter(s => s.status === 'На ремонті');
    } else if (this.sortBy === 'main') {
      filtered = filtered.filter(s => s.type === 'Основна');
    } else if (this.sortBy === 'chamber') {
      filtered = filtered.filter(s => s.type === 'Камерна' || s.type === 'Експериментальна');
    }
    return filtered;
  }

  getCountByStatus(status: string): number {
    return this.stages.filter(s => s.status === status).length;
  }

  getCountByType(type: string): number {
    return this.stages.filter(s => s.type === type).length;
  }

  getCountChamber(): number {
    return this.stages.filter(s => s.type === 'Камерна' || s.type === 'Експериментальна').length;
  }

  setSortBy(sortType: 'all' | 'available' | 'occupied' | 'maintenance' | 'main' | 'chamber'): void {
    this.sortBy = this.sortBy === sortType ? null : sortType;
  }

  toggleExpand(stageId: string, event: Event): void {
    event.stopPropagation();
    if (this.expandedStages.has(stageId)) {
      this.expandedStages.delete(stageId);
    } else {
      this.expandedStages.add(stageId);
    }
  }

  isExpanded(stageId: string): boolean {
    return this.expandedStages.has(stageId);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Доступна':
        return 'status-available';
      case 'Зайнята':
        return 'status-occupied';
      case 'На ремонті':
        return 'status-maintenance';
      default:
        return '';
    }
  }

  viewDetails(stageId: string): void {
    alert(`Деталі сцени ${stageId}`);
  }

  editStage(stageId: string, event: Event): void {
    event.stopPropagation();
    const stage = this.stages.find(s => s.id === stageId);
    if (stage) {
      this.addStageEditData = stage;
      this.addStageEditMode = true;
      this.showAddStageDialog = true;
    }
  }

  createStage(): void {
    this.addStageEditData = null;
    this.addStageEditMode = false;
    this.showAddStageDialog = true;
  }

  onAddStageSave(stage: any): void {
    if (this.addStageEditMode && this.addStageEditData) {
      // Оновлення існуючої сцени
      const idx = this.stages.findIndex(s => s.id === this.addStageEditData.id);
      if (idx !== -1) {
        this.stages[idx] = { ...this.stages[idx], ...stage };
      }
    } else {
      // Додавання нової сцени (id генеруємо як timestamp)
      this.stages.push({ ...stage, id: Date.now().toString(), status: 'Доступна' });
    }
    this.showAddStageDialog = false;
    this.addStageEditData = null;
    this.addStageEditMode = false;
  }

  onAddStageCancel(): void {
    this.showAddStageDialog = false;
    this.addStageEditData = null;
    this.addStageEditMode = false;
  }

  deleteStage(stageId: string, event: Event): void {
    event.stopPropagation();
    if (confirm('Ви впевнені, що хочете видалити цю сцену?')) {
      this.stages = this.stages.filter(s => s.id !== stageId);
      // Якщо потрібно, можна додати повідомлення:
      // alert(`Сцену видалено.`);
    }
  }
}
