import { Component } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent{
  moviesArray: any[] = []

  currentMovieID = ""

  title: string = ""
  year: string = ""
  director: string = ""
  rating: string = ""
  genre: string = ""

  constructor(private http: HttpClient) {
    this.getAllMovies()
  }

  setDeleteMovies(data: any){
    this.http.delete("http://localhost:8800/api/movies/delete/" + data._id, {withCredentials: true})
    .subscribe((resultData: any)=>{
      console.log(resultData)
      Swal.fire({
        icon: 'success',
        title: 'Gratulálok!',
        text: 'Film törlése sikeresen megtörtént!'
      })
      this.getAllMovies()
    })
  }

  setUpdateMovies(data: any){
    this.title = data.title
    this.year = data.year
    this.director = data.director
    this.rating = data.rating
    this.genre = data.genre

    this.currentMovieID = data._id
  }

  UpdateMoviesRecords(){
    let bodyData = {
      "title": this.title,
      "year": this.year,
      "director": this.director,
      "rating": this.rating,
      "genre": this.genre
    }

    this.http.put("http://localhost:8800/api/movies/update/" + this.currentMovieID, bodyData, {withCredentials: true})
    .subscribe((resultData: any)=>{
      console.log(resultData)
      Swal.fire({
        icon: 'success',
        title: 'Gratulálok!',
        text: 'Film módosítása sikeresen megtörtént!'
      })
      this.getAllMovies()
    })
  }

  saveMovies(){
    if (this.currentMovieID == '') {
      this.addMovie()
    } else {
      this.UpdateMoviesRecords()
    }
  }


  getAllMovies() {
    this.http.get("http://localhost:8800/api/movies/getAll", {withCredentials: true})
    .subscribe((resultData: any)=>{
      console.log(resultData)
      this.moviesArray = resultData.data
    })
  }

  addMovie() {
    let bodyData = {
      "title": this.title,
      "year": this.year,
      "director": this.director,
      "rating": this.rating,
      "genre": this.genre
    }

    this.http.post("http://localhost:8800/api/movies/create", bodyData, {withCredentials: true})
      .subscribe((resultData: any) => {
        console.log(resultData)
        Swal.fire({
          icon: 'success',
          title: 'Gratulálok!',
          text: 'Új film hozzáadása sikeresen megtörtént!'
        })
        this.getAllMovies()
        this.title = ''
        this.year = ''
        this.director = ''
        this.rating = ''
        this.genre = ''
      })
  }
}


