import 'reflect-metadata';

/* eslint-disable @typescript-eslint/no-unused-vars */
import { injectable } from 'inversify';

export interface LocalStorageService {
  getText(key: KeyType): string | null;
  setText(key: KeyType, value: string): void;
  getJson<T>(key: KeyType): T | null;
  setJson<T>(key: KeyType, value: T): void;
  remove(key: KeyType): void;
}

export enum KeyType {
  Carts,
  Token,
  User,
}

@injectable()
export default class DefaultLocalStorageService implements LocalStorageService {
  public getText(key: KeyType): string | null {
    const value = localStorage.getItem(KeyType[key]);
    if (value === null) {
      return null;
    }
    return value;
  }

  public setText(key: KeyType, value: string): void {
    localStorage.setItem(KeyType[key], value);
  }

  public getJson<T>(key: KeyType): T | null {
    const value = localStorage.getItem(KeyType[key]);
    if (value === null) {
      return null;
    }
    return JSON.parse(value);
  }

  public setJson<T>(key: KeyType, value: T): void {
    localStorage.setItem(KeyType[key], JSON.stringify(value));
  }

  public remove(key: KeyType): void {
    localStorage.removeItem(KeyType[key]);
  }
}
