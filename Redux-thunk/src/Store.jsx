import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { contactsReducer } from "./contactsReducer";

const rootReducer = combineReducers({
  contactsState: contactsReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
