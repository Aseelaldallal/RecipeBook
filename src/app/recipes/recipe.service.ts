
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Injectable } from '@angular/core';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

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
    console.log('wil add', ingredients);
    this.slService.addIngredients(ingredients);
  }

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  updateRecipe(index: number, recipe: Recipe): void {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) : void {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
