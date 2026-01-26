import { Routes } from '@angular/router';
import { RegistrationComponent } from './features/registration/registration.component';
import { LoginComponent } from './features/login/login.component';
import { PerformanceListComponent } from './features/performance/performance-list.component';
import { ActorListComponent } from './features/actor/actor-list.component';
import { RehearsalListComponent } from './features/rehearsal/rehearsal-list.component';
import { StageListComponent } from './features/stage/stage-list.component';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/performances',
    pathMatch: 'full'
  },
  {
    path: 'performances',
    component: PerformanceListComponent,
  },
  {
    path: 'actors',
    component: ActorListComponent
  },
  {
    path: 'stages',
    component: StageListComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'rehearsals',
    component: RehearsalListComponent
  },
];
