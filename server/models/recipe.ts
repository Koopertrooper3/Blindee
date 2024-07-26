import { Schema,model } from 'mongoose';
import {mealType, Irecipe} from "../shared_types/typedefinitions"

const recipeSchema = new Schema<Irecipe>({
    title: {type : String, required: true},
    image: {type: String},
    mealType: [{
        type: mealType
    }],
    difficulty: {
        type: String
    },
    utensils: [{
        type: String
    }],
    recipeSteps:[{
        type: String
    }],
    ingredients:[{
        type: Schema.Types.ObjectId,
        ref: 'ingredient'
    }]

})

export let recipe = model<Irecipe>('recipe', recipeSchema);
