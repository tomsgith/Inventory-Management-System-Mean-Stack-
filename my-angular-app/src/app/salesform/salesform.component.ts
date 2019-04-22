import { Component, OnInit } from '@angular/core';
import { SaleDataService, Product } from './data.service.sale';
import { ActivatedRoute } from '@angular/router';
import { ProductService, ProductModel } from '../services/product.service';

@Component({
  selector: 'app-salesform',
  templateUrl: './salesform.component.html',
  styleUrls: ['./salesform.component.css']
})
export class SalesformComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedProducts: Product[] = [];

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
    this.selectedProducts = this.filteredProducts
  }

  onProductSelected(product: ProductModel) {
    this.selectedProducts.push(product)
  }

  deleteProduct(index: number) {
    this.selectedProducts.splice(index, 1)
  }
}
