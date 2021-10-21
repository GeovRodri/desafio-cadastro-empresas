import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from 'sweetalert2'
import {ApiService} from "../../services/api-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-company-page',
  templateUrl: './create-company.html',
  styleUrls: ['./create-company.scss']
})
export class CreateCompanyPage {

    public isLoadingFindCnpj = false;
    public isSaving = false;
    public companyForm = new FormGroup({
        nome: new FormControl('', [Validators.required]),
        cnpj: new FormControl('', [Validators.required]),
        razao_social: new FormControl('', [Validators.required]),
        endereco: new FormControl('', [Validators.required]),
        atividade_primaria: new FormControl('', [Validators.required]),
    });

    constructor(public apiService: ApiService, public route: Router) {
    }

    findCnpj() {
        const cnpj = this.companyForm.value.cnpj;

        if (cnpj.length < 14) {
            Swal.fire({icon: 'error', text: 'CNPJ inválido!'});
        }

        this.isLoadingFindCnpj = true;
        this.apiService.findCnpj(cnpj).then((data) => {
            if (!data) {
                Swal.fire({icon: 'error', text: 'Empresa não encontrada!'});
                return;
            }

            this.companyForm.patchValue(data);
        }).finally(() => {
            this.isLoadingFindCnpj = false;
        });
    }

    save() {
        this.isSaving = true;
        const company = this.companyForm.value;
        this.apiService.saveCompany(company).then(() => {
            Swal.fire({icon: 'success', text: 'Empresa salva com sucesso!'}).then(() => {
                this.route.navigate(['/']);
            });
        }).catch(() => {
            Swal.fire({icon: 'error', text: 'Infelizmente não foi possível salvar essa empresa!'});
            this.isSaving = false;
        });
    }
}
