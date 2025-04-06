
import React from 'react';
import { Link } from 'react-router-dom';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isActive?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ 
  icon, 
  label, 
  to, 
  isActive = false,
  onClick
}) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`
        flex items-center space-x-3 px-4 py-3 rounded-md transition-all duration-300
        ${isActive 
          ? 'bg-white/10 text-verve-teal border-l-2 border-verve-teal' 
          : 'text-white hover:bg-white/5 hover:text-verve-teal'}
      `}
    >
      <div className={`
        ${isActive ? 'text-verve-teal' : 'text-white'}
      `}>
        {icon}
      </div>
      <span className="text-sm font-medium">{label}</span>
      
      {isActive && (
        <div className="ml-auto h-1.5 w-1.5 rounded-full bg-verve-teal"></div>
      )}
    </Link>
  );
};

export default NavItem;
