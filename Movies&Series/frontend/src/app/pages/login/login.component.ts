import { Component, inject } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthenticationService } from '../../services/authentication.service'
import { Router, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {
  fb = inject(FormBuilder)
  authenticationService = inject(AuthenticationService)
  router = inject(Router)

  loginForm !: FormGroup

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    },
    )
  }

  login(){
    this.authenticationService.loginService(this.loginForm.value)
    .subscribe({
      next:(res)=>{
        Swal.fire({
          icon: 'success',
          title: 'Gratulálok!',
          text: 'Bejelentkezés sikeresen megtörtént!',
        })
        localStorage.setItem("user_id",res.data._id)
        this.authenticationService.isLoggedIn$.next(true)
        this.router.navigate(['home'])
        this.loginForm.reset()
      },
      error:(err)=>{
        Swal.fire({
          icon: "error",
          title: "Hiba!",
          text: "Hibás jelszó vagy email cím!",
        })
      }
    })
  }
}
