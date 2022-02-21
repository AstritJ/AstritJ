import { Component, OnInit, AfterContentInit } from '@angular/core';
import { single } from './data';

import { MetricCalcService } from '../metric-calc.service';
import { getQueryValue } from '@angular/core/src/view/query';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  visibility = 50;
  presence = 20;
  opennes = 20;
  exellence = 10;

  listOfUniversities: any[];

  single: any[];
  multi: any[];

  view: any[] = [1100, 500];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Universities';
  showYAxisLabel = true;
  yAxisLabel = 'Rank';

  colorScheme = {
    domain: [
      '#5AA454',
      '#A10A28',
      '#C7B42C',
      '#AAAAAA',
      '#3AA454',
      '#210A28',
      '#17B42C',
      '#BAAAAA',
      '#CAAAAA',
      '#DAAAAA',
      '#EAAAAA',
      '#FAAAAA',
      '#8FAAAA',
    ]
  };

  constructor(private metricService: MetricCalcService) {

  }

  ngOnInit() {
    this.metricService.getProfessors().then(
      data => {
        this.metricService.professors = data;
      });

    this.metricService.getUniversities().then(
      data => { this.metricService.universities = data; this.createGraph(data); }
    );
  }

  createGraph(data: any[], m: boolean = true): void {
    const single = [];

    if (m) {
      this.listOfUniversities = this.metricService.getUniversitiesName(data);
    }

    this.listOfUniversities.forEach((e) => {
      single.push({
        name: e.University_Name,
        value: this.metricService.getUniversityValue(e, this.visibility, this.presence, this.opennes, this.exellence)
      });
    });

    Object.assign(this, { single });
  }

  onSelect(event) {
    console.log(event);
  }

  valueChange(changed: { name: string, value: number }) {
    console.log(changed);
    if (changed.name === 'Visibility') {
      this.visibility = changed.value;
    }
    if (changed.name === 'Presence') {
      this.presence = changed.value;
    }
    if (changed.name === 'Opennes') {
      this.opennes = changed.value;
    }
    if (changed.name === 'Exellence') {
      this.exellence = changed.value;
    }

    this.createGraph(this.metricService.universities, false);
  }
}
