import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { VehicleService } from './vehicle.service';
import { FormControl, Validators, FormGroup, FormArray, AbstractControl } from '@angular/forms';
import { DepartmentService } from '../department/department.service';
import { MatDialog } from '@angular/material';
import { EditorComponent } from './editor/editor.component';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {
  vehicles$ = this.vehicleService.getVehicles();
  departments$ = this.departmentService.getDepartments();
  group: FormGroup;

  @ViewChild('reset') button: ElementRef;

  constructor(
    private vehicleService: VehicleService,
    private departmentService: DepartmentService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.group = new FormGroup({
      name: new FormControl('', Validators.required),
      department: new FormControl('', Validators.required),
      equipments: new FormArray([]),
      contactPerson: new FormGroup({
        name: new FormControl('', Validators.required),
        phone: new FormControl('', Validators.required),
      })
    });
  }

  add(group: FormGroup) {
    if (group.invalid) {
      this.markTouched(group);
    } else {
      this.vehicleService.addVehicle(group.value);
      for (let i = (<FormArray>this.group.get('equipments')).length - 1; i >= 0 ; i--) {
        (<FormArray>this.group.get('equipments')).removeAt(i);
      }
      this.button.nativeElement.click();
    }
  }

  delete(id) {
    this.vehicleService.deleteVehicle(id);
  }

  edit(data) {
    const dialogRef = this.dialog.open(EditorComponent, {
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) { return; }
      this.vehicleService.editVehicle(result);
    });
  }

  addEquipment() {
    (<FormArray>this.group.get('equipments')).push(new FormGroup({
      name: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required)
    }));
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
