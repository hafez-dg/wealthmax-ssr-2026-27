import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface CardModel {
  image: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
})
export class CardsComponent {
  @Input() cards!: CardModel[];
}
