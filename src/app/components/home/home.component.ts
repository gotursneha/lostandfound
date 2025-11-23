import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  scrollToHow(): void {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  }

  features = [
    {
      icon: '📝',
      title: 'Report Lost Items',
      description: 'Easily report items you\'ve lost with detailed descriptions and locations'
    },
    {
      icon: '🔍',
      title: 'Search Database',
      description: 'Browse through our comprehensive database of found items'
    },
    {
      icon: '📦',
      title: 'Report Found Items',
      description: 'Help others by reporting items you\'ve found'
    },
    {
      icon: '🤝',
      title: 'Connect & Reunite',
      description: 'Get matched with your belongings and arrange safe returns'
    },
    {
      icon: '🔔',
      title: 'Smart Notifications',
      description: 'Receive alerts when items matching your description are found'
    },
    {
      icon: '🔒',
      title: 'Secure Platform',
      description: 'Your data and privacy are protected with industry-standard security'
    }
  ];

  howItWorks = [
    {
      step: '1',
      title: 'Create Account',
      description: 'Sign up for free and create your profile'
    },
    {
      step: '2',
      title: 'Report Item',
      description: 'Submit details about your lost or found item'
    },
    {
      step: '3',
      title: 'Get Matched',
      description: 'Our system finds potential matches automatically'
    },
    {
      step: '4',
      title: 'Reunite',
      description: 'Connect with the owner and arrange return'
    }
  ];
}
