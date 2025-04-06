
import React from 'react';

interface QuickActionProps {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
}

const QuickAction: React.FC<QuickActionProps> = ({ 
  label, 
  icon, 
  onClick,
  variant = 'primary'
}) => {
  const getStyles = () => {
    switch(variant) {
      case 'primary':
        return "border-verve-teal/50 bg-verve-teal/20 hover:bg-verve-teal/30 text-verve-teal";
      case 'secondary':
        return "border-verve-lilac/50 bg-verve-lilac/20 hover:bg-verve-lilac/30 text-verve-lilac";
      case 'outline':
        return "border-white/20 bg-transparent hover:bg-white/5 text-white";
      default:
        return "border-verve-teal/50 bg-verve-teal/20 hover:bg-verve-teal/30 text-verve-teal";
    }
  };

  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-lg transition-all duration-300 ease-in-out
        border backdrop-blur-sm hover:scale-105
        flex items-center justify-center text-sm font-medium
        ${getStyles()}
      `}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </button>
  );
};

export default QuickAction;
