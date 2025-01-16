import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  searchQuery: string = '';

  onSearch(query: string) {
    this.searchQuery = query;
    console.log('Buscando:', this.searchQuery);
  }
}
