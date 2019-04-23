import { Component, OnInit } from '@angular/core';
import { SaleDataService, Product } from './data.service.sale';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-salesform',
  templateUrl: './salesform.component.html',
  styleUrls: ['./salesform.component.css']
})
export class SalesformComponent   {
  
  
  products:Product[]=[];
  filteredProduct:Product[]=[];
  category:string;

constructor(
 saleService:SaleDataService,
 route:ActivatedRoute) {
  saleService.getall().subscribe(prods=>{
    this.products=prods;
    //should be called inside to make sure this runs after products is populated
    route.queryParamMap.subscribe((params)=>{
      this.category=params.get('category')
      this.filteredProduct=(this.category)?
          this.products.filter(p=>p.category===this.category) :
          this.products;

  });
  }); 
  
  
  
   
  }
  





}
