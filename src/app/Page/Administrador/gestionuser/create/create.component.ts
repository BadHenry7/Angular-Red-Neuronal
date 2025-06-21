import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';//Para usar ngIf o ngFor
import { NavbarAdministradorComponent } from '../../../../Componentes/navbar-administrador/navbar-administrador.component';


@Component({
  selector: 'app-create',
  imports: [NavbarAdministradorComponent, CommonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
v_same_password: string=''
passwordInsegura:string=''


}
