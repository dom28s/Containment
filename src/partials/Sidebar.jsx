import React, { useState, useEffect, useRef } from "react";

function SidebarLinkGroup({ activecondition, children }) {
  const [open, setOpen] = useState(activecondition);
  
  const handleClick = () => {
    setOpen(!open);
  };

  return children(handleClick, open);
}

function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  
  const trigger = useRef(null);
  const sidebar = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-gray-900/30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-auto no-scrollbar shrink-0 bg-white dark:bg-gray-800 transition-all duration-200 ease-in-out border-r border-gray-200 dark:border-gray-700/60 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        } ${sidebarExpanded ? "w-64" : "w-20"}`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between items-center p-4 mb-6">
          {/* Close button (mobile) */}
          <button
            ref={trigger}
            className="lg:hidden text-gray-500 hover:text-gray-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          
          {/* Logo */}
          <div className={`${sidebarExpanded ? '' : 'mx-auto'}`}>
            <svg className="fill-violet-500" xmlns="http://www.w3.org/2000/svg" width={32} height={32}>
              <path d="M31.956 14.8C31.372 6.92 25.08.628 17.2.044V5.76a9.04 9.04 0 0 0 9.04 9.04h5.716ZM14.8 26.24v5.716C6.92 31.372.63 25.08.044 17.2H5.76a9.04 9.04 0 0 1 9.04 9.04Zm11.44-9.04h5.716c-.584 7.88-6.876 14.172-14.756 14.756V26.24a9.04 9.04 0 0 1 9.04-9.04ZM.044 14.8C.63 6.92 6.92.628 14.8.044V5.76a9.04 9.04 0 0 1-9.04 9.04H.044Z" />
            </svg>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 px-3">
          <nav className="space-y-2">
            {/* Dashboard */}
            <SidebarLinkGroup activecondition={activeSection === 'dashboard'}>
              {(handleClick, open) => (
                <div>
                  <button
                    onClick={() => {
                      handleClick();
                      setActiveSection('dashboard');
                      if (!sidebarExpanded) setSidebarExpanded(true);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      activeSection === 'dashboard'
                        ? 'bg-violet-500 text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <svg className="shrink-0 fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
                      <path d="M5.936.278A7.983 7.983 0 0 1 8 0a8 8 0 1 1-8 8c0-.722.104-1.413.278-2.064a1 1 0 1 1 1.932.516A5.99 5.99 0 0 0 2 8a6 6 0 1 0 6-6c-.53 0-1.045.076-1.548.21A1 1 0 1 1 5.936.278Z" />
                      <path d="M6.068 7.482A2.003 2.003 0 0 0 8 10a2 2 0 1 0-.518-3.932L3.707 2.293a1 1 0 0 0-1.414 1.414l3.775 3.775Z" />
                    </svg>
                    {sidebarExpanded && (
                      <span className="text-sm font-medium whitespace-nowrap">Dashboard</span>
                    )}
                    {sidebarExpanded && (
                      <svg className={`ml-auto w-3 h-3 shrink-0 fill-current transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 12 12">
                        <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                      </svg>
                    )}
                  </button>
                  
                  {sidebarExpanded && open && (
                    <div className="pl-11 mt-1 space-y-1">
                      <a href="#" className="block py-1 text-sm text-violet-500">Main</a>
                      <a href="#" className="block py-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400">Analytics</a>
                      <a href="#" className="block py-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400">Fintech</a>
                    </div>
                  )}
                </div>
              )}
            </SidebarLinkGroup>

            


            {/* Boxes */}
            <button
              onClick={() => setActiveSection('boxes')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                activeSection === 'boxes'
                  ? 'bg-violet-500 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <svg className="shrink-0 fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
                <path d="M2.5 1A1.5 1.5 0 0 0 1 2.5v11A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-11A1.5 1.5 0 0 0 13.5 1h-11zm5 2v4.5h-4v-4.5h4zm2 0h4v4.5h-4v-4.5zm-2 6.5v4.5h-4v-4.5h4zm2 0h4v4.5h-4v-4.5z"/>
              </svg>
              {sidebarExpanded && <span className="text-sm font-medium whitespace-nowrap">Boxes</span>}
            </button>

            {/* Settings */}
            <SidebarLinkGroup activecondition={activeSection === 'settings'}>
              {(handleClick, open) => (
                <div>
                  <button
                    onClick={() => {
                      handleClick();
                      setActiveSection('settings');
                      if (!sidebarExpanded) setSidebarExpanded(true);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      activeSection === 'settings'
                        ? 'bg-violet-500 text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <svg className="shrink-0 fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
                      <path d="M10.5 1a3.502 3.502 0 0 1 3.355 2.5H15a1 1 0 1 1 0 2h-1.145a3.502 3.502 0 0 1-6.71 0H1a1 1 0 0 1 0-2h6.145A3.502 3.502 0 0 1 10.5 1ZM9 4.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM5.5 9a3.502 3.502 0 0 1 3.355 2.5H15a1 1 0 1 1 0 2H8.855a3.502 3.502 0 0 1-6.71 0H1a1 1 0 1 1 0-2h1.145A3.502 3.502 0 0 1 5.5 9ZM4 12.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0Z" fillRule="evenodd" />
                    </svg>
                    {sidebarExpanded && (
                      <span className="text-sm font-medium whitespace-nowrap">Settings</span>
                    )}
                    {sidebarExpanded && (
                      <svg className={`ml-auto w-3 h-3 shrink-0 fill-current transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 12 12">
                        <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                      </svg>
                    )}
                  </button>
                  
                  {sidebarExpanded && open && (
                    <div className="pl-11 mt-1 space-y-1">
                      <a href="#" className="block py-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400">My Account</a>
                      <a href="#" className="block py-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400">Notifications</a>
                      <a href="#" className="block py-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400">Connected Apps</a>
                      <a href="#" className="block py-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400">Plans</a>
                    </div>
                  )}
                </div>
              )}
            </SidebarLinkGroup>
          </nav>
        </div>

        {/* Toggle button at bottom */}
        <div className="p-3 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setSidebarExpanded(!sidebarExpanded)}
            className="w-full flex items-center justify-center py-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <svg 
              className={`fill-current transform transition-transform ${sidebarExpanded ? 'rotate-180' : ''}`} 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 16 16"
            >
              <path d="M15 16a1 1 0 0 1-1-1V1a1 1 0 1 1 2 0v14a1 1 0 0 1-1 1ZM8.586 7H1a1 1 0 1 0 0 2h7.586l-2.793 2.793a1 1 0 1 0 1.414 1.414l4.5-4.5A.997.997 0 0 0 12 8.01M11.924 7.617a.997.997 0 0 0-.217-.324l-4.5-4.5a1 1 0 0 0-1.414 1.414L8.586 7M12 7.99a.996.996 0 0 0-.076-.373Z" />
            </svg>
          </button>
        </div>
      </div>


    </div>
  );
}

export default Sidebar;