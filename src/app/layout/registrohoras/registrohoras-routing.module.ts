import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RegistrohorasComponent} from './registrohoras.component';

const routes: Routes = [
    {
        path: '',
        component: RegistrohorasComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class RegistrohorasRoutingModule {}
