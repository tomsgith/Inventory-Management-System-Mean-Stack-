import { Component, OnInit } from '@angular/core';
import { DataService, SupplierModel } from '../data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {
  supplierName = ''
  suppliers: [SupplierModel]
  supplierForm: FormGroup
  isSupplierNew: boolean = true

  constructor(private dataService: DataService, private formBuilder: FormBuilder) {
    this.supplierForm = formBuilder.group({
      'name': ['surafel nigussie', [Validators.required]],
      'address': ['asfaw', Validators.required],
      'phone': ['12345', Validators.required],
      'email': ['12345', Validators.required],
      'type': ['12345', Validators.required],
      '_id': [0]
    });

    this.supplierForm.valueChanges
      .subscribe(
        (data: any) => console.log(data)
      );
  }

  ngOnInit() {

  }

  onSearchClick() {
    this.dataService.getSupplierByName(this.supplierName)
      .subscribe(
        data => {
          this.suppliers = data.suppliers
        },
        err => console.error(err),
        () => console.log('Done GetSupplier')
      );
  }

  onSaveSupplier(): void {

    console.log(this.supplierForm.value)

  }
}
