import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(
    private http: HttpClient,
    @Inject('url') private url
  ) { }

  addVehicle(body) {
    return this.http.post(this.url + 'vehicles', body);
  }
}
