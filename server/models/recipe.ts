import { Schema,model } from 'mongoose';
import {mealType, Irecipe} from "../shared_types/typedefinitions"


let test = [
    {validator : (val: string[]) => {return val.length > 0}, message : "Recipe must need at least one utensil"},
    {validator : (val: string[]) => {return val.length > 2}, message : "Recipe must need at least one utensil"}]
const recipeSchema = new Schema<Irecipe>({
    image: {
        realName: String, 
        pathName: String
    },
    title: {
        type : String, 
        required: true,
        unique: true
    },
    mealType: [{
        type: String,
        enum: {
            values: ['breakfast','lunch','dinner','snack','bakedGood'],
            message: '{VALUE} is not supported'
        },
        validate: {
            validator: (val : string[] ) => {val.length > 0}, message :"Recipe must need at least to be at least one meal type" 
        }
    }],
    difficulty: {
        type: String,
    },
    //{validator : (val: string[]) => {val.forEach((value) => {value.length > 0})}, message: "Empty steps are not allowed" }
    utensils: {
        type: [String],
        validate: [
            {validator : (val: string[]) => {return val.length > 0}, message : "Recipe must need at least one utensil"},
            {validator : (val: string[]) => {return val.every((utensil : string) => { utensil.length > 0 })}, message : "Recipe must need at least one utensil"}]
        
    },
    recipeSteps:{
        type: [String],
        validate : [ {validator : (val: string[]) => {return val.length > 0}, message : "Recipe must need at least one step"}
                    ,{validator : (val: string[]) => {return val.every((step: string) => { step.length > 0})}, message: "Empty steps are not allowed" }]
    },
    ingredients:[{
        ingredient: String,
        amount: String,
        unit: String,
        
        validate : {
            validator : (array : {ingredient: String, amount: String, unit: String}[]) => {

                if(array.length < 0){
                    throw new Error("Recipe must need at least one ingredient");
                }
                array.forEach((val) => {

                    if(val.ingredient.length == 0){
                        throw new Error("Ingredient field cannot be empty");
                    }
                    if(val.amount.length == 0){
                        throw new Error("Amount field cannot be empty");
                    }
                    if(val.unit.length == 0){
                        throw new Error("Unit field cannot be empty");
                    }

                }
            )}
        }
    }]

})

export let recipe = model<Irecipe>('recipe', recipeSchema);
