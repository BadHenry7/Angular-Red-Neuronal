import { Component } from '@angular/core';
import { NavbarindexComponent } from '../../../../Componentes/navbarindex/navbarindex.component';
import { CommonModule } from '@angular/common';//Para usar ngIf o ngFor


@Component({
  selector: 'app-create',
  imports: [NavbarindexComponent, CommonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
v_same_password: string=''
passwordInsegura:string=''


}
