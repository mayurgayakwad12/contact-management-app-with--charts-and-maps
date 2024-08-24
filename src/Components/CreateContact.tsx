import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useAppDispatch } from '../Store/hooks'; // Custom hook for dispatch
import { addContact, editContact } from '../Store/actions';
import { Contact } from '../Store/types';
import { generateUniqueId } from './utils';
type VisibleState = {
  create: boolean;
  showListOfContacts: boolean;
};
interface CreateContactProps {
  setVisible: React.Dispatch<React.SetStateAction<VisibleState>>;
  selectedContactDetails: object;
  setSelectedIdForEdit: React.Dispatch<React.SetStateAction<string>>;
}

const CreateContact: React.FC<CreateContactProps> = (props: any) => {
  const { selectedContactDetails, setSelectedIdForEdit, setVisible } = props;
  const [formData, setFormData] = useState<Contact>({
    id: '',
    firstName: '',
    lastName: '',
    status: 'Active',
  });

  // useSelector to access the store state
  const dispatch = useAppDispatch();

  // useEffect to set the selected edit data to the form
  useEffect(() => {
    if (selectedContactDetails) {
      setFormData(selectedContactDetails);
    }
  }, [selectedContactDetails]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value as 'Active' | 'Inactive' | string,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.id && selectedContactDetails) {
      dispatch(editContact(formData.id, formData));
      // set empty '' to clear the the selected edit id
      setSelectedIdForEdit('');
    } else {
      const uniqueId = generateUniqueId();
      dispatch(addContact({ ...formData, id: uniqueId })); // Dispatch action
    }
    setFormData({ id: '', firstName: '', lastName: '', status: 'Active' }); // Reset form
    setVisible((prevState: any) => ({
      ...prevState,
      create: false,
      showListOfContacts: true,
    }));
  };

  return (
    <>
      <div>
        <div className="w-[450px] relative flex flex-col p-4 rounded-md text-black shadow-xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-row gap-2 items-center w-full">
              <label htmlFor="firstName" className="text-gray-600 text-sm font-normal mb-2 w-32">
                First Name:
              </label>
              <input
                required
                autoComplete="off"
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="flex-grow rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black p-[11px] outline-none"
              />
            </div>

            <div className="flex flex-row gap-2 items-center w-full">
              <label htmlFor="lastName" className="text-gray-600 text-sm font-normal mb-2 w-32">
                Last Name:
              </label>
              <input
                required
                autoComplete="off"
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="flex-grow rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black p-[11px] outline-none"
              />
            </div>

            <div className="flex flex-row gap-2 items-center w-full">
              <label className="text-gray-600 text-sm font-normal w-24">Status:</label>
              <div>
                <label className="flex items-center cursor-pointer">
                  <input
                    name="status"
                    type="radio"
                    value="Active"
                    checked={formData.status === 'Active'}
                    onChange={handleInputChange}
                  />
                  <span className="ml-2">Active</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    name="status"
                    type="radio"
                    value="Inactive"
                    checked={formData.status === 'Inactive'}
                    onChange={handleInputChange}
                  />
                  <span className="ml-2">Inactive</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal"
            >
              {selectedContactDetails ? 'Save Editted Contact' : 'Save Contact'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateContact;
