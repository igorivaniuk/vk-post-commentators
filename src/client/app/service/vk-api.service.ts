import {Injectable} from "angular2/core";
import {Jsonp} from "angular2/http";
import {ErrorService} from "./error.service";
import {DataStoreService} from "./data-store.service";
import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
// import "rxjs/add/operator/delay";

const API_URL = 'https://api.vk.com/method/';
const API_V = '5.52';

@Injectable()
export class VkApiService {

  constructor(
      private _jsonp: Jsonp,
      private _store: DataStoreService,
      private _errService: ErrorService
  ) {

  }

  method(name, params = {}) {
    return this._jsonp
        .get(`${API_URL}${name}?${this.getParams(params)}`)
        .map(res => res.json())
        .filter(res => {
          if (res.response) {
            return res;
          } else {
            this._errService.pushError(res.error.error_msg);
            if (res.error && res.error.error_code == 6) {
              return res;
            }
          }
        })
  }

  getParams(params: Object) {
    let qs = [];

    if (this._store.token) {
      params['access_token'] = this._store.token;
    }

    params['v'] = API_V;
    params['callback'] = 'JSONP_CALLBACK';

    Object.keys(params).forEach(k => qs.push(`${k}=${params[k]}`));

    return qs.join('&')
  }


}
