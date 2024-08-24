import React from 'react';

const ContactCard = (props: any) => {
  const { contact, handleOnClick } = props;

  return (
    <div className="p-4 shadow-xl rounded-lg w-[300px]">
      <div className="flex flex-col gap-3">
        <div className="flex flex-row gap-2 items-center w-full">
          <span className="text-gray-600 text-sm font-normal mb-2 w-20">First Name:</span>
          <span
            className="text-black-600 text-sm font-normal mb-2 w-32 truncate"
            title={contact.firstName}
          >
            {contact.firstName}
          </span>
        </div>

        <div className="flex flex-row gap-2 items-center w-full">
          <span className="text-gray-600 text-sm font-normal mb-2 w-20">Last Name:</span>
          <span
            className="text-black-600 text-sm font-normal mb-2 w-32 truncate"
            title={contact.lastName}
          >
            {contact.lastName}
          </span>
        </div>

        <div className="flex flex-row gap-2 items-center w-full">
          <span className="text-gray-600 text-sm font-normal w-20">Status:</span>
          <span className="text-black-600 text-sm font-normal w-32">{contact.status}</span>
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-gradient-to-b from-green-200 to-green-500 px-10 py-2 rounded text-white text-base font-normal"
            onClick={() => handleOnClick('edit', contact.id)}
          >
            Edit
          </button>
          <button
            type="submit"
            className="bg-gradient-to-b from-red-200 to-red-500 px-10 py-2 rounded text-white text-base font-normal"
            onClick={() => handleOnClick('delete', contact.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
