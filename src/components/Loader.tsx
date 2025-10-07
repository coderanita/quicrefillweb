import React from 'react';
import { HashLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-[#FFC533] to-[#FFB600]">
      <HashLoader color="#000000" size={80} />
      <p className="mt-4 text-black font-semibold text-lg animate-pulse">Loading...</p>
    </div>

  );
};

export default Loader;
