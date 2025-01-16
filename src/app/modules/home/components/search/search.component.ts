import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  @Output() searchQuery = new EventEmitter<string>();
  @Output() errorMessage = new EventEmitter<string>();
  query: string = '';

  onSearch() {
    if (this.query.trim().length > 0) {
      this.searchQuery.emit(this.query.trim());
      this.errorMessage.emit('');
    } else {
      this.errorMessage.emit('No se encuentra la ciudad');
    }
  }
}
