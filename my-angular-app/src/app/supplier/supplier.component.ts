import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SupplierDataService, SupplierModel } from '../supplier.data.service';
import { Alert } from '../user/user.component';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {
  supplierName = ''
  suppliers: [SupplierModel]
  supplierForm: FormGroup
  isSupplierNew = true
  alertMessage: Alert
  showAlert = false

  constructor(private supplierDataService: SupplierDataService, private formBuilder: FormBuilder, private cr: ChangeDetectorRef) {
    this.supplierForm = formBuilder.group({
      'name': ['', [Validators.required]],
      'address': ['', Validators.required],
      'phone': ['', Validators.required],
      'email': ['', Validators.required],
      'type': ['', Validators.required],
      '_id': [0]
    });
  }

  ngOnInit() {

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
    this.alertMessage = null
  }

  onKey(event: any) {
    this.supplierName = event.target.value
    this.supplierDataService.getSupplierByName(this.supplierName)
      .subscribe(
        data => {
          this.suppliers = data.suppliers
        },
        err => console.error(err),
        () => console.log('Done GetSupplier')
      );
  }

  onSaveSupplier(): void {
    this.supplierDataService.updateSupplier(this.supplierForm.value)
      .subscribe(
        data => {
          if (data.hasError) {
            this.alertMessage = {
              hasError: true,
              message: data.message
            }
          } else {
            this.alertMessage = {
              hasError: false,
              message: data.message
            }
          }
        },
        err => console.error(err),
        () => console.log('Done GetSupplier')
      );
  }
}
