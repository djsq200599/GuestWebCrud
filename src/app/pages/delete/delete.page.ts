import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { GuestID } from 'src/app/model/guest';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.page.html',
  styleUrls: ['./delete.page.scss'],
})
export class DeletePage implements OnInit {
  public parameterID: string = '';
  public activeGuest!: GuestID ;
  public idGuest: any
  constructor(
    private estaRuta: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private alert: AlertController
  ) { }

  ngOnInit() {
    this.estaRuta.params.subscribe(parametros => {
      this.parameterID = parametros['idGuest'];
      this.apiService.LookforId(+this.parameterID)
      .subscribe((guest: any) => {
        this.activeGuest! = guest;
      })
    })
  }

  public async delete(){
    const alerta = await this.alert.create({
      header: 'Confirma por favor',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmo',
          role: 'confirm',
          cssClass: 'danger',
          handler: () => {
            if (this.activeGuest && this.activeGuest.id) {
              this.apiService.DeleteforId(this.activeGuest.id)
                .subscribe(data => {
                  if (data) {
                    this.router.navigate(['/admin'])
                  }
                })
            }
          }
        }
      ]
    });
    await alerta.present()
  }
}