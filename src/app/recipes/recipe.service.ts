
import { Recipe } from './recipe.model';

export class RecipeService {

    private recipes: Recipe[] = [
        new Recipe('Baboosh', 'The best laboosh', 'https://bit.ly/2MM8axl'),
        new Recipe('Waboosh', 'okay i have no clue', 'https://bit.ly/2PwMdPC')
    ];

    getRecipes() {
        return this.recipes.slice(); // return a copy
    }
    

}