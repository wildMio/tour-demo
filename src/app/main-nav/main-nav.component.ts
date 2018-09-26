import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  routes = [
    {
      path: 'department',
      name: '部門'
    },
    {
      path: 'vehicle',
      name: '車輛'
    },
    {
      path: 'vehicle-schedule',
      name: '車輛班表'
    }
  ];

  constructor(private breakpointObserver: BreakpointObserver) {}

  }
