import React, { useState } from 'react';
import {
  Briefcase,
  PhoneCall,
  MapPin,
  Clock,
  PlusCircle,
  CheckCircle2,
  X,
  Users,
  Building,
  Check,
  DollarSign
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LocalJob } from '../../types';
import { AudioSpeakerButton } from '../common/AudioSpeakerButton';

export const JobsScreen: React.FC = () => {
  const { t, language, localJobs, postJob, currentLocation } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'agricultural' | 'skilled' | 'construction'>('all');
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [appliedJobIds, setAppliedJobIds] = useState<string[]>([]);
  const [applyModalJob, setApplyModalJob] = useState<LocalJob | null>(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  // Post Job form state
  const [title, setTitle] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [location, setLocation] = useState(currentLocation.village);
  const [wage, setWage] = useState('');
  const [wageType, setWageType] = useState<'daily' | 'monthly' | 'piece_rate'>('daily');
  const [workType, setWorkType] = useState<'skilled' | 'unskilled' | 'agricultural' | 'construction'>('agricultural');
  const [openings, setOpenings] = useState('4');
  const [duration, setDuration] = useState('3-5 Days immediate');
  const [phone, setPhone] = useState('');
  const [requirements, setRequirements] = useState('');

  const filteredJobs = localJobs.filter((j) => {
    if (activeFilter === 'all') return true;
    return j.workType === activeFilter;
  });

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !employerName || !wage || !phone) return;

    postJob({
      title,
      employerName,
      location: location || currentLocation.village,
      wage,
      wageType,
      workType,
      openings: Number(openings) || 2,
      duration,
      phone,
      requirements: requirements ? requirements.split(',').map((r) => r.trim()) : ['Hardworking and reliable']
    });

    setPostModalOpen(false);
    // reset
    setTitle('');
    setWage('');
    setPhone('');
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyModalJob) {
      setAppliedJobIds((prev) => [...prev, applyModalJob.id]);
    }
    setAppliedSuccess(true);
    setTimeout(() => {
      setAppliedSuccess(false);
      setApplyModalJob(null);
      setApplicantName('');
      setApplicantPhone('');
    }, 2000);
  };

  return (
    <div className="space-y-4 pb-20 sm:pb-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-800 to-emerald-900 rounded-3xl p-4 sm:p-5 text-white shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 text-xs font-semibold mb-2">
              <Briefcase className="w-3.5 h-3.5 text-teal-300" />
              <span>
                {language === 'kn' ? 'ಗ್ರಾಮೀಣ ಉದ್ಯೋಗ ಮಿತ್ರ' : language === 'hi' ? 'ग्रामीण रोजगार मंच' : 'Gramin Rojgar'}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">{t.localJobs}</h1>
            <p className="text-xs sm:text-sm text-teal-100 max-w-lg mt-1">
              {language === 'kn'
                ? 'ಗ್ರಾಮದಲ್ಲಿ ದೈನಂದಿನ ಕೃಷಿ ಕೆಲಸ, ಕೂಲಿ, ಟ್ರ್ಯಾಕ್ಟರ್ ಡ್ರೈವರ್ ಹಾಗೂ ಗುತ್ತಿಗೆದಾರರ ಖಾಲಿ ಹುದ್ದೆಗಳು.'
                : language === 'hi'
                ? 'गाँव में दिहाड़ी काम, फसल कटाई, ट्रैक्टर चालक और राजमिस्त्री के अवसर।'
                : 'Find daily wage opportunities, harvesting work, driver roles, and post farm vacancies.'}
            </p>
          </div>

          <button
            onClick={() => setPostModalOpen(true)}
            className="h-12 px-5 rounded-2xl bg-white text-teal-950 font-bold text-sm flex items-center justify-center gap-2 hover:bg-teal-50 active:scale-95 transition-all shadow-md shrink-0"
          >
            <PlusCircle className="w-4 h-4 text-teal-700" />
            <span>{t.postJobBtn}</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap border transition-colors ${
            activeFilter === 'all'
              ? 'bg-slate-900 text-white border-slate-900'
              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
          }`}
        >
          {t.all} ({localJobs.length})
        </button>
        <button
          onClick={() => setActiveFilter('agricultural')}
          className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap border transition-colors ${
            activeFilter === 'agricultural'
              ? 'bg-slate-900 text-white border-slate-900'
              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
          }`}
        >
          {language === 'kn' ? 'ಕೃಷಿ ಕೆಲಸ' : language === 'hi' ? 'कृषि कार्य' : 'Agricultural'}
        </button>
        <button
          onClick={() => setActiveFilter('skilled')}
          className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap border transition-colors ${
            activeFilter === 'skilled'
              ? 'bg-slate-900 text-white border-slate-900'
              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
          }`}
        >
          {language === 'kn' ? 'ಕುಶಲ ಕೆಲಸ' : language === 'hi' ? 'कुशल कार्य' : 'Skilled / Driver'}
        </button>
        <button
          onClick={() => setActiveFilter('construction')}
          className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap border transition-colors ${
            activeFilter === 'construction'
              ? 'bg-slate-900 text-white border-slate-900'
              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
          }`}
        >
          {language === 'kn' ? 'ನಿರ್ಮಾಣ / ಕಲ್ಲು ಕೆಲಸ' : language === 'hi' ? 'निर्माण कार्य' : 'Construction'}
        </button>
      </div>

      {/* Jobs Feed */}
      <div className="space-y-3">
        {filteredJobs.map((job) => {
          const isApplied = appliedJobIds.includes(job.id);

          return (
            <div
              key={job.id}
              className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:border-teal-300 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-teal-800 uppercase tracking-wide">
                      {job.workType}
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-xs text-slate-500">{job.employerName}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">{job.title}</h3>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-base font-black text-emerald-800 tabular-nums">
                    {job.wage}
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium">
                    {job.openings} openings
                  </span>
                </div>
              </div>

              <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs text-slate-600">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{job.location}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{job.duration}</span>
                </span>
              </div>

              {/* Requirements text list */}
              {job.requirements && job.requirements.length > 0 && (
                <div className="mt-3 p-2.5 rounded-xl bg-slate-50 text-xs text-slate-700 space-y-1 border border-slate-100">
                  <span className="font-semibold text-slate-800 block text-[11px]">
                    Requirements:
                  </span>
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {job.requirements.map((req, idx) => (
                      <span key={idx} className="flex items-center gap-1">
                        <span className="text-teal-600 font-bold">•</span>
                        <span>{req}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <AudioSpeakerButton
                    size="sm"
                    textToRead={`${job.title}. Employer: ${job.employerName}. Wage: ${job.wage}. Location: ${job.location}. Duration: ${job.duration}.`}
                  />
                  <span className="text-xs text-slate-400">Posted {job.postedDate}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (!isApplied) {
                        setApplyModalJob(job);
                      }
                    }}
                    disabled={isApplied}
                    className={`h-9 px-3.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors ${
                      isApplied
                        ? 'bg-slate-100 text-slate-500 border border-slate-200'
                        : 'bg-slate-900 text-white hover:bg-slate-800'
                    }`}
                  >
                    {isApplied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Applied</span>
                      </>
                    ) : (
                      <span>{t.applyNow}</span>
                    )}
                  </button>

                  <a
                    href={`tel:${job.phone.replace(/\s+/g, '')}`}
                    className="h-9 px-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>{t.callEmployer}</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Post Job Opening */}
      {postModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-4 bg-teal-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-teal-300" />
                <h3 className="text-base font-bold">{t.postJobBtn}</h3>
              </div>
              <button
                onClick={() => setPostModalOpen(false)}
                className="w-8 h-8 rounded-full bg-teal-800 hover:bg-teal-700 flex items-center justify-center text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handlePostSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Job / Work Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Paddy Harvesting Workers, Tractor Driver"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-teal-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Employer / Farm Owner Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Suresh Gowda"
                    value={employerName}
                    onChange={(e) => setEmployerName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-teal-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 94481 XXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-teal-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Wage Rate (with food/tea) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ₹550 / day + Lunch"
                    value={wage}
                    onChange={(e) => setWage(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-teal-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Number of Openings
                  </label>
                  <input
                    type="number"
                    required
                    value={openings}
                    onChange={(e) => setOpenings(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-teal-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Work Type</label>
                  <select
                    value={workType}
                    onChange={(e) => setWorkType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-teal-600"
                  >
                    <option value="agricultural">Agricultural (Farming)</option>
                    <option value="skilled">Skilled (Driver / Machine)</option>
                    <option value="construction">Construction & Masonry</option>
                    <option value="unskilled">General Daily Wage</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. 5 Days or Season"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-teal-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Location / Field *
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-teal-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Key Requirements (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Early morning 7 AM, harvesting experience, bring sickle"
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-teal-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-sm shadow-md transition-colors"
              >
                Publish Job to Village Board
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: 1-Tap Apply */}
      {applyModalJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="text-base font-bold">1-Tap Job Application</h3>
              <button
                onClick={() => setApplyModalJob(null)}
                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5">
              {appliedSuccess ? (
                <div className="text-center py-6 space-y-2">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-base font-bold text-slate-900">Application Sent!</h4>
                  <p className="text-xs text-slate-600">
                    The farm owner / employer has received your details and phone number via SMS alert.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleApplySubmit} className="space-y-3.5">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <div className="font-bold text-slate-900">{applyModalJob.title}</div>
                    <div className="text-slate-500">
                      Employer: {applyModalJob.employerName} · {applyModalJob.wage}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ningappa"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-teal-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98XXX XXXXX"
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-teal-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider"
                  >
                    Confirm & Send My Details
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
