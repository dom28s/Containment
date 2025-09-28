import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import Layout from '../components/Layout.jsx';
import Model from '../components/Model.jsx'; // ตรวจสอบให้แน่ใจว่า import ถูกต้อง
import { select } from 'three/tsl';
import { useState } from 'react';
function Containment() {
    const controlsRef = useRef();

    const [feature, setFeature] = React.useState('overview');
    const tempPosition = ["Front Rack", "Back Rack"];
    const [selectTempPostion, setSelectTempPosition] = useState(tempPosition[0]);

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
            setCameraView({
                position: [0, 20, 0],
            });
            setFeature('Temp');

        } else if (newFeature === 'overview') {
            setCameraView({
                position: [10, 5, 8],
                maxPolarAngle: 1.5 // อนุญาตให้หมุนได้
            });
            setFeature('overview');
        }
    };

    const handleSelectChange = (event) => {
        const newValue = event.target.value;
        setSelectTempPosition(newValue);
    };

    const resetView = () => {
        handleFeatureChange('overview');
    };

    return (
        <Layout onFeatureChange={handleFeatureChange}>
            <div className='w-full flex-grow flex flex-row border justify-start relative'>

                <Canvas
                    className='w-full h-full relative'
                    camera={{ position: [16, 8, 8], zoom: 4.5 }}
                >
                    <ambientLight intensity={1} />
                    <OrbitControls ref={controlsRef} maxPolarAngle={1.5} />
                    <Environment preset="city" />
                    <Model tempData={selectTempPostion} />
                </Canvas>

                {/* 3. ปุ่ม Reset ที่ถูกตรึงอยู่ด้านบนซ้ายของ Canvas (Absolute Positioning) */}
                <div className='absolute top-10 left-4 z-10 bg-gray-100 p-2 rounded-lg shadow-md flex items-center text-gray-700'>
                    <button
                        onClick={resetView}
                        className="px-4 py-1 bg-white border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition"
                    >
                        Reset
                    </button>
                </div>

                {feature === 'Temp' && (
                    <div className='flex flex-col w-[20%] h-full border bg-white p-4'>
                        <h2>Temperature Data</h2>
                        <select
                            value={selectTempPostion}
                            onChange={handleSelectChange} // ใช้ฟังก์ชันที่แก้ไขแล้ว
                        >
                            {tempPosition.map((temp, index) => (
                                <option
                                    key={index}
                                    value={temp}
                                >
                                    {temp}
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