import React, { useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { ConstNode } from 'three/webgpu';

const modelPath = '../../public/Models/testBlender.glb';


function ClickablePart({ geometry, originalMaterial, ...props }) {

  const [clicked, setClicked] = useState(false);
  const color = clicked ? 'green' : originalMaterial.color;


  return (
    <mesh
      geometry={geometry}
      onClick={(event) => {
        event.stopPropagation(); // สำคัญ: ป้องกันการคลิกซ้ำซ้อน
        setClicked(!clicked);    // สลับสถานะ
        console.log(event.object.uuid);
      }}
      visible={!clicked}
      {...props}
    >
      <meshStandardMaterial
        color={color}
      />
    </mesh>
  );
}

function SimpleModel({ props, tempData }) {
  const { nodes, materials } = useGLTF(modelPath);

  useEffect(() => {
    console.log(nodes);
    console.log(materials);
  })

  useEffect(() => {
    console.log("Temp Positionddddddddddddddddddddddddddddddddddd", tempData);
    console.log(tempData);
  }, [tempData]);

  // ใช้การวนซ้ำ (Map) ผ่าน Object.values(nodes) เหมือนเดิม
  return (
    <group {...props} dispose={null}>
      {Object.values(nodes).map((node) => {
        // กรองเอาเฉพาะ Object ที่เป็น Mesh
        if (node.isMesh) {
          // ส่งข้อมูลที่จำเป็นทั้งหมดไปให้ ClickablePart
          return (
            <ClickablePart
              key={node.uuid}
              geometry={node.geometry}
              originalMaterial={node.material || materials[node.material.name]}
              position={node.position}
              rotation={node.rotation}
              scale={node.scale}
            />
          );
        }
        return null;
      })}
    </group>
  );
}

export default SimpleModel;