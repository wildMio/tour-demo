import { Injectable, Inject } from '@angular/core';
import { Vehicle } from '../vehicle/vehicle.service';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface VehicleSchedule {
  startTime: Date;
  endTime: Date;
  location: string;
  vehicle: Vehicle;
  id?: number;
}

@Injectable({
  providedIn: 'root'
})
export class VehicleScheduleService {
  private _vehicleSchedule$ = new BehaviorSubject([]);
  private hasGetValue = false;

  constructor(
    private http: HttpClient,
    @Inject('url') private url
  ) { }

  addVehicleSchedule(body) {
    return this.http.post<VehicleSchedule>(this.url + 'vehicleSchedules', body)
      .subscribe(res => this._vehicleSchedule$.next(this._vehicleSchedule$.getValue().concat(res)));
  }

  deleteVehicleSchedule(id) {
    return this.http.delete<VehicleSchedule>(this.url + 'vehicleSchedules/' + id, {})
      .subscribe(res => this._vehicleSchedule$.next(this._vehicleSchedule$.getValue()
        .filter(vehicle => vehicle.id !== id)));
  }

  editVehicleSchedule(vehicle: VehicleSchedule) {
    return this.http.put<VehicleSchedule>(this.url + 'vehicleSchedules/' + vehicle.id, vehicle)
      .subscribe(res => this._vehicleSchedule$.next(this._vehicleSchedule$.getValue()
        .map(v => {
          if (v.id === vehicle.id) {
            return res;
          }
          return v;
        })));
  }

  getVehicleSchedules() {
    if (!this.hasGetValue) {
      this.hasGetValue = true;
      this.http.get<VehicleSchedule[]>(this.url + 'vehicleSchedules').subscribe(res => this._vehicleSchedule$.next(res));
    }
    return this._vehicleSchedule$.asObservable();
  }
}
