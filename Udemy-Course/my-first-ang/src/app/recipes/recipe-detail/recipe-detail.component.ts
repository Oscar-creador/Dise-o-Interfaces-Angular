import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';


import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) { }


  recipe: Recipe;
  id: number;

  ngOnInit(): void {
    this.route.params.
              subscribe((params: Params) => {
                          this.id = + params['id'];
                          this.recipe = this.recipeService.getRecipe(this.id);
                          })
  }

  onToShopping(){
    this.recipeService.onAddItemsToShoppingList(this.recipe.ingredients);
  }

  onToEditRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onToDeleteRecipe(){
    this.recipeService.onDeleteRecipe(this.id);
    this.router.navigate(['/recipes'])


  }

}
