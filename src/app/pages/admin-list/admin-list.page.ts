import { Component, OnInit , ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.page.html',
  styleUrls: ['./admin-list.page.scss'],
})
export class AdminListPage implements OnInit {
  @ViewChild(IonInfiniteScroll)

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
  }

  public cargarMasAutos(){
    this.apiService.MoreGet();
  }
}