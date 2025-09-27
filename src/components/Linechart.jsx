import React from 'react';

const Linechart= () => {
    // ข้อมูลจำลองสำหรับกราฟเส้น (อุณหภูมิ 5 จุด)
    const data = [180, 220, 190, 250, 210];
    const maxVal = 300; // ค่าสูงสุดสำหรับแกน Y
    const height = 200;
    const width = 300;
    const padding = 20;

    // คำนวณจุดสำหรับ SVG Path
    const points = data.map((d, i) => {
        const x = padding + i * (width - 2 * padding) / (data.length - 1);
        // แปลงค่าข้อมูล (d) เป็นพิกัด Y (กลับด้านเพราะ SVG เริ่มจากบนลงล่าง)
        const y = height - padding - (d / maxVal) * (height - 2 * padding);
        return `${x},${y}`;
    }).join(' L ');

    return (
        <div className="bg-gray-50 p-4 rounded-xl shadow-inner border border-gray-200">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">อุณหภูมิเซิร์ฟเวอร์ (Real-time)</h3>
            <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="auto" className="bg-white rounded-lg">
                
                {/* แกน X */}
                <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#ccc" />
                {/* แกน Y */}
                <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#ccc" />

                {/* เส้นกราฟ */}
                <path 
                    d={`M ${points}`} 
                    fill="none" 
                    stroke="#10B981" // Green-500
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                />

                {/* จุดข้อมูล */}
                {data.map((d, i) => {
                    const x = padding + i * (width - 2 * padding) / (data.length - 1);
                    const y = height - padding - (d / maxVal) * (height - 2 * padding);
                    return (
                        <circle 
                            key={i} 
                            cx={x} 
                            cy={y} 
                            r="4" 
                            fill="#059669" // Emerald-600
                            stroke="#fff" 
                            strokeWidth="1.5"
                        />
                    );
                })}

                {/* Labels แกน Y (อุณหภูมิสูงสุด) */}
                <text x={padding - 5} y={padding + 5} fontSize="10" textAnchor="end" fill="#6B7280">{maxVal}°C</text>
                {/* Labels แกน Y (ศูนย์) */}
                <text x={padding - 5} y={height - padding + 5} fontSize="10" textAnchor="end" fill="#6B7280">0°C</text>
            </svg>
            <p className='text-xs text-gray-500 mt-2 text-center'>เวลา (Time)</p>
        </div>
    );
};

export default Linechart;
