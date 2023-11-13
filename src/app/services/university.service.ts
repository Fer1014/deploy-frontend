import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { University } from '../models/university';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class UniversityService {
  private url = `${base_url}/universidades`;
  private listaCambio = new Subject<University[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<University[]>(this.url);
  }

  insert(uni: University) {
    return this.http.post(this.url, uni);
  }

  setList(listaNueva: University[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.http.get<University>(`${this.url}/${id}`);
  }
  update(u: University) {
    return this.http.put(this.url, u);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  buscar(fecha: string): Observable<University[]> {
    return this.http.post<University[]>(`${this.url}/buscar`, { fecha: fecha });
  }
}
