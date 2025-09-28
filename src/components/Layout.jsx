import React, { useState } from 'react';
import TopBar from './TopBar.jsx';

function Layout({ children, onFeatureChange }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="flex flex-row h-screen w-full bg-[#111827] text-white font-sans">
      <div className="flex flex-col h-full w-full">
        <TopBar onFeatureChange={onFeatureChange} onMenuToggle={toggleMenu} />
        {children}
      </div>
    </div>
  );
}

export default Layout;
