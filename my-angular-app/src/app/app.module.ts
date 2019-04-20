import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './product/product.component';
import { SalesformComponent } from './salesform/salesform.component';

const appRoutes: Routes = [
  { path: '', component: AppComponent, pathMatch: 'full' },
  { path: 'sales', component: SalesformComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    SalesformComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
