
import React, { useEffect, useState } from 'react'

function TopBar({ onFeatureChange }) { 
    const [selectFeature, setSelectFeature] = useState(null);

    const handleChange = (event) => {
        const selectedValue = event.target.value;
        setSelectFeature(selectedValue);
        if (onFeatureChange) {
            onFeatureChange(selectedValue);
        }
    };

    
    return (
        <div className='flex flex-row justify-between items-center' >
            <select >
                <option value="">Select Room</option>
                <option value="Sever Room">Sever Room</option>
                <option value="Toll Room">Toll Room</option>
            </select>
            <h1>Overview</h1>
            <select onChange={handleChange} >
                <option value="">Select Feature</option>
                <option value="Temp">Temperature</option>
                <option value="overview">Overview</option>
            </select>
        </div>
    )
}

export default TopBar