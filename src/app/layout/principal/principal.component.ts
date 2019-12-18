import {Component, OnInit} from '@angular/core';
import {ServiceloginService} from '../../api/servicelogin.service';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import {FuncionesglobalesService} from '../../api/funcionesglobales.service';

@Component({
    selector: 'app-principal',
    templateUrl: './principal.component.html',
    styleUrls: ['./principal.component.scss'],
})
export class PrincipalComponent implements OnInit {

    dtElement: DataTableDirective;
    dtTrigger: Subject<any> = new Subject();
    dtOptions: any = {};

    public listHours: any = [];
    public listanimation: any = Array(13).fill(1);
    public code: any;
    // tslint:disable-next-line:variable-name
    public name_excel: any;
    public dataList = false;
    public displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

    constructor(
        private serviceApi: ServiceloginService,
        private globalFuntion: FuncionesglobalesService
    ) {
        this.code = localStorage.getItem('code_user');
        this.name_excel = localStorage.getItem('nombre') + ' ' + localStorage.getItem('lastname');
    }

    ngOnInit() {
        this.relationHours();
    }

    relationHours() {
        this.serviceApi.reportHoursUser(this.code)
            .subscribe((response) => {
                this.dtOptions = this.globalFuntion.iniciar_table();
                this.dataList = true;
                this.listHours = response;
                this.dtTrigger.next();
                // @ts-ignore
                // this.globalFuntion.notificacionHoras(response.length, 'horas');
                // this.rerender();
            });
    }

    uploadExcel() {
        this.globalFuntion.swalTimmer('warning', 'pronto estara listo Cargar Excel', 2500);
    }

    // tslint:disable-next-line:variable-name
    downloadExcel() {
        // tslint:disable-next-line:variable-name
        const json_arreglo = [];
        // tslint:disable-next-line:variable-name
        const options_table = new Array();
        this.serviceApi.reportHoursUser(this.code)
            .subscribe((response) => {
                // @ts-ignore
                if (!response.length) {
                    this.globalFuntion.swalTimmer('warning', 'No se han registrado horas', 2500);
                    return false;
                }
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
                    options_table.push({wch: '20'});
                });
                this.globalFuntion.exportExcelFile([json_arreglo], this.name_excel, localStorage.getItem('id_card'), options_table);
            });
    }
}
