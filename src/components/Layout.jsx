
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
        <div className='flex flex-row h-[95vh] w-[100%] border bg-blue-500'>
            

            
            {/* 3. Content Container (ไม่ถูกดัน) */}
            <div className={`flex flex-col h-full bg-white w-full`}> 
                <TopBar onFeatureChange={onFeatureChange} onMenuToggle={toggleMenu} /> 
                {children}
            </div>
        </div>
    );
}

export default Layout;