import { Component, OnInit, OnDestroy} from '@angular/core';

import { Subscription } from 'rxjs';

import  { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
  
})
export class ShoppingListComponent implements OnInit, OnDestroy {

	private igSubscription: Subscription;

	ingredients: Ingredient[];


	constructor(private shoppingListService: ShoppingListService) { }

	ngOnInit() {
		this.ingredients = this.shoppingListService.getIngridients();
		this.igSubscription = this.shoppingListService.ingredientChanged.subscribe(
			(ingredients: Ingredient[]) => {
				this.ingredients = ingredients;
			}
		);
	}

	onEditItem(index: number){
		this.shoppingListService.startedEditing.next(index);
	}

	ngOnDestroy(): void{
		this.igSubscription.unsubscribe();
	}
	

}
