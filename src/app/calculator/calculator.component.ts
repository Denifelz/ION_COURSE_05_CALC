import { Component, HostListener } from '@angular/core';

const CalculatorNumber = ['.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
type CalculatorNumber = typeof CalculatorNumber[number];
const CalculatorOperator = ['(', ')', '/', '*', '-', '+'] as const;
type CalculatorOperator = typeof CalculatorOperator[number];

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  expression: string = '0|';
  cursorPosition: number = 1;
  result: string = '0';
  resultError: boolean = false;

  pressNumber(number: CalculatorNumber) {
    if(this.expression == '0|' && number != '.') {
      this.expression = number + '|';
    } else {
      this.expression = this.expression.slice(0, this.cursorPosition) + number + '|' + this.expression.slice(this.cursorPosition + 1);
      this.cursorPosition++;
    }

    this.evalExpression();
  }

  pressOperator(operator: CalculatorOperator) {
    this.expression = this.expression.slice(0, this.cursorPosition) + operator + '|' + this.expression.slice(this.cursorPosition + 1);
    this.cursorPosition++;
    this.evalExpression();
  }

  pressLeft() {
    if(this.cursorPosition == 0) {
      return;
    }

    this.expression = this.expression.slice(0, this.cursorPosition) + this.expression.slice(this.cursorPosition + 1);
    this.cursorPosition--;
    this.expression = this.expression.slice(0, this.cursorPosition) + '|' + this.expression.slice(this.cursorPosition);
  }

  pressRight() {
    if(this.cursorPosition == this.expression.length - 1) {
      return;
    }

    this.expression = this.expression.slice(0, this.cursorPosition) + this.expression.slice(this.cursorPosition + 1);
    this.cursorPosition++;
    this.expression = this.expression.slice(0, this.cursorPosition) + '|' + this.expression.slice(this.cursorPosition);
  }

  pressEqual() {
    this.evalExpression();
    if(this.resultError == false && this.result != 'Infinity') {
      this.expression = this.result + '|';
      this.cursorPosition = this.result.length;
    }
  }

  pressRemove() {
    if(this.cursorPosition == 0) {
      return;
    }

    if(this.expression.length == 2) {
      this.pressClear();
      return;
    }

    this.expression = this.expression.slice(0, this.cursorPosition - 1) + '|' + this.expression.slice(this.cursorPosition + 1);
    this.cursorPosition--;

    this.evalExpression();
  }

  pressClear() {
    this.expression = '0|';
    this.cursorPosition = 1;
    this.result = '0';
    this.resultError = false;
  }

  evalExpression() {
    try {
      this.result = eval(this.expression.slice(0, this.cursorPosition) + this.expression.slice(this.cursorPosition + 1)).toString();
      if(this.result == 'NaN') {
        this.resultError = true;
      } else {
        this.resultError = false;
      }
    } catch {
      this.resultError = true;
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if(CalculatorNumber.indexOf(event.key as CalculatorNumber) != -1) {
      this.pressNumber(event.key as CalculatorNumber);
      return;
    }

    if(CalculatorOperator.indexOf(event.key as CalculatorOperator) != -1) {
      this.pressOperator(event.key as CalculatorOperator);
      return;
    }

    if(event.key == 'ArrowLeft') {
      this.pressLeft();
      return;
    }

    if(event.key == 'ArrowRight') {
      this.pressRight();
      return;
    }

    if(event.key == 'Enter') {
      this.pressEqual();
      return;
    }

    if(event.key == 'Backspace') {
      this.pressRemove();
      return;
    }

    if(event.key == 'Escape') {
      this.pressClear();
      return;
    }

    console.log("Unexpected input: ", event.key);
  }
}
