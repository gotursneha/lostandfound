import { Component, OnInit } from '@angular/core';
import { ItemService, ItemReport } from '../../services/item.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-view-items',
  templateUrl: './view-items.component.html',
  styleUrls: ['./view-items.component.css']
})
export class ViewItemsComponent implements OnInit {
  lostItems: ItemReport[] = [];
  foundItems: ItemReport[] = [];
  reunitedLostItems: ItemReport[] = [];
  reunitedFoundItems: ItemReport[] = [];
  activeTab: 'lost' | 'found' | 'reunited' = 'lost';
  loading = false;
  errorMessage = '';
  isAdmin = false;

  constructor(
    private itemService: ItemService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.loadItems();
  }

  loadItems(): void {
    this.loading = true;
    
    this.itemService.getLostItems().subscribe({
      next: (response) => {
        if (response.success) {
          this.lostItems = response.items.filter(item => item.status === 'active');
          this.reunitedLostItems = response.items.filter(item => item.status === 'resolved');
        }
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = error.message || 'Error loading lost items';
        this.loading = false;
      }
    });

    this.itemService.getFoundItems().subscribe({
      next: (response) => {
        if (response.success) {
          this.foundItems = response.items.filter(item => item.status === 'active');
          this.reunitedFoundItems = response.items.filter(item => item.status === 'resolved');
        }
      },
      error: (error) => {
        this.errorMessage = error.message || 'Error loading found items';
      }
    });
  }

  setActiveTab(tab: 'lost' | 'found' | 'reunited'): void {
    this.activeTab = tab;
  }

  get displayedItems(): ItemReport[] {
    if (this.activeTab === 'lost') return this.lostItems;
    if (this.activeTab === 'found') return this.foundItems;
    return [...this.reunitedLostItems, ...this.reunitedFoundItems];
  }

  get reunitedCount(): number {
    return this.reunitedLostItems.length;
  }

  logout(): void {
    this.authService.logout();
  }
}
