import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service'
import { ActivatedRoute } from '@angular/router';
import { Product } from '../salesform/data.service.sale';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  filteredProduct:Product[]=[];

  constructor(public productService: ProductService, public router: ActivatedRoute) {
    this.getProduct();
  }

  getProduct() {
    this.productService.getProductsService().subscribe((data) => {
      this.products = data;
      this.filteredProduct = data;
    });
  }
  deleteProduct(id: String): void {
    this.productService.delete(id).
      subscribe((data) => {
        this.getProduct()
      }, (err) => { console.log('Can not delete this product') })
  }

  searchProduct(event){
    this.filteredProduct = this.products.filter(p=> p.name.toLowerCase().includes(event.target.value.toLowerCase()))
  }

  ngOnInit() {

  }

}
