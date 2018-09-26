import { Component, OnInit } from '@angular/core';
import { DepartmentService } from './department.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  departments$ = this.departmentService.getDepartments();
  control: FormControl;

  constructor(
    private departmentService: DepartmentService
  ) { }

  ngOnInit() {
    this.control = new FormControl('', Validators.required);
  }

  add(control: FormControl) {
    if (control.invalid) {
      control.markAsTouched();
    } else {
      this.departmentService.addDepartment({name: control.value});
      this.control.reset();
    }
  }

  delete(id) {
    this.departmentService.deleteDepartment(id);
  }

}
