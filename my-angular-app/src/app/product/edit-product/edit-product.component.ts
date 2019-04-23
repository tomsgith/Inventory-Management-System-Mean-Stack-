import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';

import { CategoryService } from 'src/app/salesform/category.service';
import { SupplierDataService } from 'src/app/supplier.data.service';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  categories$
  editProduct: FormGroup
  suppliers

  constructor(private fb: FormBuilder,
    public productService: ProductService,
    private router: ActivatedRoute,
    private supplierDataService: SupplierDataService,
    private category: CategoryService,
    private pageRouter: Router) {

    this.categories$ = category.getall();
    this.getSupplier()
    this.editProduct = fb.group({
      'name': new FormControl('', Validators.required),
      'brand': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'quantity': new FormControl('', Validators.required),
      'price': new FormControl('', Validators.required),
      'category': new FormControl('', Validators.required),
      'supplier': new FormControl('', Validators.required),
      'username': new FormControl('', Validators.required),
    });

  }

  editProducts() {
    this.productService.editProduct(this.editProduct.value)
      .subscribe((data) => {
        this.pageRouter.navigate(['product'])
        console.log('product is editted')
      },
        (err) => { console.log('can not edit Product') })
  }


  ngOnInit() {
    this.productService.getProductById(this.router.snapshot.paramMap.get('id'))
      .subscribe((data) => {
        console.log(data)
        this.editProduct.patchValue({
          name: data.name,
          brand: data.brand,
          description: data.description,
          quantity: data.quantity,
          price: data.price,
          category: data.category,
          supplier: data.supplier,
          username: data.username
        });
      });
  }

  getSupplier() {
    this.supplierDataService.getSupplier()
      .subscribe(
        data => {
          this.suppliers = data.suppliers
        },
        err => console.error(err),
        () => console.log('Done GetSupplier')
      );
  }

}
