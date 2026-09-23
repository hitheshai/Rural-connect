import React, { useState } from 'react';
import {
  Shield,
  CheckCircle2,
  Clock,
  AlertTriangle,
  PlusCircle,
  Users,
  Briefcase,
  HeartPulse,
  Wrench,
  Check,
  Send,
  Building
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Grievance } from '../../types';

export const AdminScreen: React.FC = () => {
  const {
    t,
    language,
    currentLocation,
    grievances,
    updateGrievanceStatus,
    serviceProviders,
    notices,
    addNotice,
    localJobs,
    consultations
  } = useApp();

  const [activeTab, setActiveTab] = useState<'grievances' | 'announcements' | 'providers'>('grievances');

  // New notice form
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeContent, setNoticeContent] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [noticeCategory, setNoticeCategory] = useState<'announcement' | 'camp' | 'water_supply' | 'power_cut'>('announcement');

  // Grievance resolution modal
  const [selectedGrievance, setSelectedGrievance] = useState<Grievance | null>(null);
  const [newStatus, setNewStatus] = useState<'submitted' | 'under_review' | 'resolved'>('under_review');
  const [resolutionNote, setResolutionNote] = useState('');

  const handlePublishNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle || !noticeContent) return;

    addNotice({
      title: noticeTitle,
      titleKn: noticeTitle,
      titleHi: noticeTitle,
      content: noticeContent,
      contentKn: noticeContent,
      contentHi: noticeContent,
      category: noticeCategory,
      postedBy: `${currentLocation.panchayat} Gram Panchayat`,
      isUrgent,
      contactPhone: '0831-2440182'
    });

    setNoticeTitle('');
    setNoticeContent('');
    setIsUrgent(false);
    setActiveTab('announcements');
  };

  const handleUpdateStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGrievance) return;

    updateGrievanceStatus(selectedGrievance.id, newStatus, resolutionNote);
    setSelectedGrievance(null);
    setResolutionNote('');
  };

  const metrics = [
    { label: 'Pending Grievances', count: grievances.filter((g) => g.status !== 'resolved').length, icon: AlertTriangle, color: 'text-amber-600 bg-amber-50' },
    { label: 'Doctor Requests', count: consultations.length, icon: HeartPulse, color: 'text-rose-600 bg-rose-50' },
    { label: 'Active Job Openings', count: localJobs.length, icon: Briefcase, color: 'text-teal-600 bg-teal-50' },
    { label: 'Registered Artisans', count: serviceProviders.length, icon: Wrench, color: 'text-orange-600 bg-orange-50' }
  ];

  return (
    <div className="space-y-4 pb-20 sm:pb-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-emerald-950 rounded-3xl p-4 sm:p-5 text-white shadow-md">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold">{t.adminDashboard}</h1>
            <p className="text-xs text-slate-300">
              {currentLocation.panchayat} Grama Panchayat · PDO & Secretary Portal
            </p>
          </div>
        </div>

        {/* 4 Metric Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/10"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-300">{m.label}</span>
                  <Icon className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="text-xl sm:text-2xl font-black mt-1 tabular-nums">{m.count}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
        <button
          onClick={() => setActiveTab('grievances')}
          className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all text-center ${
            activeTab === 'grievances'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Manage Grievances ({grievances.length})
        </button>

        <button
          onClick={() => setActiveTab('announcements')}
          className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all text-center ${
            activeTab === 'announcements'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Publish Notice
        </button>

        <button
          onClick={() => setActiveTab('providers')}
          className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all text-center ${
            activeTab === 'providers'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Artisan Approvals
        </button>
      </div>

      {/* 1. Grievance Management */}
      {activeTab === 'grievances' && (
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-900">
            Citizen Grievances & Work Orders
          </h2>

          <div className="space-y-3">
            {grievances.map((g) => (
              <div
                key={g.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-xs font-mono font-bold text-slate-800">
                      {g.trackingId}
                    </span>
                    <span className="text-slate-300 mx-1.5">·</span>
                    <span className="text-xs font-semibold text-slate-500 uppercase">{g.category}</span>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      g.status === 'resolved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : g.status === 'under_review'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {g.status.replace('_', ' ')}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900">{g.subject}</h3>
                <p className="text-xs text-slate-600 mt-1">{g.description}</p>

                <div className="mt-2 text-xs text-slate-500">
                  Citizen: <strong>{g.citizenName}</strong> ({g.phone}) · Village: {g.village}
                </div>

                {g.resolutionNotes && (
                  <div className="mt-2 p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                    <strong>Panchayat Note:</strong> {g.resolutionNotes}
                  </div>
                )}

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Date: {g.submittedDate}</span>
                  <button
                    onClick={() => {
                      setSelectedGrievance(g);
                      setNewStatus(g.status);
                      setResolutionNote(g.resolutionNotes || '');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors"
                  >
                    Update Status & Notes
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Publish Notice Form */}
      {activeTab === 'announcements' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900 mb-1">
            Broadcast Village Announcement
          </h2>
          <p className="text-xs text-slate-500 mb-4">
            Notices appear immediately on the RuralConnect homepage and community board of all villagers.
          </p>

          <form onSubmit={handlePublishNotice} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Announcement Category
              </label>
              <select
                value={noticeCategory}
                onChange={(e) => setNoticeCategory(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-emerald-600"
              >
                <option value="announcement">Gram Panchayat Meeting / Announcement</option>
                <option value="water_supply">Drinking Water Supply Notification</option>
                <option value="camp">Arogya / Vaccination Medical Camp</option>
                <option value="power_cut">Scheduled Power Shutdown</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Notice Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Free Livestock Vaccination Camp on Thursday"
                value={noticeTitle}
                onChange={(e) => setNoticeTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Detailed Message & Timings *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Write message in English or Kannada (will be automatically read out to elders)..."
                value={noticeContent}
                onChange={(e) => setNoticeContent(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-emerald-600"
              />
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isUrgent}
                onChange={(e) => setIsUrgent(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded"
              />
              <span className="text-xs font-bold text-rose-700">
                Mark as URGENT (Displays priority banner on top of Home screen)
              </span>
            </label>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider shadow-sm"
            >
              Publish Village Announcement
            </button>
          </form>
        </div>
      )}

      {/* 3. Artisan Directory & Verification */}
      {activeTab === 'providers' && (
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-900">
            Registered Village Artisans & Technicians
          </h2>

          <div className="space-y-2.5">
            {serviceProviders.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-slate-900">{p.name}</h3>
                    {p.isVerified && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500">
                    {p.profession} · {p.experienceYears} yrs · {p.village} ({p.phone})
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-emerald-700 font-bold block">
                    Rating: {p.rating} ★
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {p.availableNow ? 'Available' : 'Busy'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Update Grievance Status */}
      {selectedGrievance && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="text-base font-bold">Update Grievance Status</h3>
              <button
                onClick={() => setSelectedGrievance(null)}
                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateStatus} className="p-5 space-y-3.5">
              <div className="p-3 rounded-xl bg-slate-50 text-xs">
                <div className="font-bold text-slate-900">{selectedGrievance.subject}</div>
                <div className="text-slate-500">ID: {selectedGrievance.trackingId}</div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Change Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-emerald-600"
                >
                  <option value="submitted">Submitted (New)</option>
                  <option value="under_review">Under Investigation / Assigned to Contractor</option>
                  <option value="resolved">Resolved & Work Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Panchayat Resolution Note
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Pump repair team dispatched. Water supply restored at 4 PM."
                  value={resolutionNote}
                  onChange={(e) => setResolutionNote(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-emerald-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider"
              >
                Save & Update Citizen Tracker
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
