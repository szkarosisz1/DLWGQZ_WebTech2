import { Component, OnInit, inject } from '@angular/core'
import { AuthenticationService } from '../../services/authentication.service'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit{
  authenticationService = inject(AuthenticationService)
  isLoggedIn: boolean = false


  ngOnInit(): void {
    this.authenticationService.isLoggedIn$.subscribe(res=>{
      this.isLoggedIn = this.authenticationService.isLoggedIn()
    })
  }

  logout() {
    localStorage.removeItem("user_id")
    this.authenticationService.logout()
    .subscribe({
      next:(res)=>{
        Swal.fire({
          icon: 'success',
          title: 'Gratulálok!',
          text: 'Kijelentkezés sikeresen megtörtént!',
        })
      },
      error:(err)=>{
        Swal.fire({
          icon: "error",
          title: "Hiba!",
          text: "Hibás kijelentkezés!",
        })
      }
    })
    this.authenticationService.isLoggedIn$.next(false)
  }
}
