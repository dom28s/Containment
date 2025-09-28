import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import Layout from '../components/Layout.jsx';
import Model from '../components/Model.jsx';

function Containment() {
  const controlsRef = useRef();
  const [cameraview, setCameraview] = useState(null);
  const [feature, setFeature] = useState('overview');

  const tempPosition = [
    { PositionName: "Front Rack", PositionValue: "front" },
    { PositionName: "Back Rack", PositionValue: "back" },
  ];
  const [selectTempPostion, setSelectTempPosition] = useState(tempPosition[0].PositionValue);

  const handleSelectChange = (event) => {
    setSelectTempPosition(event.target.value);
  };

  const setCameraView = ({ position, target = [0, 0, 0], maxPolarAngle = 3.14 }) => {
    if (controlsRef.current) {
      controlsRef.current.object.position.set(...position);
      controlsRef.current.target.set(...target);
      controlsRef.current.maxPolarAngle = maxPolarAngle;
      controlsRef.current.update();
    }
  };

  const handleFeatureChange = (newFeature) => {
    if (newFeature === 'Temp') {
      setCameraView({ position: [15.00, 20.55, 0.00],zoom: 4.50, maxPolarAngle: 1.5  });
      setFeature('Temp');
    } else if (newFeature === 'overview') {
      setCameraView({ position:[14.31, 5.89, 13.79],zoom: 4.50, maxPolarAngle: 1.5 });
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
          onCreated={({ camera }) => setCameraview(camera)}
        >
          <ambientLight intensity={1} />
          <OrbitControls ref={controlsRef} maxPolarAngle={1.5} />
          <Environment preset="city" />
          <Model tempData={selectTempPostion} viewPosition={feature} />

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
            <select
              value={selectTempPostion}
              onChange={handleSelectChange}
            >
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
