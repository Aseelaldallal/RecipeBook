import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class DataStorageService {
  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  async storeRecipes() {
    const token = await this.authService.getToken();
    return this.httpClient.put(
      "https://ng-recipe-book-d8021.firebaseio.com/recipes.json?auth=" + token,
      this.recipeService.getRecipes()
    );
  }

  async getRecipes() {
    const token = await this.authService.getToken();
    return this.httpClient
      .get<Recipe[]>(
        "https://ng-recipe-book-d8021.firebaseio.com/recipes.json?auth=" + token
      )
      .pipe(
        map(recipes => {
          for (const recipe of recipes) {
            if (!recipe.ingredients) {
              recipe.ingredients = [];
            }
          }
          return recipes;
        })
      )
      .subscribe((recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      });
  }
}
