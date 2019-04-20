import { Component, OnInit } from '@angular/core';
import { DataService, SupplierModel } from '../data.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {
  supplierName = ''
  suppliers: [SupplierModel]
  singupForm: FormGroup

  constructor(private dataService: DataService) { }

  ngOnInit() {

  }

  onSearchClick() {
    this.dataService.getSupplierByName(this.supplierName)
      .subscribe(
        data => {
          this.suppliers = data.suppliers
          console.log(this.suppliers)
        },
        err => console.error(err),
        () => console.log('Done GetSupplier')
      );
  }

  onKey(event: any) {
    this.supplierName = event.target.value
  }
}
