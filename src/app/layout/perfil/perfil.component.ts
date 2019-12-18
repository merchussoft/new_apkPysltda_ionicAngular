import {Component, OnInit, TemplateRef} from '@angular/core';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {ActionSheetController, Platform, LoadingController} from '@ionic/angular';
import {PictureSourceType} from '@ionic-native/camera';
import {FilePath} from '@ionic-native/file-path/ngx';
import {File} from '@ionic-native/file/ngx';
import {WebView} from '@ionic-native/ionic-webview/ngx';
import {FileTransfer, FileUploadOptions, FileTransferObject} from '@ionic-native/file-transfer/ngx';
import {FuncionesglobalesService} from '../../api/funcionesglobales.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

    private image: any;
    private image2: any;
    public formPerfil = {};
    // tslint:disable-next-line:variable-name
    public codigo_usuario: any;
    // tslint:disable-next-line:variable-name
    public id_card: any;
    modalRef: BsModalRef;

    constructor(
        private camera: Camera,
        public actionSheetController: ActionSheetController,
        private filePath: FilePath,
        private plt: Platform,
        private file: File,
        private webview: WebView,
        private transfer: FileTransfer,
        private globalService: FuncionesglobalesService,
        private modalService: BsModalService
    ) {
        this.image = localStorage.getItem('image');
        this.codigo_usuario = localStorage.getItem('code_user');
        this.id_card = localStorage.getItem('id_card');
    }

    ngOnInit() {
    }

    async selectImage() {
        const actionSheet = await this.actionSheetController.create({
            header: 'Seleccionar fuente de la imagen',
            buttons: [
                {
                    text: 'Camara',
                    icon: 'camera',
                    handler: () => {
                        this.capturarFoto(this.camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'Galeria',
                    icon: 'images',
                    handler: () => {
                        this.capturarFoto(this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Cancelar',
                    icon: 'close',
                    role: 'cancel'
                }
            ]
        });
        await actionSheet.present();
    }

    async capturarFoto(sourcetype: PictureSourceType) {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            sourceType: sourcetype
        };

        this.camera.getPicture(options)
            .then((imageData) => {
                this.enviar(imageData);
            }, (error) => {
                console.log('mirando que trae el error => ', error);
            });
    }

    // tslint:disable-next-line:variable-name
    enviar(img_upload) {

        this.globalService.loadings('Cargando imagen ').then((loading) => {
            loading.present();


            const fileTransfer: FileTransferObject = this.transfer.create();

            const options: FileUploadOptions = {
                fileKey: 'image',
                fileName: this.id_card + '.jpg',
                chunkedMode: false,
                mimeType: 'image/jpeg',
                headers: {}
            };

            // tslint:disable-next-line:max-line-length
            fileTransfer.upload(img_upload, 'http://merchussoft.online/newwspysltda/public/api_pys/update_image_web?cod_user=' + this.codigo_usuario, options)
                .then((data) => {
                    loading.dismiss();
                    console.log(JSON.parse(data.response));
                    let response = JSON.parse(data.response);

                    if (response.validate) {
                        this.image = (<any> window).Ionic.WebView.convertFileSrc(img_upload);
                        localStorage.setItem('image', this.image);
                        this.globalService.swalTimmer('success', response.mensaje, 1500);
                    }

                    if (!response.validate) {
                        this.globalService.swalTimmer('error', response.mensaje, 1500);
                    }
                }, (error) => {
                    console.log('mirando el error que no envia a dubir la foto ==> ', error);
                });

        });
    }

    submitPerfil() {

    }

    modalCambioPass(template_cambioPassword: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template_cambioPassword);
    }

}
