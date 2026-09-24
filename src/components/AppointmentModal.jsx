import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Phone, MessageSquare, CheckCircle2, AlertCircle, Send } from 'lucide-react';
import { useSite } from '../context/SiteContext.jsx';

export default function AppointmentModal({ isOpen, onClose }) {
  const { siteContent } = useSite();
  const contact = siteContent?.contact || {};
  const practice = siteContent?.practice || {};
  const clinicLocations = practice.locations || [];
  const whatsappNumber = contact.whatsappNumber || '6281234567890';

  const defaultLocation = clinicLocations[0]?.name || 'RSUD Dr. Saiful Anwar Malang';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: defaultLocation,
    reason: 'Diabetic Retinopathy Screening',
    date: '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello Admin, I would like to schedule an ophthalmology consultation with Dr. dr. Nadia Artha Dewi, Sp.M(K).\n\nPatient Name: ${formData.name || '-'}\nPhone: ${formData.phone || '-'}\nLocation: ${formData.location}\nReason: ${formData.reason}\nPreferred Date: ${formData.date || '-'}\nNotes: ${formData.notes || '-'}`
    );
    window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-950 border border-cyan-800/60 rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1.5 pr-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            <span>Consultation Scheduling</span>
          </div>
          <h3 className="text-2xl font-bold text-white font-serif">
            Book an Appointment
          </h3>
          <p className="text-xs text-slate-400">
            Consultation with Dr. dr. Nadia Artha Dewi, Sp.M(K) at RSUD Dr. Saiful Anwar or Academic Eye Clinic.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-8 space-y-4 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-white font-serif">
              Consultation Request Received!
            </h4>
            <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
              Our clinical coordinator will contact you via WhatsApp or phone to confirm your exact appointment slot and preparation instructions.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleWhatsAppDirect}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Confirm on WhatsApp Now</span>
              </button>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-medium bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            
            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Patient Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Budi Santoso"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                WhatsApp / Mobile Phone *
              </label>
              <input
                type="tel"
                required
                placeholder="e.g. 0812-3456-7890"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Location */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Practice Location
              </label>
              <select
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
              >
                {clinicLocations.length > 0 ? (
                  clinicLocations.map((loc, i) => (
                    <option key={i} value={`${loc.name} (${loc.division || loc.badge || 'Practice'})`}>
                      {loc.name} — {loc.division || loc.badge || 'Practice'}
                    </option>
                  ))
                ) : (
                  <>
                    <option value="RSUD Dr. Saiful Anwar Malang (Vitreo-Retina Clinic)">
                      RSUD Dr. Saiful Anwar Malang (Retina Subspecialty Clinic)
                    </option>
                    <option value="Academic Eye Clinic Malang (Private Consultation)">
                      Academic Eye Clinic Malang (Private Consultation)
                    </option>
                  </>
                )}
              </select>
            </div>

            {/* Reason for consultation */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Reason for Visit / Condition
              </label>
              <select
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="Diabetic Retinopathy Screening">Diabetic Retinopathy Screening & Laser</option>
                <option value="Retinal Tear / Flashes & Floaters">Retinal Tear / Sudden Flashes & Floaters</option>
                <option value="Macular Degeneration (AMD) / Edema">Macular Degeneration (AMD) / Anti-VEGF</option>
                <option value="Pediatric Myopia Progression Evaluation">Pediatric Myopia Progression Evaluation</option>
                <option value="Pars Plana Vitrectomy Second Opinion">Pars Plana Vitrectomy (MIVS) Second Opinion</option>
                <option value="Comprehensive Eye Examination">Comprehensive Eye Examination</option>
              </select>
            </div>

            {/* Preferred Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Preferred Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Additional Notes / Current Symptoms (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Briefly describe previous eye surgeries or specific symptoms..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Submit Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="flex-1 py-3 px-4 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 text-white shadow-lg shadow-cyan-900/40 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Request</span>
              </button>

              <button
                type="button"
                onClick={handleWhatsAppDirect}
                className="py-3 px-4 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Instant WhatsApp</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-400 text-center pt-1">
              For sudden vision loss or acute trauma, please proceed immediately to the Emergency Room (IGD).
            </p>
          </form>
        )}

      </div>
    </div>
  );
}
