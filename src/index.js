import ReactDOM from 'react-dom/client';
import './stylesheets/indecopy.css';
import reportWebVitals from './reportWebVitals';

//Additional Packages
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import React, {createContext} from 'react';

//Components
import Root from './routes/root.tsx';
import Homepage from './routes/homepage';
import Searchpage from './routes/searchpage';
import Planningpage from './routes/planningpage';
import Newrecipepage from './routes/newrecipe';
//Globals
export const globalContext = createContext(
  {
    appName : "Blindee"
  }
)


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Homepage />
      },
      {
        path: "newrecipe",
        element: <Newrecipepage />
      },
      {
        path: "search",
        element: <Searchpage/>
      },
      {
        path: "planning",
        element: <Planningpage/>
      }
    ]
  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router = {router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
