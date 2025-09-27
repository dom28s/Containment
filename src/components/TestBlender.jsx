/*
Refactored to use a reusable renderMesh function, similar to the RackModel structure, 
for cleaner rendering and consistent highlight logic across all imported GLTF nodes.
*/

import React, { useState } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// --- Highlight Color Setting ---
const HIGHLIGHT_COLOR = '#00ff00'; // Green color
const highlightMaterial = new THREE.MeshStandardMaterial({ 
    color: HIGHLIGHT_COLOR, 
    emissive: HIGHLIGHT_COLOR, 
    emissiveIntensity: 2.0, // เพิ่มความเข้มของแสง Emissive เพื่อให้สีเขียวชัดเจนขึ้น
    roughness: 0.5,
    metalness: 0.5
});


export default function TestBlenderModel(props) {
  // Load nodes and materials
  const { nodes, materials } = useGLTF('/testBlender.glb');
  // State: Stores the name of the currently highlighted Mesh
  const [highlightedMesh, setHighlightedMesh] = useState(null);

  // Click handler function
  const handleClick = (event, name) => {
    event.stopPropagation(); 
    // Toggle highlight state
    setHighlightedMesh(prev => prev === name ? null : name);
    console.log(`Clicked Mesh: ${name}. Highlight Toggled.`);
  };
  
  /**
   * Reusable function to render a single mesh, apply highlight material,
   * and pass geometry/transformation properties from the loaded node.
   * * @param {string} name - The name of the node (e.g., 'Cube001').
   * @param {THREE.Material} defaultMaterial - The original material for the node.
   * @param {boolean} useNodeMaterial - True if the original material is attached directly to the node (nodes[name].material).
   */
  const renderMesh = (name, defaultMaterial, useNodeMaterial = false) => {
      const node = nodes[name];
      if (!node || !node.geometry) return null;

      // Check if this mesh is the highlighted one
      const isHighlighted = highlightedMesh === name;

      // Determine the material to use based on the highlight state
      let currentMaterial;
      if (isHighlighted) {
          currentMaterial = highlightMaterial;
      } else {
          // If specified, use the material defined directly on the node (nodes[name].material)
          currentMaterial = useNodeMaterial ? node.material : defaultMaterial;
      }
      
      // We use the spread operator {...node} to automatically apply 
      // position, rotation, and scale from the GLTF output.
      return (
          <mesh 
              key={name}
              geometry={node.geometry} 
              onClick={(e) => handleClick(e, name)}
              {...node}
              // 💡 FIX: Apply material={currentMaterial} LAST to ensure it overrides 
              // the original material property spread from {...node}
              material={currentMaterial} 
              castShadow 
              receiveShadow 
          />
      );
  };
  
  // Meshes using the common 'materials.Material'
  const baseMaterialMeshes = ['Cube', 'Cube030'];

  // Meshes using their own specific material (nodes[name].material)
  const nodeMaterialMeshes = [
      'Cube001', 'Cube002', 'Cube003', 'Cube004', 'Cube005', 'Cube006', 'Cube007', 
      'Cube008', 'Cube009', 'Cube010', 'Cube011', 'Cube012', 'Cube013', 
      'Cube014', 'Cube015', 'Cube016', 'Cube017', 'Cube018', 'Cube019', 
      'Cube020', 'Cube021', 'Cube022', 'Cube023', 'Cube024', 'Cube025',
      'Cube026', 'Cube027', 'Cube028', 'Cube029', 'Cube031'
  ];


  return (
    <group {...props} dispose={null}>
        
        {/* Render Meshes using the common 'materials.Material' */}
        {baseMaterialMeshes.map(name => 
            renderMesh(name, materials.Material, false)
        )}

        {/* Render Meshes using their node-specific material (nodes[name].material) */}
        {nodeMaterialMeshes.map(name => 
            renderMesh(name, undefined, true) 
        )}

    </group>
  )
}

useGLTF.preload('/testBlender.glb')
