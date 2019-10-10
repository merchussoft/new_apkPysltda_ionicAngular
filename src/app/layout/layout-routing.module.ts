import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [{
    path: '',
    component: LayoutComponent,
    children: [
        // { path: '', redirectTo: 'home', pathMatch: 'prefix' },
        { path: 'principal', loadChildren: () => import('./principal/principal.module').then( m => m.PrincipalModule)}
    ]
}];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
