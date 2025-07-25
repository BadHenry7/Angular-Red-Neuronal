import { Routes } from '@angular/router';

//Aca paginas sin inicio de  sesion
import {InicioComponent} from '../app/Page/inicio/inicio.component'
import {AcercaDeComponent} from './Page/acerca-de/acerca-de.component';
import {SaludComponent} from './Page/salud/salud.component';

import {UbicacionesComponent} from '../app/Page/ubicaciones/ubicaciones.component'
import {LoginComponent} from '../app/Page/login/login.component'
import { RegistrarComponent } from './Page/registrar/registrar.component';
import {DefaultComponent} from '../app/Page/default/default.component'
//Paciente
import {PacientePrincipalComponent} from '../app/Page/Pacientes/paciente-principal/paciente-principal.component'
import {IncapacidadComponent} from '../app/Page/Pacientes/incapacidad/incapacidad.component'
import {ReportesPacienteComponent} from '../app/Page/Pacientes/reportes-paciente/reportes-paciente.component'
import { CitasComponent } from './Page/Pacientes/citas/citas.component';
import { VerCitasComponent } from './Page/Pacientes/ver-citas/ver-citas.component';
//Doctor
import {DoctorPrincipalComponent} from '../app/Page/Doctor/doctor-principal/doctor-principal.component'
import {CitasMedicasComponent} from '../app/Page/Doctor/citas-medicas/citas-medicas.component'
import { ReportesMedicoComponent } from "../app/Page/Doctor/reportes-medico/reportes-medico.component";
import { BotciComponent } from "../app/Page/Doctor/botci/botci.component";
//Administrador
import {AdministradorPrincipalComponent} from '../app/Page/Administrador/administrador-principal/administrador-principal.component'
import {CreateComponent} from '../app/Page/Administrador/gestionuser/create/create.component'
import {ConsultarComponent} from '../app/Page/Administrador/gestionuser/consultar/consultar.component'
import { CreateCitaComponent } from './Page/Administrador/gestioncita/create-cita/create-cita.component';
import { ConsultarCitaComponent } from './Page/Administrador/gestioncita/consultar-cita/consultar-cita.component';
import { RegisMedicosComponent } from './Page/Administrador/Doctor_adm/regis-medicos/regis-medicos.component';
import { BuscarMedicosComponent } from './Page/Administrador/Doctor_adm/buscar-medicos/buscar-medicos.component';
import {ReportesComponent} from './Page/Administrador/reportes/reportes.component'
import {DashboardComponent} from './Page/Administrador/dashboard/dashboard.component'
import { RolesComponent } from './Page/Administrador/roles/roles.component';
import { HistorialClinicoComponent } from './Page/historial-clinico/historial-clinico.component';


export const routes: Routes = [ 

    //Aca paginas sin inicio de  sesion
    {path: '', component: InicioComponent},
    {path: 'acerca_de', component: AcercaDeComponent},
    {path: 'salud', component: SaludComponent},
    {path: 'ubicaciones', component: UbicacionesComponent},
    {path: 'Login', component: LoginComponent},
    {path: 'registrar', component: RegistrarComponent },
    
    
    
    //Aca paginas Paciente
    {path: 'pacientes/principal', component: PacientePrincipalComponent},
    {path: 'pacientes/incapacidad', component: IncapacidadComponent},
    {path: 'pacientes/reportes', component: ReportesPacienteComponent},
    {path: 'pacientes/citas', component: CitasComponent},
    {path: 'pacientes/ver_citas', component: VerCitasComponent},
    
    
    
    //Aca Rol medico
    {path: 'doctor/principal', component: DoctorPrincipalComponent},
    {path: 'doctor/citas_medico', component: CitasMedicasComponent},
    {path: 'doctor/reportes', component: ReportesMedicoComponent},
    {path: 'doctor/smartbot', component: BotciComponent},
    {path:'medico_vista/historial_clinico', component: HistorialClinicoComponent},
    
    //Aca Rol Administrador
    {path: 'administrador/principal', component: AdministradorPrincipalComponent},

    {path: 'administrador/gestionuser/create', component: CreateComponent},
    {path: 'administrador/gestionuser/consultar_user', component: ConsultarComponent},

    {path: 'administrador/gestioncita/create_cita', component: CreateCitaComponent},
    {path: 'administrador/gestioncita/consultar_cita', component: ConsultarCitaComponent},
    {path: 'administrador/Doctor_adm/regis_medicos', component: RegisMedicosComponent},
    {path: 'administrador/Doctor_adm/buscar_medicos', component: BuscarMedicosComponent},

    {path: 'administrador/dasboard', component: DashboardComponent},
    {path: 'administrador/reportes', component: ReportesComponent},
    {path: 'administrador/dashboard', component: DashboardComponent},
    {path: 'administrador/create_rol', component: RolesComponent},

    
    
    {path: '**', component: DefaultComponent},
    
    
];
