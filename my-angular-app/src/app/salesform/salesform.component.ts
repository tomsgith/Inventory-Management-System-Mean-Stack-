import { Component, OnInit } from '@angular/core';
import { SaleDataService } from './data.service.sale';

@Component({
  selector: 'app-salesform',
  templateUrl: './salesform.component.html',
  styleUrls: ['./salesform.component.css']
})
export class SalesformComponent  {
  imageurl:string;
  products$;

  constructor(private saleService:SaleDataService) {
    this.products$=saleService.getAllProducts();
    this.imageurl="./image/pro.png";
  }


}
