
import React, { useEffect, useState } from 'react'; 
import SideBar from './SideBar.jsx';
import TopBar from './TopBar.jsx';
import { div } from 'three/tsl';

function Layout({ children, onFeatureChange }) { 
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
      console.log(isMenuOpen);
    })

    return (
<div className="flex flex-row h-[95vh] w-full border bg-gray-800">
          
            <div className={`flex flex-col h-full  w-full`}> 
                <TopBar onFeatureChange={onFeatureChange} onMenuToggle={toggleMenu} /> 
                {children}
            </div>
        </div>
    );
}

export default Layout;