import { Component } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent{
  seriesArray: any[] = []

  currentSeriesID = ""

  title: string = ""
  year: string = ""
  director: string = ""
  rating: string = ""
  genre: string = ""

  constructor(private http: HttpClient) {
    this.getAllSeries()
  }

  setDeleteSeries(data: any) {
    this.http.delete("http://localhost:8800/api/series/delete/" + data._id, {withCredentials: true})
      .subscribe(
        (resultData: any) => {
          console.log(resultData)
          Swal.fire({
            title: 'Gratulálok!',
            text: 'Sorozat törlése sikeresen megtörtént!',
            icon: 'success',
          });
          this.getAllSeries();
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hiba lépett fel a sorozat törlésekor!',
          })
        }
      )
  }

  setUpdateSeries(data: any){
    this.title = data.title
    this.year = data.year
    this.director = data.director
    this.rating = data.rating
    this.genre = data.genre

    this.currentSeriesID = data._id
  }

  UpdateSeriesRecords() {
    let bodyData = {
      "title": this.title,
      "year": this.year,
      "director": this.director,
      "rating": this.rating,
      "genre": this.genre
    };
  
    this.http.put("http://localhost:8800/api/series/update/" + this.currentSeriesID, bodyData, {withCredentials: true})
    .subscribe((resultData: any) => {
      console.log(resultData)
      Swal.fire({
        title: 'Gratulálok!',
        text: 'Sorozat módosítása sikeresen megtörtént!',
        icon: 'success',
      });
        this.getAllSeries()
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Hiba lépett fel a sorozat módosításakor!',
        })
      }
    )
  }
  

  saveSeries(){
    if (this.currentSeriesID == '') {
      this.addSeries()
    } else {
      this.UpdateSeriesRecords()
    }
  }


  getAllSeries() {
    this.http.get("http://localhost:8800/api/series/getAll", {withCredentials: true})
    .subscribe((resultData: any)=>{
      console.log(resultData)
      this.seriesArray = resultData.data
    })
  }

  addSeries() {
    let bodyData = {
      "title": this.title,
      "year": this.year,
      "director": this.director,
      "rating": this.rating,
      "genre": this.genre
    }

    this.http.post("http://localhost:8800/api/series/create", bodyData, {withCredentials: true})
    .subscribe((resultData: any) => {
      console.log(resultData)
      Swal.fire({
        title: 'Gratulálok!',
        text: 'Új sorozat hozzáadása sikeresen megtörtént!',
        icon: 'success',
      })
      this.getAllSeries()
      this.title = ''
      this.year = ''
      this.director = ''
      this.rating = ''
      this.genre = ''
    },
    (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hiba lépett fel a sorozat hozáadásakor!',
      })
    })
  }
}
