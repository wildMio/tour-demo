import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export interface Department {
  name: string;
  id?: number;
}

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private _departments$ = new BehaviorSubject<Department[]>([]);
  private hasGetValue = false;

  constructor(
    private http: HttpClient,
    @Inject('url') private url
  ) { }

  addDepartment(body) {
    return this.http.post<Department>(this.url + 'departments', body)
      .subscribe(res => this._departments$.next(this._departments$.getValue().concat(res)));
  }

  deleteDepartment(id) {
    return this.http.delete<Department>(this.url + 'departments/' + id, {})
      .subscribe(res => this._departments$.next(this._departments$.getValue()
        .filter(department => department.id !== id)));
  }

  getDepartments() {
    if (!this.hasGetValue) {
      this.hasGetValue = true;
      this.http.get<Department[]>(this.url + 'departments').subscribe(res => this._departments$.next(res));
    }
    return this._departments$.asObservable();
  }
}
