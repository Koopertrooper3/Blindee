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
                    <div className="p-0.5 file-upload-button">
                        <label>Choose file
                            <input id="image-upload" type="file" accept="image/*" style={ {display: "none"}} />
                        </label>
                    </div>
                </div>
            </div>
            

            <div className="order-3 ml-8 w-96">
                <div>
                    <h2 className="mt-0">Dish Name</h2>
                    <input type="text" className="text-lg" style={{width: '400px'}}></input>
                </div>
                <div className="flex justify-left flex-wrap space-x-2 space-y-2">
                    <span className="order-1 w-full"><h2>Time of Meal</h2></span>

                    <div className="order-2 bg-cyan-500 text-gray-200 border-0 border-b-4 border-cyan-700 border-solid w-24 text-center">
                        <label className="">
                            Breakfast
                            <input type="checkbox" style={{display: 'none'}}></input>
                        </label>
                    </div>
                    <div className="order-3 bg-cyan-500 text-gray-200 border-0 border-b-4 border-cyan-700 border-solid w-24 text-center">
                        <label className="">
                            Lunch
                            <input type="checkbox" style={{display: 'none'}}></input>
                        </label>
                    </div>
                    <div className="order-4 bg-cyan-500 text-gray-200 border-0 border-b-4 border-cyan-700 border-solid w-24 text-center">
                        <label className="">
                            Dinner
                            <input type="checkbox" style={{display: 'none'}}></input>
                        </label>
                    </div>
                    <span className="order-5 w-full"></span>
                    <div className="order-6 bg-cyan-500 text-gray-200 border-0 border-b-4 border-cyan-700 border-solid w-24 text-center">
                        <label className="">
                            Snack
                            <input type="checkbox" style={{display: 'none'}}></input>
                        </label>
                    </div>
                </div>
            </div>
            
        </>
    );
}