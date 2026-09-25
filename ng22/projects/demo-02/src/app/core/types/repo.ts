import { Observable } from "rxjs";

export interface Repo<T extends { id: string | number }> {
  getAll():Promise<T[]>;
  getById(id: T['id']): Promise<T>; // Throw Error if not found
  add(item: Omit<T, 'id'>): Promise<T>;
  update(id: T['id'], item: Partial<Omit<T, 'id'>>): Promise<T>; // Throw Error if not found;
  delete(id: T['id']): Promise<void>; // Throw Error if not found;
}

export interface RepoRx<T extends { id: string | number }> {
  getAll():Observable<T[]>;
  getById(id: T['id']): Observable<T>; // Throw Error if not found
  add(item: Omit<T, 'id'>): Observable<T>;
  update(id: T['id'], item: Partial<Omit<T, 'id'>>): Observable<T>; // Throw Error if not found;
  delete(id: T['id']): Observable<void>; // Throw Error if not found;
}
