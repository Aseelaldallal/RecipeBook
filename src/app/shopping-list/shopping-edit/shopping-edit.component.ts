import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {


  @ViewChild('ingredientName') nameInputRef: ElementRef;
  @ViewChild('ingredientAmount') amountInputRef: ElementRef;

  constructor(private shoppingListService : ShoppingListService) { }

  ngOnInit() {
  }

  onAddItem() {
    const name = this.nameInputRef.nativeElement.value;
    const amount = this.amountInputRef.nativeElement.value;
    this.shoppingListService.addIngredient({name: name, amount: amount});
  }
}

