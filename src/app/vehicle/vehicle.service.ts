import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export interface Vehicle {
  name: string;
  department: string;
  equipments: {[prop: string]: string}[];
  contactPerson: {name: string, phone: string};
  id?: number;
}

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private _vehicles$ = new BehaviorSubject([]);
  private hasGetValue = false;

  constructor(
    private http: HttpClient,
    @Inject('url') private url
  ) { }

  addVehicle(body) {
    return this.http.post<Vehicle>(this.url + 'vehicles', body)
      .subscribe(res => this._vehicles$.next(this._vehicles$.getValue().concat(res)));
  }

  deleteVehicle(id) {
    return this.http.delete<Vehicle>(this.url + 'vehicles/' + id, {})
      .subscribe(res => this._vehicles$.next(this._vehicles$.getValue()
        .filter(vehicle => vehicle.id !== id)));
  }

  editVehicle(vehicle: Vehicle) {
    return this.http.put<Vehicle>(this.url + 'vehicles/' + vehicle.id, vehicle)
      .subscribe(res => this._vehicles$.next(this._vehicles$.getValue()
        .map(v => {
          if (v.id === vehicle.id) {
            return res;
          }
          return v;
        })));
  }

  getVehicles() {
    if (!this.hasGetValue) {
      this.hasGetValue = true;
      this.http.get<Vehicle[]>(this.url + 'vehicles').subscribe(res => this._vehicles$.next(res));
    }
    return this._vehicles$.asObservable();
  }
}
