import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useAppDispatch } from '../Store/hooks';
import { addContact, editContact, enableDisableContactList } from '../Store/actions';
import { Contact } from '../Store/types';
import { generateUniqueId } from './utils';

interface CreateContactProps {
  setCreateContactVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedContactDetails: Contact | null;
  setSelectedIdForEdit: React.Dispatch<React.SetStateAction<string | null>>;
}

const CreateContact: React.FC<CreateContactProps> = ({
  selectedContactDetails,
  setSelectedIdForEdit,
  setCreateContactVisible,
}) => {
  const [formData, setFormData] = useState<Contact>({
    id: '',
    firstName: '',
    lastName: '',
    status: 'Active',
  });

  // Custom hook to access dispatch
  const dispatch = useAppDispatch();

  // Effect to populate form data when editing an existing contact
  useEffect(() => {
    if (selectedContactDetails) {
      setFormData(selectedContactDetails);
    }
  }, [selectedContactDetails]);

  // Handle input changes in the form
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value as 'Active' | 'Inactive' | string, // Ensure status is correctly typed
    });
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (formData.id && selectedContactDetails) {
      // If editing an existing contact
      dispatch(editContact(formData.id, formData));
      setSelectedIdForEdit(null); // Clear the selected ID
    } else {
      // If creating a new contact
      const uniqueId = generateUniqueId(); // Generate a unique ID
      dispatch(addContact({ ...formData, id: uniqueId })); // Dispatch action to add contact
    }

    // Reset form data and update visibility
    setFormData({ id: '', firstName: '', lastName: '', status: 'Active' });
    dispatch(enableDisableContactList(true)); // Show contact list
    setCreateContactVisible(false); // Hide create contact form
  };

  return (
    <div className="w-[450px] relative flex flex-col p-4 rounded-md text-black shadow-xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* First Name Input */}
        <div className="flex flex-row gap-2 items-center w-full">
          <label htmlFor="firstName" className="text-gray-600 text-base font-normal mb-2 w-32">
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
            className="flex-grow rounded border border-gray-200 text-base w-full font-normal leading-[18px] text-black p-[11px] outline-none"
          />
        </div>

        {/* Last Name Input */}
        <div className="flex flex-row gap-2 items-center w-full">
          <label htmlFor="lastName" className="text-gray-600 text-base font-normal mb-2 w-32">
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
            className="flex-grow rounded border border-gray-200 text-base w-full font-normal leading-[18px] text-black p-[11px] outline-none"
          />
        </div>

        {/* Status Radio Buttons */}
        <div className="flex flex-row gap-2 items-center w-full">
          <label className="text-gray-600 text-base font-normal w-24">Status:</label>
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

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#7747ff] px-6 py-2 rounded text-white text-base font-normal"
        >
          {selectedContactDetails ? 'Save Edited Contact' : 'Save Contact'}
        </button>
      </form>
    </div>
  );
};

export default CreateContact;
