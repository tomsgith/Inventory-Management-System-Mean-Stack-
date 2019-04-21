import { Component, OnInit } from '@angular/core';
import { CategoryService } from './category.service';
import { SaleDataService } from './data.service.sale';


@Component({
  selector: 'app-salesform',
  templateUrl: './salesform.component.html',
  styleUrls: ['./salesform.component.css']
})
export class SalesformComponent implements OnInit  {
  
  categories$;
  products$;

constructor(private saleService:SaleDataService,private catagoryservice:CategoryService) {
  this.products$=saleService.getall();
  
  this.categories$=catagoryservice.getall();
  
   
  }
  ngOnInit(): void {
    console.log(this.categories$)
    console.log(this.products$)
  }





}
