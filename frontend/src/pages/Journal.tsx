import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Calendar, Upload, Pencil, FileText } from 'lucide-react';

// 🧩 Define JournalEntry type
interface JournalEntry {
  date: string;
  text: string;
}

const JournalPage = () => {
  const [activeTab, setActiveTab] = useState<'write' | 'upload'>('write');
  const [journalEntry, setJournalEntry] = useState('');
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [weeklyEntries, setWeeklyEntries] = useState<JournalEntry[]>([]);
  const [journalAnalysis, setJournalAnalysis] = useState({
    mood: '',
    stressLevel: '',
    emotions: [],
    extractedTasks: [],
    extractedGoals: [],
    scheduleRecommendations: [],
  });

  // ✅ Send journal entries to FastAPI backend
  const sendToBackend = async (entries: JournalEntry[]) => {
    try {
      const res = await fetch("http://localhost:8000/analyze-week", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entries),
      });

      const data = await res.json();
      console.log("Analysis:", data);
      setJournalAnalysis(data); // Set real backend response
    } catch (error) {
      console.error("Error sending to backend:", error);

      // 🧪 TEMP fallback data
      setJournalAnalysis({
        mood: 'Positive',
        stressLevel: 'Low',
        emotions: ['Happy', 'Motivated', 'Focused'],
        extractedTasks: [
          'Complete project presentation',
          'Schedule meeting with design team',
          'Review quarterly results',
        ],
        extractedGoals: ['Finish the report by Friday', 'Start new exercise routine'],
        scheduleRecommendations: [
          'Take a break at 3PM to avoid afternoon slump',
          'Schedule deep work for your most productive hours (10AM–12PM)',
        ],
      });
    }
  };

  // ✍️ Handle journal submit + update state
  const handleSubmit = () => {
    const today = new Date().toISOString().split("T")[0];
    const newEntry: JournalEntry = { date: today, text: journalEntry };

    const updatedEntries = [...weeklyEntries, newEntry].slice(-7); // Keep last 7
    setWeeklyEntries(updatedEntries);
    setJournalEntry('');
    setShowAnalysis(true);

    sendToBackend(updatedEntries);
  };

  return (
    <DashboardLayout currentPage="journal">
      <div className="h-full">
        <div className="glass-panel p-6 mb-6">
          <h1 className="text-2xl font-medium mb-1">
            <span className="text-white">Your </span>
            <span className="text-verve-teal">Journal</span>
          </h1>
          <p className="text-white/70">Record your thoughts, get insights and track your progress</p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Journal Input Section */}
          <div className="col-span-12 md:col-span-7">
            <div className="glass-panel p-6">
              {/* Tab Navigation */}
              <div className="flex border-b border-white/10 mb-6">
                <button
                  className={`mr-4 pb-3 flex items-center ${
                    activeTab === 'write' ? 'text-verve-teal border-b-2 border-verve-teal' : 'text-white/70'
                  }`}
                  onClick={() => setActiveTab('write')}
                >
                  <Pencil size={16} className="mr-2" /> Write Entry
                </button>
                <button
                  className={`pb-3 flex items-center ${
                    activeTab === 'upload' ? 'text-verve-teal border-b-2 border-verve-teal' : 'text-white/70'
                  }`}
                  onClick={() => setActiveTab('upload')}
                >
                  <Upload size={16} className="mr-2" /> Upload Document
                </button>
              </div>

              {activeTab === 'write' ? (
                <div>
                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <label className="text-white/70 text-sm">Today's Entry</label>
                      <div className="text-sm text-white/50">
                        {new Date().toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </div>
                    </div>
                    <textarea
                      className="w-full h-64 p-4 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:border-verve-teal text-white"
                      placeholder="How was your day? What did you accomplish? What's on your mind?"
                      value={journalEntry}
                      onChange={(e) => setJournalEntry(e.target.value)}
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      className="bg-verve-teal hover:bg-verve-teal/80 text-black font-medium px-6 py-2 rounded-md transition-colors"
                      onClick={handleSubmit}
                    >
                      Save & Analyze
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <Upload size={30} className="text-white/50" />
                  </div>
                  <h3 className="font-medium text-white mb-2">Upload Journal Document</h3>
                  <p className="text-white/70 mb-6">Drag and drop your document or click to browse</p>
                  <label className="bg-white/10 hover:bg-white/15 text-white py-3 px-6 rounded-md cursor-pointer transition-colors inline-block">
                    Browse Files
                    <input type="file" className="hidden" />
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Analysis Section */}
          <div className="col-span-12 md:col-span-5">
            <div className="glass-panel p-6 h-full">
              <div className="flex items-center mb-4">
                <FileText className="mr-2 text-verve-teal" size={18} />
                <h2 className="text-lg font-medium text-white">AI Analysis</h2>
              </div>

              {showAnalysis ? (
                <div className="space-y-6">
                  {/* Mood & Stress */}
                  <div className="glass-card p-4">
                    <h3 className="text-sm text-white/50 uppercase tracking-wider mb-3">Emotional State</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-white/70">Mood</div>
                        <div className="text-lg font-medium text-verve-blue">{journalAnalysis.mood}</div>
                      </div>
                      <div>
                        <div className="text-xs text-white/70">Stress Level</div>
                        <div className="text-lg font-medium text-verve-teal">{journalAnalysis.stressLevel}</div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="text-xs text-white/70 mb-2">Detected Emotions</div>
                      <div className="flex flex-wrap gap-2">
                        {journalAnalysis.emotions.map((emotion, i) => (
                          <span key={i} className="text-xs bg-white/10 text-white px-2 py-1 rounded-full">
                            {emotion}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Tasks */}
                  <div className="glass-card p-4">
                    <h3 className="text-sm text-white/50 uppercase tracking-wider mb-3">Extracted Tasks</h3>
                    <ul className="space-y-2">
                      {journalAnalysis.extractedTasks.map((task, i) => (
                        <li key={i} className="flex items-start">
                          <div className="w-4 h-4 rounded-full border border-white/30 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-white">{task}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 text-right">
                      <button className="text-xs text-verve-teal hover:underline">Add to Tasks</button>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="glass-card p-4">
                    <h3 className="text-sm text-white/50 uppercase tracking-wider mb-3">Schedule Insights</h3>
                    <ul className="space-y-2">
                      {journalAnalysis.scheduleRecommendations.map((rec, i) => (
                        <li key={i} className="flex items-start">
                          <Calendar size={14} className="text-verve-pink mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-sm text-white">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-white/50 text-center h-full flex flex-col justify-center items-center py-12">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <FileText size={24} className="text-white/30" />
                  </div>
                  <p>Complete your journal entry to see AI analysis</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default JournalPage;
