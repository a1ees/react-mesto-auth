import { authConfig } from "./constants";

class Auth {
  constructor(options) {
    this.baseUrl = options.baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  register(login, password) {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "password": password,
        "email": login
      })
    })
      .then(this._checkResponse)
  }

  login(login, password) {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "password": password,
        "email": login
      })
    })
      .then(this._checkResponse)
  }

  checkToken(jwt) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${jwt}`
    } 
    })
      .then(this._checkResponse)
  }

}

export const auth = new Auth(authConfig);