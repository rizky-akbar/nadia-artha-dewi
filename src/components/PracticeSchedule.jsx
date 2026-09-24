import React from 'react';
import { MapPin, Clock, Calendar, Phone, Building, ExternalLink, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { useSite } from '../context/SiteContext.jsx';

export default function PracticeSchedule({ onOpenAppointment }) {
  const { siteContent } = useSite();
  const practiceContent = siteContent?.practice || {};
  const clinicLocations = practiceContent.locations && practiceContent.locations.length > 0 
    ? practiceContent.locations 
    : [
    {
      name: 'RSUD Dr. Saiful Anwar Malang (RSSA)',
      division: 'Subspesialis Vitreo-Retina & Poliklinik Mata',
      type: 'Tertiary Referral & Academic Hospital',
      address: 'Jl. Jaksa Agung Suprapto No. 2, Klojen, Kota Malang, Jawa Timur 65112',
      phone: '(0341) 362101 / 362102',
      schedule: [
        { days: 'Monday, Wednesday, Friday', hours: '08:00 – 13:00 WIB' },
        { days: 'Vitreoretinal Surgeries', hours: 'By Scheduled Admission' },
      ],
      badge: 'Main Hospital',
      badgeColor: 'bg-cyan-950 text-cyan-300 border-cyan-800',
      mapsUrl: 'https://maps.google.com/?q=RSUD+Dr.+Saiful+Anwar+Malang',
    },
    {
      name: 'Academic Eye Clinic / Executive Care',
      division: 'Executive Consultation & Diagnostic Imaging',
      type: 'Specialist Private & Academic Clinic',
      address: 'Fakultas Kedokteran Universitas Brawijaya Eye Center, Kota Malang',
      phone: '(0341) 569117',
      schedule: [
        { days: 'Tuesday & Thursday', hours: '16:00 – 20:00 WIB' },
        { days: 'Saturday', hours: 'By Appointment Only' },
      ],
      badge: 'Evening Practice',
      badgeColor: 'bg-amber-950 text-amber-300 border-amber-800',
      mapsUrl: 'https://maps.google.com/?q=Fakultas+Kedokteran+Universitas+Brawijaya',
    },
  ];

  return (
    <section id="practice-schedule" className="py-20 lg:py-28 relative overflow-hidden bg-slate-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            <Building className="w-3.5 h-3.5 text-cyan-400" />
            <span>{practiceContent.badge || 'Clinical Practice & Hospital Affiliations'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-serif tracking-tight">
            {practiceContent.title?.includes('Locations') ? (
              <>
                {practiceContent.title.replace('Locations', '')}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300">
                  Locations
                </span>
              </>
            ) : (
              practiceContent.title || 'Consultation Hours & Locations'
            )}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            {practiceContent.subTitle || 'In-person specialized retinal evaluation, OCT imaging, and outpatient laser procedures at premier medical facilities in Malang.'}
          </p>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {clinicLocations.map((loc, index) => (
            <div
              key={index}
              className="p-7 sm:p-8 rounded-3xl bg-slate-950/80 border border-slate-800/80 hover:border-cyan-600/40 transition-all duration-300 space-y-6 flex flex-col justify-between shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${loc.badgeColor}`}>
                      {loc.badge}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-serif mt-2 leading-snug">
                      {loc.name}
                    </h3>
                    <p className="text-xs text-cyan-400 font-medium">
                      {loc.division}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {loc.type}
                    </p>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-cyan-400">
                    <Building className="w-6 h-6" />
                  </div>
                </div>

                {/* Address & Phone */}
                <div className="space-y-2 pt-2 text-xs text-slate-300">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{loc.address}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{loc.phone}</span>
                  </div>
                </div>

                {/* Schedule Box */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    Official Practice Hours
                  </h4>
                  <div className="space-y-1.5">
                    {loc.schedule.map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-xs">
                        <span className="text-slate-300 font-medium">{item.days}</span>
                        <span className="text-cyan-300 font-mono font-semibold">{item.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-3">
                <a
                  href={loc.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-cyan-300 font-medium transition-colors"
                >
                  <span>Google Maps Directions</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={onOpenAppointment}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 text-white shadow-md transition-all"
                >
                  Book at this Hospital
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Emergency Trauma Advisory Notice */}
        <div className="p-5 sm:p-6 rounded-2xl bg-rose-950/25 border border-rose-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <h4 className="text-sm font-bold text-white">
                {practiceContent.emergencyTitle || 'Ocular Emergency / Acute Retinal Detachment Hotline'}
              </h4>
              <p className="text-xs text-slate-300">
                {practiceContent.emergencyText || 'Patients experiencing sudden total vision darkness, blunt trauma, chemical injury, or explosive flashes should immediately report to RSUD Dr. Saiful Anwar Emergency Room (IGD 24 Jam).'}
              </p>
            </div>
          </div>
          <a
            href={`tel:${(practiceContent.emergencyPhone || '0341362101').replace(/[^0-9]/g, '')}`}
            className="shrink-0 px-4 py-2 rounded-xl text-xs font-bold text-rose-200 bg-rose-900/40 hover:bg-rose-900/60 border border-rose-700/60 transition-colors"
          >
            Emergency {practiceContent.emergencyPhone || '(0341) 362101'}
          </a>
        </div>

      </div>
    </section>
  );
}
