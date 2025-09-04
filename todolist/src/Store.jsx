// store.jsx
import { createStore } from "redux";

// Action types
const ADD_TASK = "ADD_TASK";
const REMOVE_TASK = "REMOVE_TASK";
const EDIT_TASK = "EDIT_TASK";

// Initial state
const initialState = {
  task: [],
};

// Reducer
function taskReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        task: [...state.task, action.payload],
      };

    case REMOVE_TASK:
      return {
        ...state,
        task: state.task.filter((_, index) => index !== action.payload),
      };

    case EDIT_TASK:
      return {
        ...state,
        task: state.task.map((item, index) =>
          index === action.payload.index ? action.payload.newValue : item
        ),
      };

    default:
      return state;
  }
}

// Store
export const store = createStore(taskReducer);

// Action creators
export const addTask = (taskName) => ({
  type: ADD_TASK,
  payload: taskName,
});

export const removeTask = (index) => ({
  type: REMOVE_TASK,
  payload: index,
});

export const editTask = (index, newValue) => ({
  type: EDIT_TASK,
  payload: { index, newValue },
});

export default taskReducer;
