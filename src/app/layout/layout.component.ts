import {Component, OnInit} from '@angular/core';
import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {NavController} from '@ionic/angular';
import {ServiceloginService} from '../api/servicelogin.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
    public nameLastname;
    public email;
    public image;
    public perfil;
    public appPages: any;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        public navCtrl: NavController,
        private serviceApi: ServiceloginService,
        private spinner: NgxSpinnerService
    ) {
        this.appPages = [];
        this.initializeApp();
        this.perfil = localStorage.getItem('perfil');
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
        this.spinner.show();
        setTimeout(() => {
            localStorage.clear();
            this.navCtrl.navigateForward('/home');
            this.spinner.hide();
        }, 2000);
    }

    routers() {
        this.serviceApi.routes(this.perfil)
            .subscribe((routers) => {
                // @ts-ignore
                if (routers.validate) {
                    // @ts-ignore
                    routers.datos_url.forEach(value => {
                        this.appPages = [{title: value.name, url: '/' + value.name, icon: value.icon}];
                    });
                }

            });
    }

}
