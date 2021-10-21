import {Component} from '@angular/core';
import {ApiService} from "../../services/api-service";

@Component({
  selector: 'app-companies-page',
  templateUrl: './companies.html',
  styleUrls: ['./companies.scss']
})
export class CompaniesPage {

    currentPage = 1;
    totalPages = 1;
    count = 1;
    companies: Array<any> = [];

    constructor(private apiService: ApiService) {
        this.getCompanies();
    }

    getCompanies() {
        this.apiService.getCompanies(this.currentPage).then((result) => {
            this.companies = result.results;
            this.totalPages = result.pages;
            this.count = result.count;
        });
    }

    changePage(currentPage: number) {
        this.currentPage = currentPage;
        this.getCompanies();
    }
}
