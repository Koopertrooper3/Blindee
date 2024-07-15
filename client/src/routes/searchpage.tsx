import React, { ChangeEvent, useEffect } from "react"
import { globalContext } from ".."
import { useForm } from "react-hook-form";

export default function Searchpage(){
    let appTitle = React.useContext(globalContext).appName
    useEffect(() =>{
        document.title = appTitle
    },[appTitle])

    return (
        <>
            <h1>Searchpage</h1>
            
        </>
    );
}