import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
  userType: 'admin' | 'follow' | 'user' = 'admin';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  routes = [
    {
      path: 'department',
      param: null,
      name: '部門'
    },
    {
      path: 'vehicle',
      param: null,
      name: '車輛'
    },
    {
      path: 'vehicle-schedule',
      param: null,
      name: '車輛班表'
    }
  ];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {}

  ngOnInit(): void {

  }

  change({value = 'admin'}) {
    if (value === 'admin') {
      this.routes.forEach(route => delete route.param);
      this.router.navigate(['/', this.routes[0].path]);
    } else if (value === 'follower') {
      this.routes.forEach(route => route.param = 'follower');
      this.router.navigate(['/', this.routes[0].path, 'follower']);
    } else {
      this.routes.forEach(route => route.param = 'user');
      this.router.navigate(['/', this.routes[0].path, 'user']);
    }
  }

}
