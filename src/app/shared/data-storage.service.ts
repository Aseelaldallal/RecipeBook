import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: "root"
})
export class DataStorageService {
  constructor(
    private http: Http,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  async storeRecipes() {
    const token = await this.authService.getToken();
    return this.http.put(
      "https://ng-recipe-book-d8021.firebaseio.com/recipes.json?auth=" + token,
      this.recipeService.getRecipes()
    );
  }

  async getRecipes() {
    const token = await this.authService.getToken();
    return this.http
      .get(
        "https://ng-recipe-book-d8021.firebaseio.com/recipes.json?auth=" + token
      )
      .pipe(
        map((response: Response) => {
          const recipes: Recipe[] = response.json();
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
