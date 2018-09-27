import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, AbstractControl } from '@angular/forms';
import { DepartmentService } from '../../department/department.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  departments$ = this.departmentService.getDepartments();
  group: FormGroup;

  constructor(
    private departmentService: DepartmentService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
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
    this.group.patchValue(this.data);
  }

  addEquipment() {
    (<FormArray>this.group.get('equipments')).push(new FormGroup({
      name: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required)
    }));
  }

  onSubmit(group: FormGroup) {
    if (group.valid) {
      this.dialogRef.close(Object.assign({id: this.data.id}, group.value));
    } else {
      this.markTouched(group);
    }
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
