
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter, Injectable } from '@angular/core';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({ providedIn: "root" })
export class RecipeService {
  constructor(private slService: ShoppingListService) {}

  private recipes: Recipe[] = [
    new Recipe("Baboosh", "The best laboosh", "https://bit.ly/2QsouRf", [
      new Ingredient("Meat", 1),
      new Ingredient("Beans", 20)
    ]),
      new Recipe("Waboosh", "okay i have no clue", "https://bit.ly/2Iy6Atv", [
      new Ingredient("Chicken", 5),
      new Ingredient("Tomatoes", 3)
    ])
  ];

  getRecipes() {
    return this.recipes.slice(); // return a copy
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }
}
