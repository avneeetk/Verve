
import React, { useState, useRef, useEffect } from 'react';

interface TimelineItem {
  id: number;
  time: string;
  title: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  description?: string;
  completion?: number; // Percentage of completion (0-100)
  type: 'past' | 'present' | 'future';
}

interface TimeWeaveProps {
  items: TimelineItem[];
}

const TimeWeave: React.FC<TimeWeaveProps> = ({ items }) => {
  const [filter, setFilter] = useState<'all' | 'past' | 'present' | 'future'>('present');
  const timelineRef = useRef<HTMLDivElement>(null);

  // Function to get the color based on status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-verve-teal';
      case 'in-progress': return 'bg-verve-blue';
      case 'upcoming': return 'bg-white/30';
      default: return 'bg-white/30';
    }
  };

  // Filter items based on selected type
  const filteredItems = items.filter(item => 
    filter === 'all' ? true : item.type === filter
  );

  // Scroll to the present tasks section initially
  useEffect(() => {
    if (timelineRef.current) {
      const presentSection = timelineRef.current.querySelector('[data-type="present"]');
      if (presentSection) {
        presentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, []);

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-medium text-white mb-4 flex items-center justify-between">
        <div>
          <span className="text-verve-teal font-semibold mr-2">
            Time-Weave
          </span>
          <span className="text-sm font-normal text-white/70">Timeline</span>
        </div>
        
        <div className="flex space-x-2 text-xs">
          <button 
            onClick={() => setFilter('past')}
            className={`px-3 py-1 rounded-full ${filter === 'past' ? 'bg-white/10 text-verve-blue' : 'text-white/50'}`}
          >
            Past
          </button>
          <button 
            onClick={() => setFilter('present')}
            className={`px-3 py-1 rounded-full ${filter === 'present' ? 'bg-white/10 text-verve-teal' : 'text-white/50'}`}
          >
            Present
          </button>
          <button 
            onClick={() => setFilter('future')}
            className={`px-3 py-1 rounded-full ${filter === 'future' ? 'bg-white/10 text-verve-pink' : 'text-white/50'}`}
          >
            Future
          </button>
        </div>
      </h2>
      
      <div ref={timelineRef} className="flex-1 overflow-y-auto pr-2 hide-scrollbar">
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-2.5 top-0 bottom-0 w-px bg-white/10"></div>
          
          {/* Group items by type */}
          {['past', 'present', 'future'].map((type) => (
            <div key={type} data-type={type} className="mb-6">
              {filter === 'all' && (
                <div className="text-xs uppercase font-bold text-white/40 mb-2 pl-8">
                  {type} Tasks
                </div>
              )}
              
              {/* Timeline items */}
              <div className="space-y-4">
                {filteredItems
                  .filter(item => filter === 'all' ? item.type === type : true)
                  .map((item, index) => (
                    <div 
                      key={item.id}
                      className={`
                        relative pl-8 animate-fade-in
                        ${index % 2 === 0 ? 'animate-slide-up' : ''}
                        transition-all duration-300 ease-in-out
                      `}
                      style={{ animationDelay: `${index * 80}ms` }}
                    >
                      {/* Timeline dot */}
                      <div 
                        className={`
                          absolute left-0 top-2 w-5 h-5 rounded-full flex items-center justify-center
                          border border-white/20
                        `}
                      >
                        <div className={`w-2.5 h-2.5 rounded-full ${getStatusColor(item.status)}`}></div>
                      </div>
                      
                      {/* Content */}
                      <div className="glass-card p-3 hover:bg-white/10 transition-all duration-300">
                        <div className="text-xs text-white/50 mb-1">{item.time}</div>
                        <div className="text-sm font-medium text-white mb-1">{item.title}</div>
                        {item.description && (
                          <div className="text-xs text-white/70">{item.description}</div>
                        )}
                        
                        {/* Progress indicator for tasks */}
                        {item.type === 'past' && item.completion !== undefined && (
                          <div className="mt-2">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-white/70">Completion</span>
                              <span className="text-verve-teal">{item.completion}%</span>
                            </div>
                            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-verve-teal rounded-full" 
                                style={{ width: `${item.completion}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                        {item.status === 'completed' && (
                          <div className="mt-2 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full w-full bg-verve-teal rounded-full"></div>
                          </div>
                        )}
                        {item.status === 'in-progress' && (
                          <div className="mt-2 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full w-1/2 bg-verve-blue rounded-full"></div>
                          </div>
                        )}
                        {item.status === 'upcoming' && (
                          <div className="mt-2 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full w-0 bg-verve-pink rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeWeave;
