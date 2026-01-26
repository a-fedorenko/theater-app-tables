import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Show } from '../models/performance.model';

@Injectable({
  providedIn: 'root'
})
export class ShowService {
  private testDataUrl = 'assets/data/test-data.json';
  private shows: Show[] = [];

  constructor(private http: HttpClient) {}

  getShows(performanceId: string): Observable<Show[]> {
    return this.http.get<any>(this.testDataUrl).pipe(
      map(data => {
        const shows = (data?.shows || []).filter((s: any) => s.performanceId === performanceId);
        this.shows = shows;
        return shows as Show[];
      })
    );
  }

  createShow(perfId: string, venueId: string, data: any): Observable<Show> {
    const newShow: Show = {
      showId: (this.shows.length + 1).toString(),
      showDate: new Date(data.showDate),
      startTime: new Date(data.startTime),
      status: 'scheduled'
    } as any;
    Object.assign(newShow, data);
    this.shows.push(newShow);
    return of(newShow);
  }

  updateShow(id: number, data: any): Observable<Show> {
    const show = this.shows.find(s => s.showId === id.toString() || s.id === id);
    if (show) {
      Object.assign(show, data);
      return of(show);
    }
    return of(null as any);
  }

  cancelShow(id: string): Observable<boolean> {
    const index = this.shows.findIndex(s => s.showId === id || s.id.toString() === id);
    if (index > -1) {
      this.shows.splice(index, 1);
      return of(true);
    }
    return of(false);
  }

  updateStatus(id: string, status: string): Observable<void> {
    const show = this.shows.find(s => s.showId === id || s.id.toString() === id);
    if (show) {
      (show as any).status = status;
    }
    return of(void 0);
  }
}
