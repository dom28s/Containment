import React, { useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { ConstNode } from 'three/webgpu';

const modelPath = '../../public/Models/testBlender2.glb';



function SimpleModel({ props, tempData, viewPosition }) {
  const { nodes, materials } = useGLTF(modelPath);

  useEffect(() => {
    console.log(nodes);
    console.log(materials);
  })

  useEffect(() => {
    console.log(tempData);
  }, [tempData])

  return (
    <group {...props} dispose={null}>
      {Object.entries(nodes).map(([key, node]) => {
        if (node.isMesh) {
          if (viewPosition == "Temp" && node.name.includes("roof")) return null
          
          const isSelected = tempData && node.name.toLowerCase().includes(tempData.toLowerCase());
          
          return (
            <mesh
              key={node.uuid}
              geometry={node.geometry}
              position={node.position}
              rotation={node.rotation}
              scale={node.scale}
            >
              <meshStandardMaterial
                color={isSelected  && viewPosition == "Temp" ? "green" : node.material?.color || materials[node.material?.name]?.color}
              />
            </mesh>
          );
        }
        return null;
      })}
    </group>
  );
}

export default SimpleModel;