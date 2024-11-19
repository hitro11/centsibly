import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
// import  from '';

@Component({
  selector: 'app-sidenav-community-item',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './sidenav-community-item.component.html',
  styleUrl: './sidenav-community-item.component.scss',
})
export class SidenavCommunityItemComponent {
  @Input() id = '';
  @Input() name = '';
  @Input() link = '';
  @Input() imgSrc = '';
  @Input() favorited = false;
  @Output() favoriteChangedEvent = new EventEmitter<{
    id: string;
    currentlyFavorited: boolean;
  }>();

  toggleFavorite() {
    this.favoriteChangedEvent.emit({
      id: this.id,
      currentlyFavorited: this.favorited,
    });
  }

  openSubreddit() {
    console.log(this.link);
  }
}
