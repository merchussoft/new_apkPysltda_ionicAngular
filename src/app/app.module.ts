import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {InterceptorService} from './api/interceptor.service';
import {FormsModule} from '@angular/forms';
import {ServiceloginService} from './api/servicelogin.service';
import {IonicStorageModule} from '@ionic/storage';
import {Network} from '@ionic-native/network/ngx';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxSpinnerModule } from 'ngx-spinner';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileTransfer} from '@ionic-native/file-transfer/ngx';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        IonicStorageModule.forRoot(),
        NgxDatatableModule,
        NgxSpinnerModule,
        BrowserAnimationsModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        ServiceloginService,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {
            provide: HTTP_INTERCEPTORS,
            useClass: InterceptorService,
            multi: true
        },
        Network,
        File,
        FileOpener,
        FileTransfer
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
