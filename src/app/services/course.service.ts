import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Course } from '../models/course';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private url = `${base_url}/cursos `;
  private listaCambio = new Subject<Course[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Course[]>(this.url);
  }

  insert(c: Course) {
    return this.http.post(this.url, c);
  }

  setList(listaNueva: Course[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
}
