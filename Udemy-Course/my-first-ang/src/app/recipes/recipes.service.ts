import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs/Subject'

@Injectable()
export class RecipeService{

	recipesChanged = new Subject<Recipe[]>();

	constructor(private slService: ShoppingListService){}

	//private recipes: Recipe[] = [
	//	new Recipe('Recipe Test', 'This is a recipe test','https://cookieandkate.com/images/2016/01/kale-pesto-pizza-recipe-2.jpg', [
	//		new Ingredient ("Pepperoni", 1),
	//	new Ingredient ("Tomatoe", 2)]
	//	),
	//	new Recipe('Another Recipe Test', 'This is a recipe test','https://cookieandkate.com/images/2016/01/kale-pesto-pizza-recipe-2.jpg', [
	//		new Ingredient ("Meats", 3),
	//		new Ingredient ("Vegetables", 5)])
	//];

	private recipes = [];

	setRecipes(recipes: Recipe[]){
		this.recipes = recipes;
		this.recipesChanged.next(this.recipes.slice());
	}

	getRecipes(){
		return this.recipes.slice();
	}

	onAddItemsToShoppingList(ingredients: Ingredient[]){
		this.slService.onAddIngredients(ingredients);
	}

	getRecipe(idx: number){
		return this.recipes[idx];
	}

	onAddRecipe(recipe: Recipe){
		this.recipes.push(recipe)
		this.recipesChanged.next(this.recipes.slice())
	}

	onUpdateRecipe(index: number, newRecipe: Recipe){
		this.recipes[index] = newRecipe;
		this.recipesChanged.next(this.recipes.slice())
	}

	onDeleteRecipe(index: number){
		this.recipes.splice(index, 1);
		this.recipesChanged.next(this.recipes.slice())
	}

	

}