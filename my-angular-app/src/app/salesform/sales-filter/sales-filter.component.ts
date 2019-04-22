import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-sales-filter',
  templateUrl: './sales-filter.component.html',
  styleUrls: ['./sales-filter.component.css']
})
export class SalesFilterComponent {
  @Input('category') category: string;
  categories$;
  constructor(catagoryservice: CategoryService) {
    this.categories$ = catagoryservice.getall();
  }

}
