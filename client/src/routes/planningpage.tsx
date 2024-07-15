import React, { useEffect } from "react"
import { globalContext } from ".."

export default function Planningpage(){
    let appTitle = React.useContext(globalContext).appName
    useEffect(() =>{
        document.title = appTitle
    },[appTitle])

    return (
        <h1>Planning page</h1>
    );
}