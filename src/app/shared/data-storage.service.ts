import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpRequest
} from "@angular/common/http";

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
    // return this.httpClient.put(
    //   "https://ng-recipe-book-d8021.firebaseio.com/recipes.json?auth=" + token,
    //   this.recipeService.getRecipes()
    // ); // You can add a third argument here, observe: event. Then you can go in the middle by listening to event in subscribe

    // Listen to the progress the request made
    const req = new HttpRequest(
      "PUT",
      "https://ng-recipe-book-d8021.firebaseio.com/recipes.json",
      this.recipeService.getRecipes(),
      { reportProgress: true, params: new HttpParams().set("auth", token) } // useful if uploading or downloading
    );
    return this.httpClient.request(req);
  }

  async getRecipes() {
    return this.httpClient
      .get<Recipe[]>(
        "https://ng-recipe-book-d8021.firebaseio.com/recipes.json",
        {
          observe: "body"
          // params: new HttpParams().set('auth', token).append ... Set replaces everything, append adds it
          // headers: new HttpHeaders().set('Autherization', 'Bearer token').append...
        }
      )
      .pipe(
        map(recipes => {
          console.log(recipes);
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

// return this.httpClient
//     .get("https://ng-recipe-book-d8021.firebaseio.com/recipes.json", {
//         observe: "response", // will not automatically extract body data of response
//         responseType: "text" // this can be json, blob, etc.
//     })
