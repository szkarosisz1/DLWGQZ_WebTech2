import { CommonModule } from '@angular/common'
import { Component, OnInit, inject } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { confirmPasswordValidator } from '../../validator/confirm-password.validator'
import { AuthenticationService } from '../../services/authentication.service'

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.css'
})
export default class ResetComponent implements OnInit{
  fb = inject(FormBuilder)
  resetForm !: FormGroup
  activatedRoute = inject(ActivatedRoute)
  router = inject(Router)
  authenticationService = inject(AuthenticationService)

  token !: string

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },

      {
        validator: confirmPasswordValidator('password', 'confirmPassword')
      }
    )

    this.activatedRoute.params.subscribe(val=>{
      this.token = val['token']
      console.log(this.token)
    })
  }

  reset(){
    let resetObj = {
      token: this.token,
      password: this.resetForm.value.password
    }
    this.authenticationService.resetPasswordService(resetObj)
    .subscribe({
      next: (res)=>{
        alert(res.message)
        this.resetForm.reset()
        this.router.navigate(['login'])
      },
      error: (err)=>{
        alert(err.error.message)
      }
    })

  }
}
