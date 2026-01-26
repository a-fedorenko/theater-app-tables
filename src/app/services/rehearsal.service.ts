import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Rehearsal } from '../models/performance.model';

@Injectable({
  providedIn: 'root'
})
export class RehearsalService {
  private testDataUrl = 'assets/data/test-data.json';
  private rehearsals: Rehearsal[] = [];

  constructor(private http: HttpClient) {}

  getRehearsals(performanceId: string): Observable<Rehearsal[]> {
    return this.http.get<any>(this.testDataUrl).pipe(
      map(data => {
        const rehearsals = (data?.rehearsals || []).filter((r: any) => r.performanceId === performanceId);
        this.rehearsals = rehearsals;
        return rehearsals as Rehearsal[];
      })
    );
  }

  createRehearsal(perfId: string, data: any): Observable<Rehearsal> {
    const newRehearsal: Rehearsal = {
      rehearsalId: (this.rehearsals.length + 1).toString(),
      scheduledDate: new Date(data.scheduledDate),
      startTime: new Date(data.startTime),
      endTime: new Date(data.endTime),
      notes: '',
      status: 'scheduled'
    } as any;
    Object.assign(newRehearsal, data);
    this.rehearsals.push(newRehearsal);
    return of(newRehearsal);
  }

  updateRehearsal(id: number, data: any): Observable<Rehearsal> {
    const rehearsal = this.rehearsals.find(r => r.rehearsalId === id.toString() || r.id === id);
    if (rehearsal) {
      Object.assign(rehearsal, data);
      return of(rehearsal);
    }
    return of(null as any);
  }

  cancelRehearsal(id: string): Observable<boolean> {
    const index = this.rehearsals.findIndex(r => r.rehearsalId === id || r.id.toString() === id);
    if (index > -1) {
      this.rehearsals.splice(index, 1);
      return of(true);
    }
    return of(false);
  }

  updateNotes(id: string, notes: string): Observable<void> {
    const rehearsal = this.rehearsals.find(r => r.rehearsalId === id || r.id.toString() === id);
    if (rehearsal) {
      (rehearsal as any).notes = notes;
    }
    return of(void 0);
  }

  markCompleted(id: string): Observable<boolean> {
    const rehearsal = this.rehearsals.find(r => r.rehearsalId === id || r.id.toString() === id);
    if (rehearsal) {
      (rehearsal as any).status = 'completed';
      return of(true);
    }
    return of(false);
  }
}
