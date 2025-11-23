import { Component, OnInit } from '@angular/core';
import { ItemService, ItemReport } from '../../services/item.service';
import { AuthService } from '../../services/auth.service';

interface Match {
  lostItem: ItemReport;
  foundItem: ItemReport;
  matchScore: number;
  matchReasons: string[];
}

@Component({
  selector: 'app-matching',
  templateUrl: './matching.component.html',
  styleUrls: ['./matching.component.css']
})
export class MatchingComponent implements OnInit {
  lostItems: ItemReport[] = [];
  foundItems: ItemReport[] = [];
  matches: Match[] = [];
  loading = false;
  errorMessage = '';
  selectedMatch: Match | null = null;
  showReuniteModal = false;
  isAdmin = false;

  constructor(
    private itemService: ItemService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.loadItemsAndMatch();
  }

  loadItemsAndMatch(): void {
    this.loading = true;
    
    Promise.all([
      this.itemService.getLostItems().toPromise(),
      this.itemService.getFoundItems().toPromise()
    ]).then(([lostResponse, foundResponse]) => {
      if (lostResponse?.success && foundResponse?.success) {
        this.lostItems = lostResponse.items.filter(item => item.status === 'active');
        this.foundItems = foundResponse.items.filter(item => item.status === 'active');
        this.findMatches();
      }
      this.loading = false;
    }).catch(error => {
      this.errorMessage = 'Error loading items for matching';
      this.loading = false;
    });
  }

  findMatches(): void {
    this.matches = [];
    
    for (const lostItem of this.lostItems) {
      for (const foundItem of this.foundItems) {
        const match = this.calculateMatch(lostItem, foundItem);
        if (match.matchScore > 0) {
          this.matches.push(match);
        }
      }
    }
    
    // Sort by match score descending
    this.matches.sort((a, b) => b.matchScore - a.matchScore);
  }

  calculateMatch(lostItem: ItemReport, foundItem: ItemReport): Match {
    let score = 0;
    const reasons: string[] = [];

    // Category match (40 points)
    if (lostItem.category === foundItem.category) {
      score += 40;
      reasons.push('Same category');
    }

    // Item name similarity (30 points)
    if (this.isSimilarString(lostItem.itemName, foundItem.itemName)) {
      score += 30;
      reasons.push('Similar item name');
    }

    // Location proximity (20 points)
    if (this.isSimilarString(lostItem.location, foundItem.location)) {
      score += 20;
      reasons.push('Same or nearby location');
    }

    // Date proximity (10 points) - within 7 days
    const dateDiff = Math.abs(
      new Date(lostItem.date).getTime() - new Date(foundItem.date).getTime()
    );
    const daysDiff = dateDiff / (1000 * 60 * 60 * 24);
    if (daysDiff <= 7) {
      score += 10;
      reasons.push(`Date within ${Math.ceil(daysDiff)} days`);
    }

    return {
      lostItem,
      foundItem,
      matchScore: score,
      matchReasons: reasons
    };
  }

  isSimilarString(str1: string, str2: string): boolean {
    const s1 = str1.toLowerCase().trim();
    const s2 = str2.toLowerCase().trim();
    
    // Exact match
    if (s1 === s2) return true;
    
    // Contains match
    if (s1.includes(s2) || s2.includes(s1)) return true;
    
    // Word overlap
    const words1 = s1.split(/\s+/);
    const words2 = s2.split(/\s+/);
    const commonWords = words1.filter(word => words2.includes(word));
    
    return commonWords.length >= 1 && commonWords.length >= Math.min(words1.length, words2.length) * 0.5;
  }

  getMatchColor(score: number): string {
    if (score >= 70) return '#28a745'; // Green
    if (score >= 50) return '#ffc107'; // Yellow
    return '#17a2b8'; // Blue
  }

  openReuniteModal(match: Match): void {
    this.selectedMatch = match;
    this.showReuniteModal = true;
  }

  closeReuniteModal(): void {
    this.showReuniteModal = false;
    this.selectedMatch = null;
  }

  reuniteItems(): void {
    if (!this.selectedMatch) return;
    
    const lostItemId = this.selectedMatch.lostItem.id;
    const foundItemId = this.selectedMatch.foundItem.id;
    
    if (!lostItemId || !foundItemId) {
      alert('Error: Item IDs are missing');
      return;
    }
    
    this.itemService.reuniteItems(lostItemId, foundItemId).subscribe({
      next: (response) => {
        if (response.success) {
          alert('✅ Items marked as reunited!\n\n' +
                'Both parties have been notified:\n' +
                'Lost Item Owner: ' + this.selectedMatch!.lostItem.contactEmail + '\n' +
                'Found Item Reporter: ' + this.selectedMatch!.foundItem.contactEmail + '\n\n' +
                'These items will no longer appear in active listings.');
          
          this.closeReuniteModal();
          this.loadItemsAndMatch(); // Reload to update counts
        } else {
          alert('Error: ' + response.message);
        }
      },
      error: (error) => {
        alert('Error marking items as reunited: ' + (error.message || 'Unknown error'));
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
