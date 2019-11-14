import {Component, OnInit} from '@angular/core';
import {ServiceloginService} from '../../api/servicelogin.service';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import {FuncionesglobalesService} from '../../api/funcionesglobales.service';

@Component({
    selector: 'app-principaladmin',
    templateUrl: './principaladmin.component.html',
    styleUrls: ['./principaladmin.component.scss'],
})
export class PrincipaladminComponent implements OnInit {

    dtElement: DataTableDirective;
    dtTrigger: Subject<any> = new Subject();
    dtOptions: any = {};

    public listHours: any = [];
    public listanimation: any = Array(13).fill(1);
    public dataList = false;

    constructor(
        private serviceApi: ServiceloginService,
        private globalFuntion: FuncionesglobalesService
    ) {
        this.listarUsuarios();
    }

    ngOnInit() {
    }


    listarUsuarios() {
        this.serviceApi.listarUsuarios()
            .subscribe((response) => {
                this.dtOptions = this.globalFuntion.iniciar_table();
                this.dataList = true;
                this.listHours = response[0];
                this.dtTrigger.next();
            });
    }

    // tslint:disable-next-line:variable-name
    exportar_excel(cod_user, nombre, id_card) {
        // tslint:disable-next-line:variable-name
        const json_arreglo = [];
        // tslint:disable-next-line:variable-name
        const optins_table = [];
        this.serviceApi.reportHoursUser(cod_user)
            .subscribe((response) => {
                // @ts-ignore
                if (response.length > 0) {
                    // @ts-ignore
                    response.forEach((keys: any) => {
                        // tslint:disable-next-line:variable-name
                        const valores_new = {
                            'Fecha Reporte': keys.select_hours,
                            'Hora Inicia': keys.start_time,
                            'Hora Final': keys.final_hour,
                            Iniciativa: keys.initiative,
                            'Detalle Actividad': keys.activity_detail,
                            Actividad: keys.actividad,
                            'Lugar Actividad': keys.address
                        };
                        json_arreglo.push(valores_new);
                        optins_table.push({wch: '20'});
                    });
                    this.globalFuntion.exportExcelFile([json_arreglo], nombre, id_card, optins_table);
                } else {
                    this.globalFuntion.swalTimmer('warning', 'El usuario no ha registrado horas', 1500);
                }
            });

    }

    doRefresh(event) {
        this.dataList = false;
        setTimeout(() => {
            this.listarUsuarios();
            event.target.complete();
        }, 2000);
    }


}
