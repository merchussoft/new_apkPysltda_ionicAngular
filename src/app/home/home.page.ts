import {Component} from '@angular/core';
import {ServiceloginService} from '../api/servicelogin.service';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {NavController, Platform, LoadingController} from '@ionic/angular';
import {FuncionesglobalesService} from '../api/funcionesglobales.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    constructor(
        public api: ServiceloginService,
        private route: Router,
        public storage: Storage,
        public loadingCtrl: LoadingController,
        public navCtrl: NavController,
        public functionGlobales: FuncionesglobalesService,
        private spinner: NgxSpinnerService,
        public platform: Platform
    ) {

    }

    logins = {
        usuario: '',
        password: ''
    };

    submitLogin() {
        // this.functionGlobales.loadings('Please wait..');
        let imagen = '/assets/imageUser/user.png';
        this.spinner.show();
        this.api.login(this.logins)
            .subscribe((response) => {
                // @ts-ignore
                if (response.validate) {
                    this.logins = {usuario: '', password: ''};
                    localStorage.setItem('nombre', response[0][0].name);
                    localStorage.setItem('lastname', response[0][0].lastname);
                    localStorage.setItem('email', response[0][0].email);
                    // tslint:disable-next-line:no-unused-expression
                    (response[0][0].image !== '') ? imagen = response[0][0].image : imagen;
                    localStorage.setItem('image', imagen);
                    localStorage.setItem('code', response[0][0].cod_data_user);
                    localStorage.setItem('code_user', response[0][0].cod_user);
                    localStorage.setItem('id_card', response[0][0].id_card);
                    localStorage.setItem('profile', response[0][0].cod_profile);
                    setTimeout(() => {
                        this.spinner.hide();
                        if (response[0][0].cod_profile === '1') {
                            this.navCtrl.navigateForward('/principal_admin');
                        } else {
                            this.navCtrl.navigateForward('/principal');
                        }
                    }, 2000);

                } else {
                    this.functionGlobales.alertToast(response['mensaje'], 'danger', 1000, 'middle');
                    this.spinner.hide();
                    this.logins = {usuario: '', password: ''};
                }
            });
    }

}

