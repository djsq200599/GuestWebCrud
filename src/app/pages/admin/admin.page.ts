import { Component, OnInit , ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  @ViewChild(IonInfiniteScroll)
  isModalOpen = false;

  public scroll!: IonInfiniteScroll;
  constructor(
    public apiService: ApiService,
  ) { }

  ngOnInit() {
    this.apiService.Get();
    this.apiService.guestlist$.subscribe(valor => {
      if(this.scroll){
        this.scroll.complete();
      }
    })
  }

  ionViewWillEnter(): void {
    this.apiService.Get();
    console.log();
  }

  public cargarMasAutos(){
    this.apiService.MoreGet();
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  
  
}