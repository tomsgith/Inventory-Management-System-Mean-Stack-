import { Component, OnInit } from '@angular/core';
import { CategoryService } from './category.service';


@Component({
  selector: 'app-salesform',
  templateUrl: './salesform.component.html',
  styleUrls: ['./salesform.component.css']
})
export class SalesformComponent  {
  categories$;
  products$;
//category service working
  // constructor(private catagoryservice:CategoryService) {
  //   catagoryservice.getcatagories().subscribe((data)=>{this.categories$=data ;console.log(this.categories$);});
   
  // }


}
