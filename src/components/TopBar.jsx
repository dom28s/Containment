import React, { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";

// รับ Prop ใหม่: onMenuToggle
function TopBar({ onFeatureChange, onMenuToggle }) {
    const [selectFeature, setSelectFeature] = useState(null);

    const handleChange = (event) => {
        const selectedValue = event.target.value;
        setSelectFeature(selectedValue);
        if (onFeatureChange) {
            onFeatureChange(selectedValue);
        }
    };

    return (
        <div className='flex flex-row justify-between items-center p-2  h-[10%] ' >
            <div className='flex flex-row items-center w-[20%] justify-between'>
                {/* ผูก onClick เข้ากับ onMenuToggle */}
                <GiHamburgerMenu 
                    onClick={onMenuToggle} 
                    className="cursor-pointer text-2xl ml-2" 
                />
                <select className='bg-gray-800' >
                    <option value="">Select Room</option>
                    <option value="Sever Room">Sever Room</option>
                    <option value="Toll Room">Toll Room</option>
                </select>
            </div>
            <select className='bg-gray-800' onChange={handleChange} >
                <option value="">Select Feature</option>
                <option value="Temp">Temperature</option>
                <option value="overview">Overview</option>
            </select>
        </div>
    )
}

export default TopBar