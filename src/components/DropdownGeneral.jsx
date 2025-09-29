import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Transition from '../utils/Transition';

/**
 * คอมโพเนนต์ Dropdown ที่ยืดหยุ่นที่สุด
 * @param {string} name - ข้อความสำหรับปุ่ม Dropdown (เช่น "User Settings" หรือ "Actions")
 * @param {('left'|'right')} align - ตำแหน่งการเปิด Dropdown (left หรือ right)
 * @param {Array<{to: string, label: string, onClick?: () => void, icon?: JSX.Element}>} items - รายการตัวเลือก
 */
function SimpleGenericDropdown({
  name,
  align = 'right', // ตั้งค่า default เป็น 'right'
  items 
}) {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef(null);
  const dropdown = useRef(null);

  // Logic ปิด Dropdown (on click outside)
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // Logic ปิด Dropdown (on Esc key press)
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  // ไอคอนเริ่มต้นแบบเรียบง่าย (Default Ellipsis/Kebab icon)
  const DefaultIcon = (
    <svg className="w-4 h-4 fill-current text-gray-500/80 dark:text-gray-400/80" viewBox="0 0 16 16">
      <path d="M7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM7 7c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM7 0C5.9 0 5 .9 5 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    </svg>
  );

//... โค้ดส่วนบน (Imports, Hooks, Logic ต่างๆ) ...

// ลบ DefaultIcon ออก หรือเก็บไว้ใช้ในกรณีอื่น

//... ในส่วนของ return (JSX) ...

  // 🟢 แก้ไข: เปลี่ยนการแสดงผลของปุ่ม 🟢
  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        // เปลี่ยนคลาส: ลบ w-8 h-8 และเพิ่ม padding และสไตล์ที่ต้องการ
        className={`flex items-center justify-center 
          bg-[#111827] border border-[#0ea5e9] rounded-md px-3 py-1 text-sm text-white 
          focus:ring-1 focus:ring-[#0ea5e9] hover:border-violet-500 
          ${dropdownOpen && 'ring-1 ring-[#0ea5e9]'}`} // สไตล์เมื่อเปิด
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <span className="truncate">{name}</span> {/* แสดง name ที่ส่งมา */}
        
        {/* 🟢 เพิ่มไอคอนลูกศร Dropdown 🟢 */}
        <svg 
          className="w-3 h-3 fill-current ml-1.5 text-gray-400 shrink-0" 
          viewBox="0 0 12 12" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5.4 6L3.9 4.5 4.5 3.9 6 5.4 7.5 3.9 8.1 4.5 6.6 6 8.1 7.5 7.5 8.1 6 6.6 4.5 8.1 3.9 7.5z" />
        </svg>

      </button>

      {/* 🟢 ปรับสไตล์ Dropdown List 🟢 */}
      <Transition
        className={`origin-top-left z-10 absolute top-full min-w-44 bg-gray-900 border border-gray-700/60 py-1.5 rounded-lg shadow-lg overflow-hidden mt-1 
          ${align === 'right' ? 'right-0' : 'left-0'}`} // เปลี่ยน bg/border ให้เป็น Dark Mode ตามต้นฉบับ
        show={dropdownOpen}
        //... (Transition Props อื่นๆ เหมือนเดิม) ...
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          {/* ลบ Title/Name Header หรือปรับให้เข้ากับ Dark Mode */}
          {/* <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase pt-1.5 pb-2 px-3">{name}</div> */}
          
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                <Link
                  // ปรับสไตล์รายการให้เข้ากับ Dark Mode (ถ้าต้องการ)
                  className="font-medium text-sm text-white hover:text-[#0ea5e9] flex items-center py-1 px-3 bg-gray-900 hover:bg-gray-800"
                  to={item.to}
                  onClick={(e) => {
                    setDropdownOpen(false);
                    if (item.onClick) {
                      e.preventDefault(); 
                      item.onClick();
                    }
                  }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Transition>
    </div>
  )
}

export default DropdownGeneral;