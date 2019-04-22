import { Component, OnInit } from '@angular/core';
import { SaleDataService, Product } from './data.service.sale';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-salesform',
  templateUrl: './salesform.component.html',
  styleUrls: ['./salesform.component.css']
})
export class SalesformComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];

  constructor(public productService: ProductService, saleService: SaleDataService, route: ActivatedRoute) {
    this.getProduct()
  }

  getProduct() {
    this.productService.getProductsService().subscribe((data) => {
      this.products = data;
      this.filteredProducts = data;
    });
  }

  onKey(event) {
    this.filteredProducts = this.products.filter(product => product.name.toLowerCase().includes(event.target.value.toLowerCase()))
  }

}
