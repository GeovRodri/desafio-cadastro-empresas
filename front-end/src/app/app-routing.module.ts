import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('../pages/companies/companies.module').then(m => m.CompaniesPageModule)
    },
    {
        path: 'create-company',
        loadChildren: () => import('../pages/create-company/create-company.module').then(m => m.CreateCompanyPageModule)
    },
    {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
