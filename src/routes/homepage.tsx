import React, { useEffect } from "react"
import { globalContext } from ".."

export default function Homepage(){
    let appTitle = React.useContext(globalContext).appName
    useEffect(() =>{
        document.title = appTitle
    },[appTitle])

    return (
        <h1>Home Page</h1>
    );
}