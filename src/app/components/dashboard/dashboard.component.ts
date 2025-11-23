import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;
  lostItemsCount = 0;
  foundItemsCount = 0;
  reunitedCount = 0;
  isAdmin = false;

  constructor(
    private authService: AuthService,
    private itemService: ItemService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      this.isAdmin = this.authService.isAdmin();
      if (!user) {
        this.router.navigate(['/login']);
      }
    });
    
    this.loadItemCounts();
  }

  loadItemCounts(): void {
    this.itemService.getLostItems().subscribe({
      next: (response) => {
        if (response.success) {
          const activeItems = response.items.filter(item => item.status === 'active');
          const resolvedItems = response.items.filter(item => item.status === 'resolved');
          this.lostItemsCount = activeItems.length;
          this.reunitedCount = resolvedItems.length; // Count resolved lost items as reunited
        }
      },
      error: (error) => console.error('Error loading lost items:', error)
    });

    this.itemService.getFoundItems().subscribe({
      next: (response) => {
        if (response.success) {
          const activeItems = response.items.filter(item => item.status === 'active');
          this.foundItemsCount = activeItems.length;
        }
      },
      error: (error) => console.error('Error loading found items:', error)
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
