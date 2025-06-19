import { Routes } from '@angular/router';
import {LoginComponent} from '../app/Page/login/login.component'
import {InicioComponent} from '../app/Page/inicio/inicio.component'
import {ReportesComponent} from '../app/Page/reportes/reportes.component'
import {CreateComponent} from '../app/Page/gestionuser/create/create.component'
import {ConsultarComponent} from '../app/Page/gestionuser/consultar/consultar.component'
import {GestioncitaComponent} from '../app/Page/gestioncita/gestioncita.component'
import {IncapacidadComponent} from '../app/Page/incapacidad/incapacidad.component'
import {DashboardComponent} from '../app/Page/dashboard/dashboard.component'
import {DefaultComponent} from '../app/Page/default/default.component'
import {UbicacionesComponent} from '../app/Page/ubicaciones/ubicaciones.component'


export const routes: Routes = [ 
    {path: '', component: InicioComponent},
    {path: 'Login', component: LoginComponent},
    {path: 'reportes', component: ReportesComponent},
    {path: 'gestionuser/create', component: CreateComponent},
    {path: 'gestionuser/consultar', component: ConsultarComponent},

    {path: 'gestioncita', component: GestioncitaComponent},
    {path: 'incapacidad', component: IncapacidadComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'ubicaciones', component: UbicacionesComponent},




    {path: '**', component: DefaultComponent},


   // {path: '**', redirectTo: '', pathMatch: 'full'}
    
];
