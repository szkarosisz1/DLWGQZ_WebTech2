import { Component, OnInit, inject } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { confirmPasswordValidator } from '../../validator/confirm-password.validator'
import { AuthenticationService } from '../../services/authentication.service'
import { Router, RouterModule } from '@angular/router'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export default class RegisterComponent implements OnInit {
  fb = inject(FormBuilder)
  authenticationService = inject(AuthenticationService)
  router = inject(Router)

  registerForm !: FormGroup

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
    {
      validator: confirmPasswordValidator('password', 'confirmPassword')
    })
  }

  register(){
    this.authenticationService.registerService(this.registerForm.value)
    .subscribe({
      next:(res)=>{
        Swal.fire({
          icon: 'success',
          title: 'Gratulálok!',
          text: 'Regisztráció sikeresen megtörtént!',
        })
        this.registerForm.reset()
        this.router.navigate(['login'])
      },   
    })
  }
}
