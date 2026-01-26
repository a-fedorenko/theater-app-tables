import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Stage } from '../models/stage.model';

@Injectable({
  providedIn: 'root'
})
export class StageService {
  private stages: Stage[] = [
    {
      id: '1',
      name: 'Велика сцена',
      capacity: 800,
      type: 'Основна',
      equipment: ['Освітлення', 'Звук', 'Відеопроекція', 'Підйомники'],
      status: 'Доступна',
      description: 'Головна сцена театру з найсучаснішим обладнанням та великим простором для масштабних вистав',
      dimensions: {
        width: 20,
        depth: 15,
        height: 12
      },
      technicalFeatures: ['Оркестрова яма', 'Обертова сцена', 'Мультимедійна система', 'Професійна акустика'],
      lastMaintenance: '2025-12-15',
      nextMaintenance: '2026-06-15',
      manager: 'Петро Ковальчук',
      photoUrl: 'https://picsum.photos/seed/stage1/200/200'
    },
    {
      id: '2',
      name: 'Камерна сцена',
      capacity: 200,
      type: 'Камерна',
      equipment: ['Освітлення', 'Звук'],
      status: 'Зайнята',
      description: 'Інтимний простір для камерних вистав та експериментальних постановок',
      dimensions: {
        width: 10,
        depth: 8,
        height: 6
      },
      technicalFeatures: ['Сучасне освітлення', 'Гнучке планування зали', 'Акустична система'],
      lastMaintenance: '2026-01-10',
      nextMaintenance: '2026-07-10',
      manager: 'Оксана Мельник',
      photoUrl: 'https://picsum.photos/seed/stage2/200/200'
    },
    {
      id: '3',
      name: 'Експериментальна сцена',
      capacity: 100,
      type: 'Експериментальна',
      equipment: ['Базове освітлення', 'Звук'],
      status: 'Доступна',
      description: 'Простір для експериментів, молодих режисерів та нетрадиційних форматів',
      dimensions: {
        width: 8,
        depth: 6,
        height: 5
      },
      technicalFeatures: ['Трансформована зала', 'Мобільне обладнання'],
      lastMaintenance: '2026-01-05',
      nextMaintenance: '2026-07-05',
      manager: 'Андрій Шевченко',
      photoUrl: 'https://picsum.photos/seed/stage3/200/200'
    },
    {
      id: '4',
      name: 'Відкрита літня сцена',
      capacity: 500,
      type: 'Відкрита',
      equipment: ['Потужне освітлення', 'Звукова система', 'Захист від дощу'],
      status: 'На ремонті',
      description: 'Відкритий майданчик для літніх вистав під зірками',
      dimensions: {
        width: 15,
        depth: 12,
        height: 8
      },
      technicalFeatures: ['Природна акустика', 'LED-екрани', 'Всепогодне обладнання'],
      lastMaintenance: '2025-11-20',
      nextMaintenance: '2026-05-01',
      manager: 'Ірина Бондаренко',
      photoUrl: 'https://picsum.photos/seed/stage4/200/200'
    },
    {
      id: '5',
      name: 'Репетиційна зала №1',
      capacity: 50,
      type: 'Репетиційна',
      equipment: ['Дзеркала', 'Базове освітлення', 'Фортепіано'],
      status: 'Зайнята',
      description: 'Основна репетиційна зала з усім необхідним для підготовки вистав',
      dimensions: {
        width: 12,
        depth: 10,
        height: 4
      },
      technicalFeatures: ['Дзеркальні стіни', 'Балетні станки', 'Звукозапис'],
      lastMaintenance: '2026-01-15',
      nextMaintenance: '2026-07-15',
      manager: 'Марія Коваленко',
      photoUrl: 'https://picsum.photos/seed/stage5/200/200'
    },
    {
      id: '6',
      name: 'Студія звукозапису',
      capacity: 20,
      type: 'Технічна',
      equipment: ['Студійне обладнання', 'Мікшерний пульт', 'Монітори'],
      status: 'Доступна',
      description: 'Професійна студія для запису музики та озвучення',
      dimensions: {
        width: 6,
        depth: 5,
        height: 3
      },
      technicalFeatures: ['Звукоізоляція', 'Професійне обладнання', 'Відеозапис'],
      lastMaintenance: '2025-12-01',
      nextMaintenance: '2026-06-01',
      manager: 'Дмитро Лисенко',
      photoUrl: 'https://picsum.photos/seed/stage6/200/200'
    }
  ];

  getStages(): Observable<Stage[]> {
    return of(this.stages);
  }

  getStageById(id: string): Observable<Stage | undefined> {
    return of(this.stages.find(s => s.id === id));
  }
}
