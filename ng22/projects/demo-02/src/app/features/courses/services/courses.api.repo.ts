import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { RepoRx } from '../../../core/types/repo';
import { Course } from '../types/course';
import { Observable } from 'rxjs';

@Service()
export class CoursesApiRepo implements RepoRx<Course> {
  // eslint-disable-next-line no-unused-private-class-members
  readonly #http = inject(HttpClient);
  readonly #url = environment.apiUrl + '/courses';

  fetchData() {
    return fetch(this.#url, {
      method: 'POST',
      body: JSON.stringify({ title: 'New Course', description: 'Course Description' }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Server response was ' + response.status + ' ' + response.statusText);
      }
      return response.json();
    });
  }

  getAll(): Observable<Course[]> {
    return this.#http.get<Course[]>(this.#url);
  }
  getById(id: number): Observable<Course> {
    const url = this.#url + '/' + id;
    return this.#http.get<Course>(url);
  }
  add(item: Omit<Course, 'id'>): Observable<Course> {
    return this.#http.post<Course>(this.#url, item);
  }
  update(id: number, item: Partial<Omit<Course, 'id'>>): Observable<Course> {
    const url = this.#url + '/' + id;
    return this.#http.patch<Course>(url, item);
  }
  delete(id: number): Observable<void> {
    const url = this.#url + '/' + id;
    return this.#http.delete<void>(url);
  }
}
