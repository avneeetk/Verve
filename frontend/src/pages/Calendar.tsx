
import React, { useState, useCallback } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';
import { Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();
  
  // Sample tasks data
  const [scheduledTasks, setScheduledTasks] = useState([
    { id: 1, date: new Date(), title: 'Team Meeting', time: '10:30 AM', duration: '1h', category: 'work', completion: 0 },
    { id: 2, date: new Date(), title: 'Project Review', time: '2:00 PM', duration: '45m', category: 'work', completion: 0 },
    { id: 3, date: new Date(Date.now() + 86400000), title: 'Doctor Appointment', time: '9:00 AM', duration: '1h', category: 'personal', completion: 0 },
    { id: 4, date: new Date(Date.now() + 172800000), title: 'Client Call', time: '11:00 AM', duration: '30m', category: 'work', completion: 0 },
  ]);
  
  // Filter tasks for the selected date
  const tasksForSelectedDate = scheduledTasks.filter(task => 
    date && 
    task.date.getDate() === date.getDate() && 
    task.date.getMonth() === date.getMonth() && 
    task.date.getFullYear() === date.getFullYear()
  );

  // Function to get category color
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'work': return 'border-verve-blue';
      case 'personal': return 'border-verve-pink';
      default: return 'border-verve-teal';
    }
  };
  
  // Handle Google Calendar connection
  const handleGoogleConnect = useCallback(() => {
    // Google OAuth2 configuration
    const clientId = "35341216333-7tamscu9o0suno0r0vijfj5jsphu3b0s.apps.googleusercontent.com";
    const redirectUri = window.location.origin + "/calendar";
    const scope = "https://www.googleapis.com/auth/calendar";
    
    // Create OAuth2 URL
    const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&access_type=offline&prompt=consent`;
    
    // For demo purposes we're just toggling the connection state
    // In a real app, we would redirect to the authUrl
    if (isConnected) {
      setIsConnected(false);
      toast({
        title: "Disconnected",
        description: "Your Google Calendar has been disconnected",
      });
    } else {
      // Simulate successful connection for demo
      // window.location.href = authUrl; // Uncomment in real implementation
      setIsConnected(true);
      toast({
        title: "Connected",
        description: "Your Google Calendar has been connected",
      });
    }
  }, [isConnected, toast]);
  
  // Handle task completion progress change
  const handleProgressChange = (taskId: number, newCompletion: number) => {
    setScheduledTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, completion: newCompletion } : task
      )
    );
  };
  
  return (
    <DashboardLayout currentPage="calendar">
      <div className="h-full">
        <div className="glass-panel p-6 mb-6">
          <h1 className="text-2xl font-medium mb-1">
            <span className="text-white">Your </span>
            <span className="text-verve-teal">Calendar</span>
          </h1>
          <p className="text-white/70">
            View and manage your scheduled tasks and appointments
          </p>
        </div>
        
        <div className="mb-6">
  <Button 
    onClick={handleGoogleConnect} 
    className={`flex items-center ${isConnected ? 'bg-white/10 hover:bg-white/15 text-white' : 'bg-white text-black hover:bg-white/90'}`}
  >
    <FcGoogle className="mr-2 h-4 w-4" />
    {isConnected ? 'Disconnect Google Calendar' : 'Connect Google Calendar'}
  </Button>

  {isConnected && (
    <span className="ml-2 text-xs text-verve-teal">✓ Connected</span>
  )}
</div>
        
        <div className="grid grid-cols-12 gap-6">
          {/* Calendar */}
          <div className="col-span-12 md:col-span-8">
            <div className="glass-panel p-6">
              <div className="bg-white/5 p-4 rounded-lg">
                <Calendar 
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="mx-auto pointer-events-auto"
                />
              </div>
            </div>
          </div>
          
          {/* Tasks for selected date */}
          <div className="col-span-12 md:col-span-4">
            <div className="glass-panel p-6 h-full">
              <h2 className="text-lg font-medium text-white mb-4">
                {date ? (
                  <span>
                    Tasks for {date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                  </span>
                ) : 'Select a date'}
              </h2>
              
              {tasksForSelectedDate.length > 0 ? (
                <div className="space-y-3">
                  {tasksForSelectedDate.map((task) => (
                    <div 
                      key={task.id}
                      className={`glass-card p-3 border-l-2 ${getCategoryColor(task.category)}`}
                    >
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full border ${task.completion >= 100 ? 'bg-verve-teal border-verve-teal' : 'border-white/30'} flex items-center justify-center mr-2`}>
                          {task.completion >= 100 && <Check size={12} className="text-black" />}
                        </div>
                        <div className="font-medium text-white">{task.title}</div>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <span className="text-white/70">{task.time}</span>
                        <span className="text-white/50">{task.duration}</span>
                      </div>
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-white/70">Completion</span>
                          <span className="text-verve-teal">{task.completion}%</span>
                        </div>
                        <div className="relative">
                          <Progress 
                            value={task.completion} 
                            className="h-2 bg-white/10"
                          />
                          <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            value={task.completion}
                            onChange={(e) => handleProgressChange(task.id, parseInt(e.target.value))}
                            className="absolute top-0 w-full h-2 opacity-0 cursor-pointer" 
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-white/50 text-center py-8">
                  No tasks scheduled for this day
                </div>
              )}
              
              <button className="mt-4 w-full bg-white/10 hover:bg-white/15 text-white py-2 rounded-md transition-colors">
                + Add New Task
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CalendarPage;
