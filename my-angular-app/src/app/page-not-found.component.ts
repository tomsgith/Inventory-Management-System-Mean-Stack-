import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
  <div id="notfound" style="    position: absolute;
  left: 30%;
  right: 30%;
  top: 25%;
  width: 40%;">
  <div class="notfound">
    <div class="notfound-404">
      <h1 style="font-family: 'Titillium Web', sans-serif;
      font-size: 186px;
      font-weight: 900;
      margin: 0px;
      color: black;
      text-transform: uppercase;
      background: url(https://colorlib.com/etc/404/colorlib-error-404-1/img/text.png);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-size: cover;
      background-position: center;">404</h1>
    </div>
    <h2 style="    font-family: 'Titillium Web', sans-serif;
    font-size: 26px;
    font-weight: 700;
    margin: 0;">Oops! This Page Could Not Be Found</h2>
    <p style="    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 0px;
    text-transform: uppercase;">Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable</p>
    <a [routerLink]="['/home']" style="font-family: 'Titillium Web', sans-serif;
    display: inline-block;
    text-transform: uppercase;
    color: #fff;
    text-decoration: none;
    border: none;
    background: #5c91fe;
    padding: 10px 40px;
    font-size: 14px;
    font-weight: 700;
    border-radius: 1px;
    margin-top: 15px;
    -webkit-transition: 0.2s all;
    transition: 0.2s all;">Go To Homepage</a>
  </div>
</div>
  `,
  styles: [`

  `]
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
