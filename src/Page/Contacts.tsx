import React, { useMemo, useState, useCallback } from 'react';
import { RootState } from '../Store/store'; // Import the RootState type
import { useSelector } from 'react-redux';
import CreateContact from '../Components/CreateContact';
import ContactCard from '../Components/ContactCard';
import { useAppDispatch } from '../Store/hooks';
import { deleteContact, enableDisableContactList } from '../Store/actions';

const Contacts = () => {
  const dispatch = useAppDispatch();
  const contacts = useSelector((state: RootState) => state.contacts); // Select contacts from the state
  const isContactsListVisible = useSelector((state: RootState) => state.contactsListVisible);
  const [createContactVisible, setCreateContactVisible] = useState(false); // State to toggle create contact form
  const [selectedIdForEdit, setSelectedIdForEdit] = useState<string | null>(null); // State to hold selected contact ID for editing

  // Memoize contacts list to avoid unnecessary re-renders
  const contactsLst = useMemo(() => Object.values(contacts), [contacts]);

  // Callback to handle edit and delete actions
  const handleEditAndDelete = useCallback(
    (type: string, id: string) => {
      if (type === 'edit') {
        setCreateContactVisible(true); // Show the create contact form for editing
        dispatch(enableDisableContactList(false)); // Hide the contact list
        setSelectedIdForEdit(id); // Set the ID of the contact to be edited
      } else if (type === 'delete') {
        dispatch(deleteContact(id)); // Dispatch action to delete contact
      }
    },
    [dispatch]
  );

  // Handler to show the create contact form and hide the contact list
  const handleCreateContactClick = () => {
    setCreateContactVisible(true);
    dispatch(enableDisableContactList(false));
  };

  return (
    <div className="mt-3 flex items-center flex-col">
      {/* Button to create a new contact, shown only if no contact is being created and no contacts are present */}
      {!createContactVisible && !contactsLst.length && (
        <button
          type="button" // Changed to button type to prevent form submission
          className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-base font-normal"
          onClick={handleCreateContactClick}
        >
          Create Contact
        </button>
      )}

      {/* Message shown if no contacts are present and no contact creation form is visible */}
      {!contactsLst.length && !createContactVisible && (
        <div className="p-4 bg-slate-100 shadow-slate-500 mt-5">
          ✘ No Contact Found. Please add a contact using the Create Contact button.
        </div>
      )}

      {/* CreateContact component shown if create contact form is visible and same for Edit */}
      {createContactVisible && (
        <CreateContact
          selectedContactDetails={contacts[selectedIdForEdit || '']} // Pass selected contact details for editing
          setSelectedIdForEdit={setSelectedIdForEdit} // Function to set the selected ID
          setCreateContactVisible={setCreateContactVisible} // Function to toggle the visibility of the create contact form
        />
      )}

      {/* Contact list and button to create new contact, shown only if contacts are visible and present */}
      {isContactsListVisible && contactsLst.length > 0 && (
        <>
          <button
            type="button"
            className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-base font-normal"
            onClick={handleCreateContactClick}
          >
            Create Contact
          </button>
          <div className="flex gap-4 flex-wrap mt-6 justify-center">
            {/* Render a ContactCard for each contact */}
            {contactsLst.map((contact) => (
              <ContactCard key={contact.id} contact={contact} handleOnClick={handleEditAndDelete} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Contacts;
