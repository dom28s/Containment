
import React, { useState } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three';

// --- การตั้งค่าสีสำหรับไฮไลท์ ---
const HIGHLIGHT_COLOR = 'green';
// สร้าง Material สีเขียวล่วงหน้า (สำหรับ Mesh ที่ถูกคลิก)
const highlightMaterial = new THREE.MeshStandardMaterial({ color: HIGHLIGHT_COLOR });


export default function RackModel(props) {
  // โหลดโมเดล 3D และดึงข้อมูลชิ้นส่วน (nodes) และวัสดุ (materials)
  const { nodes, materials } = useGLTF('/rack2.gltf')
  
  // State: เก็บชื่อของ Mesh ที่ถูกคลิกไฮไลท์ หากไม่มีการคลิกจะเป็น null
  const [highlightedMesh, setHighlightedMesh] = useState(null);

  const handleClick = (event, name) => {
    event.stopPropagation(); 
  
    setHighlightedMesh(prev => prev === name ? null : name);
    
    console.log(`Clicked Mesh: ${name}. Highlight Toggled.`);
  };
  

  const renderMesh = (name, defaultMaterial, position = [0, 0, 0]) => {
      // ตรวจสอบว่า Mesh นี้คือชิ้นที่ถูกไฮไลท์อยู่หรือไม่
      const isHighlighted = highlightedMesh === name;

      return (
          <mesh 
              key={name}
              geometry={nodes[name].geometry} 
              position={position}
              // ถ้าถูกไฮไลท์ (isHighlighted เป็น true) ใช้สีเขียว, ไม่อย่างนั้นใช้สีเดิม
              material={isHighlighted ? highlightMaterial : defaultMaterial} 
              onClick={(e) => handleClick(e, name)}
              castShadow // เปิดใช้งานเงา
              receiveShadow // เปิดใช้งานการรับเงา
          />
      );
  };

  return (
    <group {...props} dispose={null}>
      {/* Group หลักสำหรับโมเดล (ปรับ Rotation และ Scale) */}
      <group rotation={[-Math.PI / 2, 0, 0]} scale={1}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          
          {/* ชิ้นส่วนหลักของ Rack (Base Materials) */}
          {renderMesh('Object_4', materials.BaseMaterials)}
          {renderMesh('Object_4_4', materials.BaseMaterials, [0.719, 0, 0])}
          {renderMesh('Object_4_5', materials.BaseMaterials, [1.438, 0, 0])}

          {/* ชิ้นส่วน Decals (ป้าย) */}
          {renderMesh('Object_6', materials.VR3100_Decals)}
          
          {/* ชิ้นส่วน Base Materials อื่นๆ */}
          {renderMesh('Object_7', materials.BaseMaterials)}
          
          {/* ชิ้นส่วน Grid (ตะแกรง) */}
          {renderMesh('Object_9', materials.VR3100_Grid)}
          {renderMesh('Object_9_5', materials.VR3100_Grid, [0.605, 0, 0])}
          {renderMesh('Object_9_6', materials.VR3100_Grid, [1.21, 0, 0])}

        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/rack2.gltf')
