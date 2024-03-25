import { NgModule } from '@angular/core'
import { RouterModule, Routes, provideRouter } from '@angular/router'
import { MoviesComponent } from './pages/movies/movies.component'
import { SeriesComponent }from './pages/series/series.component'

export const routes: Routes = [
  {path:'login', loadComponent: ()=> import('./pages/login/login.component')},
  {path:'register', loadComponent: ()=> import('./pages/register/register.component')},
  {path:'forget-password', loadComponent: ()=> import('./pages/forget-password/forget-password.component')},
  {path:'home', loadComponent: ()=> import('./pages/home/home.component')},
  {path:'reset/:token', loadComponent: ()=> import('./pages/reset/reset.component')},
  {path: 'movies', component: MoviesComponent },
  {path: 'series', component: SeriesComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [provideRouter(routes)]
})
export class AppRoutingModule { }
