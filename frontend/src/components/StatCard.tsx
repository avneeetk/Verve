
import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string | number;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, trend }) => {
  // Function to get trend color
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-verve-teal';
      case 'down': return 'text-verve-pink';
      default: return 'text-white/70';
    }
  };

  return (
    <div className="glass-card p-4 h-full hover:bg-white/10 transition-all duration-300">
      <div className="flex justify-between items-start mb-2">
        <div className="text-sm text-white/70">{title}</div>
        {icon && <div className="text-white/70">{icon}</div>}
      </div>
      
      <div className="text-2xl font-semibold mb-1">{value}</div>
      
      {change && (
        <div className={`
          text-xs flex items-center ${getTrendColor()}
        `}>
          <span className="inline-block mr-1 text-lg">
            {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'}
          </span>
          <span>{change}</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
