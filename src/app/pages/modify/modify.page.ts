import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService} from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GuestPartial } from 'src/app/model/guest';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.page.html',
  styleUrls: ['./modify.page.scss'],
})
export class ModifyPage implements OnInit {
  
  public activeID = '';
  public activeGuest!: any;
  public cargaArchivo = false;
  public tower = ["A", "B"]
  public form!: FormGroup;
  idGuest: any;

  
  constructor(

    private activeRouter: ActivatedRoute,
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private http: HttpClient
    ) {
    this.formBuild();
  }

  public formBuild(): void {
    this.form = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      lastname: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      rut: [, [Validators.required, Validators.min(10000000000), Validators.max(99999999999)]],
      date: ['', [Validators.required]],
      phone: [, [Validators.required, Validators.min(10000000000), Validators.max(99999999999)]],
      email: ['', [Validators.required, Validators.email]],
      tower: ['', [Validators.required]],
      towerNumber: [, [Validators.required, Validators.min(1)]],
      description: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(200)]],
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
    this.form = this.fb.group({
      firstname: [''],
      lastname: [''],
      rut: [''],
      date: [''],
      phone: [''],
      email: [''],
      tower: [''],
      towerNumber: [''],
      description: ['']
    });
  
    this.activeRouter.paramMap.subscribe(pararametros => {
      this.activeID = pararametros.get('idGuest') ?? '';
      this.idGuest = Number(this.activeID);
      this.apiService.LookforId(+this.activeID)
        .subscribe(elemento => {
          if (elemento && this.form) {
            this.activeGuest = elemento;
            this.form.get('firstname')?.setValue(elemento.firstname);
            this.form.get('lastname')?.setValue(elemento.lastname);
            this.form.get('rut')?.setValue(elemento.rut);
            this.form.get('date')?.setValue(elemento.date);
            this.form.get('phone')?.setValue(elemento.phone);
            this.form.get('email')?.setValue(elemento.email);
            this.form.get('tower')?.setValue(elemento.tower);
            this.form.get('towerNumber')?.setValue(elemento.towerNumber);
            this.form.get('description')?.setValue(elemento.description);
            this.form.updateValueAndValidity();
          }
        })
    })
  }
  
  setValue(path: string, value: any) {
    let control = this.form.get(path);
    if (control) {
      control.setValue(value);
    } else {
      console.log(`${path} control is null`);
    }
  }

  public ModifyGuest(){
    if(this.form.invalid && this.cargaArchivo){
      this.form.markAllAsTouched();
      return;
    }
    this.apiService.ModifyforId(this.idGuest, { ...this.form.value })
    .subscribe(respuesta => {
      if (respuesta) {
        console.log('Elemento Actualizado :D');
        this.router.navigate(['/admin']);
      }
    });
  }
}
