import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SupplierDataService, SupplierModel } from '../supplier.data.service';
import { AlertModel } from '../user/user.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SupplierModalContent } from '../modal/supplier-modal/supplier-modal.component';
import { ErrorModel } from '../user.data.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent {
  supplierName = ''
  suppliers: [SupplierModel]
  supplierForm: FormGroup
  isSupplierNew = true
  alerts: Array<AlertModel> = new Array();
  staticAlertClosed = false;

  constructor(private modalService: NgbModal, private supplierDataService: SupplierDataService, private formBuilder: FormBuilder, private cr: ChangeDetectorRef) {
    this.supplierForm = formBuilder.group({
      'name': ['', [Validators.required]],
      'address': ['', Validators.required],
      'phone': ['', Validators.required],
      'email': ['', Validators.required],
      'type': ['', Validators.required],
      '_id': 0
    });

    this.supplierForm.valueChanges
      .subscribe(
        (data: any) => console.log(data)
      );
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
      _id: '0'
    })
    this.supplierName = ''
    this.getSupplierByName('')
  }

  onKey(event: any) {
    this.getSupplierByName(event.target.value)
  }

  getSupplierByName(supplierName: String) {
    this.supplierDataService.getSupplierByName(supplierName)
      .subscribe(
        data => {
          this.suppliers = data.suppliers
        },
        err => console.error(err),
        () => console.log('Done GetSupplier')
      );
  }

  onSaveSupplier(): void {
    if (this.supplierForm.value._id != 0) {
      this.supplierDataService.updateSupplier(this.supplierForm.value)
        .subscribe(
          data => {
            this.supplierName = ''
            this.getSupplierByName('')
            this.showAlert(data)
          },
          err => console.error(err),
          () => console.log('Done UpdateSupplier')
        );
    } else {
      const formValues = this.supplierForm.value;
      delete formValues._id
      this.supplierDataService.saveSupplier(this.supplierForm.value)
        .subscribe(
          data => {
            this.showAlert(data)
          },
          err => console.error(err),
          () => console.log('Done SaveSupplier')
        );
    }
  }

  deleteSupplier(supplier: SupplierModel) {
    const modalRef = this.modalService.open(SupplierModalContent, { centered: true });
    modalRef.componentInstance.name = supplier.name;
    modalRef.result
      .then(response => {
        if (response) {
          this.supplierDataService.deleteSupplier(supplier)
            .subscribe(
              data => {
                this.supplierName = ''
                this.getSupplierByName('')
                this.showAlert(data)
              },
              err => console.error(err),
              () => console.log('Done DeleteSupplier')
            );
        }
      })
      .catch(console.log)
  }

  showAlert(data: ErrorModel) {
    if (data.hasError) {
      let alertModel: AlertModel;
      alertModel = {
        type: 'danger',
        message: data.message
      }
      this.alerts.push(alertModel)
      setTimeout(() => this.staticAlertClosed = true, 2000);
    } else {
      let alertModel: AlertModel;
      alertModel = {
        type: 'success',
        message: data.message
      }
      this.alerts.push(alertModel)
      setTimeout(() => this.staticAlertClosed = true, 2000);
    }
  }

  close(alert: AlertModel) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }
}
