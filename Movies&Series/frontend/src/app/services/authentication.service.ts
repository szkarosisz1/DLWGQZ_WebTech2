import { HttpClient } from '@angular/common/http'
import { apiUrls } from '../api.urls'
import { BehaviorSubject } from 'rxjs'
import { Injectable, inject} from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  http = inject(HttpClient)
  isLoggedIn$ = new BehaviorSubject<boolean>(false)

  registerService(registerObj: any){
    return this.http.post<any>(`${apiUrls.authenticationServiceApi}register`, registerObj)
  }

  loginService(loginObj: any){
    return this.http.post<any>(`${apiUrls.authenticationServiceApi}login`, loginObj, {withCredentials: true})
  }

  sendEmailService(email: string){
    return this.http.post<any>(`${apiUrls.authenticationServiceApi}send-email`, {email: email})
  }

  resetPasswordService(resetObj: any){
    return this.http.post<any>(`${apiUrls.authenticationServiceApi}reset-password`, resetObj)
  }

  logout(){
    return this.http.post<any>(`${apiUrls.authenticationServiceApi}logout`, "");
  }

  isLoggedIn(){

    if(typeof localStorage !== 'undefined')
      return !!localStorage.getItem("user_id")
    else
      return false
  }

}
