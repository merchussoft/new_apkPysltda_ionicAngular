import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PrincipalRoutingModule} from './principal-routing.module';
import {PrincipalComponent} from './principal.component';
import {IonicModule} from '@ionic/angular';
import {MatTableModule} from '@angular/material';
import {DataTablesModule} from 'angular-datatables';

@NgModule({
    imports: [CommonModule, PrincipalRoutingModule, IonicModule, MatTableModule, DataTablesModule],
    declarations: [PrincipalComponent]
})
export class PrincipalModule {}
