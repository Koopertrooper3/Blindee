import React, { ChangeEvent, useEffect } from "react"
import { globalContext } from ".."
import{SubmitHandler, useFieldArray, useForm} from 'react-hook-form'
import axios from 'axios'

export default function Newrecipepage(){

    //Types
    enum mealType {
        Breakfast = 'breakfast',
        Lunch = 'lunch',
        Dinner = 'dinner',
        Snack = 'snack',
        BakedGood = 'bakedGood'
    }

    type newRecipeInput = {
        recipeImage: any
        recipeName: String
        recipeMealType: mealType[]
        recipeDifficulty: string
        recipeUtensils : {
            utensil: string
        }[]
        recipeSteps :{
            step: string
        }[]
        recipeIngredients: {
            ingredient: string
            amount: string
            unit: string
        }[]

    }
    const { control, register, handleSubmit, setValue, formState : {errors} } = useForm<newRecipeInput>({
        defaultValues:{
            recipeUtensils : [{utensil : ""}],
            recipeSteps: [{step : ""}],
            recipeIngredients : [{ingredient: "", amount : "", unit : ""}]
        }}
    );

    

    const utensilField = useFieldArray({
        control,
        name: "recipeUtensils"
    });
    const stepsField = useFieldArray({
        control,
        name: "recipeSteps"
    });
    const ingredientsField = useFieldArray({
        control,
        name: "recipeIngredients"
    });
    
    
    let validateMealType = (value : any) =>{
        if(value === false){
            return "Recipe needs at least one meal type"
        }
        return true
    }
    const onSubmit : SubmitHandler<newRecipeInput> = async (data: newRecipeInput) => {
        
        console.log(data)
        data.recipeImage = data.recipeImage.item(0)
        await axios.post("http://localhost:8000/submit/newrecipe", data, {
             headers :{
                'Content-Type' : 'multipart/form-data'
            }
        })
    }
    

    //Other scripting
    let appTitle = React.useContext(globalContext).appName

    useEffect(() =>{
        document.title = appTitle //Sets the name of the website
    },[appTitle])

    //Image scripting

    //Takes the image and loads a preview of it
    let loadPreviewFile = (event : ChangeEvent<HTMLInputElement>)=>{
        let upload : HTMLElement = document.getElementById("img-upload")!;
        let previewdiv : HTMLElement = document.getElementById("img-preview")!;
        let output : HTMLElement = document.getElementById("img-preview-output")!;
        


        if(upload == null || previewdiv == null || output == null){
            console.trace()
            return
        }

        
        let imageFile : any = event?.target?.files?.[0]

        if(imageFile == null){
            return
        }
        upload.style.display = "none"
        imageFile = URL.createObjectURL(imageFile)
        output.setAttribute('src',  imageFile)
        output.onload = () =>{
            URL.revokeObjectURL(imageFile)
        }
        previewdiv.style.display = "flex"
    }

    //Replaces an image with another image
    let editFile = (event : ChangeEvent<HTMLInputElement>) =>{
        let upload : HTMLElement = document.getElementById("img-upload")!;
        let previewdiv : HTMLElement = document.getElementById("img-preview")!;
        let output : HTMLElement = document.getElementById("img-preview-output")!;

        if(upload == null || previewdiv == null || output == null){
            console.trace()
            return
        }


        let imageFile : File = event?.target?.files?.[0]!

        if(imageFile == null){
            return
        }

        let imageFileURL : string = URL.createObjectURL(imageFile)
        output.setAttribute('src',  imageFileURL)
        output.onload = () =>{
            URL.revokeObjectURL(imageFileURL)
        }

        setValue("recipeImage", event?.target?.files!)
    }

    //Removes the image from being uploaded
    let clearImage = () => {
        let upload : HTMLElement = document.getElementById("img-upload")!;
        let previewdiv :HTMLElement= document.getElementById("img-preview")!;
        let output :HTMLElement= document.getElementById("img-preview-output")!;

        if(upload == null || previewdiv == null || output == null){
            console.trace()
            return
        }
        
        upload.style.display = "flex"
        output.setAttribute('src',  "/")
        previewdiv.style.display = "none"
    }

    return (
        <form className="h-full w-full flex content-start flex-wrap justify-center" encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
            <span className="order-1 w-full text-center"><h1 className="mb-8">Add a new recipe</h1></span>

            <div id="upload-image" className="order-2 w-96">
                <h2 className="mt-0">Upload Image</h2>
                <div id="img-upload" className="border-4 border-gray-600 border-dashed flex justify-center items-center size-96">
                    <div className="p-1 text-xl text-white bg-sky-400 border-0 border-b-4 border-sky-600 border-solid rounded hover:bg-sky-600">
                        <label>Choose file
                            <input {...register("recipeImage", {onChange : loadPreviewFile})} type="file" accept="image/*" style={ {display: "none"}}/>
                        </label>
                        
                    </div>
                </div>

                <div id="img-preview" className="hidden relative size-96 justify-center items-center">
                    
                    <img id = "img-preview-output" src="/" alt="" className="max-h-full max-w-full object-contain"></img>
                    <label className="absolute p-1 py-0.5 m-2 top-0 right-0 text-base text-white bg-sky-400 border-0 border-b-4 border-sky-600 border-solid rounded hover:bg-sky-600">Choose file
                        <input id="image-upload" type="file" accept="image/*" style={ {display: "none"}} onChange={editFile}/>
                    </label>
                    <input type="button" className="absolute top-0 m-2 left-0 text-base text-white bg-sky-400 border-0 border-b-4 border-sky-600 border-solid rounded hover:bg-sky-600" value={"Delete"} onClick={clearImage}/>
                </div>
            </div>
            

            <div id="recipe-basic-infomation"className="order-3 ml-8 w-96">
                <div id="recipe-name">
                    <h2 className="mt-0">Dish Name</h2>
                    <input {...register("recipeName", {/*required : "Recipe requires a name"*/} )} type="text" className="text-lg rounded" style={{width: '250px'}} autoCorrect="off" spellCheck="false" autoComplete="off" ></input>
                    {errors.recipeName && <div id="recipe-name-error" className="text-red-500">{errors.recipeName.message}</div>}
                </div>
                <div id="recipe-mealtime"className="flex justify-left flex-wrap space-x-2 space-y-2">
                    <span className="order-1 w-full"><h2>Time of Meal</h2></span>


                    <div className="order-2">
                        <input {...register("recipeMealType", {validate: validateMealType})} value={mealType.Breakfast} id="breakfast-checkbox"type="checkbox" className="peer"style={{display: 'none'}} ></input>
                        <label htmlFor="breakfast-checkbox" className="p-1 px-2 text-white rounded-lg border-0 border-b-4 border-solid border-sky-600 bg-sky-400 peer-checked:bg-sky-600 hover:bg-sky-500">
                            Breakfast
                        </label>
                    </div>

                    <div className="order-3">
                        <input {...register("recipeMealType",{validate: validateMealType})} value={mealType.Lunch} id="lunch-checkbox"type="checkbox" className="peer"style={{display: 'none'}}></input>
                        <label htmlFor="lunch-checkbox" className="p-1 px-2 text-base text-white rounded-lg  border-0 border-b-4 border-solid border-sky-600 bg-sky-400 peer-checked:bg-sky-600 hover:bg-sky-500">
                            Lunch
                        </label>
                    </div>

                    <div className="order-4">
                        <input {...register("recipeMealType",{validate: validateMealType})} value={mealType.Dinner} id="dinner-checkbox"type="checkbox" className="peer"style={{display: 'none'}}></input>
                        <label htmlFor="dinner-checkbox" className="p-1 px-2 text-base text-white rounded-lg  border-0 border-b-4 border-solid border-sky-600 bg-sky-400 peer-checked:bg-sky-600 hover:bg-sky-500">
                            Dinner
                        </label>
                    </div>
                    
                    <span className="order-5 w-full"></span>

                    <div className="order-6">
                        <input {...register("recipeMealType",{validate: validateMealType})} value={mealType.Snack} id="snacks-checkbox"type="checkbox" className="peer"style={{display: 'none'}}></input>
                        <label htmlFor="snacks-checkbox" className="p-1 px-2 text-base text-white rounded-lg  border-0 border-b-4 border-solid border-sky-600 bg-sky-400 peer-checked:bg-sky-600 hover:bg-sky-500">
                            Snacks
                        </label>
                    </div>
                    
                    <div className="order-7">
                        <input {...register("recipeMealType",{validate: validateMealType} )} value={mealType.BakedGood} id="baked-goods-checkbox"type="checkbox" className="peer"style={{display: 'none'}}></input>
                        <label htmlFor="baked-goods-checkbox" className="p-1 px-2 text-base text-white rounded-lg border-0 border-b-4 border-solid border-sky-600 bg-sky-400 peer-checked:bg-sky-600 hover:bg-sky-500">
                            Baked Goods
                        </label>
                    </div>
                    <span className="order-8 w-full"></span>
                    {errors.recipeMealType && <div id="recipe-name-error" className="text-red-500 order-9 ml-2">{errors.recipeMealType?.message?.toString()}</div>} 
                </div>

                <div id="recipe-difficulty" className="flex justify-left flex-wrap space-x-2 space-y-2">
                    <span className="order-1 w-full"><h2 className="mb-1">Difficulty</h2></span>
                    
                    <div className="order-2">
                        <input {...register("recipeDifficulty")} value="easy" id="difficulty-easy" type="radio" className="peer" style={{display:"none"}}/>
                        <label htmlFor="difficulty-easy" className="p-1 px-2 text-base text-white rounded-lg border-0 border-b-4 border-solid border-sky-600 bg-sky-400 peer-checked:bg-sky-600 hover:bg-sky-500">Easy</label>
                    </div>

                    <div className="order-3">
                        <input {...register("recipeDifficulty")} value="medium" id="difficulty-medium"type="radio" className="peer" style={{display:"none"}}/>
                        <label htmlFor="difficulty-medium" className="p-1 px-2 text-base text-white rounded-lg border-0 border-b-4 border-solid border-sky-600 bg-sky-400 peer-checked:bg-sky-600 hover:bg-sky-500">Medium</label>
                    </div>

                    <div className="order-4">
                        <input {...register("recipeDifficulty")} value="hard" id="difficulty-hard"type="radio" className="peer" style={{display:"none"}}/>
                        <label htmlFor="difficulty-hard" className="p-1 px-2 text-base text-white rounded-lg border-0 border-b-4 border-solid border-sky-600 bg-sky-400 peer-checked:bg-sky-600 hover:bg-sky-500">Hard</label>
                    </div>
                </div>
                
            </div>
            <span className="order-4 w-full"></span>
            <div id="recipe-utensils" className="order-5" style={{width: '50rem'}}>
                <h2>Utensils</h2>
                <ol className="pl-4 text-xl">

                    { utensilField.fields.map( (field, index)=>{
                        return (<section key={field.id}>
                            <UtensilInput register={register} index={index} remove={utensilField.remove}/>
                        </section>);
                    }) }

                </ol>
                <input id='add-step-button' type="button" value='Add Step' className="block m-auto p-0.5 px-2 text-base text-white rounded-lg border-0 border-b-4 border-solid border-sky-600 bg-sky-400 peer-checked:bg-sky-600 hover:bg-sky-500"
                onClick={() =>{
                    utensilField.append({ utensil: ""})
                }}/>

            </div>
            <div id="recipe-ingredients" className="order-6 w-[50rem]">
                <h2>Ingredients</h2>
                <ol className="pl-4 text-xl">
                    {
                        ingredientsField.fields.map( (field,index) =>{
                            return (<section key={field.id}>
                                <IngredientInput register={register} index={index} remove={utensilField.remove}/>
                            </section>)
                        })
                    }
                </ol>
                <input id='add-step-button' type="button" value='Add Step' className="block m-auto p-0.5 px-2 text-base text-white rounded-lg border-0 border-b-4 border-solid border-sky-600 bg-sky-400 peer-checked:bg-sky-600 hover:bg-sky-500"
                onClick={() =>{
                    ingredientsField.append({ingredient: "", amount : "", unit : ""})
                }}/>
            </div>
            <div id ="recipe-instructions" className="order-7" style={{width: '50rem'}}>
                <h2>Instructions</h2>
                <ol className="pl-4 text-xl">
                { stepsField.fields.map( (field, index)=>{
                        return (<section key={field.id}>
                            <RecipeStepInput register={register} index={index} remove={stepsField.remove}/>
                        </section>);
                    }) }

                </ol>
                <input id='add-step-button' type="button" value='Add Step' className="block m-auto p-0.5 px-2 text-base text-white rounded-lg border-0 border-b-4 border-solid border-sky-600 bg-sky-400 peer-checked:bg-sky-600 hover:bg-sky-500"
                onClick={() =>{
                    stepsField.append({step: ""})
                }}/>
            </div>
            <span className="order-8 w-full"></span>
            <div id = "recipe-submit" className="order-9 m-4 mt-8">
                <input className="p-0.5 px-4 text-base text-white rounded-lg border-0 border-b-4 border-solid border-sky-600 bg-sky-400 peer-checked:bg-sky-600 hover:bg-sky-500" id='submit-button' type="submit" value='Submit'/>
            </div>
            
        </form>
    );
}


