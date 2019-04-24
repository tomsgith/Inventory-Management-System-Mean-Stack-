import { Component, OnInit } from '@angular/core';
import { SaleDataService, Product } from './data.service.sale';
import { ActivatedRoute, Router } from '@angular/router';
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
  

  constructor(public productService: ProductService, private saleService: SaleDataService, private route: ActivatedRoute, private pageRoute: Router) {
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

  onProductSelected(product: Product) {
    for (let x = 0; x < this.selectedProducts.length; x++) {
      if (this.selectedProducts[x]._id === product._id) {
        this.selectedProducts[x].quantity = this.selectedProducts[x].quantity + 1
        this.selectedProducts[x].totalPrice=this.selectedProducts[x].quantity * this.selectedProducts[x].price
        return 
      }
    }
    this.selectedProducts.push(product)
  }

  deleteProduct(index: number) {
    this.selectedProducts.splice(index, 1)
  }

  onSale() {
    for (let x = 0; x < this.selectedProducts.length; x++) {
      this.selectedProducts[x].productid = this.selectedProducts[x]._id
      delete this.selectedProducts[x]._id
    }
    console.log(this.selectedProducts);

    this.saleService.saveSale(this.selectedProducts).subscribe((data) => {
      this.pageRoute.navigate(['home'])
    });
  }
}
