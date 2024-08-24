import React, { useMemo, useState } from 'react';
import { RootState } from '../Store/store'; // Import RootState
import { useSelector } from 'react-redux';
import CreateContact from '../Components/CreateContact';
import ContactCard from '../Components/ContactCard';
import { useAppDispatch } from '../Store/hooks';
import { deleteContact } from '../Store/actions';

const Contacts = () => {
  const dispatch = useAppDispatch();
  const contacts = useSelector((state: RootState) => state.contacts);
  const [visible, setVisible] = useState({
    create: false,
    showListOfContacts: false,
  });
  const [selectedIdForEdit, setSelectedIdForEdit] = useState('');

  const contactsLst = useMemo(() => Object.values(contacts), [contacts]);

  const handleEditAndDelete = (type: string, id: string) => {
    console.log({ type });
    if (type === 'edit') {
      setVisible((prevState) => ({
        ...prevState, // spread the previous state
        create: true, // update specific fields
        showListOfContacts: false,
      }));
      setSelectedIdForEdit(id);
    }
    if (type === 'delete') {
      dispatch(deleteContact(id)); // Dispatch action
    }
  };
  return (
    <div className="mt-3 flex items-center flex-col">
      {!visible.create && !contactsLst.length && (
        <>
          <button
            type="submit"
            className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal"
            onClick={() =>
              setVisible((prevState) => ({
                ...prevState,
                create: true,
              }))
            }
          >
            Create Contact
          </button>
        </>
      )}
      {!contactsLst.length && !visible.create && (
        <div className="p-4 bg-slate-100 shadow-slate-500 mt-5">
          ✘ No Contact Found Please Add Contact from Create Contact Button
        </div>
      )}

      {visible.create && (
        <CreateContact
          selectedContactDetails={contacts[selectedIdForEdit]}
          setSelectedIdForEdit={setSelectedIdForEdit}
          setVisible={setVisible}
        />
      )}
      {visible.showListOfContacts && !!contactsLst.length && (
        <>
          <button
            type="submit"
            className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal"
            onClick={() =>
              setVisible((prevState) => ({
                ...prevState,
                create: true,
                showListOfContacts: false,
              }))
            }
          >
            Create Contact
          </button>
          <div className="flex gap-4 flex-wrap mt-6 justify-center">
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
