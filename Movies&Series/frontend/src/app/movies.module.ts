import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MoviesComponent } from './pages/movies/movies.component'
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    MoviesComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})

export class MoviesModule { }