import React, { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";

function TopBar({ onFeatureChange, onMenuToggle }) {
  const [selectFeature, setSelectFeature] = useState(null);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectFeature(selectedValue);
    if (onFeatureChange) onFeatureChange(selectedValue);
  };

  return (
    <div className='flex flex-row justify-between items-center px-4 py-2 bg-[#1f2937] shadow-md h-[10%]'>
      <div className='flex flex-row items-center gap-4'>
        <GiHamburgerMenu  className="cursor-pointer text-2xl text-[#0ea5e9]" />
        <select className='bg-[#111827] border border-[#0ea5e9] rounded-md px-2 py-1 text-sm text-white focus:ring-1 focus:ring-[#0ea5e9]'>
          <option value="">Select Room</option>
          <option value="Sever Room">Sever Room</option>
          <option value="Toll Room">Toll Room</option>
        </select>
      </div>

      <select 
        className='bg-[#111827] border border-[#0ea5e9] rounded-md px-2 py-1 text-sm text-white focus:ring-1 focus:ring-[#0ea5e9]'
        onChange={handleChange}
      >
        <option value="">Select Feature</option>
        <option value="Temp">Temperature</option>
        <option value="overview">Overview</option>
      </select>
    </div>
  );
}

export default TopBar;
