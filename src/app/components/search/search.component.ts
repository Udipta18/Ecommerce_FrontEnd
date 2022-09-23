import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  
  enteredSerchValue: string = '';

  @Output()
  searchTextChanged:EventEmitter<String>=new EventEmitter<String>();

  onSearchTextChanged(){
    this.searchTextChanged.emit(this.enteredSerchValue)
  }

}
