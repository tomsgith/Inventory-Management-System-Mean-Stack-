import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  template: `
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <a class="navbar-brand" style="color: white">IMS</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
        aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" [routerLink]="['/home']" routerLinkActive="active">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" [routerLink]="['/product']" routerLinkActive="active">Product</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" [routerLink]="['/sale']" routerLinkActive="active">Sale</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" [routerLink]="['/employee']" routerLinkActive="active">Employee</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" [routerLink]="['/supplier']" routerLinkActive="active">Supplier </a>
          </li>
          <li class="nav-item" style="position: absolute; right: 70px; cursor: pointer">
            <a class="nav-link" (click)="logout()">Logout </a>
          </li>
        </ul>
      </div>
    </nav>
  `,
  styles: []
})
export class NavigationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logout() {
    localStorage.clear()
    this.router.navigate(['login'])
  }

}
