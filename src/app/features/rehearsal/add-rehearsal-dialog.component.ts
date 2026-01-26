import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, Renderer2, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-rehearsal-dialog',
  templateUrl: './add-rehearsal-dialog.component.html',
  styleUrls: ['./add-rehearsal-dialog.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AddRehearsalDialogComponent implements OnChanges, OnDestroy {
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
  @Input() showAddRehearsalDialog = false;
  @Input() editMode = false;
  @Input() editData: any = null;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  rehearsal = {
    date: '',
    time: '',
    performance: '',
    stage: '',
    actors: ''
  };


  ngOnChanges(changes: SimpleChanges) {
    if (this.showAddRehearsalDialog) {
      this.disableBodyScroll();
    } else {
      this.enableBodyScroll();
    }
    if (changes['editMode'] || changes['editData'] || changes['showAddRehearsalDialog']) {
      if (this.editMode && this.editData) {
        this.rehearsal = {
          date: this.editData?.date || '',
          time: this.editData?.time || '',
          performance: this.editData?.performance || '',
          stage: this.editData?.stage || '',
          actors: Array.isArray(this.editData?.actors) ? this.editData.actors.join(', ') : (this.editData?.actors || '')
        };
      } else {
        this.rehearsal = {
          date: '',
          time: '',
          performance: '',
          stage: '',
          actors: ''
        };
      }
    }
  }

  onSave() {
    const rehearsalData = {
      ...this.rehearsal,
      actors: this.rehearsal.actors.split(',').map((a: string) => a.trim())
    };
    this.save.emit(rehearsalData);
  }

  onCancel() {
    this.cancel.emit();
  }
}
