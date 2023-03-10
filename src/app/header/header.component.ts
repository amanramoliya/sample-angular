import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  searchInput: string;

  constructor() {
    this.searchInput = '';
  }

  search(searchBar: any) {
    this.searchInput = searchBar.value;
  }
}
