import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-network-main-cards',
  imports: [CommonModule],
  templateUrl: './network-main-cards.component.html',
  styleUrl: './network-main-cards.component.css',
})
export class NetworkMainCardsComponent {
  cards = [
    {
      icon: '/nw/nw_cards_img/nc1.png',
      title: 'Diverse Product Portfolio',
      description:
        'Gain access to an extensive range of products tailored to diverse client needs.',
    },
    {
      icon: '/nw/nw_cards_img/nc2.png',
      title: 'Tailored Marketing Support',
      description:
        'Leverage personalized marketing support to enhance your brand visibility and attract a wider clientele.',
    },
    {
      icon: '/nw/nw_cards_img/nc3.png',
      title: 'Community Collaboration',
      description:
        'Join a supportive community of like minded professionals, fostering collaboration and knowledge sharing.',
    },
    {
      icon: '/nw/nw_cards_img/nc4.png',
      title: 'Competitive Commissions',
      description:
        'Experience transparent and competitive commission structures, ensuring that your hard work is duly rewarded.',
    },
    {
      icon: '/nw/nw_cards_img/nc5.png',
      title: 'Compliance Framework',
      description:
        'Rely on a cutting edge compliance framework that not only meets regulatory standards but exceeds them.',
    },
    {
      icon: '/nw/nw_cards_img/nc6.png',
      title: 'Innovative Technology Integration',
      description:
        'Benefit from state of the art CRM systems and technology tools that streamline your processes, enhance efficiency.',
    },
  ];
}
