import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RegistrohorasRoutingModule} from './registrohoras-routing.module';
import {RegistrohorasComponent} from './registrohoras.component';
import {IonicModule} from '@ionic/angular';
import {MatTableModule} from '@angular/material';
import {DataTablesModule} from 'angular-datatables';
import {FormsModule} from '@angular/forms';
import {NgxSpinnerModule} from 'ngx-spinner';

@NgModule({
    imports: [CommonModule, RegistrohorasRoutingModule, IonicModule, MatTableModule, DataTablesModule, FormsModule, NgxSpinnerModule],
    declarations: [RegistrohorasComponent]
})
export class RegistrohorasModule {}
