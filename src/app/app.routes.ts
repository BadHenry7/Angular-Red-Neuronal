import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

//Aca paginas sin inicio de  sesion
import { InicioComponent } from '../app/Page/inicio/inicio.component'
import { AcercaDeComponent } from './Page/acerca-de/acerca-de.component';
import { SaludComponent } from './Page/salud/salud.component';
import { UbicacionesComponent } from '../app/Page/ubicaciones/ubicaciones.component'
import { LoginComponent } from '../app/Page/login/login.component'
import { RegistrarComponent } from './Page/registrar/registrar.component';
import { DefaultComponent } from '../app/Page/default/default.component'
import { GoogleComponent } from './Componentes/google/google.component';
import { MicrosoftComponent } from './Componentes/microsoft/microsoft.component'
import { CompletarInformacionComponent } from './Page/completar-informacion/completar-informacion.component';
import { TerminosCondicionesComponent } from './Componentes/terminos-condiciones/terminos-condiciones.component';

//Paciente
import { PacientePrincipalComponent } from '../app/Page/Pacientes/paciente-principal/paciente-principal.component'
import { IncapacidadComponent } from '../app/Page/Pacientes/incapacidad/incapacidad.component'
import { ReportesPacienteComponent } from '../app/Page/Pacientes/reportes-paciente/reportes-paciente.component'
import { CitasComponent } from './Page/Pacientes/citas/citas.component';
import { VerCitasComponent } from './Page/Pacientes/ver-citas/ver-citas.component';
import { AsistenteVirtualComponent } from './Page/Pacientes/asistente-virtual/asistente-virtual.component';
import { MovilComponent } from './movil/movil.component';
//Doctor
import { DoctorPrincipalComponent } from '../app/Page/Doctor/doctor-principal/doctor-principal.component'
import { CitasMedicasComponent } from '../app/Page/Doctor/citas-medicas/citas-medicas.component'
import { ReportesMedicoComponent } from "../app/Page/Doctor/reportes-medico/reportes-medico.component";
import { BotciComponent } from "../app/Page/Doctor/botci/botci.component";
import { HistorialClinicoComponent } from './Page/Doctor/historial-clinico/historial-clinico.component';

//Administrador
import { AdministradorPrincipalComponent } from '../app/Page/Administrador/administrador-principal/administrador-principal.component'
import { CreateComponent } from '../app/Page/Administrador/gestionuser/create/create.component'
import { ConsultarComponent } from '../app/Page/Administrador/gestionuser/consultar/consultar.component'
import { CreateCitaComponent } from './Page/Administrador/gestioncita/create-cita/create-cita.component';
import { ConsultarCitaComponent } from './Page/Administrador/gestioncita/consultar-cita/consultar-cita.component';
import { RegisMedicosComponent } from './Page/Administrador/Doctor_adm/regis-medicos/regis-medicos.component';
import { BuscarMedicosComponent } from './Page/Administrador/Doctor_adm/buscar-medicos/buscar-medicos.component';
import { ReportesComponent } from './Page/Administrador/reportes/reportes.component'
import { DashboardComponent } from './Page/Administrador/dashboard/dashboard.component'
import { RolesComponent } from './Page/Administrador/roles/roles.component';
import { MarcoLegalComponent } from './Componentes/marco-legal/marco-legal.component';
import { AsistenteVirtualMovilComponent } from './Page/Pacientes/asistente-virtual-movil/asistente-virtual-movil.component';
import { OlvidePasswordComponent } from './Page/olvide-password/olvide-password.component';




