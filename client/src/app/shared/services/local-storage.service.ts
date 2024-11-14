import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  set(key: string, value: unknown) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: any): any | null {
    const stringifiedValue = window.localStorage.getItem(key);
    return stringifiedValue ? JSON.parse(stringifiedValue) : null;
  }

  delete(key: any): void {
    window.localStorage.removeItem(key);
  }
}
