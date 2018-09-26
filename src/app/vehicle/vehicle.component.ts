import { Component, OnInit } from '@angular/core';
import { VehicleService } from './vehicle.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {

  constructor(
    private vehicleService: VehicleService
  ) { }

  ngOnInit() {
  }

  click() {
    this.vehicleService.addVehicle({department: 'test'}).subscribe(() => console.log('su'));
  }

}
