import { Component, OnInit, ViewChild } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {


  constructor(private shoppingListService : ShoppingListService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    let ing = new Ingredient(form.value.name, form.value.amount);
    this.shoppingListService.addIngredient(ing);
  }

}

