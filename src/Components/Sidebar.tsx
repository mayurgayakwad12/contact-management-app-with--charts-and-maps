import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="flex flex-col w-[250px] sticky border-r h-screen">
      <Link to="/contacts" className="text-xl px-10 py-2 hover:bg-gray-300 underline">
        Contact
      </Link>
      <Link to="/charts" className="text-xl px-10 py-2 hover:bg-gray-300 underline">
        Charts and Maps
      </Link>
    </div>
  );
};

export default Sidebar;
