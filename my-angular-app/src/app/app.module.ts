import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './product/product.component';
import { SalesformComponent } from './salesform/salesform.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeComponent } from './employee/employee.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { SupplierComponent } from './supplier/supplier.component';
import { ProformComponent } from './product/proform/proform.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: UserComponent },
  { path: 'home', component: HomeComponent },
  { path: 'product', component: ProductComponent },
  { path: 'product/new', component: ProformComponent},
  { path: 'employee', component: EmployeeComponent },
  { path: 'supplier', component: SupplierComponent },
  { path: 'sale', component: SalesformComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SalesformComponent,
    ProductComponent,
    HomeComponent,
    UserComponent,
    EmployeeComponent,
    SupplierComponent,
    ProformComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
