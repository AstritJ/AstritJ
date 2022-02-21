import { Injectable, OnInit, AfterContentInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUniversity } from './IUniversity';
import { IProfessors } from './IProfessors';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class MetricCalcService implements OnInit, AfterContentInit {

  universities: IUniversity[];
  professors: IProfessors[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    console.log(this.universities);
    console.log(this.professors);
  }

  calc(numberOfBacklink: number, parametri1: number): number {
    return numberOfBacklink * (parametri1 / 100);
  }

  async getUniversities() {
    return this.http.get<IUniversity[]>(environment.url + '/q4').toPromise();
  }

  async getProfessors() {
    return this.http.get<IProfessors[]>(environment.url + '/q2').toPromise();
  }

  getUniversitiesName(data: any[]) {
    return _.uniqBy(data, 'University_Name');
  }

  getUniversityValue(university: IUniversity, visibility: number, presence: number, opennes: number, exellence: number) {
    const p1 = university.NrOfBacklinks * (visibility / 100);
    const p2 = university.NrOfFiles * (presence / 100);
    const p3 = this.getOpenes(university.University_Name) * (opennes / 100);
    const p4 = this.getCitations(university.University_Name) * (exellence / 100);

    return p1 + p2 + p3 + p4;
  }

  getOpenes(univesiteti: string) {
    let publications = 0;
    const filtered = this.professors.filter(p => p.University_Name === univesiteti);
    filtered.forEach(f => {
      if (f.Publications > 0) {
        publications += f.Publications;
      }
    });

    return publications;
  }

  getCitations(univesiteti: string) {
    let citations = 0;
    const filtered = this.professors.filter(p => p.University_Name === univesiteti);
    filtered.forEach(f => {
      if (f.Citations > 0) {
        citations += f.Publications;
      }
    });
    return citations;
  }
}
