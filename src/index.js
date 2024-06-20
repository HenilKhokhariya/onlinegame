import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Admin/Dashboard";
import Category from "./Admin/Category";
import ClientCategory from "./Client/Category";
import Game from "./Admin/Game";
import "react-notifications/lib/notifications.css";
import GameShow from "./Admin/GameShow";
import UpdateGame from "./Admin/UpdateGame";

import DataScraping from "./Admin/DataScraping";
import Search from "./Client/Search";
import AppDetailes from "./Client/AppDetailes";
import ShowCategoryGame from "./Client/ShowCategoryGame";
import Top from "./Client/Top";
import Login from "./Admin/Login";

const root = ReactDOM.createRoot(document.getElementById("root"));
const allRouter = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/Admin", element: <Dashboard /> },
  { path: "/Admin/Login", element: <Login /> },
  { path: "/Admin/Category", element: <Category /> },
  { path: "/Admin/Game", element: <Game /> },
  { path: "/Admin/GameShow", element: <GameShow /> },
  { path: "/Admin/UpdateGame/:id", element: <UpdateGame /> },
  { path: "/Admin/DataScraping", element: <DataScraping /> },
  { path: "/category", element: <ClientCategory /> },
  { path: "/search", element: <Search /> },
  { path: "/AppDetailes/:id", element: <AppDetailes /> },
  { path: "/showcategorygame/:id", element: <ShowCategoryGame /> },
  { path: "/Hot/Top/:id", element: <Top /> },
]);
root.render(
  <React.StrictMode>
    <RouterProvider router={allRouter} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
