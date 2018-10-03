import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { RecipeService } from "../recipe.service";
import { Recipe } from "../recipe.model";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"]
})

export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  recipe: Recipe;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editMode = params["id"] != null;
      this.initForm(); 
    });
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);
    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (const ing of recipe.ingredients) {
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ing.name),
            'amount': new FormControl(ing.amount)
          }));
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipeImagePath),
      'description' : new FormControl(recipeDescription),
      'ingredients': recipeIngredients
    });
  }

  onSubmit() {
    console.log(this.recipeForm);
  }
}
