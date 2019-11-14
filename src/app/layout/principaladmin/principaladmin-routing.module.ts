import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PrincipaladminComponent} from './principaladmin.component';

const routes: Routes = [
    {
        path: '',
        component: PrincipaladminComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PrincipaladminRoutingModule {}
