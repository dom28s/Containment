import React, { useRef, useState } from 'react'
// import { Canvas, useFrame } from '@react-three/fiber' // useFrame ไม่ได้ใช้ในตัวอย่างนี้

export default function Box(props) {
  const meshRef = useRef(null)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  /**
   * ฟังก์ชันจัดการเมื่อผู้ใช้คลิกที่กล่อง
   * @param {object} event - Event object จาก React Three Fiber
   */
  const handleClick = (event) => {
    // 1. หยุด event ไม่ให้ propagate ไปยัง object อื่นๆ ที่อาจจะอยู่ข้างหลัง
    event.stopPropagation();

    // 2. ดึงค่า faceIndex ออกมา
    const faceIndex = event.faceIndex;
    
    // 3. คำนวณ Material Index (0-5) โดยการปัดลง (Floor)
    const materialIndex = Math.floor(faceIndex / 2);

    let sideName = '';

    // 4. ใช้ Material Index ในการระบุว่าคลิกโดนด้านไหน
    switch (materialIndex) {
      case 0:
        sideName = 'Right Side';
        break;
      case 1:
        sideName = 'Left Side';
        break;
      case 2:
        sideName = 'Top Side';
        break;
      case 3:
        sideName = 'Bottom Side';
        break;
      case 4:
        sideName = 'Front Side';
        break;
      case 5:
        sideName = 'Back Side';
        break;
      default:
        sideName = 'Unknown Side';
        break;
    }

    console.log(`Clicked on: ${sideName} (Material Index: ${materialIndex})`);
  };

  return (
    <mesh
      {...props}
      scale={3}
      onClick={handleClick} // 👈 เพิ่ม onClick Event Handler ที่นี่
      castShadow
      receiveShadow
    >
      <boxGeometry args={[1.7, 1, 1]} />
      {/* NOTE: ต้องใช้ array ของ materials เพื่อให้ faceIndex ถูกต้อง 
        แต่สำหรับกรณีนี้ เนื่องจากคุณต้องการแค่ Console Log จึงใช้ Material เดี่ยวได้
        เราใส่สีเพื่อให้เห็นชัดเจนว่าด้านไหนคือ 'Front'
      */}
      <meshStandardMaterial color={'#FF5733'} /> 
    </mesh >
  )
}
