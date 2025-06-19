import { Component } from '@angular/core';
import {FooterComponent} from '../../Componentes/footer/footer.component'
import { NavbarindexComponent } from '../../Componentes/navbarindex/navbarindex.component';

declare const L: any;
@Component({
  selector: 'app-ubicaciones',
  imports: [FooterComponent, NavbarindexComponent],
  templateUrl: './ubicaciones.component.html',
  styleUrl: './ubicaciones.component.css'
})
export class UbicacionesComponent {
  
  ngOnInit(): void {
    const map = L.map('map').setView([10.960658, -74.801816], 16);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    const marker1 = L.marker([10.960658, -74.801816]).addTo(map);
    const circle1 = L.circle([10.960658, -74.801816], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 50,
    }).addTo(map);

    const marker2 = L.marker([10.962032, -74.794501]).addTo(map);
    const circle2 = L.circle([10.962032, -74.794501], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 50,
    }).addTo(map);

    marker1.bindPopup('Hospital Nazareth').openPopup();
    marker2.bindPopup('Paso la 21');

    const onMapClick = (e: any) => {
      alert('Ubicación ' + e.latlng.toString());
    };

    map.on('click', onMapClick);
  }
}
