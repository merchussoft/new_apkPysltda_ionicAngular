import {NgModule} from '@angular/core';
import { CommonModule} from '@angular/common';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import {LayoutRoutingModule} from './layout-routing.module';
import {LayoutComponent} from './layout.component';

import {DataTableDirective} from 'angular-datatables';
import {NgxSpinnerModule} from 'ngx-spinner';
import {FormsModule} from '@angular/forms';
import {NgFallimgModule} from 'ng-fallimg';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import { Camera} from '@ionic-native/camera/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FileTransfer} from '@ionic-native/file-transfer/ngx';


@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        IonicModule.forRoot(),
        NgxSpinnerModule,
        FormsModule,
        NgFallimgModule.forRoot({
            default: '/assets/imageUser/user.png'
        }),
        AngularFontAwesomeModule
    ],
    providers: [
        DataTableDirective,
        LocalNotifications,
        Camera,
        FilePath,
        WebView,
        FileTransfer
    ],
    declarations: [LayoutComponent]
})
export class LayoutModule {}
