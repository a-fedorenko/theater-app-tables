import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SidebarComponent } from './features/sidebar/sidebar.component';
import { StageListComponent } from './features/stage/stage-list.component';
import { ActorListComponent } from './features/actor/actor-list.component';
import { PerformanceListComponent } from './features/performance/performance-list.component';
import { LoginComponent } from './features/login/login.component';
import { RegistrationComponent } from './features/registration/registration.component';
import { SearchComponent } from './shared/components/search/search.component';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    SidebarComponent,
    StageListComponent,
    ActorListComponent,
    PerformanceListComponent,
    LoginComponent,
    RegistrationComponent,
    SearchComponent,
    BrowserModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: []
})
export class AppModule { }