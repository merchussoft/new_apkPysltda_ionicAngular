import {Component, OnInit} from '@angular/core';
import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {NavController} from '@ionic/angular';
import {ServiceloginService} from '../api/servicelogin.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {FuncionesglobalesService} from '../api/funcionesglobales.service';


@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
    public nameLastname;
    public email;
    public image;
    public code;
    public profile;
    public appPages: any;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        public navCtrl: NavController,
        private serviceApi: ServiceloginService,
        private spinner: NgxSpinnerService,
        private globalFunction: FuncionesglobalesService
    ) {
        this.appPages = [];
        this.initializeApp();
        this.code = localStorage.getItem('code');
        this.profile = localStorage.getItem('profile');
        this.routers();
        this.nameLastname = localStorage.getItem('nombre') + ' ' + localStorage.getItem('lastname');
        this.email = localStorage.getItem('email');
        this.image = localStorage.getItem('image');
    }

    ngOnInit() {
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }


    cerrarSesion() {
        this.globalFunction.swalConfirm('Cerrar sesion', '¿Desea salir de la aplicacion?', 'Aceptar', 'Cancelar', 'info')
            .then((result) => {
                if (result.value) {
                    localStorage.clear();
                    this.navCtrl.navigateRoot('/home');
                }
            });
    }

    routers() {
        this.serviceApi.routes(this.profile)
            .subscribe((routers) => {
                // @ts-ignore
                routers.datos_url.forEach(value => {
                    this.appPages.push({title: value.name, url: '/' + value.name, icon: value.icon});
                });
            });
    }




}
