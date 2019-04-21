import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  constructor(public productService: ProductService) {

  }
  editProducts(id) {
    this.productService.editProduct(id).subscribe(() => { }, () => { })
  }
  ngOnInit() {
  }

}
