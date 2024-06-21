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
        <>
        <div id = "sidebar" className="w-96 bg-menubackground border-r border-menuborder border-solid flex flex-col">
            <h1>{appTitle}</h1>
            <nav className="overflow-auto pt-4">
            <ul className="p-0 m-0 list-none">
                <li className="my-1 mx-0">
                    <NavLink to={``}
                    className={({ isActive, isPending }) =>
                        isActive
                          ? "active"
                          : isPending
                          ? "pending"
                          : ""
                      }>
                    Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`newrecipe`}
                    className={({ isActive, isPending }) =>
                        isActive
                          ? "active"
                          : isPending
                          ? "pending"
                          : ""
                      }>
                    Add a New Recipe
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`search`}
                    className={({ isActive, isPending }) =>
                        isActive
                          ? "active"
                          : isPending
                          ? "pending"
                          : ""
                      }>
                    Search
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`planning`}
                    className={({ isActive, isPending }) =>
                        isActive
                          ? "active"
                          : isPending
                          ? "pending"
                          : ""
                      }>
                    Planning
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`random`}
                    className={({ isActive, isPending }) =>
                        isActive
                          ? "active"
                          : isPending
                          ? "pending"
                          : ""
                      }>
                    Random
                    </NavLink>
                </li>
            </ul>
        </nav>
        </div>
        <div id="detail" className="m-10 h-full w-full flex content-start flex-wrap justify-center">
            <Outlet />
        </div>
        </>
    );
}