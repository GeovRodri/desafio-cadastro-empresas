import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateCompanyPageRoutingModule } from './create-company-routing.module';
import { CreateCompanyPage } from './create-company';
import {NgxMaskModule} from "ngx-mask";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CreateCompanyPageRoutingModule,
        NgxMaskModule.forRoot()
    ],
    declarations: [
        CreateCompanyPage
    ],
    exports: [
        CreateCompanyPage
    ]
})
export class CreateCompanyPageModule { }
