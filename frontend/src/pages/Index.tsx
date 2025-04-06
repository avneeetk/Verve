
import React, { useState, useEffect } from 'react';
import { BrainCircuit, Clock, Heart, Star, Plus, Calendar, BookOpen } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import TimeWeave from '@/components/TimeWeave';
import PatternRadar from '@/components/PatternRadar';
import StatCard from '@/components/StatCard';
import QuickAction from '@/components/QuickAction';

// Sample data for our components
const timelineItems = [
  // Past Tasks
  { 
    id: 1, 
    time: '08:30 AM', 
    title: 'Morning Journal', 
    status: 'completed' as const,
    description: 'You completed your morning reflection',
    completion: 100,
    type: 'past' as const
  },
  { 
    id: 2, 
    time: '09:15 AM', 
    title: 'Email Review', 
    status: 'completed' as const,
    description: 'Responded to important messages',
    completion: 80,
    type: 'past' as const
  },
  // Present Tasks
  { 
    id: 3, 
    time: 'Now', 
    title: 'Daily Planning', 
    status: 'in-progress' as const,
    description: 'Organizing your priorities for today',
    type: 'present' as const
  },
  { 
    id: 4, 
    time: '11:00 AM', 
    title: 'Focus Session', 
    status: 'upcoming' as const,
    description: '45 minutes deep work on Project X',
    type: 'present' as const
  },
  // Future Tasks
  { 
    id: 5, 
    time: '01:30 PM', 
    title: 'Team Meeting', 
    status: 'upcoming' as const,
    description: 'Quarterly planning with design team',
    type: 'future' as const
  },
  { 
    id: 6, 
    time: '03:00 PM', 
    title: 'Learning Block', 
    status: 'upcoming' as const,
    description: 'Continue course on new technologies',
    type: 'future' as const
  },
  { 
    id: 7, 
    time: '05:00 PM', 
    title: 'Day Review', 
    status: 'upcoming' as const,
    description: 'Reflect on accomplishments and plan for tomorrow',
    type: 'future' as const
  },
];

const habitData = [
  { label: 'Sleep', value: 8, color: '#00F0FF' },
  { label: 'Exercise', value: 6, color: '#536DFE' },
  { label: 'Work', value: 9, color: '#FF4081' },
  { label: 'Learning', value: 7, color: '#00F0FF' },
  { label: 'Social', value: 5, color: '#536DFE' },
  { label: 'Meditation', value: 4, color: '#C6FF00' },
];

const quickActions = [
  { label: 'Add Task', variant: 'primary' as const, icon: <Plus size={14} /> },
  { label: 'Schedule', variant: 'secondary' as const, icon: <Calendar size={14} /> },
  { label: 'Journal', variant: 'outline' as const, icon: <BookOpen size={14} /> },
];

const Index = () => {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    // Generate greeting based on time of day
    const hour = new Date().getHours();
    let newGreeting = '';
    
    if (hour < 12) newGreeting = 'Good Morning';
    else if (hour < 18) newGreeting = 'Good Afternoon';
    else newGreeting = 'Good Evening';
    
    setGreeting(newGreeting);
  }, []);

  return (
    <DashboardLayout currentPage="dashboard">
      <div className="h-full">
        {/* Welcome Header */}
        <div className="glass-panel p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-medium mb-1">
                <span className="text-white">{greeting},</span> <span className="text-verve-teal">User</span>
              </h1>
              <p className="text-white/70">
                Today is <span className="text-white">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
              </p>
            </div>
            <div className="flex space-x-2">
              {quickActions.map((action, index) => (
                <QuickAction 
                  key={index} 
                  label={action.label} 
                  variant={action.variant}
                  icon={action.icon} 
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-12 gap-6 mb-6">
          
          
          {/* Center Column - Timeline */}
          <div className="col-span-12 md:col-span-5">
            <div className="glass-panel h-[400px] p-6">
              <TimeWeave items={timelineItems} />
            </div>
          </div>
          
          {/* Right Column - Pattern Radar */}
          <div className="col-span-12 md:col-span-4">
            <div className="glass-panel h-[400px] p-6">
              <PatternRadar habits={habitData} />
            </div>
          </div>
        </div>
        
        {/* Stats Row */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-3">
            <StatCard 
              title="Focus Score" 
              value="87%" 
              change="+12%" 
              trend="up" 
              icon={<BrainCircuit size={18} className="text-verve-teal" />}
            />
          </div>
          <div className="col-span-12 md:col-span-3">
            <StatCard 
              title="Sleep Quality" 
              value="92%" 
              change="+5%" 
              trend="up" 
              icon={<Clock size={18} className="text-verve-blue" />}
            />
          </div>

          <div className="col-span-12 md:col-span-3">
            <StatCard 
              title="Goal Progress" 
              value="68%" 
              change="On Track" 
              trend="neutral" 
              icon={<Star size={18} className="text-verve-lime" />}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
