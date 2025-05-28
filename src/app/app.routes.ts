import { Routes } from '@angular/router';
import {InicioComponent} from '../app/Page/inicio/inicio.component'
import {DefaultComponent} from '../app/Page/default/default.component'
import {AcercaDeComponent} from '../app/Page/acerca-de/acerca-de.component'
import {RegisterComponent} from '../app/Page/register/register.component'


export const routes: Routes = [ 
    {path: '', component: InicioComponent},
    {path: 'acerca-de', component: AcercaDeComponent},
    {path: 'register', component: RegisterComponent},

    {path: '**', component: DefaultComponent},


   // {path: '**', redirectTo: '', pathMatch: 'full'}
    
];
