import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import Layout from '../components/Layout.jsx';
import Model from '../components/Model.jsx';

function CameraAnimator({ controlsRef, cameraGoal, onDone }) {
  useFrame(() => {
    if (!controlsRef.current || !cameraGoal) return;

    const cam = controlsRef.current.object;
    const target = controlsRef.current.target;

    const lerpSpeed = 0.03;

    // Lerp position
    cam.position.lerp(new THREE.Vector3(...cameraGoal.position), lerpSpeed);
    // Lerp target
    target.lerp(new THREE.Vector3(...cameraGoal.target), lerpSpeed);

    controlsRef.current.maxPolarAngle = cameraGoal.maxPolarAngle;
    controlsRef.current.update();

    // stop เมื่อใกล้พอ
    if (cam.position.distanceTo(new THREE.Vector3(...cameraGoal.position)) < 0.05) {
      onDone();
    }
  });
  return null;
}


function Containment() {
  const controlsRef = useRef();
  const [cameraGoal, setCameraGoal] = useState(null);
  const [feature, setFeature] = useState('overview');

  const tempPosition = [
    { PositionName: "Front Rack", PositionValue: "front" },
    { PositionName: "Back Rack", PositionValue: "back" },
  ];
  const [selectTempPostion, setSelectTempPosition] = useState(tempPosition[0].PositionValue);

  const handleSelectChange = (event) => {
    setSelectTempPosition(event.target.value);
  };

  const handleFeatureChange = (newFeature) => {
    if (newFeature === 'Temp') {
      setCameraGoal({
        position: [15.0, 20.55, 0.0],
        target: [0, 0, 0],
        maxPolarAngle: 1.5,
      });
      setFeature('Temp');
    } else if (newFeature === 'overview') {
      setCameraGoal({
        position: [14.31, 5.89, 13.79],
        target: [0, 0, 0],
        maxPolarAngle: 1.5,
      });
      setFeature('overview');
    }
  };

  const resetView = () => handleFeatureChange('overview');

  return (
    <Layout onFeatureChange={handleFeatureChange}>
      <div className='w-full flex-grow flex flex-row border justify-start relative'>
        <Canvas
          className='w-full h-full relative'
          camera={{ position: [14.31, 5.89, 13.79], zoom: 4.5 }}
        >
          <ambientLight intensity={1} />
          <OrbitControls ref={controlsRef} maxPolarAngle={1.5} />
          <Environment preset="city" />
          <Model tempData={selectTempPostion} viewPosition={feature} />

          {/* Animator ทำงานเฉพาะตอนเปลี่ยนมุมมอง */}
          {cameraGoal && (
            <CameraAnimator
              controlsRef={controlsRef}
              cameraGoal={cameraGoal}
              onDone={() => setCameraGoal(null)}
            />
          )}
        </Canvas>

        {/* Reset Button */}
        <div className='absolute top-10 left-4 z-10 bg-gray-100 p-2 rounded-lg shadow-md flex items-center text-gray-700'>
          <button
            onClick={resetView}
            className="px-4 py-1 bg-white border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition"
          >
            Reset
          </button>
        </div>

        {/* Temperature Dropdown */}
        {feature === 'Temp' && (
          <div className='flex flex-col w-[20%] h-full border bg-white p-4'>
            <h2>Temperature Chart</h2>
            <select value={selectTempPostion} onChange={handleSelectChange}>
              {tempPosition.map((temp, index) => (
                <option key={index} value={temp.PositionValue}>
                  {temp.PositionName}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Containment;
