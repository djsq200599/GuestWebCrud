import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form!: FormGroup;
  error!: string;
  constructor(
    private fb: FormBuilder,
    private cliente: HttpClient,
    private router: Router,
    private api: ApiService,
    private navControl: NavController
    ) 
    {this.formbuil()}

  public formbuil(): void {
    this.form = this.fb.group({
    user:['',[Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
    password: ['',[Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    })
  }

  login() {
    this.cliente.get<any>(this.api.URL_API_USER).subscribe(res => {
      const user = res.find((dato: any) => {
        return dato.user === this.form.value.user && dato.password === this.form.value.password;
      });
  
      if (user) {
        if (user.admin == 'admin') {
          alert("Usuario Admin reconocido");
          this.form.reset();
          this.router.navigate(['admin-list']);
        } else if (user.admin == 'normal') {
          alert("Usuario Cliente Logeado");
          this.form.reset();
          this.navControl.navigateRoot('admin-list');
        }
      } else {
        alert("Error al iniciar sesión!");
      }
    });
  }

  public obtenerCampo(control: any) {
    return this.form?.get(control);
  }
  public fueTocado(control: string) {
    if (this.form) {
      return this.form.get(control)?.touched;
    }
    return false;
  }

  public estaSucio(control: string) {
    if (this.form) {
      return this.form.get(control)?.dirty;
    }
    return false;
  }

  ngOnInit() {
    
  }

}
