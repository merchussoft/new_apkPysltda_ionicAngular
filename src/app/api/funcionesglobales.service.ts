import {Injectable} from '@angular/core';
import {LoadingController, ToastController, ModalController} from '@ionic/angular';
import Swal from 'sweetalert2';
import * as FileSaver from 'file-saver';
import {saveAs} from 'file-saver';
import * as XLSX from 'xlsx';
import {File} from '@ionic-native/file/ngx';
import {FileOpener} from '@ionic-native/file-opener/ngx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_TYPE_OPENER = 'application/vnd.ms-excel';
// const EXCEL_TYPE = 'application/octet-stream';
const EXCEL_EXTENSION = '.xlsx';
import {FileTransfer, FileUploadOptions, FileTransferObject} from '@ionic-native/file-transfer/ngx';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';

// const EXCEL_EXTENSION = '.csv';

@Injectable({
    providedIn: 'root'
})
export class FuncionesglobalesService {

    constructor(
        public loadingCtrl: LoadingController,
        public toastController: ToastController,
        public file: File,
        private fileOpener: FileOpener,
        private transfer: FileTransfer,
        private localNotifications: LocalNotifications,
        private modalController: ModalController
    ) {
    }

    async loadings(menssage: string = '') {
        return await this.loadingCtrl.create({
            message: menssage,
            spinner: 'lines',
            mode: 'ios'
        });
    }

    swalTimmer(types, message, timmer) {
        return Swal.fire({
            type: types,
            title: message,
            showConfirmButton: false,
            timer: timmer
        });
    }

    swalConfirm(titulo: string, mensaje: string, mensajebuttonconfirm: string, mensajebuttoncancel: string, icono: string) {
        return Swal.fire({
            title: titulo,
            text: mensaje,
            // @ts-ignore
            type: icono,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: mensajebuttonconfirm,
            cancelButtonText: mensajebuttoncancel
        });
    }

    async alertToast(menssage, colors, durations, positions) {
        const toast = await this.toastController.create({
            message: menssage,
            color: colors,
            position: positions,
            duration: durations,
            mode: 'ios'
        });
        toast.present();
    }

    iniciar_table() {
        return {
            pagingType: 'simple_numbers',
            pageLength: 5,
            // processing: true,
            lengthMenu: [[5, 10, 30, 50, -1], [5, 10, 30, 50, 'All']],
            order: [[1, 'asc']],
            columnDefs: [{className: 'dt-center', targets: '_all'}],
            scrollX: true,
            searching: true,
            ordering: false,
            responsive: true,
            language: {
                info: 'Pagina _PAGE_ de _PAGES_'
            }
        };
    }

    // tslint:disable-next-line:variable-name
    exportExcelFile(json: any = [], excelFileName: string = '', nombre = '', option_table: any = []) {
        // tslint:disable-next-line:variable-name
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json[0]);
        const workbook: XLSX.WorkBook = {Sheets: {}, SheetNames: []};
        workbook.SheetNames.push(nombre);
        workbook.Sheets[nombre] = worksheet;

        const wscols = [option_table];
        worksheet['!cols'] = wscols[0];
        const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', bookSST: false, type: 'binary'});
        this.saveAsExcelFile(excelBuffer, excelFileName);
    }

    private saveAsExcelFile(buffer: any, filename: string): void {
        const data: Blob = new Blob([this.s2ab(buffer)], {type: EXCEL_TYPE});
        this.getStoragePath().then((url) => {
            // @ts-ignore
            this.file.writeExistingFile(url, filename + EXCEL_EXTENSION, data, true).then(() => {
                this.fileOpener.showOpenWithDialog(url + filename + EXCEL_EXTENSION, EXCEL_TYPE_OPENER);
            }).catch(() => {
                alert('error creating file at :' + url);
            });
        });
    }

    s2ab(s) {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        // tslint:disable-next-line:triple-equals no-bitwise
        for (let i = 0; i != s.length; ++i) {
            view[i] = s.charCodeAt(i) & 0xFF;
        }
        return buf;
    }

    getStoragePath() {
        return this.file.resolveDirectoryUrl(this.file.externalRootDirectory).then((directoryEntry) => {
            return this.file.getDirectory(directoryEntry, 'ReportHorsPysltda', {
                create: true, exclusive: false
            }).then(() => {
                return directoryEntry.nativeURL + 'ReportHorsPysltda/';
            });
        });
    }

    notificacionHoras(horas: number , mensaje: string) {
        const datatime = new Date();
        // tslint:disable-next-line:variable-name
        let dias_mes = new Date(datatime.getFullYear(), datatime.getMonth() + 1, 0).getDate();
        // tslint:disable-next-line:variable-name
        let cantidad_dias = dias_mes - datatime.getDate();

        // console.log('mirando algo ==> ', horas);
        if (cantidad_dias < 15 && !horas) {
            this.localNotifications.schedule({
                title: 'Reporte de horas',
                text: mensaje,
                foreground: true,
                vibrate: true,
                // trigger: { at: new Date(new Date().getTime() + 3600) },
                led: { color: '#FFFFFF', on: 500, off: 500 },
                sound: null
            });
        }
    }

    async presentModal(templateModal) {
        return await this.modalController.create({
            component: templateModal
        });
    }

}
