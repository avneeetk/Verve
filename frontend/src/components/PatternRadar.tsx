
import React from 'react';

interface HabitPoint {
  label: string;
  value: number;  // 0-10 scale
  color?: string;
}

interface PatternRadarProps {
  habits: HabitPoint[];
}

const PatternRadar: React.FC<PatternRadarProps> = ({ habits }) => {
  const maxValue = 10;
  const centerX = 100;
  const centerY = 100;
  const radius = 80;
  
  // Calculate polygon points for each habit datapoint
  const calculatePoints = () => {
    const angleStep = (Math.PI * 2) / habits.length;
    
    return habits.map((habit, index) => {
      const angle = index * angleStep - Math.PI / 2; // Start from top (subtract 90 degrees)
      const value = habit.value / maxValue;
      const x = centerX + radius * value * Math.cos(angle);
      const y = centerY + radius * value * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
  };

  // Calculate axis lines (spokes)
  const calculateAxis = () => {
    const angleStep = (Math.PI * 2) / habits.length;
    
    return habits.map((_, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      return { x, y, angle };
    });
  };

  // Generate concentric circles
  const renderConcentricCircles = () => {
    const circles = [];
    const steps = 4; // Number of concentric circles
    
    for (let i = 1; i <= steps; i++) {
      const circleRadius = (radius * i) / steps;
      circles.push(
        <circle
          key={i}
          cx={centerX}
          cy={centerY}
          r={circleRadius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="1"
        />
      );
    }
    
    return circles;
  };

  const axes = calculateAxis();
  const polygonPoints = calculatePoints();

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-lg font-semibold text-verve-grey mb-4 flex items-center">
        <span className="text-white font-bold mr-2">
          Pattern Radar
        </span>
        <span className="text-sm font-normal text-white/70">Habit Web</span>
      </h2>
      
      <div className="relative flex-1 flex items-center justify-center">
        <svg viewBox="0 0 200 200" className="w-full h-full max-h-[300px]">
          {/* Concentric circles */}
          {renderConcentricCircles()}
          
          {/* Axis lines */}
          {axes.map((point, i) => (
            <line
              key={`axis-${i}`}
              x1={centerX}
              y1={centerY}
              x2={point.x}
              y2={point.y}
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="1"
            />
          ))}
          
          {/* Data polygon */}
          <polygon
            points={polygonPoints}
            fill="url(#gradient)"
            fillOpacity="0.5"
            stroke="url(#strokeGradient)"
            strokeWidth="2"
            className="animate-pulse-glow"
          />
          
          {/* Data points */}
          {axes.map((point, i) => {
            const habit = habits[i];
            const value = habit.value / maxValue;
            const pointX = centerX + radius * value * Math.cos(point.angle);
            const pointY = centerY + radius * value * Math.sin(point.angle);
            
            return (
              <circle
                key={`point-${i}`}
                cx={pointX}
                cy={pointY}
                r="3"
                fill="#fff"
                stroke={habit.color || "#00F0FF"}
                strokeWidth="2"
                className="animate-pulse"
              />
            );
          })}
          
          {/* Labels */}
          {axes.map((point, i) => {
            const habit = habits[i];
            const labelDistance = radius + 15;
            const labelX = centerX + labelDistance * Math.cos(point.angle);
            const labelY = centerY + labelDistance * Math.sin(point.angle);
            
            // Adjust text-anchor based on angle position
            let textAnchor = "middle";
            if (point.angle > -Math.PI/4 && point.angle < Math.PI/4) textAnchor = "start";
            if (point.angle > 3*Math.PI/4 || point.angle < -3*Math.PI/4) textAnchor = "end";
            
            return (
              <text
                key={`label-${i}`}
                x={labelX}
                y={labelY}
                textAnchor={textAnchor}
                fontSize="8"
                fill="#B0BEC5"
                dominantBaseline="middle"
              >
                {habit.label}
              </text>
            );
          })}
          
          {/* Gradients */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#B98EFF" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="strokeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00F0FF" />
              <stop offset="100%" stopColor="#B98EFF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default PatternRadar;
