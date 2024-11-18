import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidenav-community-item',
  standalone: true,
  imports: [],
  templateUrl: './sidenav-community-item.component.html',
  styleUrl: './sidenav-community-item.component.scss',
})
export class SidenavCommunityItemComponent {
  @Input() link = '';
  @Input() name = '';
  @Input() imgSrc = '';
}
