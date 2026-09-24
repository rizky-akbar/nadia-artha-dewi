import { publicationsData, initialScholarStats } from './scholarData.js';
import { retinaModes } from './retinaData.js';

export const defaultSiteContent = {
  // 1. Hero Section
  hero: {
    doctorName: 'Dr. dr. Nadia Artha Dewi',
    doctorDegree: 'Sp.M(K)',
    fellowshipBadge: 'Vitreo-Retina Consultant (Sp.M(K)) • Nihon Univ. Tokyo & RSCM Fellow',
    headlineMain: 'Restoring Clarity,',
    headlineGradient: 'Preserving Sight.',
    subTitle: 'Ophthalmologist & Vitreo-Retina Specialist',
    bio: 'Senior Vitreo-Retina Consultant and academician at Universitas Brawijaya and RSUD Dr. Saiful Anwar Malang. Specializing in micro-incisional vitrectomy, center-involving diabetic retinopathy, pediatric myopia control, and complex ocular reconstructive surgery.',
    stat1Label: 'Clinical Experience',
    stat1Value: '20+ Years',
    stat1Sub: 'Academic & Surgical',
    stat2Label: 'Vitreoretinal Surgeries',
    stat2Value: '4,500+',
    stat2Sub: 'Micro-Incisional (MIVS)',
    stat3Label: 'Academic Works',
    stat3Value: '35+ Papers',
    stat3Sub: 'Author of "Miopia"',
  },

  // 2. About Section
  about: {
    badge: 'Physician & Academic Profile',
    headline: 'A Legacy of Precision Microsurgery & Dedicated Research',
    bioP1: 'Dr. dr. Nadia Artha Dewi, Sp.M(K) is an Indonesian consultant ophthalmologist recognized for her pioneering work in Vitreoretinal Surgery, ocular oncology diagnostics, and pediatric refractive health.',
    bioP2: 'After completing her medical and ophthalmology specialist training at Universitas Brawijaya, she completed specialized international vitreoretinal surgical training at Surugadai Hospital, Nihon University in Tokyo, Japan, followed by advanced fellowships at RSUP Cipto Mangunkusumo Jakarta.',
    bioP3: 'Currently serving as the Head of the Ophthalmology Specialist Study Program (KPS) at the Faculty of Medicine Universitas Brawijaya and senior consultant at RSUD Dr. Saiful Anwar Malang, Dr. Nadia actively blends bedside clinical excellence with groundbreaking research in diabetic retinopathy, posterior scleritis, and axial myopia in children.',
    quote: 'The human retina is a direct extension of the brain — delicate, irreplaceable, and wondrous. In every surgery, whether sealing a torn retina or restoring a child\'s visual horizon, meticulous precision and compassionate empathy guide every micron of our care.',
    quoteAuthor: 'Dr. dr. Nadia Artha Dewi, Sp.M(K)',
    leadershipTitle: 'Head of Ophthalmologist Specialist Training (KPS)',
    leadershipDesc: 'Educating future vitreoretinal surgeons and ophthalmologists at FKUB.',
  },

  // 3. Clinical Specialties (Array)
  specialties: [
    {
      title: 'Micro-Incisional Vitrectomy (MIVS)',
      desc: 'Sutureless 25-gauge and 27-gauge pars plana vitrectomy for non-clearing vitreous hemorrhage, macular holes, epiretinal membranes, and foreign body extraction.',
      tag: 'Microsurgery',
    },
    {
      title: 'Diabetic Retinopathy & Macular Edema',
      desc: 'Multimodal management utilizing ultra-widefield imaging, Spectral-Domain OCT, targeted retinal laser photocoagulation, and personalized intravitreal anti-VEGF regimens.',
      tag: 'Medical Retina',
    },
    {
      title: 'Rhegmatogenous Retinal Detachment',
      desc: 'Emergency repair of tears and full-thickness retinal detachments using micro-vitrectomy, perfluorocarbon liquid, endolaser, and long-acting gas/silicone oil tamponade.',
      tag: 'Emergency Retina',
    },
    {
      title: 'Pediatric Myopia & Visual Development',
      desc: 'Early screening, cycloplegic axial length tracking, and evidenced-based interventions as co-author of the textbook "Belajar tentang Miopia".',
      tag: 'Pediatric Care',
    },
    {
      title: 'Posterior Scleritis & Uveitis Diagnostics',
      desc: 'Differential diagnostics for inflammatory ocular disease mimicking intraocular tumors, utilizing high-frequency B-scan ultrasonography (T-sign) and systemic immunotherapy.',
      tag: 'Ocular Oncology & Uveitis',
    },
    {
      title: 'Complex Cataract & Phacoemulsification',
      desc: 'Micro-coaxial cataract surgery with toric and multifocal premium intraocular lenses (IOLs) for patients with concurrent vitreoretinal or myopic conditions.',
      tag: 'Anterior Segment',
    },
  ],

  // 4. Education & Fellowships (Array)
  education: [
    {
      year: '2021',
      title: 'Doctorate in Medical Sciences (Dr.)',
      institution: 'Faculty of Medicine, Universitas Brawijaya',
      description: 'Doctoral dissertation investigating biomolecular markers and inflammatory pathways in retinal disease progression.',
    },
    {
      year: '2006',
      title: 'Vitreo-Retina Surgical Fellowship',
      institution: 'Surugadai Hospital, Nihon University (Tokyo, Japan) & RSUP Cipto Mangunkusumo (Jakarta)',
      description: 'Advanced microsurgical training in pars plana vitrectomy, complex macular hole peeling, and retinal detachment reconstruction.',
    },
    {
      year: '2005',
      title: 'Ophthalmology Specialist Degree (Sp.M)',
      institution: 'Department of Ophthalmology, Universitas Brawijaya',
      description: 'Specialist residency in clinical ophthalmology, surgical cataract care, and ocular emergency management.',
    },
    {
      year: '2000',
      title: 'Medical Doctor Degree (dr.)',
      institution: 'Faculty of Medicine, Universitas Brawijaya',
      description: 'Foundational clinical medical degree with distinction.',
    },
  ],

  // 5. Interactive Retina Explorer (Modes & Hotspots)
  retina: {
    badge: 'Interactive Ophthalmic Diagnostics',
    title: 'Explore the Living Retina',
    subTitle: 'Hover over the anatomical landmarks and clinical hotspots below to explore human retinal microstructure, vascular arcades, and pathological lesions examined by Vitreo-Retina specialists.',
    modes: retinaModes,
  },

  // 6. Google Scholar & Academic Feeds
  scholar: {
    badge: 'Real-Time Academic Feeds',
    title: 'Google Scholar & Scientific Feeds',
    subTitle: 'Real-time feed of peer-reviewed journal papers, clinical textbooks, and academic citations authored by Dr. Nadia Artha Dewi, Sp.M(K).',
    stats: initialScholarStats,
    scholarProfileUrl: 'https://scholar.google.com/citations?user=CcARsGgAAAAJ&hl=en',
    sintaProfileUrl: 'https://sinta.kemdiktisaintek.go.id/authors/profile/5982903',
    spotlight: {
      enabled: true,
      badge: '★ Featured Landmark Research • Full Abstract',
      title: 'Google Scholar Hero Spotlight',
      subTitle: 'Peer-reviewed clinical trials, surgical innovations, and medical textbooks with complete scientific abstracts.',
      featuredPubIds: ['pub-3', 'pub-2', 'pub-5', 'pub-9', 'pub-11', 'pub-18', 'pub-20'],
      defaultPubId: 'pub-3',
    },
    publications: publicationsData,
  },

  // 7. Amsler Grid Macular Tool
  amsler: {
    badge: 'Self-Screening Diagnostic Tool',
    title: 'Interactive Amsler Grid Test',
    subTitle: 'The standard diagnostic test used by vitreo-retina specialists to detect early macular degeneration, foveal swelling, and central visual distortion (metamorphopsia).',
    step1: 'Wear your normal reading glasses or contact lenses if prescribed.',
    step2: 'Position yourself approximately 35–40 cm (14 inches) from your screen.',
    step3: 'Cover your left eye with your hand. Stare steadily at the white center dot. Repeat for the other eye.',
    step4: 'While looking at the center dot, observe the surrounding lines. Are any lines bent, wavy, blurry, or missing?',
    normalFeedback: 'No evident central metamorphopsia detected on this screen. However, this screening does not replace comprehensive dilated fundus examination, especially for diabetic individuals or high myopes.',
    distortedFeedback: 'Distorted, wavy, or absent grid lines can indicate underlying macular edema, epiretinal membrane, wet macular degeneration, or central serous chorioretinopathy. An urgent Spectral-Domain OCT scan with a vitreo-retina consultant is strongly advised.',
  },

  // 8. Practice Schedule & Locations
  practice: {
    badge: 'Clinical Practice & Hospital Affiliations',
    title: 'Consultation Hours & Locations',
    subTitle: 'In-person specialized retinal evaluation, OCT imaging, and outpatient laser procedures at premier medical facilities in Malang.',
    locations: [
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
    ],
    emergencyTitle: 'Ocular Emergency / Acute Retinal Detachment Hotline',
    emergencyText: 'Patients experiencing sudden total vision darkness, blunt trauma, chemical injury, or explosive flashes should immediately report to RSUD Dr. Saiful Anwar Emergency Room (IGD 24 Jam).',
    emergencyPhone: '(0341) 362101',
  },

  // 9. Contact & WhatsApp Booking
  contact: {
    whatsappNumber: '6281234567890',
    whatsappLabel: '+62 812-3456-7890',
    emailContact: 'retina.clinic@nadiaarthadewi.com',
  },

  // 10. Footer & Legal
  footer: {
    bio: 'Dedicated to restoring and safeguarding human vision through precision vitreoretinal microsurgery, modern diagnostic imaging, and cutting-edge pediatric myopia control research.',
    department: 'Departemen Ilmu Kesehatan Mata FKUB',
    hospital: 'RSUD Dr. Saiful Anwar Malang',
    city: 'Malang, Jawa Timur, Indonesia',
    disclaimer: 'Medical Disclaimer: The information, clinical articles, interactive retinal models, and Amsler Grid diagnostic tools provided on this website are intended solely for educational, academic, and patient awareness purposes. They do not constitute formal medical diagnosis or replace a personalized in-clinic ophthalmic examination. For acute vision changes, please visit an ophthalmology emergency room immediately.',
    copyrightYear: new Date().getFullYear().toString(),
  },
};
