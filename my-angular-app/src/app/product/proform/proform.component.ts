import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/salesform/category.service';
import { ProductService } from 'src/app/services/product.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-proform',
  templateUrl: './proform.component.html',
  styleUrls: ['./proform.component.css']
})
export class ProformComponent {
  categories$
  newProduct: FormGroup
  productService


  constructor(private fb: FormBuilder, category: CategoryService, productService: ProductService, private router: ActivatedRoute, private pageRouter: Router) {
    this.categories$ = category.getall();
    this.productService = productService;
    this.newProduct = fb.group({
      'name': new FormControl('', Validators.required),
      'brand': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'quantity': new FormControl('', Validators.required),
      'price': new FormControl('', Validators.required),
      'category': new FormControl('', Validators.required),
      'username': new FormControl('', Validators.required),
    })

  }

  saveProduct(): void {
    this.productService.addProduct(this.newProduct.value).
      subscribe((data) => {
        console.log('New product added')
        this.pageRouter.navigate(['product'])
      }, (err) => { console.log('Cannot add this product') })
      

  }

  deleteProduct(id: String): void {
    this.productService.delete(this.router.snapshot.paramMap.get('id')).
      subscribe((data) => { console.log('New product added') }, (err) => { console.log('Cannot add this product') })
      this.pageRouter.navigate(['product'])
  }

}
