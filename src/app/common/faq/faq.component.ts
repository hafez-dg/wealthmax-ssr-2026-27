import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-faq',
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css',
})
export class FaqComponent {
  @Input() faqs: { question: string; answer: string }[] = [];
  selectedFaq: number | null = null;

  toggleFaq(index: number): void {
    this.selectedFaq = this.selectedFaq === index ? null : index;
  }
}