export const routes: Routes = [

  //Aca paginas sin inicio de  sesion
  { path: '', component: InicioComponent },
  { path: 'acerca_de', component: AcercaDeComponent },
  { path: 'salud', component: SaludComponent },
  { path: 'ubicaciones', component: UbicacionesComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'registrar', component: RegistrarComponent },
  { path: 'completar_informacion', component: CompletarInformacionComponent },
  { path: 'terminos', component: TerminosCondicionesComponent },
  { path: 'marcoLegal', component: MarcoLegalComponent },
  { path: 'OlvidaPassword', component: OlvidePasswordComponent},


  //Aca paginas Paciente
  { path: 'pacientes/principal', component: PacientePrincipalComponent, canActivate: [AuthGuard]  },
  { path: 'pacientes/incapacidad', component: IncapacidadComponent, canActivate: [AuthGuard] },
  { path: 'pacientes/reportes', component: ReportesPacienteComponent, canActivate: [AuthGuard] },
  { path: 'pacientes/citas', component: CitasComponent, canActivate: [AuthGuard] },
  { path: 'pacientes/ver_citas', component: VerCitasComponent, canActivate: [AuthGuard] },
  { path: 'pacientes/AsistenteVirtual', component: AsistenteVirtualComponent , canActivate: [AuthGuard]},
  { path: 'chat-mobile', component: AsistenteVirtualMovilComponent , canActivate: [AuthGuard]},



  //Aca Rol medico
  { path: 'doctor/principal', component: DoctorPrincipalComponent, canActivate: [AuthGuard] },
  { path: 'doctor/citas_medico', component: CitasMedicasComponent , canActivate: [AuthGuard]},
  { path: 'doctor/reportes', component: ReportesMedicoComponent, canActivate: [AuthGuard] },
  { path: 'doctor/smartbot', component: BotciComponent , canActivate: [AuthGuard]},
  { path: 'medico_vista/historial_clinico', component: HistorialClinicoComponent , canActivate: [AuthGuard]},

  //Aca Rol Administrador
  { path: 'administrador/principal', component: AdministradorPrincipalComponent , canActivate: [AuthGuard]},

  { path: 'administrador/gestionuser/create', component: CreateComponent },
  { path: 'administrador/gestionuser/consultar_user', component: ConsultarComponent , canActivate: [AuthGuard]},

  { path: 'administrador/gestioncita/create_cita', component: CreateCitaComponent , canActivate: [AuthGuard]},
  { path: 'administrador/gestioncita/consultar_cita', component: ConsultarCitaComponent , canActivate: [AuthGuard]},
  { path: 'administrador/Doctor_adm/regis_medicos', component: RegisMedicosComponent , canActivate: [AuthGuard]},
  { path: 'administrador/Doctor_adm/buscar_medicos', component: BuscarMedicosComponent , canActivate: [AuthGuard]},

  { path: 'administrador/dasboard', component: DashboardComponent , canActivate: [AuthGuard]},
  { path: 'administrador/reportes', component: ReportesComponent , canActivate: [AuthGuard]},
  { path: 'administrador/dashboard', component: DashboardComponent , canActivate: [AuthGuard]},
  { path: 'administrador/create_rol', component: RolesComponent , canActivate: [AuthGuard]},



  //Vista main


  { path: 'vista_main/Usuario/Crear_usuario', component: CreateComponent , canActivate: [AuthGuard]},
  { path: 'vista_main/Usuario/Buscar_usuario', component: ConsultarComponent , canActivate: [AuthGuard]},

  { path: 'vista_main/Citas_medicas/crear_citas', component: CreateCitaComponent , canActivate: [AuthGuard]},
  { path: 'vista_main/Citas_medicas/buscar_citas', component: ConsultarCitaComponent , canActivate: [AuthGuard]},
  { path: 'vista_main/Doctor_adm/regis_medicos', component: RegisMedicosComponent , canActivate: [AuthGuard]},
  { path: 'vista_main/Doctor_adm/buscar_medicos', component: BuscarMedicosComponent , canActivate: [AuthGuard]},


  { path: 'vista_main/Reportes', component: ReportesComponent , canActivate: [AuthGuard]},
  { path: 'vista_main/Dashboard', component: DashboardComponent , canActivate: [AuthGuard]},




  ///GoogleLogin
  { path: 'GoogleLogin', component: GoogleComponent },
  { path: 'MicrosoftLogin', component: MicrosoftComponent },


  //Movil
  { path: 'movil', component: MovilComponent },



  { path: '**', component: DefaultComponent },





];
