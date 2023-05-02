import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-expression',
  templateUrl: './expression.component.html',
  styleUrls: ['./expression.component.css']
})
export class ExpressionComponent {
  @Input() expression: string = '';
  @Input() expressionError: boolean = false;
}
