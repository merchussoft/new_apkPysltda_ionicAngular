import {Component, OnInit} from '@angular/core';
import {ServiceloginService} from '../../api/servicelogin.service';
import {FuncionesglobalesService} from '../../api/funcionesglobales.service';
import {Observable} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';
import {LoadingController, ToastController} from '@ionic/angular';

@Component({
    selector: 'app-registrohoras',
    templateUrl: './registrohoras.component.html',
    styleUrls: ['./registrohoras.component.scss'],
})
export class RegistrohorasComponent implements OnInit {

    public reporte = {};
    // tslint:disable-next-line:variable-name
    public array_actividades: Observable<any>;

    constructor(
        private apiService: ServiceloginService,
        private globalFunction: FuncionesglobalesService,
        private spinner: NgxSpinnerService,
        public loadingCtrl: LoadingController
    ) {
        this.actividades();
    }

    ngOnInit() {
    }

    enviarHoras() {
        // @ts-ignore
        this.reporte.cod_user = localStorage.getItem('code_user');
        this.globalFunction.loadings('Registrando horas...').then((loading) => {
            loading.present();
            this.apiService.registerHours(this.reporte)
                .subscribe((data) => {
                    loading.dismiss();
                    // @ts-ignore
                    if (!data.validate) {
                        // @ts-ignore
                        this.globalFunction.swalTimmer('error', data.mensaje, 1500);
                    } else {
                        // @ts-ignore
                        this.globalFunction.swalTimmer('success', data.mensaje, 1500);
                    }
                });
        });
    }

    actividades() {
        this.apiService.activities()
            .subscribe((data) => {
                // @ts-ignore
                this.array_actividades = data.actividad;
            });
    }

}
