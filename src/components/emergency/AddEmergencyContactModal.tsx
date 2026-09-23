import React, { useState } from 'react';
import { X, UserPlus, Phone, Users, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface AddEmergencyContactModalProps {
  onClose: () => void;
}

export const AddEmergencyContactModal: React.FC<AddEmergencyContactModalProps> = ({
  onClose
}) => {
  const { addDesignatedContact, setNotificationBanner, currentLocation } = useApp();

  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('Family / Relative');
  const [phone, setPhone] = useState('');
  const [notifyViaSms, setNotifyViaSms] = useState(true);
  const [notifyViaWhatsapp, setNotifyViaWhatsapp] = useState(true);
  const [isPrimary, setIsPrimary] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    addDesignatedContact({
      name,
      relationship,
      phone,
      notifyViaSms,
      notifyViaWhatsapp,
      status: 'idle',
      distanceKm: 0.9,
      coordinates: {
        latitude: (currentLocation.coordinates?.latitude || 15.8497) + (Math.random() - 0.5) * 0.01,
        longitude: (currentLocation.coordinates?.longitude || 74.4977) + (Math.random() - 0.5) * 0.01
      },
      avatarColor: 'bg-emerald-600',
      isPrimary
    });

    setNotificationBanner(`✓ Added ${name} as designated emergency contact!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold">Add Designated Emergency Contact</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-3.5">
          <p className="text-xs text-slate-600">
            This person will automatically receive your real-time GPS location via WhatsApp/SMS the moment you press the SOS button.
          </p>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Contact Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Parashuram Patil"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Relationship / Role *
            </label>
            <select
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-indigo-600"
            >
              <option value="Family / Relative">Family / Relative (Parent, Sibling, Child)</option>
              <option value="Spouse">Spouse / Partner</option>
              <option value="Neighbor / Co-Farmer">Village Neighbor / Co-Farmer</option>
              <option value="Village Volunteer">Civil Defense / Village Volunteer</option>
              <option value="Gram Sevak / Panchayat">Gram Sevak / Panchayat Member</option>
              <option value="Doctor / Nurse">Local Doctor / ASHA Nurse</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Mobile Phone Number (WhatsApp Enabled) *
            </label>
            <input
              type="tel"
              required
              placeholder="+91 98450 XXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-indigo-600"
            />
          </div>

          <div className="space-y-2 pt-1 border-t border-slate-100">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={notifyViaWhatsapp}
                onChange={(e) => setNotifyViaWhatsapp(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded"
              />
              <span>Send Live GPS Map link via WhatsApp</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={notifyViaSms}
                onChange={(e) => setNotifyViaSms(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded"
              />
              <span>Send SMS alert with coordinates</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={isPrimary}
                onChange={(e) => setIsPrimary(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded"
              />
              <span>Mark as Primary Responder (Contacted 1st)</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-colors mt-2"
          >
            Save Emergency Contact
          </button>
        </form>
      </div>
    </div>
  );
};
