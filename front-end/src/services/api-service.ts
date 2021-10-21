import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { take } from 'rxjs/operators';
import {environment} from "../environments/environment";

@Injectable()
export class ApiService {

    constructor(private httpClient: HttpClient) {
    }

    findCnpj(cnpj: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                }),
                params: {
                    cnpj
                }
            };

            this.httpClient.get(`${environment.api}/cnpj`, httpOptions).pipe(take(1))
                .subscribe((result) =>
            {
                resolve(result);
            }, () => {
                resolve(null);
            });
        });
    }

    saveCompany(company: any) {
        return new Promise((resolve, reject) => {
            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            };

            this.httpClient.post(`${environment.api}/companies`, company, httpOptions).pipe(take(1))
                .subscribe((result) =>
                {
                    resolve(result);
                }, (error) => {
                    reject(error);
                });
        });
    }

    getCompanies(page = 1): Promise<{count: number, pages: number, results: Array<any>}> {
        return new Promise((resolve, reject) => {
            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                }),
                params: {
                    page
                }
            };

            this.httpClient.get(`${environment.api}/companies`, httpOptions).pipe(take(1))
                .subscribe((result: any) =>
                {
                    resolve(result);
                }, (error) => {
                    reject(error);
                });
        })
    }
}
