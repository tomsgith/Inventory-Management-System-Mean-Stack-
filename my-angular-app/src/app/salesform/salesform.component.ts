import { Component, OnInit } from '@angular/core';
import { SaleDataService } from './data.service.sale';

@Component({
  selector: 'app-salesform',
  templateUrl: './salesform.component.html',
  styleUrls: ['./salesform.component.css']
})
export class SalesformComponent implements OnInit {

  constructor(private saleService:SaleDataService) { }

  ngOnInit() {
    console.log(">>>> hello am working")
    console.log(this.saleService.getAllProducts)
  }

}
