import { ADD_CONTACT, EDIT_CONTACT, DELETE_CONTACT, ContactActionTypes, ENABLE_DISABLE_CONTACT } from './constants';
import { Contact } from './types'; // Ensure you import the Contact type

export const addContact = (contact: Contact): ContactActionTypes => ({
  type: ADD_CONTACT,
  payload: contact,
});

export const editContact = (id: string, updatedData: Partial<Contact>): ContactActionTypes => ({
  type: EDIT_CONTACT,
  payload: { id, updatedData },
});

export const deleteContact = (id: string): ContactActionTypes => ({
  type: DELETE_CONTACT,
  payload: id,
});

export const enableDisableContactList = (data: boolean): ContactActionTypes => ({
  type: ENABLE_DISABLE_CONTACT,
  payload: data,
});
