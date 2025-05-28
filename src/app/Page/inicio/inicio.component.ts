import { Component } from '@angular/core';
import {FooterComponent} from '../../Components/footer/footer.component'
import {NavbarIndexComponent} from '../../Components/navbar-index/navbar-index.component'
import { CommonModule } from '@angular/common'; //Para usar ngIf o ngFor

@Component({
  selector: 'app-inicio',
  imports: [FooterComponent,NavbarIndexComponent, CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
p: number = 4;

// nsame(s:string) {
// let p_2: number = 4;
  
// }  

}
