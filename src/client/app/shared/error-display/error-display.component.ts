import {Component, OnInit} from 'angular2/core';
import {ErrorService} from "../../service/error.service";

@Component({
  moduleId: __moduleName,
  selector: 'error-display',
  template: `
   <div class="error-container">
     <div class="alert" *ngFor="#error of errors" (click)="removeError(error)">{{error}}</div>
   </div>
   `,
  styleUrls: ['error-display.component.css']
})
export class ErrorDisplayComponent implements OnInit {

  public errors: any[] = [];

  constructor(private _errService: ErrorService) { }

  removeError(err) {
    this.errors = this.errors.filter(e => e != err)
  }

  ngOnInit() {
    this._errService.error.subscribe(
        err => this.errors.push(err)
    )
  }
}
