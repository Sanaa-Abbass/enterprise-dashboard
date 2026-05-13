import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../features/taskes/TaskSlice.js";


// SAVE STATE
const saveState = (state) => {
  localStorage.setItem("preloadedState", JSON.stringify(state));
};


// LOAD STATE
const loadState = () => {
  try {
    const saved = localStorage.getItem("kanban");

    if (!saved || saved === "undefined" || saved === "null") {
      return undefined; // let Redux use initialState
    }

    return JSON.parse(saved);
  } catch (error) {
    console.error("localStorage error:", error);
    return undefined;
  }
};


export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
  //hydrate Redux state from localStorage
  preloadedState: {
    tasks: loadState(),
  },
});

//auto-save every change
store.subscribe(() => {
  saveState(store.getState().tasks);
});