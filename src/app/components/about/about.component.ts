import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  developer = {
    name: 'Sneha G',
    role: 'Full Stack Developer',
    bio: 'Passionate about creating meaningful applications that solve real-world problems and help communities connect.',
    email: 'sneha@example.com',
    skills: [
      'Angular', 'TypeScript', 'JavaScript', 
      'HTML/CSS', 'Node.js', 'REST APIs',
      'Responsive Design', 'Git'
    ],
    social: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    }
  };

  projectInfo = {
    purpose: 'This Lost & Found application was created to demonstrate modern web development practices while addressing a real community need.',
    technologies: [
      { name: 'Angular 18', description: 'Modern web framework for building dynamic applications' },
      { name: 'TypeScript', description: 'Type-safe development with enhanced IDE support' },
      { name: 'RxJS', description: 'Reactive programming for handling async operations' },
      { name: 'Angular Router', description: 'Navigation and routing management' },
      { name: 'Reactive Forms', description: 'Form handling with validation' }
    ],
    vision: 'To create a user-friendly platform that helps reunite people with their lost belongings through community collaboration.'
  };
}
