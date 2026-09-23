import React, { useState } from 'react';
import {
  Users,
  Bell,
  HelpCircle,
  FileQuestion,
  AlertTriangle,
  Send,
  CheckCircle2,
  Clock,
  PhoneCall,
  Search,
  X,
  Volume2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AudioSpeakerButton } from '../common/AudioSpeakerButton';

export const CommunityScreen: React.FC = () => {
  const {
    t,
    language,
    notices,
    grievances,
    submitGrievance,
    currentLocation
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'notices' | 'grievance' | 'track'>('notices');
  const [grievanceModalOpen, setGrievanceModalOpen] = useState(false);
  const [trackingSearch, setTrackingSearch] = useState('');

  // Grievance form state
  const [category, setCategory] = useState<'water' | 'roads' | 'electricity' | 'sanitation' | 'health' | 'other'>('water');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [citizenName, setCitizenName] = useState('');
  const [phone, setPhone] = useState('');
  const [newTrackingId, setNewTrackingId] = useState<string | null>(null);

  const handleGrievanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !citizenName || !phone) return;

    const id = submitGrievance({
      category,
      subject,
      description: description || subject,
      village: currentLocation.village,
      citizenName,
      phone
    });

    setNewTrackingId(id);
  };

  const resetGrievanceForm = () => {
    setSubject('');
    setDescription('');
    setCitizenName('');
    setPhone('');
    setNewTrackingId(null);
    setGrievanceModalOpen(false);
    setActiveSubTab('track');
  };

  const filteredGrievances = grievances.filter((g) => {
    if (!trackingSearch) return true;
    const q = trackingSearch.toLowerCase();
    return (
      g.trackingId.toLowerCase().includes(q) ||
      g.subject.toLowerCase().includes(q) ||
      g.citizenName.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-4 pb-20 sm:pb-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-violet-900 via-purple-900 to-indigo-950 rounded-3xl p-4 sm:p-5 text-white shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 text-xs font-semibold mb-2">
              <Users className="w-3.5 h-3.5 text-violet-300" />
              <span>
                {language === 'kn' ? 'ಗ್ರಾಮ ಸಭೆ ಮತ್ತು ಸಾರ್ವಜನಿಕ ವೇದಿಕೆ' : language === 'hi' ? 'ग्राम सभा और जन मंच' : 'Grama Sabhe Portal'}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">{t.communityBoard}</h1>
            <p className="text-xs sm:text-sm text-violet-100 max-w-lg mt-1">
              {language === 'kn'
                ? 'ಗ್ರಾಮ ಪಂಚಾಯತಿ ಪ್ರಕಟಣೆಗಳು, ಕಳೆದುಹೋದ ವಸ್ತುಗಳು ಮತ್ತು ಸಾರ್ವಜನಿಕ ಸಮಸ್ಯೆಗಳ ಪರಿಹಾರ.'
                : language === 'hi'
                ? 'ग्राम पंचायत की सूचनाएं, खोया-पाया और गाँव की समस्याओं का त्वरित निवारण।'
                : 'Panchayat announcements, lost & found board, and public grievance resolution.'}
            </p>
          </div>

          <button
            onClick={() => setGrievanceModalOpen(true)}
            className="h-12 px-5 rounded-2xl bg-white text-violet-950 font-bold text-sm flex items-center justify-center gap-2 hover:bg-violet-50 active:scale-95 transition-all shadow-md shrink-0"
          >
            <AlertTriangle className="w-4 h-4 text-violet-700" />
            <span>{t.fileGrievance}</span>
          </button>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
        <button
          onClick={() => setActiveSubTab('notices')}
          className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all text-center ${
            activeSubTab === 'notices'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {t.villageNotices} ({notices.length})
        </button>

        <button
          onClick={() => setActiveSubTab('track')}
          className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all text-center ${
            activeSubTab === 'track'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {t.trackGrievance} ({grievances.length})
        </button>
      </div>

      {/* 1. Notices & Announcements */}
      {activeSubTab === 'notices' && (
        <div className="space-y-3">
          {notices.map((n) => {
            const title =
              language === 'kn' ? n.titleKn : language === 'hi' ? n.titleHi : n.title;
            const content =
              language === 'kn' ? n.contentKn : language === 'hi' ? n.contentHi : n.content;

            return (
              <div
                key={n.id}
                className={`bg-white rounded-2xl border p-4 shadow-xs transition-colors ${
                  n.isUrgent ? 'border-amber-300 ring-2 ring-amber-100' : 'border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-bold text-violet-800 uppercase tracking-wide">
                        {n.category.replace('_', ' ')}
                      </span>
                      <span className="text-slate-300">·</span>
                      <span className="text-xs text-slate-500">{n.postedBy}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 leading-snug">{title}</h3>
                  </div>

                  {n.isUrgent && (
                    <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-bold text-[10px] shrink-0">
                      URGENT
                    </span>
                  )}
                </div>

                <p className="mt-2 text-xs text-slate-700 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  {content}
                </p>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <AudioSpeakerButton size="sm" textToRead={`${title}. ${content}`} />
                    <span className="text-xs text-slate-400">{n.date}</span>
                  </div>

                  {n.contactPhone && (
                    <a
                      href={`tel:${n.contactPhone.replace(/\s+/g, '')}`}
                      className="text-xs font-bold text-violet-700 hover:text-violet-900 flex items-center gap-1"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Call Contact</span>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 2. Track Grievance Status */}
      {activeSubTab === 'track' && (
        <div className="space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Tracking ID (e.g. RC-2026-BL-1082) or subject..."
              value={trackingSearch}
              onChange={(e) => setTrackingSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-violet-600"
            />
          </div>

          <div className="space-y-3">
            {filteredGrievances.map((g) => {
              const statusColors = {
                submitted: 'bg-amber-100 text-amber-900 border-amber-200',
                under_review: 'bg-blue-100 text-blue-900 border-blue-200',
                resolved: 'bg-emerald-100 text-emerald-900 border-emerald-200'
              };

              const statusLabels = {
                submitted: 'Submitted to Panchayat',
                under_review: 'Under Investigation',
                resolved: 'Resolved by Department'
              };

              return (
                <div
                  key={g.id}
                  className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:border-violet-300 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <span className="text-xs font-mono font-bold text-violet-800">
                        {g.trackingId}
                      </span>
                      <span className="text-slate-300 mx-1.5">·</span>
                      <span className="text-xs text-slate-500 uppercase">{g.category}</span>
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold border ${statusColors[g.status]}`}
                    >
                      {statusLabels[g.status]}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-slate-900">{g.subject}</h3>
                  <p className="text-xs text-slate-600 mt-1">{g.description}</p>

                  {g.resolutionNotes && (
                    <div className="mt-2.5 p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                      <strong>Resolution Note:</strong> {g.resolutionNotes}
                    </div>
                  )}

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Submitted by {g.citizenName}</span>
                    <span>Date: {g.submittedDate}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modal: File Grievance */}
      {grievanceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-4 bg-violet-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-violet-300" />
                <h3 className="text-base font-bold">{t.fileGrievance}</h3>
              </div>
              <button
                onClick={resetGrievanceForm}
                className="w-8 h-8 rounded-full bg-violet-800 hover:bg-violet-700 flex items-center justify-center text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto">
              {newTrackingId ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">
                    {language === 'kn' ? 'ದೂರು ಯಶಸ್ವಿಯಾಗಿ ದಾಖಲಾಗಿದೆ!' : language === 'hi' ? 'शिकायत सफलतापूर्वक दर्ज हुई!' : 'Grievance Registered!'}
                  </h4>
                  <p className="text-xs text-slate-600 max-w-xs mx-auto">
                    {language === 'kn'
                      ? 'ಪಂಚಾಯತಿ ಅಭಿವೃದ್ಧಿ ಅಧಿಕಾರಿಗೆ (PDO) ದೂರು ತಲುಪಿದೆ. ಪರಿಹಾರದ ಹಂತಗಳನ್ನು ಕೆಳಗಿನ ಟ್ರ್ಯಾಕಿಂಗ್ ಐಡಿ ಬಳಸಿ ಪರಿಶೀಲಿಸಿ.'
                      : language === 'hi'
                      ? 'पंचायत अधिकारी को सूचना पहुँच गई है। आप नीचे दिए ट्रैकिंग आईडी से स्थिति देख सकते हैं।'
                      : 'The Panchayat Development Officer has received your complaint. Track progress anytime using your ID.'}
                  </p>
                  <div className="p-3 rounded-xl bg-violet-50 border border-violet-200 text-sm font-mono font-black text-violet-900">
                    {newTrackingId}
                  </div>
                  <button
                    onClick={resetGrievanceForm}
                    className="w-full py-3 rounded-xl bg-violet-900 text-white font-bold text-xs uppercase"
                  >
                    View Status in Tracker
                  </button>
                </div>
              ) : (
                <form onSubmit={handleGrievanceSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Problem Category *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-violet-600"
                    >
                      <option value="water">Drinking Water Supply / Tank / Pipeline</option>
                      <option value="electricity">Electricity / Transformer / Streetlight</option>
                      <option value="roads">Road Damage / Potholes / Drainage</option>
                      <option value="sanitation">Waste & Sanitation</option>
                      <option value="health">Primary Health Centre / Medicine</option>
                      <option value="other">Other Panchayat Matters</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Problem Title / Short Subject *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Drinking water pump motor burnt since 2 days"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-violet-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Exact Location & Details
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Near Rampura old school well, around 40 households affected..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-violet-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Basavaraj"
                        value={citizenName}
                        onChange={(e) => setCitizenName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-violet-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Your Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 94812 XXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-violet-600"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-violet-900 hover:bg-violet-950 text-white font-bold text-sm shadow-md transition-colors"
                  >
                    Submit Grievance to Panchayat
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
