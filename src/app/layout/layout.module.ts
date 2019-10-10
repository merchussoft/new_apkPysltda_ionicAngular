import {NgModule} from '@angular/core';
import { CommonModule} from '@angular/common';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import {LayoutRoutingModule} from './layout-routing.module';
import {LayoutComponent} from './layout.component';

import {DataTableDirective} from 'angular-datatables';
import {NgxSpinnerModule} from 'ngx-spinner';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        IonicModule.forRoot(),
        NgxSpinnerModule,
    ],
    providers: [
        DataTableDirective
    ],
    declarations: [LayoutComponent]
})
export class LayoutModule {}
