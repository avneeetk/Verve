
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Calendar, CheckCircle, Circle, Target, Clock } from 'lucide-react';

const GoalsPage = () => {
  // Sample goals data
  const goals = [
    {
      id: 1,
      title: 'Complete Project Alpha',
      description: 'Finish all deliverables for client presentation',
      deadline: '2025-04-15',
      progress: 65,
      tasks: [
        { title: 'Finalize mockups', completed: true },
        { title: 'Create slide deck', completed: true },
        { title: 'Prepare demo', completed: false },
        { title: 'Review with team', completed: false },
      ]
    },
    {
      id: 2,
      title: 'Learn New Framework',
      description: 'Complete advanced course and build a sample application',
      deadline: '2025-05-01',
      progress: 30,
      tasks: [
        { title: 'Complete beginner tutorials', completed: true },
        { title: 'Finish advanced modules', completed: false },
        { title: 'Build sample app', completed: false },
      ]
    },
    {
      id: 3,
      title: 'Health Improvement',
      description: 'Establish consistent workout routine and healthier diet',
      deadline: '2025-06-30',
      progress: 45,
      tasks: [
        { title: 'Create workout schedule', completed: true },
        { title: 'Plan meal prep for weekdays', completed: true },
        { title: 'Track daily water intake', completed: false },
        { title: 'Reach 10k steps daily', completed: false },
      ]
    }
  ];
  
  // Function to get days remaining until deadline
  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  return (
    <DashboardLayout currentPage="goals">
      <div className="h-full">
        <div className="glass-panel p-6 mb-6">
          <h1 className="text-2xl font-medium mb-1">
            <span className="text-white">Your </span>
            <span className="text-verve-teal">Goals</span>
          </h1>
          <p className="text-white/70">
            Track progress and manage your personal and professional goals
          </p>
        </div>
        
        <div className="grid grid-cols-12 gap-6">
          {/* Main Goals List */}
          <div className="col-span-12 md:col-span-7">
            <div className="glass-panel p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-white">Active Goals</h2>
                <button className="bg-white/10 hover:bg-white/15 text-white px-4 py-1 rounded-md text-sm transition-colors">
                  + Add Goal
                </button>
              </div>
              
              <div className="space-y-6">
                {goals.map((goal) => (
                  <div key={goal.id} className="glass-card p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-white">{goal.title}</h3>
                      <div className="flex items-center text-xs bg-white/5 px-2 py-1 rounded-full">
                        <Clock size={12} className="mr-1 text-verve-blue" />
                        <span className="text-white/70">{getDaysRemaining(goal.deadline)} days left</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-white/70 mb-3">{goal.description}</p>
                    
                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white/50">Progress</span>
                        <span className="text-verve-teal">{goal.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-verve-teal rounded-full" 
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Tasks */}
                    <div className="mb-2 text-xs font-medium text-white/50 uppercase">Tasks</div>
                    <div className="space-y-2">
                      {goal.tasks.map((task, index) => (
                        <div key={index} className="flex items-center">
                          {task.completed ? 
                            <CheckCircle size={14} className="text-verve-teal mr-2" /> :
                            <Circle size={14} className="text-white/30 mr-2" />
                          }
                          <span className={`text-sm ${task.completed ? 'text-white line-through opacity-50' : 'text-white'}`}>
                            {task.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Goal Progress and Flow Chart */}
          <div className="col-span-12 md:col-span-5">
            <div className="glass-panel p-6 mb-6">
              <h2 className="text-lg font-medium text-white mb-4 flex items-center">
                <Target size={18} className="mr-2 text-verve-pink" />
                <span>Progress Overview</span>
              </h2>
              
              {/* Simple Progress Chart */}
              <div className="bg-white/5 rounded-lg p-4 mb-4">
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {goals.map((goal) => (
                    <div key={goal.id} className="text-center">
                      <div className="relative mx-auto w-16 h-16">
                        <svg className="w-full h-full" viewBox="0 0 36 36">
                          <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2"></circle>
                          <circle 
                            cx="18" cy="18" r="16" 
                            fill="none" 
                            stroke={goal.id % 3 === 0 ? '#FF4081' : goal.id % 2 === 0 ? '#536DFE' : '#00F0FF'} 
                            strokeWidth="2" 
                            strokeDasharray={`${goal.progress} 100`} 
                            strokeLinecap="round" 
                            transform="rotate(-90 18 18)"
                          ></circle>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                          {goal.progress}%
                        </div>
                      </div>
                      <div className="text-xs mt-2 text-white/70 whitespace-nowrap overflow-hidden overflow-ellipsis">
                        {goal.title.length > 15 ? goal.title.substring(0, 15) + '...' : goal.title}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Simple Flow Chart */}
              <h3 className="text-sm font-medium text-white/70 mb-3">Goal Flow</h3>
              <div className="relative">
                <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-white/10"></div>
                
                <div className="space-y-6 pl-8">
                  <div>
                    <div className="absolute left-1.5 w-3 h-3 rounded-full bg-verve-teal"></div>
                    <h4 className="text-white">Goal Setting</h4>
                    <p className="text-xs text-white/50">Define clear objectives and outcomes</p>
                  </div>
                  
                  <div>
                    <div className="absolute left-1.5 w-3 h-3 rounded-full bg-verve-blue"></div>
                    <h4 className="text-white">Planning & Tasks</h4>
                    <p className="text-xs text-white/50">Break down into actionable tasks</p>
                  </div>
                  
                  <div>
                    <div className="absolute left-1.5 w-3 h-3 rounded-full bg-white/30"></div>
                    <h4 className="text-white">Execution</h4>
                    <p className="text-xs text-white/50">Work on tasks and track progress</p>
                  </div>
                  
                  <div>
                    <div className="absolute left-1.5 w-3 h-3 rounded-full bg-white/30"></div>
                    <h4 className="text-white">Review & Adjust</h4>
                    <p className="text-xs text-white/50">Regular check-ins to stay on track</p>
                  </div>
                  
                  <div>
                    <div className="absolute left-1.5 w-3 h-3 rounded-full bg-white/30"></div>
                    <h4 className="text-white">Goal Achievement</h4>
                    <p className="text-xs text-white/50">Celebrate success and identify lessons learned</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass-panel p-6">
              <h2 className="text-lg font-medium text-white mb-4">Upcoming Deadlines</h2>
              <div className="space-y-3">
                {goals
                  .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
                  .map((goal) => (
                    <div key={goal.id} className="flex justify-between items-center p-3 bg-white/5 rounded-md">
                      <div>
                        <div className="text-sm text-white">{goal.title}</div>
                        <div className="text-xs text-white/50">
                          {new Date(goal.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                      </div>
                      <div className="w-12 h-12 relative">
                        <svg className="w-full h-full" viewBox="0 0 36 36">
                          <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2"></circle>
                          <circle 
                            cx="18" cy="18" r="16" 
                            fill="none" 
                            stroke={goal.id % 3 === 0 ? '#FF4081' : goal.id % 2 === 0 ? '#536DFE' : '#00F0FF'} 
                            strokeWidth="2" 
                            strokeDasharray={`${goal.progress} 100`} 
                            strokeLinecap="round" 
                            transform="rotate(-90 18 18)"
                          ></circle>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                          {goal.progress}%
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GoalsPage;
