import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PrincipaladminComponent} from './principaladmin.component';
import {PrincipaladminRoutingModule} from './principaladmin-routing.module';
import {IonicModule} from '@ionic/angular';
import {MatTableModule} from '@angular/material';
import {DataTablesModule} from 'angular-datatables';

@NgModule({
    imports: [CommonModule, PrincipaladminRoutingModule, IonicModule, MatTableModule, DataTablesModule],
    declarations: [PrincipaladminComponent]
})

export class PrincipaladminModule {
}
