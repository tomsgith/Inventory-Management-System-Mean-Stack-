import { Component, Input, OnInit } from '@angular/core'
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Supplier</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Are you sure you want to delete <strong>{{name}}</strong> from supplier list?</p>
    </div>
    <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="activeModal.dismiss(false)">Cancel</button>
    <button type="button" ngbAutofocus class="btn btn-danger" (click)="activeModal.close(true)">Ok</button>
  </div>
  `
})
export class SupplierModalContent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) { }
}
