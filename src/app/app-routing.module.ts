import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleComponent } from './vehicle/vehicle.component';
import { VehicleScheduleComponent } from './vehicle-schedule/vehicle-schedule.component';
import { DepartmentComponent } from './department/department.component';

const routes: Routes = [
  {
    path: 'department',
    component: DepartmentComponent
  },
  {
    path: 'vehicle',
    component: VehicleComponent
  },
  {
    path: 'vehicle-schedule',
    component: VehicleScheduleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
