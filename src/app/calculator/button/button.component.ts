import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() value: string = '';
  @Input() split: number = 1;

  public width: number = 65;

  ngOnInit() {
    this.width = (65 / this.split);
  }
}
