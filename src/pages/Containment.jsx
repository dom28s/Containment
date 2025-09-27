import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
// import Box from '../components/Box.jsx' // ไม่ได้ใช้งานแล้ว
import Layout from '../components/Layout.jsx';
import Rack2 from '../components/Rack2.jsx';

function Containment() {
    const controlsRef = useRef();

    const [feature, setFeature] = React.useState('overview');

    // ฟังก์ชันย่อยสำหรับเปลี่ยนมุมกล้อง
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

    const resetView = () => {
        handleFeatureChange('overview');
    };

    return (
        <Layout onFeatureChange={handleFeatureChange}>
            {/* 1. กำหนด relative ให้กับ Container แม่ เพื่อให้ปุ่ม Reset อ้างอิงตำแหน่งได้ */}
            <div className='w-[100%] flex-grow flex flex-row border justify-start relative'>
                <Canvas
                    className='flex flex-grow h-[100%] relative'
                    camera={{ position: [16, 8, 8], zoom: 4.5 }}
                >
                    <ambientLight intensity={4} />
                    <OrbitControls ref={controlsRef} maxPolarAngle={1.5} />
                    <Environment preset="city" />
                    <Rack2 />
                </Canvas>

                {/* 2. ปุ่ม Reset ที่ถูกตรึงอยู่ด้านบนซ้ายของ Canvas */}
                <div className='absolute top-10 left-4 z-10 bg-gray-100 p-2 rounded-lg shadow-md flex items-center text-gray-700'>
                    <button
                        onClick={resetView}
                        className="px-4 py-1 bg-white border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition"
                    >
                        Reset
                    </button>
                </div>

                {/* Panel ด้านข้างสำหรับ Chart */}
                {feature === 'Temp' && (
                    <div className='flex flex-col w-[20%] h-full border bg-white p-4'>
                    </div>
                )}
            </div>

            {/* ปุ่ม Reset ด้านล่าง (ซ่อนไว้เนื่องจากมีปุ่ม Reset ด้านบนแล้ว) */}
            {feature != 'Temp' && (
                <div className='h-[10%] bg-gray-100 border w-full flex items-center justify-center text-gray-700 hidden'>
                    <button onClick={resetView}>Reset</button>
                </div>
            )}
        </Layout>
    );
}

export default Containment;
