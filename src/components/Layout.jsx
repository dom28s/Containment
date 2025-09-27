import React from 'react'
import SideBar from './SideBar.jsx'
import TopBar from './TopBar.jsx'

function Layout({ children, onFeatureChange }) { 
  return (
    // DIV แม่: พื้นหลังสีฟ้า (bg-blue-500)
    <div className='flex flex-row h-[95vh] w-[100%] border bg-blue-500'>
      
    
      
      {/* 2. CONTENT CONTAINER (80% Area): แก้ไขให้ใช้หน่วยสัมพันธ์ w-4/5 */}
      <div className='flex flex-col h-full w-5/5 bg-white'> 
        <TopBar onFeatureChange={onFeatureChange} />
        {children}
      </div>
    </div>
  )
}

export default Layout
