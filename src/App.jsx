import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import InteractiveRetinaCard from './components/InteractiveRetinaCard.jsx';
import AboutSection from './components/AboutSection.jsx';
import ScholarFeed from './components/ScholarFeed.jsx';
import BlogSection from './components/BlogSection.jsx';
import AmslerGridTool from './components/AmslerGridTool.jsx';
import PracticeSchedule from './components/PracticeSchedule.jsx';
import Footer from './components/Footer.jsx';
import AppointmentModal from './components/AppointmentModal.jsx';
import AdminLoginModal from './components/admin/AdminLoginModal.jsx';
import AdminPanelModal from './components/admin/AdminPanelModal.jsx';
import { SiteProvider } from './context/SiteContext.jsx';

function MainWebsite() {
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Sticky Navigation Header */}
      <Navbar onOpenAppointment={() => setAppointmentModalOpen(true)} />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section with Doctor Portrait */}
        <Hero onOpenAppointment={() => setAppointmentModalOpen(true)} />

        {/* 2. Interactive Retina Card with Hovering Info & Picture */}
        <InteractiveRetinaCard />

        {/* 3. Doctor Profile & Specialties */}
        <AboutSection />

        {/* 4. Real-time Google Scholar Feeds */}
        <ScholarFeed />

        {/* 5. Ophthalmology Blog Cards & Insights (CRUD Connected) */}
        <BlogSection />

        {/* 6. Interactive Amsler Grid Self-Test */}
        <AmslerGridTool onOpenAppointment={() => setAppointmentModalOpen(true)} />

        {/* 7. Clinical Practice Schedule & Hospital Locations */}
        <PracticeSchedule onOpenAppointment={() => setAppointmentModalOpen(true)} />
      </main>

      {/* Footer with discreet /admin link */}
      <Footer />

      {/* Patient Appointment Modal */}
      <AppointmentModal
        isOpen={appointmentModalOpen}
        onClose={() => setAppointmentModalOpen(false)}
      />

      {/* Admin Security Modal & Control Dashboard (triggered via /admin or #admin) */}
      <AdminLoginModal />
      <AdminPanelModal />
    </div>
  );
}

export default function App() {
  return (
    <SiteProvider>
      <MainWebsite />
    </SiteProvider>
  );
}
