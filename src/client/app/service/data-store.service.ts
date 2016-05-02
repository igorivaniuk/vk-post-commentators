import { Injectable } from 'angular2/core';

const TOKEN_KEY = 'user_token';
const USER_KEY = 'user_profile';


@Injectable()
export class DataStoreService {

  set token(token) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  get token() {
    return localStorage.getItem(TOKEN_KEY);
  }

  set user(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  get user() {
    let userJSON = localStorage.getItem(USER_KEY);

    if (userJSON) {
      return JSON.parse(userJSON);
    } else {
      return null;
    }
  }

}
