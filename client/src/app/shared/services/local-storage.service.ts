import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  set(key: string, value: unknown) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: any): unknown | -1 {
    const stringifiedValue = window.localStorage.getItem(key);
    return stringifiedValue ? JSON.parse(stringifiedValue) : -1;
  }
}
