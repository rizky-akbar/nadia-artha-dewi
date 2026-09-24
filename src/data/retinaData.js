export const retinaModes = [
  {
    id: 'normal',
    label: 'Healthy Human Retina (OD)',
    subLabel: 'Normal Fundus Photography — Clinical Baseline',
    imageSrc: '/assets/retina_fundus_normal.jpg',
    description: 'A crisp optical fundus view of a healthy neurosensory retina. Observe the well-defined optic disc margins, normal cup-to-disc ratio (0.3), uniform arteriolar-venular caliber (2:3), and the dark pigment concentration of the avascular fovea centralis.',
    keyStats: [
      { label: 'Photoreceptors', value: '~126 Million' },
      { label: 'Foveal Acuity', value: '20/20 Optimal' },
      { label: 'Retinal Thickness', value: '250–310 µm' },
      { label: 'Vascular State', value: 'Intact Endothelium' }
    ],
    hotspots: [
      {
        id: 'fovea',
        name: 'Fovea Centralis & Macula Lutea',
        latinName: 'Fovea centralis & Macula lutea',
        x: 64,
        y: 50,
        category: 'Anatomy',
        shortDesc: 'The 1.5mm central depression responsible for high-resolution 20/20 vision, reading, and color discernment.',
        clinicalSignificance: 'Contains the highest density of cone photoreceptors (~140,000/mm²) and zero blood vessels (Foveal Avascular Zone) to prevent light scatter.',
        symptomsIfDamaged: 'Central visual distortion (metamorphopsia), difficulty reading fine print, blind spots (scotoma), and faded color perception.',
        specialistTreatment: 'Spectral-domain Optical Coherence Tomography (SD-OCT) guided anti-VEGF pharmacotherapy, sub-tenon triamcinolone, or macular hole peeling surgery.',
        badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40'
      },
      {
        id: 'optic-disc',
        name: 'Optic Disc (Optic Nerve Head)',
        latinName: 'Discus nervi optici',
        x: 31,
        y: 50,
        category: 'Anatomy',
        shortDesc: 'The convergence point where 1.2 million retinal ganglion cell axons gather to form the optic nerve to the brain.',
        clinicalSignificance: 'The physiological blind spot of the eye. Examined for neuroretinal rim color, cup-to-disc ratio, margin sharpness, and intraocular pressure damage.',
        symptomsIfDamaged: 'Peripheral visual field loss, dimming of vision, optic disc edema (papilledema), or glaucomatous cupping.',
        specialistTreatment: 'Glaucoma neuroprotective therapy, pressure-lowering topical medications, micro-pulse laser trabeculoplasty, or neuro-ophthalmic workup.',
        badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
      },
      {
        id: 'superior-arcade',
        name: 'Superior Vascular Arcade',
        latinName: 'Arteriola & venula temporalis retinae superior',
        x: 48,
        y: 24,
        category: 'Vascular',
        shortDesc: 'Primary microvascular branch supplying oxygen and nutrients to the superior and temporal retina.',
        clinicalSignificance: 'High hemodynamic shear stress makes this arcade prone to branch retinal vein occlusion (BRVO) and hypertensive arteriolar crossing changes.',
        symptomsIfDamaged: 'Sudden lower-field hemianopic vision blur, localized hemorrhage showers, or ischemic edema.',
        specialistTreatment: 'OCT-Angiography capillary perfusion mapping, targeted retinal laser photocoagulation, and intravitreal anti-VEGF therapy.',
        badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/40'
      },
      {
        id: 'inferior-arcade',
        name: 'Inferior Vascular Arcade',
        latinName: 'Arteriola & venula temporalis retinae inferior',
        x: 48,
        y: 78,
        category: 'Vascular',
        shortDesc: 'Primary vascular arch nourishing the inferior neurosensory retina.',
        clinicalSignificance: 'Monitored for vessel tortuosity, venous beading, and perivascular sheathing in systemic vasculitis and diabetic retinopathy.',
        symptomsIfDamaged: 'Upper-field visual deficits, localized scotoma, or vitreous hemorrhage if fragile neovascular vessels rupture.',
        specialistTreatment: 'Fundus fluorescein angiography (FFA) transit timing and medical vascular risk-factor stabilization.',
        badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/40'
      },
      {
        id: 'periphery',
        name: 'Peripheral Retina & Vitreous Base',
        latinName: 'Ora serrata & Pars plana retinae',
        x: 88,
        y: 38,
        category: 'Surgical Focus',
        shortDesc: 'The outer margin of the sensory retina near the ciliary body where vitreoretinal adhesion is strongest.',
        clinicalSignificance: 'Common site for lattice degenerations, atrophic holes, and horseshoe tears caused by posterior vitreous detachment (PVD).',
        symptomsIfDamaged: 'Flashing lights (photopsia), shower of dark floaters, or a peripheral dark curtain shadow.',
        specialistTreatment: 'Urgent 360-degree indirect ophthalmoscopy with scleral indentation, green laser barrier retinopexy, or 27G vitrectomy.',
        badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
      }
    ]
  },
  {
    id: 'diabetic',
    label: 'Diabetic Retinopathy & Macular Edema',
    subLabel: 'Pathological Fundus Photography — Microvascular Sequelae',
    imageSrc: '/assets/retina_pathology_diabetic.jpg',
    description: 'Pathological fundus demonstrating Non-Proliferative to Pre-Proliferative Diabetic Retinopathy. Observe multiple pinpoint microaneurysms, flame hemorrhages, intraretinal lipid exudates, and early macular edema threatening the foveal contour.',
    keyStats: [
      { label: 'Pathology Stage', value: 'Moderate NPDR + DME' },
      { label: 'Retinal Leakage', value: 'Capillary Breakdown' },
      { label: 'Exudate Pattern', value: 'Circinate Ring' },
      { label: 'Urgency Level', value: 'High (Clinic Review)' }
    ],
    hotspots: [
      {
        id: 'hard-exudates',
        name: 'Circinate Hard Exudates',
        latinName: 'Exsudata lipidica retinae',
        x: 68,
        y: 43,
        category: 'Pathology',
        shortDesc: 'Bright yellowish-white lipid and lipoprotein deposits precipitated from hyperpermeable retinal capillaries.',
        clinicalSignificance: 'Arranged in a classic circinate ring around leaky microaneurysms, serving as an optical hallmark of chronic macular edema.',
        symptomsIfDamaged: 'Blurry, washed-out central vision, washed colors, and decreased reading contrast.',
        specialistTreatment: 'Direct focal laser treatment to microaneurysm feeder points combined with intravitreal Anti-VEGF (Aflibercept/Faricimab).',
        badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40'
      },
      {
        id: 'microaneurysms',
        name: 'Retinal Microaneurysms',
        latinName: 'Microaneurysma retinae',
        x: 26,
        y: 33,
        category: 'Pathology',
        shortDesc: 'Focal microscopic balloon-like dilations of retinal capillaries (10–100 µm) caused by loss of pericytes.',
        clinicalSignificance: 'The earliest clinically detectable sign of diabetic retinopathy, indicating basement membrane breakdown.',
        symptomsIfDamaged: 'Often entirely asymptomatic in early stages, highlighting the vital need for regular dilated eye exams.',
        specialistTreatment: 'Strict metabolic glycemic control (HbA1c < 7.0%), blood pressure control, and serial OCT monitoring.',
        badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40'
      },
      {
        id: 'flame-hemorrhages',
        name: 'Flame & Dot-Blot Hemorrhages',
        latinName: 'Haemorrhagia intraretinalis',
        x: 52,
        y: 32,
        category: 'Pathology',
        shortDesc: 'Intraretinal blood leakage located within the superficial nerve fiber layer and deeper middle retinal layers.',
        clinicalSignificance: 'Reflects severe capillary fragility and microvascular incompetence across the vascular arcades.',
        symptomsIfDamaged: 'Transient scotoma, mild visual distortion, or dramatic dark haze if blood leaks into the vitreous body.',
        specialistTreatment: 'Pan-retinal photocoagulation (PRP) if neovascularization develops, accompanied by monthly anti-VEGF injections.',
        badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40'
      },
      {
        id: 'macular-edema',
        name: 'Diabetic Macular Edema (DME)',
        latinName: 'Oedema maculae diabeticum',
        x: 64,
        y: 50,
        category: 'Pathology',
        shortDesc: 'Abnormal accumulation of serous fluid within the foveal neurosensory retina, distorting photoreceptor alignment.',
        clinicalSignificance: 'The leading cause of permanent visual impairment and legal blindness in working-age diabetic individuals.',
        symptomsIfDamaged: 'Metamorphopsia (straight lines appear wavy), loss of facial recognition detail, and dark central blind patch.',
        specialistTreatment: 'First-line therapy: Intravitreal Anti-VEGF injections; second-line: sustained-release dexamethasone intravitreal implant.',
        badgeColor: 'bg-red-500/20 text-red-300 border-red-500/40'
      }
    ]
  }
];
