import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
// tslint:disable-next-line:max-line-length
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatDialogModule, MatButtonToggleModule, MatDatepickerModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { VehicleComponent } from './vehicle/vehicle.component';
import { VehicleScheduleComponent } from './vehicle-schedule/vehicle-schedule.component';
import { DepartmentComponent } from './department/department.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditorComponent } from './vehicle/editor/editor.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    VehicleComponent,
    VehicleScheduleComponent,
    DepartmentComponent,
    EditorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  entryComponents: [EditorComponent],
  providers: [{provide: 'url', useValue: 'http://localhost:3000/'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
