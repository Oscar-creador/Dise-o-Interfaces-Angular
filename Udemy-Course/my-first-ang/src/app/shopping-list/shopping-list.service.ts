
import { Subject } from 'rxjs';

import  { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService{

	ingredientChanged = new Subject<Ingredient[]>();
	startedEditing = new Subject<number>();

	private ingredients: Ingredient[] = [
		new Ingredient('Apples', 10),
		new Ingredient('Tomatoes', 10)
	]; 

	getIngridients(){
		return this.ingredients.slice();
	}

	getIngredient(index: number){
		return this.ingredients[index];
	}

	onAddIngridient(ingredient: Ingredient){
		this.ingredients.push(ingredient);
		this.ingredientChanged.next(this.ingredients.slice());
	}

	onUpdateIngredient(index: number, newIngredient: Ingredient){
		this.ingredients[index] = newIngredient;
		this.ingredientChanged.next(this.ingredients.slice());
	}

	onAddIngredients(ingredients: Ingredient[]){
		this.ingredients.push(...ingredients);
		this.ingredientChanged.next(this.ingredients.slice());
	}

	onDeleteIngredient(index: number){
		this.ingredients.splice(index, 1);
		this.ingredientChanged.next(this.ingredients.slice());
	}




}