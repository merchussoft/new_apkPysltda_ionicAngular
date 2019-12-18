import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PerfilComponent} from './perfil.component';
import {PerfilRoutingModule} from './perfil-routing.module';

import {IonicModule} from '@ionic/angular';
import {MatTableModule} from '@angular/material';
import {DataTablesModule} from 'angular-datatables';
import {FormsModule} from '@angular/forms';
import {NgxSpinnerModule} from 'ngx-spinner';
import {AngularFontAwesomeModule} from 'angular-font-awesome';


@NgModule({
    imports: [
        CommonModule,
        PerfilRoutingModule,
        IonicModule,
        MatTableModule,
        DataTablesModule,
        FormsModule,
        NgxSpinnerModule,
        AngularFontAwesomeModule
    ],
    declarations: [PerfilComponent]
})
export class PerfilModule {}
