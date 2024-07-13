import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-24 h-24 flex justify-center items-center rounded-full bg-gradient-to-t from-white to-[#7e7c7c] animate-spin">
        <div className="w-5/6 h-5/6 bg-white rounded-full"></div>
      </div>
    </div>
  );
};

export default Loader;
