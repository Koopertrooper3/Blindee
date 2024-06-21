import React, { useEffect } from "react"
import { globalContext } from ".."

export default function Newrecipepage(){
    let appTitle = React.useContext(globalContext).appName
    useEffect(() =>{
        document.title = appTitle
    },[appTitle])

    return (
        <>
            <span className="order-1 w-full text-center"><h1 className="mb-8">Add a new recipe</h1></span>

            <div className="order-2 w-96">
                <h2 className="mt-0">Upload Image</h2>
                <div className="border-4 border-gray-600 border-dashed flex justify-center items-center size-96">
                    <div className="p-1 text-xl text-white bg-sky-400 border-0 border-b-4 border-sky-600 border-solid rounded hover:bg-sky-600">
                        <label>Choose file
                            <input id="image-upload" type="file" accept="image/*" style={ {display: "none"}} />
                        </label>
                    </div>
                </div>
            </div>
            

            <div className="order-3 ml-8 w-96">
                <div>
                    <h2 className="mt-0">Dish Name</h2>
                    <input type="text" className="text-lg rounded" style={{width: '250px'}}></input>
                </div>
                <div className="flex justify-left flex-wrap space-x-2 space-y-2">
                    <span className="order-1 w-full"><h2>Time of Meal</h2></span>


                    <div className="order-2">
                        <input id="breakfast-checkbox"type="checkbox" className="peer"style={{display: 'none'}}></input>
                        <label htmlFor="breakfast-checkbox" className="p-1 px-2 text-white rounded-lg border-0 border-b-4 border-solid border-sky-600 bg-sky-400 peer-checked:bg-sky-600 hover:bg-sky-500">
                            Breakfast
                        </label>
                    </div>

                    <div className="order-3">
                        <input id="lunch-checkbox"type="checkbox" className="peer"style={{display: 'none'}}></input>
                        <label htmlFor="lunch-checkbox" className="p-1 px-2 text-white rounded-lg  border-0 border-b-4 border-solid border-sky-600 bg-sky-400 peer-checked:bg-sky-600 hover:bg-sky-500">
                            Lunch
                        </label>
                    </div>

                    <div className="order-4">
                        <input id="dinner-checkbox"type="checkbox" className="peer"style={{display: 'none'}}></input>
                        <label htmlFor="dinner-checkbox" className="p-1 px-2 text-white rounded-lg  border-0 border-b-4 border-solid border-sky-600 bg-sky-400 peer-checked:bg-sky-600 hover:bg-sky-500">
                            Dinner
                        </label>
                    </div>
                    
                    <span className="order-5 w-full"></span>

                    <div className="order-6">
                        <input id="snacks-checkbox"type="checkbox" className="peer"style={{display: 'none'}}></input>
                        <label htmlFor="snacks-checkbox" className="p-1 px-2 text-white rounded-lg  border-0 border-b-4 border-solid border-sky-600 bg-sky-400 peer-checked:bg-sky-600 hover:bg-sky-500">
                            Snacks
                        </label>
                    </div>
                    
                    <div className="order-7">
                        <input id="baked-goods-checkbox"type="checkbox" className="peer"style={{display: 'none'}}></input>
                        <label htmlFor="baked-goods-checkbox" className="p-1 px-2 text-white rounded-lg border-0 border-b-4 border-solid border-sky-600 bg-sky-400 peer-checked:bg-sky-600 hover:bg-sky-500">
                            Baked Goods
                        </label>
                    </div>

                </div>

                <div className="flex justify-left flex-wrap space-x-2 space-y-2">
                    <span className="order-1 w-full"><h2 className="mb-1">Difficulty</h2></span>
                    
                    <div className="order-2">
                        <input id="difficulty-easy"type="radio" name="difficulty" className="peer" style={{display:"none"}}/>
                        <label htmlFor="difficulty-easy" className="p-1 px-2 text-white rounded-lg border-0 border-b-4 border-solid border-sky-600 bg-sky-400 peer-checked:bg-sky-600 hover:bg-sky-500">Easy</label>
                    </div>

                    <div className="order-3">
                        <input id="difficulty-medium"type="radio" name="difficulty" className="peer" style={{display:"none"}}/>
                        <label htmlFor="difficulty-medium" className="p-1 px-2 text-white rounded-lg border-0 border-b-4 border-solid border-sky-600 bg-sky-400 peer-checked:bg-sky-600 hover:bg-sky-500">Medium</label>
                    </div>

                    <div className="order-4">
                        <input id="difficulty-hard"type="radio" name="difficulty" className="peer" style={{display:"none"}}/>
                        <label htmlFor="difficulty-hard" className="p-1 px-2 text-white rounded-lg border-0 border-b-4 border-solid border-sky-600 bg-sky-400 peer-checked:bg-sky-600 hover:bg-sky-500">Hard</label>
                    </div>
                </div>
                
            </div>
            <span className="order-4 w-full">

            </span>
            <div className="order-5" style={{width: '50rem'}}>
                <h2>Cooking Utensils</h2>
                <textarea id="utensils-textbox" className="min-w-[48rem] min-h-[12rem] resize-none"></textarea>
            </div>
            <div className="order-6" style={{width: '50rem'}}>
                <h2>Steps</h2>
                <textarea id="steps-textbox" className="min-w-[48rem] min-h-[12rem] resize-none"></textarea>
            </div>
            <span className="order-7 w-full"></span>
            <div className="order-8 m-4 mt-8">
                <input id='submit-button' type="button" value='Submit'/>
            </div>

            
        </>
    );
}