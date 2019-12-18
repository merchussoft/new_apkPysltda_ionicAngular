import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RegistrohorasRoutingModule} from './registrohoras-routing.module';
import {RegistrohorasComponent} from './registrohoras.component';
import {IonicModule} from '@ionic/angular';
import {MatTableModule} from '@angular/material';
import {DataTablesModule} from 'angular-datatables';

@NgModule({
    imports: [CommonModule, RegistrohorasRoutingModule, IonicModule, MatTableModule, DataTablesModule],
    declarations: [RegistrohorasComponent]
})
export class PrincipalModule {}
