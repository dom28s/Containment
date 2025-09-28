import React from 'react'

function SideBar() {
  return (
    // ให้ใช้ h-full ที่ส่งมาจาก Layout 
    <div className='h-full border flex flex-col items-center bg-gray-800 text-white p-4'>
      <h1>Sidebar</h1>
      <p className='text-sm mt-4'>Menu Content</p>
    </div>
  )
}

export default SideBar