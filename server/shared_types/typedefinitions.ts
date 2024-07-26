export enum mealType {
    Breakfast = 'breakfast',
    Lunch = 'lunch',
    Dinner = 'dinner',
    Snack = 'snack',
    BakedGood = 'bakedGood'
}

export interface Irecipe {
    title: string
    image: string
    mealType: mealType[]
    difficulty: string
    utensils: string[]
    recipeSteps: string[]
    ingredients: {
        name: string
        amount: Number
        unit: string
    }[]
}