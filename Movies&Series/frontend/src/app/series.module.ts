import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SeriesComponent } from './pages/series/series.component'
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    SeriesComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})

export class SeriesModule { }