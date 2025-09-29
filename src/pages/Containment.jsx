import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import Layout from "../components/Layout.jsx";
import Model from "../components/Model.jsx";

// import { IoThermometerOutline } from "react-icons/io5";
// import { HiOutlineFire, HiOutlineLightBulb } from "react-icons/hi2";
// import { MdOutlineDoorSliding } from "react-icons/md";

function CameraAnimator({ controlsRef, cameraGoal, onDone }) {
  useFrame(() => {
    if (!controlsRef.current || !cameraGoal) return;

    const cam = controlsRef.current.object;
    const target = controlsRef.current.target;

    // Lerp position
    cam.position.lerp(new THREE.Vector3(...cameraGoal.position), 0.05);
    // Lerp target
    target.lerp(new THREE.Vector3(...cameraGoal.target), 0.05);

    controlsRef.current.maxPolarAngle = cameraGoal.maxPolarAngle;
    controlsRef.current.update();

    // ถ้าใกล้ตำแหน่งแล้ว => animation เสร็จ
    if (
      cam.position.distanceTo(new THREE.Vector3(...cameraGoal.position)) < 0.05
    ) {
      onDone(); // reset cameraGoal เพื่อหยุด lerp
    }
  });
  return null;
}

function Containment() {
  const controlsRef = useRef();
  const [cameraGoal, setCameraGoal] = useState(null);
  const [feature, setFeature] = useState("overview");

  const tempPosition = [
    { PositionName: "Front Rack", PositionValue: "front" },
    { PositionName: "Back Rack", PositionValue: "back" },
  ];
  const [selectTempPostion, setSelectTempPosition] = useState(
    tempPosition[0].PositionValue
  );

  const handleSelectChange = (event) => {
    setSelectTempPosition(event.target.value);
  };

  const handleFeatureChange = (newFeature) => {
    if (newFeature === "Temp") {
      setCameraGoal({
        position: [15.0, 20.55, 0.0],
        target: [0, 0, 0],
        maxPolarAngle: 1.5,
      });
      setFeature("Temp");
    } else if (newFeature === "overview") {
      setCameraGoal({
        position: [14.31, 5.89, 13.79],
        target: [0, 0, 0],
        maxPolarAngle: 1.5,
      });
      setFeature("overview");
    }
  };

  const resetView = () => handleFeatureChange("overview");

  const widget = [
    { name: "Temperature", value: [23, 25], logo: 2 },
    { name: "Door", value: [1, 0], logo: 2 }, // fixed
    { name: "Light", value: [1, 1], logo: 2 },
    { name: "Fire Alarm", value: 1, logo: 2 },
  ];
  
  return (
    <Layout onFeatureChange={handleFeatureChange}>
      <div className="w-full flex-grow flex flex-row  justify-start ">
        <Canvas
          className="w-full h-full relative"
          camera={{ position: [14.31, 5.89, 13.79], zoom: 3.5 }}
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

        {feature !== "Temp" && (
          <div className="absolute bottom-5 w-full left-0 z-50 flex flex-row justify-evenly px-4">
            {widget.map((item, index) => (
              <div
                key={index}
                className="flex flex-row items-center p-4 h-[140px] flex-grow m-1.5 
                   bg-[#1f2937] rounded-xl shadow-lg border border-[#0ea5e9] "
              >
                <div
                  className="w-[80px] h-[80px] rounded-full flex items-center justify-center 
                        bg-[#111827] shadow-inner border border-[#0ea5e9]"
                >
                  {/* {React.cloneElement(item.logo, {
                    className: "w-2/3 h-2/3 text-[#0ea5e9]",
                  })} */}
                </div>

                <div className="ml-4 flex flex-col justify-center text-white">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  {Array.isArray(item.value) ? (
                    <div className="flex space-x-2 mt-1">
                      {item.value.map((value, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 text-sm rounded-md bg-[#111827] border border-[#0ea5e9]"
                        >
                          {value}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="mt-1 text-sm">{item.value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Reset Button */}
        <div className="absolute top left-4 z-10 bg-gray-100 p-2 rounded-lg shadow-md flex items-center text-gray-700">
          <button
            onClick={resetView}
            className="px-4 py-1 bg-white border border-gray-300 rounded-md text-sm "
          >
            Reset
          </button>
        </div>

        {/* Temperature Dropdown */}
        {feature === "Temp" && (
          <div className="flex flex-col w-[20%] h-full border  p-4">
            <h2>Temperature Chart</h2>
            <select
              className="bg-gray-800"
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
        {/* {feature !== 'Temp' && (
          <div className='flex flex-col w-[20%] h-full border  p-4'>
            <h2>Temperature Chart</h2>
            <select className='bg-gray-800' value={selectTempPostion} onChange={handleSelectChange}>
              {tempPosition.map((temp, index) => (
                <option key={index} value={temp.PositionValue}>
                  {temp.PositionName}
                </option>
              ))}
            </select>
          </div>
        )} */}
      </div>
    </Layout>
  );
}

export default Containment;