interface stepProps{
    register: any
    index: number
    remove: any
}

function RecipeStepInput({register,index,remove} : stepProps){
    return(
        <li  className="pl-[1rem]">
            <input {...register(`recipeSteps.${index}.step`)} type="text"  autoCorrect="off" spellCheck="false" autoComplete="off"  className="min-w-[40rem] rounded border-gray-400 text-base"/>
            <button  className="ml-2 p-0.5 px-3 text-base text-white rounded-lg border-0 border-b-4 border-solid border-sky-600 bg-sky-400 peer-checked:bg-sky-600 hover:bg-sky-500" onClick={() =>{remove(index)}}>Remove</button>
        </li>
    );
}

function UtensilInput({register,index,remove} : stepProps){
    return(
        <li className="pl-[1rem]">
            <input {...register(`recipeUtensils.${index}.utensil`)} type="text"  autoCorrect="off" spellCheck="false" autoComplete="off" className="min-w-[40rem] rounded border-gray-400 text-base"/>
        
            <button className="ml-2 p-0.5 px-3 text-base text-white rounded-lg border-0 border-b-4 border-solid border-sky-600 bg-sky-400 peer-checked:bg-sky-600 hover:bg-sky-500" onClick={() =>{remove(index)}}>Remove</button>
        </li>
    );
}

function IngredientInput({register,index,remove} : stepProps){
    return(
        <li className="pl-[1rem]">
            <input {...register(`recipeIngredients.${index}.ingredient`)} type="text"  autoCorrect="off" spellCheck="false" autoComplete="off" className="min-w-[19rem] mx-1 rounded border-gray-400 text-base"/>
            <input {...register(`recipeIngredients.${index}.amount`)} type="text"  autoCorrect="off" spellCheck="false" autoComplete="off" className="min-w-[9rem] mx-1 rounded border-gray-400 text-base"/>
            <input {...register(`recipeIngredients.${index}.unit`)} type="text"  autoCorrect="off" spellCheck="false" autoComplete="off" className="w-[7.5rem] mx-1 rounded border-gray-400 text-base"/>
            <button className="ml-2 p-0.5 px-3 text-base text-white rounded-lg border-0 border-b-4 border-solid border-sky-600 bg-sky-400 peer-checked:bg-sky-600 hover:bg-sky-500" onClick={() =>{remove(index)}}>Remove</button>

        </li>
    )
}