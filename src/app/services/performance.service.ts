import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Performance, Role } from '../models/performance.model';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {
  private testDataUrl = 'assets/data/test-data.json';
  private performances: Performance[] = [];

  constructor(private http: HttpClient) {}

  getPerformances(): Observable<Performance[]> {
    return this.http.get<any>(this.testDataUrl).pipe(
      map(data => {
        const performances = data.performances.map((perf: any) => {
          // Знаходимо всіх акторів для цієї вистави
          const performanceRoles = data.roles?.filter((role: any) => role.performanceId === perf.performanceId) || [];
          const actors = performanceRoles.map((role: any) => {
            const actor = data.actors?.find((a: any) => a.actorId === role.actorId);
            if (actor) {
              return {
                id: actor.actorId,
                name: `${actor.firstName} ${actor.lastName}`,
                photoUrl: `https://api.dicebear.com/7.x/adventurer/svg?seed=${actor.firstName}${actor.lastName}&backgroundColor=b6e3f4`
              };
            }
            return null;
          }).filter((a: any) => a !== null);

          return {
            ...perf,
            id: parseInt(perf.performanceId),
            premiere_date: perf.premiere,
            ageRestriction: perf.ageRestriction?.toString(),
            photoUrl: `https://picsum.photos/seed/${perf.performanceId}/200/200`,
            actors: actors
          };
        });
        return performances;
      }),
      tap(list => {
        this.performances = list;
      })
    );
  }

  getPerformanceById(performanceId: string): Observable<Performance> {
    return this.http.get<any>(this.testDataUrl).pipe(
      map(data => data.performances.find((p: Performance) => p.performanceId === performanceId) as Performance)
    );
  }

  createPerformance(title: string, data: any): Observable<Performance> {
    const newPerformance: Performance = {
      performanceId: (this.performances.length + 1).toString(),
      title,
      ...data
    };
    this.performances.push(newPerformance);
    return of(newPerformance);
  }

  updatePerformance(id: number, data: any): Observable<Performance> {
    const performance = this.performances.find(p => p.performanceId === id.toString());
    if (performance) {
      Object.assign(performance, data);
      return of(performance);
    }
    return of(null as any);
  }

  deletePerformance(id: number): Observable<boolean> {
    const index = this.performances.findIndex(p => p.performanceId === id.toString());
    if (index > -1) {
      this.performances.splice(index, 1);
      return of(true);
    }
    return of(false);
  }

  assignRole(actorId: number, roleId: number): Observable<boolean> {
    return of(true);
  }

  getActors(performanceId: string): Observable<any[]> {
    return this.http.get<any>(this.testDataUrl).pipe(
      map(data => {
        const roles = data.roles.filter((r: any) => r.performanceId === performanceId);
        return data.actors.filter((a: any) => roles.some((r: any) => r.actorId === a.actorId));
      })
    );
  }
}
