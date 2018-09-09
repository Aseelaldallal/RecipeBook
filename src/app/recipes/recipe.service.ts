
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';

export class RecipeService {

    public recipeSelected = new EventEmitter<Recipe>();
    
    private recipes: Recipe[] = [
        new Recipe('Baboosh', 
            'The best laboosh', 
            'https://bit.ly/2MM8axl', 
            [new Ingredient('Meat', 1), new Ingredient('Beans', 20)]
        ),
        new Recipe('Waboosh', 
            'okay i have no clue', 
            'https://bit.ly/2PwMdPC', 
            [new Ingredient('Chicken', 5), new Ingredient('Tomatoes', 3)]
        )
    ];

    getRecipes() {
        return this.recipes.slice(); // return a copy
    }
    

}