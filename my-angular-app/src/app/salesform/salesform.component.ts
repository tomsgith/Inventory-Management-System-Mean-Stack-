import { Component, OnInit } from '@angular/core';
import { CategoryService } from './category.service';
import { SaleDataService } from './data.service.sale';


@Component({
  selector: 'app-salesform',
  templateUrl: './salesform.component.html',
  styleUrls: ['./salesform.component.css']
})
export class SalesformComponent  {
  categories$;
  products$;

constructor(private saleService:SaleDataService) {
  saleService.getAllProducts().subscribe((data)=>{this.products$=data ;console.log(this.products$);});
   
  }



//category service working
  // constructor(private catagoryservice:CategoryService) {
  //   catagoryservice.getcatagories().subscribe((data)=>{this.categories$=data ;console.log(this.categories$);});
   
  // }


}
