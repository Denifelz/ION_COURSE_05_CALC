import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { ExpressionComponent } from './calculator/expression/expression.component';
import { ResultComponent } from './calculator/result/result.component';
import { ButtonComponent } from './calculator/button/button.component';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    ExpressionComponent,
    ButtonComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
