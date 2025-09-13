//import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-slide',
  imports: [CommonModule, FormsModule],
  templateUrl: './slide.component.html',
  styleUrl: './slide.component.css'
})

export class SlideComponent implements OnInit, OnDestroy {

  slides = [
    {
      image: '/assess/GestionMedica.jpg',
      caption: 'Accede a todos tus antecedentes médicos en un solo lugar de manera segura..'
    },
    {
      image: '/assess/Citas.png',
      caption: 'Obtén una evaluación de nuestros especialistas para mayor tranquilidad.'
    },
    {
      image: '/assess/Cerebro.jpg',
      caption: 'Nuestra IA mejora constantemente para brindarte diagnósticos cada vez más precisos..'
    }
  ];

  currentIndex = 0;
  private intervalId: any;

  ngOnInit(): void {
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  prevSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }

  getNextIndex(i: number): number {
    return (i + 1) % this.slides.length;
  }

  getPrevIndex(i: number): number {
    return (i - 1 + this.slides.length) % this.slides.length;
  }

  startAutoplay(): void {
    this.intervalId = setInterval(() => this.nextSlide(), 5000);
  }

  stopAutoplay(): void {
    clearInterval(this.intervalId);
  }
}