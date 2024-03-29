import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [{
    path: '',
    component: LayoutComponent,
    children: [
        // { path: '', redirectTo: 'home', pathMatch: 'prefix' },
        { path: 'principal', loadChildren: () => import('./principal/principal.module').then( m => m.PrincipalModule)},
        { path: 'principal_admin', loadChildren: () => import('./principaladmin/principaladmin.module').then( m => m.PrincipaladminModule)}
    ]
}];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
