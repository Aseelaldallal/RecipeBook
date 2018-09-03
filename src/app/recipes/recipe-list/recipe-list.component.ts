import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe('Baboosh', 'The best laboosh', 'https://bit.ly/2MM8axl'),
    new Recipe('Waboosh', 'okay i have no clue', 'https://bit.ly/2MM8axl')
  ];

  constructor() { }

  ngOnInit() {
  }

}
