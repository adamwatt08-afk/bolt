import React, { useState } from 'react';
import {
  Plus,
  X,
  Play,
  Clock,
  FolderOpen,
  Activity,
  HardDrive,
  FileText,
  AlertTriangle,
  CheckCircle,
  Copy,
  Calendar,
  Settings,
  Zap,
  Database
} from 'lucide-react';

interface ScanJob {
  id: string;
  job_name: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'scheduled';
  file_shares: string[];
  scan_speed: number;
  total_files: number;
  scanned_files: number;
  total_size: number;
  scanned_size: number;
  mirrored_shares: Array<{ share1: string; share2: string; similarity: number }>;
  access_denied_shares: string[];
  error_message?: string;
  started_at?: string;
  completed_at?: string;
  created_at: string;
}

interface Schedule {
  id: string;
  job_name: string;
  file_shares: string[];
  schedule_type: 'daily' | 'weekly' | 'monthly' | 'custom';
  schedule_config: any;
  enabled: boolean;
  last_run?: string;
  next_run?: string;
  created_at: string;
}

const Setup: React.FC = () => {
  const [activeView, setActiveView] = useState<'new' | 'jobs' | 'schedules'>('new');
  const [jobName, setJobName] = useState('');
  const [fileShares, setFileShares] = useState<string[]>(['']);
  const [scheduleType, setScheduleType] = useState<'daily' | 'weekly' | 'monthly' | 'custom'>('weekly');
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>(['Monday']);
  const [scheduleTime, setScheduleTime] = useState('09:00');

  const mockJobs: ScanJob[] = [
    {
      id: '1',
      job_name: 'North Sea Seismic Scan',
      status: 'completed',
      file_shares: ['\\\\nas01\\seismic\\northsea', '\\\\nas02\\backup\\seismic'],
      scan_speed: 1250.5,
      total_files: 125000,
      scanned_files: 125000,
      total_size: 2500000000000,
      scanned_size: 2500000000000,
      mirrored_shares: [
        { share1: '\\\\nas01\\seismic\\northsea', share2: '\\\\nas02\\backup\\seismic', similarity: 98.5 }
      ],
      access_denied_shares: ['\\\\nas01\\seismic\\restricted'],
      started_at: '2024-12-20T08:00:00Z',
      completed_at: '2024-12-20T09:45:00Z',
      created_at: '2024-12-20T07:55:00Z'
    },
    {
      id: '2',
      job_name: 'Production Well Data',
      status: 'running',
      file_shares: ['\\\\storage\\wells\\production', '\\\\archive\\wells'],
      scan_speed: 850.3,
      total_files: 45000,
      scanned_files: 28000,
      total_size: 890000000000,
      scanned_size: 550000000000,
      mirrored_shares: [],
      access_denied_shares: [],
      started_at: '2024-12-21T10:30:00Z',
      created_at: '2024-12-21T10:25:00Z'
    },
    {
      id: '3',
      job_name: 'Full Archive Scan',
      status: 'scheduled',
      file_shares: ['\\\\archive01\\data', '\\\\archive02\\data', '\\\\archive03\\data'],
      scan_speed: 0,
      total_files: 0,
      scanned_files: 0,
      total_size: 0,
      scanned_size: 0,
      mirrored_shares: [],
      access_denied_shares: [],
      created_at: '2024-12-21T12:00:00Z'
    }
  ];

  const mockSchedules: Schedule[] = [
    {
      id: '1',
      job_name: 'Weekly Seismic Scan',
      file_shares: ['\\\\nas01\\seismic\\northsea'],
      schedule_type: 'weekly',
      schedule_config: { days: ['Monday'], time: '08:00' },
      enabled: true,
      last_run: '2024-12-16T08:00:00Z',
      next_run: '2024-12-23T08:00:00Z',
      created_at: '2024-11-01T10:00:00Z'
    },
    {
      id: '2',
      job_name: 'Daily Well Data Check',
      file_shares: ['\\\\storage\\wells\\production'],
      schedule_type: 'daily',
      schedule_config: { time: '02:00' },
      enabled: true,
      last_run: '2024-12-21T02:00:00Z',
      next_run: '2024-12-22T02:00:00Z',
      created_at: '2024-11-15T14:30:00Z'
    }
  ];

  const addFileShare = () => {
    setFileShares([...fileShares, '']);
  };

  const removeFileShare = (index: number) => {
    setFileShares(fileShares.filter((_, i) => i !== index));
  };

  const updateFileShare = (index: number, value: string) => {
    const updated = [...fileShares];
    updated[index] = value;
    setFileShares(updated);
  };

  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'completed': return 'text-green-600 bg-green-50 border-green-200';
      case 'failed': return 'text-red-600 bg-red-50 border-red-200';
      case 'scheduled': return 'text-purple-600 bg-purple-50 border-purple-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return Activity;
      case 'completed': return CheckCircle;
      case 'failed': return AlertTriangle;
      case 'scheduled': return Clock;
      default: return Clock;
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatSpeed = (speed: number) => {
    return speed.toFixed(1) + ' files/sec';
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  const getProgress = (job: ScanJob) => {
    if (job.total_files === 0) return 0;
    return Math.round((job.scanned_files / job.total_files) * 100);
  };

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-cegal-green">Scan Setup</h2>
        <p className="text-white mt-1">Configure file share scans and scheduling</p>
      </div>

      <div className="flex space-x-2 border-b border-cegal-gray-700">
        <button
          onClick={() => setActiveView('new')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeView === 'new'
              ? 'text-cegal-green border-b-2 border-cegal-green'
              : 'text-cegal-gray-400 hover:text-white'
          }`}
        >
          New Scan
        </button>
        <button
          onClick={() => setActiveView('jobs')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeView === 'jobs'
              ? 'text-cegal-green border-b-2 border-cegal-green'
              : 'text-cegal-gray-400 hover:text-white'
          }`}
        >
          Scan Jobs ({mockJobs.length})
        </button>
        <button
          onClick={() => setActiveView('schedules')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeView === 'schedules'
              ? 'text-cegal-green border-b-2 border-cegal-green'
              : 'text-cegal-gray-400 hover:text-white'
          }`}
        >
          Schedules ({mockSchedules.length})
        </button>
      </div>

      {activeView === 'new' && (
        <div className="space-y-6">
          <div className="card-cegal p-6 bg-cegal-darker border-cegal-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Job Configuration</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-cegal-gray-400 mb-2">
                  Job Name
                </label>
                <input
                  type="text"
                  value={jobName}
                  onChange={(e) => setJobName(e.target.value)}
                  placeholder="e.g., North Sea Seismic Scan"
                  className="w-full px-4 py-2 bg-cegal-gray-800 border border-cegal-gray-600 rounded-lg focus:ring-2 focus:ring-cegal-primary focus:border-transparent text-white placeholder-cegal-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-cegal-gray-400 mb-2">
                  File Shares to Scan
                </label>
                <div className="space-y-2">
                  {fileShares.map((share, index) => (
                    <div key={index} className="flex space-x-2">
                      <div className="relative flex-1">
                        <FolderOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cegal-gray-400" />
                        <input
                          type="text"
                          value={share}
                          onChange={(e) => updateFileShare(index, e.target.value)}
                          placeholder="\\server\share\path"
                          className="w-full pl-10 pr-4 py-2 bg-cegal-gray-800 border border-cegal-gray-600 rounded-lg focus:ring-2 focus:ring-cegal-primary focus:border-transparent text-white placeholder-cegal-gray-500"
                        />
                      </div>
                      {fileShares.length > 1 && (
                        <button
                          onClick={() => removeFileShare(index)}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={addFileShare}
                    className="btn-cegal-secondary w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Another Share
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="card-cegal p-6 bg-cegal-darker border-cegal-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Schedule (Optional)</h3>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={scheduleEnabled}
                  onChange={(e) => setScheduleEnabled(e.target.checked)}
                  className="rounded border-cegal-gray-600 text-cegal-primary focus:ring-cegal-primary bg-cegal-gray-800"
                />
                <span className="text-sm text-cegal-gray-400">Enable Scheduling</span>
              </label>
            </div>

            {scheduleEnabled && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-cegal-gray-400 mb-2">
                    Frequency
                  </label>
                  <select
                    value={scheduleType}
                    onChange={(e) => setScheduleType(e.target.value as any)}
                    className="w-full px-4 py-2 bg-cegal-gray-800 border border-cegal-gray-600 rounded-lg focus:ring-2 focus:ring-cegal-primary focus:border-transparent text-white"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>

                {scheduleType === 'weekly' && (
                  <div>
                    <label className="block text-sm font-medium text-cegal-gray-400 mb-2">
                      Days of Week
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {weekDays.map((day) => (
                        <button
                          key={day}
                          onClick={() => toggleDay(day)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            selectedDays.includes(day)
                              ? 'bg-cegal-primary text-white'
                              : 'bg-cegal-gray-800 text-cegal-gray-400 hover:bg-cegal-gray-700'
                          }`}
                        >
                          {day.slice(0, 3)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-cegal-gray-400 mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="w-full px-4 py-2 bg-cegal-gray-800 border border-cegal-gray-600 rounded-lg focus:ring-2 focus:ring-cegal-primary focus:border-transparent text-white"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3">
            <button className="btn-cegal-secondary">
              Cancel
            </button>
            <button className="btn-cegal-primary">
              <Play className="h-4 w-4 mr-2" />
              {scheduleEnabled ? 'Create Schedule' : 'Start Scan'}
            </button>
          </div>
        </div>
      )}

      {activeView === 'jobs' && (
        <div className="space-y-4">
          {mockJobs.map((job) => {
            const StatusIcon = getStatusIcon(job.status);
            const progress = getProgress(job);

            return (
              <div key={job.id} className="card-cegal p-6 bg-cegal-darker border-cegal-gray-700">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{job.job_name}</h3>
                      <div className={`inline-flex items-center space-x-2 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(job.status)}`}>
                        <StatusIcon className="h-3 w-3" />
                        <span className="capitalize">{job.status}</span>
                      </div>
                    </div>
                    <p className="text-sm text-cegal-gray-400">Created {formatDate(job.created_at)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Zap className="h-5 w-5 text-cegal-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-cegal-gray-500">Scan Speed</p>
                      <p className="text-sm font-semibold text-white">{formatSpeed(job.scan_speed)}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <FileText className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-cegal-gray-500">Files</p>
                      <p className="text-sm font-semibold text-white">
                        {job.scanned_files.toLocaleString()} / {job.total_files.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-teal-100 rounded-lg">
                      <HardDrive className="h-5 w-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-xs text-cegal-gray-500">Size</p>
                      <p className="text-sm font-semibold text-white">{formatBytes(job.scanned_size)}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Database className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-cegal-gray-500">Total Size</p>
                      <p className="text-sm font-semibold text-white">{formatBytes(job.total_size)}</p>
                    </div>
                  </div>
                </div>

                {job.status === 'running' && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-cegal-gray-400 mb-1">
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-cegal-gray-800 rounded-full h-2">
                      <div
                        className="bg-cegal-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-cegal-gray-400 mb-1">File Shares:</p>
                    <div className="space-y-1">
                      {job.file_shares.map((share, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm text-white bg-cegal-gray-800 px-3 py-1.5 rounded">
                          <FolderOpen className="h-4 w-4 text-cegal-gray-400" />
                          <span className="font-mono">{share}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {job.mirrored_shares.length > 0 && (
                    <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <Copy className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium text-yellow-500">Mirrored Shares Detected</span>
                      </div>
                      {job.mirrored_shares.map((mirror, idx) => (
                        <div key={idx} className="text-xs text-yellow-200 ml-6">
                          {mirror.share1} ↔ {mirror.share2} ({mirror.similarity}% similar)
                        </div>
                      ))}
                    </div>
                  )}

                  {job.access_denied_shares.length > 0 && (
                    <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                        <span className="text-sm font-medium text-red-500">Access Denied</span>
                      </div>
                      {job.access_denied_shares.map((share, idx) => (
                        <div key={idx} className="text-xs text-red-200 ml-6 font-mono">
                          {share}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {job.started_at && (
                  <div className="mt-4 pt-4 border-t border-cegal-gray-700 flex justify-between text-xs text-cegal-gray-500">
                    <span>Started: {formatDate(job.started_at)}</span>
                    {job.completed_at && <span>Completed: {formatDate(job.completed_at)}</span>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {activeView === 'schedules' && (
        <div className="space-y-4">
          {mockSchedules.map((schedule) => (
            <div key={schedule.id} className="card-cegal p-6 bg-cegal-darker border-cegal-gray-700">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">{schedule.job_name}</h3>
                    <div className={`inline-flex items-center space-x-2 px-2 py-1 rounded-full text-xs font-medium ${
                      schedule.enabled
                        ? 'bg-green-50 text-green-600 border border-green-200'
                        : 'bg-gray-50 text-gray-600 border border-gray-200'
                    }`}>
                      <div className={`h-2 w-2 rounded-full ${schedule.enabled ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      <span>{schedule.enabled ? 'Enabled' : 'Disabled'}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-cegal-gray-400">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span className="capitalize">{schedule.schedule_type}</span>
                    </div>
                    {schedule.schedule_config.days && (
                      <span>{schedule.schedule_config.days.join(', ')}</span>
                    )}
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{schedule.schedule_config.time}</span>
                    </div>
                  </div>
                </div>
                <button className="btn-cegal-secondary">
                  <Settings className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-cegal-gray-400 mb-1">File Shares:</p>
                  <div className="space-y-1">
                    {schedule.file_shares.map((share, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm text-white bg-cegal-gray-800 px-3 py-1.5 rounded">
                        <FolderOpen className="h-4 w-4 text-cegal-gray-400" />
                        <span className="font-mono">{share}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-cegal-gray-700">
                  <div>
                    <p className="text-xs text-cegal-gray-500">Last Run</p>
                    <p className="text-sm text-white">{formatDate(schedule.last_run)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-cegal-gray-500">Next Run</p>
                    <p className="text-sm text-white">{formatDate(schedule.next_run)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Setup;
