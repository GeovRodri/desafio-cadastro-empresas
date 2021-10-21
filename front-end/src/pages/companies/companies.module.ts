import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompaniesPageRoutingModule } from './companies-routing.module';
import { CompaniesPage } from './companies';
import {PaginationModule} from "../../components/pagination/pagination.module";
import {NgxMaskModule} from "ngx-mask";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CompaniesPageRoutingModule,
        PaginationModule,
        NgxMaskModule.forRoot()
    ],
    declarations: [
        CompaniesPage
    ],
    exports: [
        CompaniesPage
    ]
})
export class CompaniesPageModule { }
