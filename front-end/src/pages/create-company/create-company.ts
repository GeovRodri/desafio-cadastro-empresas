import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from 'sweetalert2'
import {ApiService} from "../../services/api-service";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
declare var google: any;

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

    public map: any;
    private mapLocation: { lat: number; lng: number; } | undefined;
    private marker: any;

    constructor(private apiService: ApiService, private route: Router) {
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
            this.initializeMap();
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

    private initializeGoogleMapsApi(): Promise<void> {
        const mapsUrl = 'https://maps.googleapis.com/maps/api/js?key=' + environment.googleMapsKey;
        return new Promise((resolve, reject) => {
            const mapScriptIndex = Array.from(document.getElementsByTagName('script')).findIndex(e => e.src == mapsUrl);
            if (mapScriptIndex >= 0 && typeof google === 'undefined') {
                const interval = setInterval(() => {
                    if (typeof google !== 'undefined') {
                        clearInterval(interval);
                        resolve();
                        return;
                    }
                }, 500);
            } else if (typeof google === 'undefined' && mapScriptIndex === -1) {
                const d = document;
                const t = 'script';
                const o: any = d.createElement(t);
                const s = d.getElementsByTagName(t)[0];
                o.src = mapsUrl;
                o.addEventListener('load', () => { resolve(); }, false);
                s?.parentNode?.insertBefore(o, s);
            } else {
                resolve();
            }
        });
    }

    private initializeMap() {
        this.initializeGoogleMapsApi().then(() => {
            const mapConfig: any = {
                zoom: 17,
                draggable: true,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDefaultUI: true,
                gestureHandling: 'greedy'
            };

            this.geocodeMap().then((mapLocation) => {
                this.mapLocation = mapLocation;

                mapConfig['center'] = new google.maps.LatLng(
                    this.mapLocation.lat, this.mapLocation.lng
                );

                if (!this.map) {
                    const element = document.getElementById('map');

                    if (element) {
                        this.map = new google.maps.Map(element, mapConfig);
                        this.marker = new google.maps.Marker({
                            position: this.mapLocation,
                            map: this.map,
                        });
                    }
                } else {
                    this.updateMap();
                    this.updateMarker();
                }
            });
        });
    }

    private geocodeMap(): Promise<{ lat: number, lng: number }> {
        return new Promise((resolve, reject) => {
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode( { 'address': this.companyForm.value.endereco}, (results: any, status: any) => {
                if (status == 'OK') {
                    resolve({
                        lat: results[0].geometry.location.lat(),
                        lng: results[0].geometry.location.lng()
                    });
                } else {
                    reject('Geocode was not successful for the following reason: ' + status);
                }
            });
        });
    }

    private updateMarker() {
        if (!this.marker) {
            return null;
        }

        this.marker.setMap(null);
        this.marker = null;

        this.marker = new google.maps.Marker({
            position: this.mapLocation,
            map: this.map,
        });

        return;
    }

    private updateMap() {
        if (!this.map) {
            return null;
        }

        const newCenter = new google.maps.LatLng(
            this.mapLocation?.lat, this.mapLocation?.lng
        );

        this.map.setCenter(newCenter);
        google.maps.event.trigger(this.map, 'resize');
        return;
    }
}
