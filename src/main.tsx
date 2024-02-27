import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <Provider store={store}>
  <React.StrictMode>
    <div className="flex items-center flex-col">
      {/* <Header /> */}
      <div className="w-full flex flex-col justify-center items-center">
        <Navbar />
        <RouterProvider router={router} />
      </div>

      {/* <Footer /> */}
    </div>
  </React.StrictMode>
  // </Provider>
);
