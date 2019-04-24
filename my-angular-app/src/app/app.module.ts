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
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { SupplierModalContent } from './modal/supplier-modal/supplier-modal.component';
import { NavigationComponent } from './nav/navigation.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { SalesFilterComponent } from './salesform/sales-filter/sales-filter.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuardService } from './guards/auth-guard.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { SaleLoadService } from './sale-load.service';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { PageNotFoundComponent } from './page-not-found.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: UserComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'product', component: ProductComponent, canActivate: [AuthGuardService] },
  { path: 'product/new', component: ProformComponent, canActivate: [AuthGuardService] },
  { path: 'product/edit/:id', component: EditProductComponent, canActivate: [AuthGuardService] },
  { path: 'employee', component: EmployeeComponent, canActivate: [AuthGuardService] },
  { path: 'supplier', component: SupplierComponent, canActivate: [AuthGuardService] },
  { path: 'sale', component: SalesformComponent, canActivate: [AuthGuardService] },
  { path: '**', component: PageNotFoundComponent }
];

export function tokenGetter() {
  return localStorage.getItem('IMStoken');
}

@NgModule({
  declarations: [
    AppComponent,
    SalesformComponent,
    ProductComponent, 
    HomeComponent,
    UserComponent,
    EmployeeComponent,
    SupplierComponent,
    ProformComponent,
    EditProductComponent,
    SupplierModalContent,
    NavigationComponent,
    SalesFilterComponent,
    ProductCardComponent,
    PageNotFoundComponent
  ],
  entryComponents: [
    SupplierModalContent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [],
        blacklistedRoutes: []
      }
    }),
    LoadingBarHttpClientModule,
    LoadingBarModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
     
      multi: true
      
    },
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
