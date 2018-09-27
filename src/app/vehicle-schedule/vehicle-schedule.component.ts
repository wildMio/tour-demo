import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormArray, AbstractControl, FormControl, Validators } from '@angular/forms';
import { VehicleScheduleService } from './vehicle-schedule.service';
import { MatDialog } from '@angular/material';
import { VehicleService } from '../vehicle/vehicle.service';

@Component({
  selector: 'app-vehicle-schedule',
  templateUrl: './vehicle-schedule.component.html',
  styleUrls: ['./vehicle-schedule.component.scss']
})
export class VehicleScheduleComponent implements OnInit {
  vehicleSchedules$ = this.vehicleScheduleService.getVehicleSchedules();
  vehicleServices$ = this.vehicleService.getVehicles();
  departments$;
  group: FormGroup;
  timeOptions = [];

  @ViewChild('reset') button: ElementRef;

  constructor(
    private vehicleService: VehicleService,
    private vehicleScheduleService: VehicleScheduleService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    const today = new Date();
    this.group = new FormGroup({
      startTime: new FormControl(new Date(today.setHours(9, 0, 0, 0)), Validators.required),
      endTime: new FormControl(new Date(today.setHours(10, 0, 0, 0)), Validators.required),
      location: new FormControl('', Validators.required)
    });
    for (let i = 0; i < 24; i++) {
      this.timeOptions.push(new Date(today.setHours(i, 0 , 0, 0)));
    }
  }

  add(group: FormGroup) {
    if (group.invalid) {
      this.markTouched(group);
    } else {
      this.vehicleScheduleService.addVehicleSchedule(group.value);
      for (let i = (<FormArray>this.group.get('equipments')).length - 1; i >= 0 ; i--) {
        (<FormArray>this.group.get('equipments')).removeAt(i);
      }
      this.button.nativeElement.click();
    }
  }

  delete(id) {
    this.vehicleScheduleService.deleteVehicleSchedule(id);
  }

  edit(data) {
    // const dialogRef = this.dialog.open(EditorComponent, {
    //   data
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (!result) { return; }
    //   this.vehicleScheduleService.editVehicleSchedule(result);
    // });
  }

  setTime({option: {value}}, control: FormControl) {
    const time = value.split(':');
    control.setValue(new Date(control.value.setHours(parseInt(time[0], 10), parseInt(time[1], 10), 0, 0)));
  }

  private markTouched(control: AbstractControl) {
    control.markAsTouched();
    if (control instanceof FormGroup || control instanceof FormArray) {
      Object.keys(control.controls).map((key): AbstractControl => control.controls[key]).forEach(con => {
        this.markTouched(con);
      });
    }
  }
}
