import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination';
import { PipesModule } from '../../pipes/pipes.module';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        PipesModule,
        FormsModule,
    ],
    declarations: [
        PaginationComponent
    ],
    exports: [
        PaginationComponent
    ]
})
export class PaginationModule {}
