import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms'
import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', {static: false}) slForm: NgForm;

  subscription: Subscription;
  editedItemIndex: number;
  editMode = false;
  ingredient: Ingredient;




  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
        (index: number) => {
          this.editMode = true;
          this.editedItemIndex = index
          this.ingredient = this.shoppingListService.getIngredient(this.editedItemIndex)
          this.slForm.setValue({
            name: this.ingredient.name,
            amount: this.ingredient.amount}
            )

        }
      );

  }

  onSubmitItem(form: NgForm){

    const value = form.value;
    const newIngredient: Ingredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.shoppingListService.onUpdateIngredient(this.editedItemIndex, newIngredient)
    }else{
        this.shoppingListService.onAddIngridient(newIngredient);  
    }
    this.onClear();
    
  }

  onClear(){
    this.editMode = false;
    this.slForm.reset();
  }

  onDelete(){
    this.shoppingListService.onDeleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
