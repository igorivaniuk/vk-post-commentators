import { Injectable, EventEmitter } from 'angular2/core';


@Injectable()
export class ErrorService {
  public error = new EventEmitter();

  constructor() { }

  pushError(err) {
    this.error.emit(err);
  }

}
