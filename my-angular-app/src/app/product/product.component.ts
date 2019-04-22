import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public products;

  constructor(public productService: ProductService, public router: ActivatedRoute) {
    this.getProduct();
  }

  getProduct() {
    this.productService.getProductsService().subscribe((data) => {
      this.products = data;
    });
  }
  deleteProduct(id: String): void {
    this.productService.delete(id).
      subscribe((data) => {
        this.getProduct()
      }, (err) => { console.log('Cannot delete this product') })
  }

  ngOnInit() {

  }

}
