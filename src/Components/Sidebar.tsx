import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="flex w-full sm:w-[250px] border-b lg:border-b-0 lg:border-r lg:flex-col lg:h-screen">
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
