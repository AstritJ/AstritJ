import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-parameter',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.css']
})
export class ParameterComponent implements OnInit {

  @Input()
  public name: string;

  @Input()
  public value = 0;

  @Output() valueChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 1000) {
      return Math.round(value / 1000) + '%';
    }

    return value;
  }

  onInputChange(event: any) {
    this.valueChange.emit({
      name: this.name,
      value: event.value
    });
  }
}
