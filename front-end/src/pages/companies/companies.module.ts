import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompaniesPageRoutingModule } from './companies-routing.module';
import { CompaniesPage } from './companies';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CompaniesPageRoutingModule
    ],
    declarations: [
        CompaniesPage
    ],
    exports: [
        CompaniesPage
    ]
})
export class CompaniesPageModule { }
