import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { GuestID } from '../model/guest';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public cargaArchivo = false;
  public tower = ["A", "B"]
  public form!: FormGroup;
  private usedIds = new Set<number>(); // Agrega tus IDs existentes aquí
  private lastId = Math.max(...Array.from(this.usedIds), 0);
  
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private http: HttpClient
    ) {
    this.formBuild();
    this.loadExistingIds();
  }

  public formBuild(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      lastname: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
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

  private loadExistingIds(): void {
    this.http.get<Array<GuestID>>(this.api['URL_API_GUEST'])
      .subscribe((guests: any[]) => {
        guests.forEach(guest => {
          if (guest.id !== undefined) {
            this.usedIds.add(guest.id);
            this.lastId = Math.max(this.lastId, guest.id);
          }
        });
      });
  }

  private generateId(): number {
    let newId = this.lastId + 1;
    while (this.usedIds.has(newId)) {
      newId++;
    }
    this.usedIds.add(newId);
    this.lastId = newId;
    return newId;
  }
  
  public Add() {
    if (this.form.invalid && this.cargaArchivo) {
      this.form.markAllAsTouched();
      return;
    }
  
    const guest = {
      id: this.generateId(),
      ...this.form.value,
    };
  
    this.api.Add(guest)
      .subscribe((resultado: any) => {
        if (resultado) {
          alert('Agregado con exito');
          // this.router.navigate(['/listar-admin']);
        }
      });
  }

  ngOnInit() {
  }

}
