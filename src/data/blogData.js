export const blogPostsData = [
  {
    id: 'blog-1',
    title: 'The Childhood Myopia Surge: Evidence-Based Prevention for Parents',
    excerpt: 'Digital screens and sedentary indoor habits are driving higher rates of progressive myopia in young children. Learn the science behind outdoor lux exposure and modern clinical interventions.',
    category: 'Pediatric Vision',
    date: 'February 15, 2026',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop',
    author: 'Dr. dr. Nadia Artha Dewi, Sp.M(K)',
    tags: ['Myopia', 'Pediatric Ophthalmology', 'Screen Time', 'Axial Length'],
    content: {
      intro: 'As co-author of "Belajar tentang Miopia", I frequently encounter parents worried about their child\'s rapidly increasing glasses prescription. Myopia is not merely an inconvenience of wearing thick glasses; progressive high myopia (exceeding -6.00 Diopters) dramatically elevates the lifetime risk of retinal detachment, myopic macular degeneration, and early glaucoma.',
      subheadings: [
        {
          title: 'The Mechanism of Daylight and Retinal Dopamine',
          body: 'Research demonstrates that natural sunlight triggers retinal dopamine release, which acts as a biochemical brake against abnormal axial elongation of the eyeball. Ambient indoor light (typically 300 to 500 lux) is vastly insufficient compared to outdoor daylight (10,000 to 100,000 lux). Two hours of outdoor activity daily can cut myopia progression risk by up to 50%.'
        },
        {
          title: 'The 20-20-20 Rule and Working Distance',
          body: 'Holding tablets or books closer than 30 cm induces sustained hyperopic defocus on the peripheral retina, signaling the eye to lengthen. Children should strictly adhere to the 20-20-20 rule: every 20 minutes of near work, look at an object 20 feet (6 meters) away for at least 20 seconds.'
        },
        {
          title: 'Clinical Control Modalities: Atropine & Orthokeratology',
          body: 'When lifestyle modifications are insufficient, medical interventions such as low-dose atropine eye drops (0.01% - 0.05%) or specialized peripheral defocus spectacle lenses (DIMS/H.A.L.T.) provide statistically significant deceleration of axial growth.'
        }
      ],
      clinicalTakeaways: [
        'Aim for minimum 120 minutes of outdoor play every day in natural sunlight.',
        'Keep reading and screen distance at 35–40 cm minimum; avoid bedtime phone use.',
        'Schedule annual cycloplegic refraction checks to monitor actual axial length, not just manifest vision.'
      ],
      doctorAdvice: 'Never treat progressive nearsightedness as just a changing prescription. Early intervention preserves your child\'s retinal integrity for decades to come.'
    }
  },
  {
    id: 'blog-2',
    title: 'Silent Sight Stealer: Why Diabetic Retinopathy Requires Annual Screening',
    excerpt: 'Over 80% of individuals living with diabetes for over 15 years will develop some degree of retinal microvascular damage. Early detection before symptom onset is key to preserving vision.',
    category: 'Retina Care',
    date: 'January 28, 2026',
    readTime: '7 min read',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop',
    author: 'Dr. dr. Nadia Artha Dewi, Sp.M(K)',
    tags: ['Diabetic Retinopathy', 'Macular Edema', 'Anti-VEGF', 'Fundus Exam'],
    content: {
      intro: 'In my vitreo-retina practice, the most heartbreaking consultations are patients who walk in with profound vision loss from proliferative diabetic retinopathy or diabetic macular edema, having had no prior warning pain or blurriness in earlier stages. The retina lacks pain receptors, allowing microvascular destruction to silently advance.',
      subheadings: [
        {
          title: 'From Microaneurysms to Neovascularization',
          body: 'Chronic hyperglycemia degrades the pericytes lining retinal capillaries, leading to microscopic outpouchings (microaneurysms), hemorrhage leakage, and lipid exudation. As capillary non-perfusion spreads, ischemic retinal tissue releases Vascular Endothelial Growth Factor (VEGF), causing fragile new blood vessels that bleed catastrophically into the vitreous cavity.'
        },
        {
          title: 'Center-Involving Diabetic Macular Edema (DME)',
          body: 'Fluid pooling in the fovea breaks down central visual acuity, making faces and text appear wavy or washed out. Today, intravitreal Anti-VEGF pharmacotherapy (such as Aflibercept, Faricimab, or Ranibizumab) can reverse swelling and restore letters on the eye chart without surgical scarring.'
        },
        {
          title: 'Pan-Retinal Photocoagulation (PRP) & Minimally Invasive Surgery',
          body: 'When proliferative disease occurs, targeted laser photocoagulation shuts down ischemic stimulus. If vitreous hemorrhage or tractional retinal detachment develops, modern small-gauge pars plana vitrectomy clears blood and relieves retinal tension.'
        }
      ],
      clinicalTakeaways: [
        'Type 2 diabetics must have a dilated fundus exam at diagnosis and at least annually.',
        'Tight HbA1c control (< 7.0%) and strict blood pressure management directly stabilize retinal capillaries.',
        'Sudden floaters, dark cobwebs, or a red curtain over your vision indicate urgent vitreoretinal evaluation.'
      ],
      doctorAdvice: 'Do not wait for your vision to become blurry before seeing a retina specialist. By the time symptoms appear, treatable window time has already elapsed.'
    }
  },
  {
    id: 'blog-3',
    title: 'Flashes & Floaters: How to Distinguish Normal Aging from Retinal Detachment',
    excerpt: 'Are those floating spots and fleeting lightning flashes harmless vitreous syneresis or an emergent retinal tear? Here is how ophthalmologists triage posterior vitreous detachment.',
    category: 'Retina Care',
    date: 'January 12, 2026',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=1200&auto=format&fit=crop',
    author: 'Dr. dr. Nadia Artha Dewi, Sp.M(K)',
    tags: ['Vitreous Floaters', 'Retinal Tear', 'Photopsia', 'Emergency Eye Care'],
    content: {
      intro: 'Almost everyone notices occasional faint cobwebs or specks drifting across their vision against a blue sky or white wall. However, an acute onset of dense new floaters accompanied by electrical arcs of light (photopsia) demands immediate dilated indirect ophthalmoscopy.',
      subheadings: [
        {
          title: 'Posterior Vitreous Detachment (PVD) Explained',
          body: 'The vitreous humor is a gel-like substance filling the posterior four-fifths of the eye. With age (often between 45 and 70, or earlier in myopic patients), the gel liquefies and peels away from the inner retinal surface. This natural separation is called Posterior Vitreous Detachment.'
        },
        {
          title: 'The Danger Zone: Retinal Tears',
          body: 'In approximately 10–15% of acute symptomatic PVDs, the vitreous adheres tightly to the peripheral retina. As it pulls free, it rips a horseshoe tear in the fragile neurosensory tissue. If liquid vitreous seeps beneath this tear, it rapidly unzips the retina into a full-blown rhegmatogenous retinal detachment.'
        },
        {
          title: 'Preventative Laser Retinopexy',
          body: 'If a tear is caught within 24 to 48 hours before fluid causes detachment, an in-clinic barrier laser or cryotherapy seals the edges with zero surgical incisions, saving the patient from major hospital surgery.'
        }
      ],
      clinicalTakeaways: [
        'Sudden cluster of dark pepper-like dots or large ring floaters (Weiss ring) needs emergency evaluation.',
        'Arc-like light flashes, especially in dim light, indicate active vitreous traction on the retina.',
        'A dark shadow or curtain encroaching from the side or bottom of your vision is a medical emergency.'
      ],
      doctorAdvice: 'Whenever new floaters or flashes appear, never adopt a wait-and-see attitude. A 20-minute clinic examination can prevent months of surgical recovery.'
    }
  },
  {
    id: 'blog-4',
    title: 'Advances in 27-Gauge Micro-Incisional Vitrectomy Surgery (MIVS)',
    excerpt: 'Explore how ultra-high-speed vitrectomy cutters (up to 20,000 cuts/min) and sub-millimeter transconjunctival trocars deliver faster visual rehabilitation and patient comfort.',
    category: 'Surgical Innovations',
    date: 'December 18, 2025',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=1200&auto=format&fit=crop',
    author: 'Dr. dr. Nadia Artha Dewi, Sp.M(K)',
    tags: ['Vitrectomy', 'MIVS', '27-Gauge', 'Microsurgery', 'Ophthalmic Tech'],
    content: {
      intro: 'Historically, vitrectomy required large 20-gauge incisions, extensive conjunctival dissection, and multiple postoperative sutures, leading to ocular irritation and prolonged healing. Today, 25-gauge and 27-gauge transconjunctival sutureless vitrectomy systems have redefined vitreoretinal surgery.',
      subheadings: [
        {
          title: 'Sub-Millimeter Self-Sealing Ports',
          body: 'A 27-gauge instrument has an outer diameter of just 0.40 millimeters—less than half a millimeter. Valved cannulas inserted directly through conjunctiva create self-sealing tunnel incisions that rarely require sutures, drastically decreasing postoperative astigmatism and foreign-body sensation.'
        },
        {
          title: 'Beveled Dual-Pneumatic Cutters',
          body: 'Modern vitrectomy probes cut at rates of 10,000 to 20,000 cuts per minute with duty-cycle control. This allows safe, millimeter-precise dissection directly on the retinal surface without generating dangerous vitreous traction or unintended tears.'
        },
        {
          title: 'Integrated Intraoperative OCT (iOCT)',
          body: 'Equipped with 3D surgical visualization heads-up displays and intraoperative OCT, surgeons can visualize microscopic internal limiting membrane (ILM) peels and macular holes in real-time micron resolution.'
        }
      ],
      clinicalTakeaways: [
        'Sutureless entry means minimal eye redness, quicker recovery, and same-day discharge.',
        'Higher cut rates minimize intraocular turbulence and preserve surrounding neural tissue.',
        'Precision peeling techniques achieve macular hole closure rates exceeding 95%.'
      ],
      doctorAdvice: 'Modern vitreoretinal microsurgery is gentler and more predictable than ever. Trusting experienced microsurgical hands with state-of-the-art instrumentation ensures optimal outcomes.'
    }
  }
];

export const initialArticleCategories = [
  'Retina Care',
  'Pediatric Vision',
  'Surgical Innovations',
  'General Eye Health',
];
