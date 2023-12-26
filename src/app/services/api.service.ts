import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, ObservableLike } from 'rxjs';
import { Guest, GuestID, GuestPartial  } from '../model/guest';
import { User, UserID, UserPartial } from '../model/user';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private URL_API_GUEST = 'https://melodic-psychedelic-humidity.glitch.me/guest';
  public URL_API_USER="https://melodic-psychedelic-humidity.glitch.me/user";
  private paginaActual = 1;
  private guestlist = new BehaviorSubject<Array<GuestID>>([]);
  public guestlist$ = this.guestlist.asObservable();

  constructor(private http: HttpClient) { }

  public agregarUsuario(user: User): Observable<UserPartial> {
    return this.http.post<UserPartial>(this.URL_API_USER,user,{
      headers:{
        'Content-Type':'application/json; charset=utf-8'
      }
    })
  }

  public Get(){
    this.http.get<Array<GuestID>>(`${this.URL_API_GUEST}?_page=1`)
    .pipe(
      delay(2000)
    )
    .subscribe(resultado => {
      this.paginaActual = this.paginaActual + 1;
      this.guestlist.next(resultado);
    });
  }

  public MoreGet(){
    this.http.get<Array<GuestID>>(`${this.URL_API_GUEST}?_page=${this.paginaActual}`)
    .pipe(
      delay(1000)
    )
    .subscribe(resultado => {
      this.paginaActual = this.paginaActual + 1;
      this.guestlist.next(this.guestlist.getValue().concat(resultado));
    });
  }

  public Add(guest: Guest): Observable<GuestID> {
    return this.http.post<GuestID>(this.URL_API_GUEST,guest,{
      headers:{
        'Content-Type':'application/json; charset=utf-8'
      }
    })
  }
  public LookforId(id: number): Observable<GuestID | null>{
    return this.http.get<GuestID | null>(`${this.URL_API_GUEST}/${id}`)
  }

  public DeleteforId(id: number): Observable<any> {
    return this.http.delete<GuestID | null>(`${this.URL_API_GUEST}/${id}`);
  }

  public ModifyforId(id: number, guest: GuestPartial): Observable<any>{
    return this.http.patch(`${this.URL_API_GUEST}/${id}`, guest);
  }
}