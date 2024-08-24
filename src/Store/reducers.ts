import { ADD_CONTACT, EDIT_CONTACT, DELETE_CONTACT, ContactActionTypes } from './constants';
import { Contact } from './types'; // Ensure you import the Contact type

interface ContactState {
  contacts: { [key: string]: Contact };
}

const initialState: ContactState = {
  contacts: {},
};

const reducer = (state = initialState, action: ContactActionTypes): ContactState => {
  console.log({ action });
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state,
        contacts: {
          ...state.contacts,
          [action.payload.id]: action.payload,
        },
      };
    case EDIT_CONTACT:
      return {
        ...state,
        contacts: {
          ...state.contacts,
          [action.payload.id]: {
            ...state.contacts[action.payload.id],
            ...action.payload.updatedData,
          },
        },
      };
    case DELETE_CONTACT:
      const { [action.payload]: _, ...remainingContacts } = state.contacts;
      return {
        ...state,
        contacts: remainingContacts, // Return a new object with the contact removed
      };
    default:
      return state;
  }
};

export default reducer;
