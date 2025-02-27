import thunk from "redux-thunk";
import {  configureStore } from "@reduxjs/toolkit";
import { Middleware } from "redux"; // Import Middleware type
import reducer from "./reducer";


const middleware: Middleware[] = [thunk]; // Define an array of middleware

const store = configureStore({
  reducer: reducer,
  middleware: middleware, // Pass the middleware array
});

export default store;