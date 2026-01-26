import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Schedule, Show } from '../models/performance.model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private testDataUrl = 'assets/data/test-data.json';
  private schedules: Schedule[] = [];

  constructor(private http: HttpClient) {}

  getSchedules(): Observable<Schedule[]> {
    return this.http.get<any>(this.testDataUrl).pipe(
      map(data => {
        const schedules = data?.schedules || [];
        this.schedules = schedules;
        return schedules as Schedule[];
      })
    );
  }

  getSchedule(scheduleId: string): Observable<Schedule> {
    return this.http.get<any>(this.testDataUrl).pipe(
      map(data => {
        const schedules = data?.schedules || [];
        this.schedules = schedules;
        return schedules.find((s: Schedule) => s.scheduleId === scheduleId || s.id.toString() === scheduleId) as Schedule;
      })
    );
  }

  createSchedule(perfId: string, data: any): Observable<Schedule> {
    const newSchedule: Schedule = {
      scheduleId: (this.schedules.length + 1).toString(),
      scheduledDate: new Date(data.scheduledDate),
      playlists: []
    } as any;
    Object.assign(newSchedule, data);
    this.schedules.push(newSchedule);
    return of(newSchedule);
  }

  updateSchedule(id: string, data: any): Observable<Schedule> {
    const schedule = this.schedules.find(s => s.scheduleId === id || s.id.toString() === id);
    if (schedule) {
      Object.assign(schedule, data);
      return of(schedule);
    }
    return of(null as any);
  }

  deleteSchedule(id: string): Observable<boolean> {
    const index = this.schedules.findIndex(s => s.scheduleId === id || s.id.toString() === id);
    if (index > -1) {
      this.schedules.splice(index, 1);
      return of(true);
    }
    return of(false);
  }

  stopCurrentSchedule(): Observable<boolean> {
    return of(true);
  }
}
