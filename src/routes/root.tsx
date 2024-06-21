import React, { useEffect } from "react"
import {Outlet,
    Link,
    useLoaderData,
    Form,
    NavLink
} from "react-router-dom"

import '../stylesheets/index.css'
import { globalContext } from ".."
export default function Root(){

    let appTitle = React.useContext(globalContext).appName
    useEffect(() =>{
        document.title = appTitle
    },[appTitle])


    return (
        <div className="size-full flex overflow-auto">
            <div id = "sidebar" className="order-1 w-96 h-full bg-menubackground border-r border-menuborder border-solid flex flex-col sticky top-0">
                <h1>{appTitle}</h1>
                <nav className="overflow-auto pt-4">
                <ul className="p-0 m-0 list-none">
                    <li className="my-1 mx-0">
                        <NavLink to={``}
                        className={({ isActive, isPending }) =>
                            isActive
                            ? "bg-sky-400 text-white"
                            : isPending
                            ? "pending"
                            : "text-black"
                        }>
                        Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={`newrecipe`}
                        className={({ isActive, isPending }) =>
                            isActive
                            ? "bg-sky-400 text-white"
                            : isPending
                            ? "pending"
                            : "text-black"
                        }>
                        Add a New Recipe
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={`search`}
                        className={({ isActive, isPending }) =>
                            isActive
                            ? "bg-sky-400 text-white"
                            : isPending
                            ? "pending"
                            : "text-black"
                        }>
                        Search
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={`planning`}
                        className={({ isActive, isPending }) =>
                            isActive
                            ? "bg-sky-400 text-white"
                            : isPending
                            ? "pending"
                            : "text-black"
                        }>
                        Planning
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={`random`}
                        className={({ isActive, isPending }) =>
                            isActive
                            ? "bg-sky-400 text-white"
                            : isPending
                            ? "pending"
                            : "text-black"
                        }>
                        Random
                        </NavLink>
                    </li>
                </ul>
            </nav>
            </div>

            <div id="detail" className="order-2 m-10 h-fit w-fit flex content-start flex-wrap justify-center">
                <Outlet />
            </div>
        </div>
    );
}