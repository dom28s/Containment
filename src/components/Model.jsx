import React, { useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { ConstNode } from 'three/webgpu';

const modelPath = '../../public/Models/testBlender.glb';



function SimpleModel({ props, tempData, viewPosition }) {
  const { nodes, materials } = useGLTF(modelPath);
  const [doorPosition, setDoorPosition] = useState({});

  useEffect(() => {
    for (const node in nodes) {
      if (nodes[node].name.toLowerCase().includes("door")) {
        console.log(nodes[node]);
      }
    }
  }, [nodes]);

  

  const handleClick = (e, node) => {
    e.stopPropagation();
    console.log(`Clicked on: ${node.name}`);
    if (node.name.toLowerCase().includes("door")) {

      console.log(node.position);
    } 
  };



  return (
    <group {...props} dispose={null}>
      {Object.entries(nodes).map(([key, node]) => {
        if (node.isMesh) {
          if (viewPosition == "Temp" && node.name.includes("roof")) return null
          const nodeNameLower = node.name.toLowerCase();
          

          const isSelected = tempData && node.name.toLowerCase().includes(tempData.toLowerCase());


          return (
            <mesh
              key={node.uuid}
              geometry={node.geometry}
              position={node.position}
              rotation={node.rotation}
              scale={node.scale}
              onClick={(e)=>handleClick(e, node)}
            >
              <meshStandardMaterial
                color={isSelected && viewPosition == "Temp" ? "green" : node.material?.color || materials[node.material?.name]?.color}
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