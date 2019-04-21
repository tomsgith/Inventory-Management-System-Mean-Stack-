import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SupplierDataService, SupplierModel } from '../supplier.data.service';

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

  constructor(private supplierDataService: SupplierDataService, private formBuilder: FormBuilder) {
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

  }

  onSupplierSelected(supplier) {
    this.isSupplierNew = false
    this.supplierForm.setValue({
      name: supplier.name,
      address: supplier.address,
      phone: supplier.phone,
      email: supplier.email,
      type: supplier.type,
      _id: supplier._id
    })
  }

  onResetForm() {
    this.isSupplierNew = true
    this.supplierForm.setValue({
      name: '',
      address: '',
      phone: '',
      email: '',
      type: '',
      _id: 0
    })
  }

  onKey(event: any) {
    this.supplierName = event.target.value
    console.log(this.supplierName)
    this.supplierDataService.getSupplierByName(this.supplierName)
      .subscribe(
        data => {
          console.log(data.suppliers)
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
