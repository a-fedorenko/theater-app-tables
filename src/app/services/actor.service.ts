import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Actor } from '../models/performance.model';

@Injectable({
  providedIn: 'root'
})
export class ActorService {
  private dataUrl = 'assets/data/test-data.json';

  constructor(private http: HttpClient) {}

  getActors(): Observable<Actor[]> {
    return this.http.get<any>(this.dataUrl).pipe(
      map(data => {
        if (data.actors && data.roles && data.performances) {
          return data.actors.map((actor: any) => {
            // Знаходимо всі ролі актора
            const actorRoles = data.roles.filter((role: any) => role.actorId === actor.actorId);
            // Отримуємо назви вистав та збираємо жанри
            const genresSet = new Set<string>();
            const performances: string[] = [];
            const performanceIds: string[] = [];
            
            actorRoles.forEach((role: any) => {
              const performance = data.performances.find((p: any) => p.performanceId === role.performanceId);
              if (performance) {
                genresSet.add(performance.genre);
                performances.push(performance.title);
                performanceIds.push(performance.performanceId);
              }
            });

            // Визначаємо амплуа на основі жанрів
            const genres = Array.from(genresSet);
            let specialty = 'Актор';
            
            if (genres.length > 0) {
              const genreNames: string[] = genres.map(genre => {
                if (genre === 'Драма') return 'Драматичні';
                if (genre === 'Трагедія') return 'Трагічні';
                if (genre === 'Комедія') return 'Комедійні';
                return genre;
              });
              
              if (genreNames.length === 1) {
                specialty = `${genreNames[0]} ролі`;
              } else if (genreNames.length === 2) {
                specialty = `${genreNames[0]} і ${genreNames[1].toLowerCase()} ролі`;
              } else {
                specialty = `${genreNames[0]}, ${genreNames[1].toLowerCase()} ролі`;
              }
            }

            return {
              id: parseInt(actor.actorId),
              first_name: actor.firstName,
              last_name: actor.lastName,
              birth_date: actor.dateOfBirth,
              biography: actor.biography,
              contactInfo: actor.contactInfo,
              hireDate: actor.hireDate,
              salary: actor.salary,
              portfolio: actor.portfolio,
              awards: actor.awards,
              specialty: specialty,
              performances: performances,
              performanceIds: performanceIds,
              photoUrl: `https://api.dicebear.com/7.x/adventurer/svg?seed=${actor.firstName}${actor.lastName}&backgroundColor=b6e3f4`
            };
          });
        }
        return [];
      })
    );
  }

  getActorById(id: string): Observable<Actor> {
    return this.getActors().pipe(
      map(actors => {
        const actor = actors.find(a => a.id === parseInt(id));
        if (!actor) {
          throw new Error('Actor not found');
        }
        return actor;
      })
    );
  }
}
