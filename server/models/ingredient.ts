import mongoose from "mongoose";
import {mealType} from "../shared_types/typedefinitions"

let Schema = mongoose.Schema


interface ingredient {
    name: string,
    amount: number,
    unit: string
}

const ingredientSchema = new Schema<ingredient>({
    name: {type: String},
    amount: {type: Number},
    unit: {type: String}
})

var ingredient = mongoose.model('ingredient', ingredientSchema);
module.exports = ingredient;