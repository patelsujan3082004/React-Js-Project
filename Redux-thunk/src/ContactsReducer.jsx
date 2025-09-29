import { ref, push, set, get } from "firebase/database";
import db from "./firebase";


const initialState = {
  contacts: {},
  loading: false,
  error: null,
};


const FETCH_CONTACTS_REQUEST = "FETCH_CONTACTS_REQUEST";
const FETCH_CONTACTS_SUCCESS = "FETCH_CONTACTS_SUCCESS";
const FETCH_CONTACTS_FAILURE = "FETCH_CONTACTS_FAILURE";

const ADD_CONTACT_SUCCESS = "ADD_CONTACT_SUCCESS";


export function contactsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CONTACTS_REQUEST:
      return { ...state, loading: true };
    case FETCH_CONTACTS_SUCCESS:
      return { ...state, loading: false, contacts: action.payload };
    case FETCH_CONTACTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_CONTACT_SUCCESS:
      return state; // refresh ke liye dobara fetch karenge
    default:
      return state;
  }
}



export const fetchContacts = () => async (dispatch) => {
  dispatch({ type: FETCH_CONTACTS_REQUEST });
  try {
    
    const snapshot = await get(ref(db, "contacts"));
    if (snapshot.exists()) {
      dispatch({ type: FETCH_CONTACTS_SUCCESS, payload: snapshot.val() });
    } else {
      dispatch({ type: FETCH_CONTACTS_SUCCESS, payload: {} });
    }
  } catch (err) {
    dispatch({ type: FETCH_CONTACTS_FAILURE, payload: err.message });
  }
};


export const addContact = (data) => async (dispatch) => {
  try {
    const newRef = push(ref(db, "contacts"));
    await set(newRef, data);
    dispatch({ type: ADD_CONTACT_SUCCESS });
    dispatch(fetchContacts()); 
  } catch (err) {
    console.error(err);
  }
};
