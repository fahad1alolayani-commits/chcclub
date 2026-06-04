export interface LanguagePack {
  navHome: string;
  navAbout: string;
  navEvents: string;
  navNews: string;
  navLeadership: string;
  navGallery: string;
  navJoin: string;
  clubName: string;
  ksuName: string;
  collegeName: string;
  heroHeading: string;
  heroSubheading: string;
  heroCtaJoin: string;
  heroCtaEvents: string;
  statsSectionTitle: string;
  statsBeneficiaries: string;
  statsCampaigns: string;
  statsMembers: string;
  statsHours: string;
  aboutUsHeadline: string;
  aboutUsText: string;
  visionTitle: string;
  visionText: string;
  missionTitle: string;
  missionText: string;
  objectivesTitle: string;
  objectivesList: string[];
  eventsSectionTitle: string;
  eventsSectionSub: string;
  newsSectionTitle: string;
  newsSectionSub: string;
  leadershipTitle: string;
  leadershipSub: string;
  galleryTitle: string;
  gallerySub: string;
  joinTitle: string;
  joinSub: string;
  joinLimitNote: string;
  joinFormName: string;
  joinFormEmail: string;
  joinFormEmailPlaceholder: string;
  joinFormId: string;
  joinFormIdPlaceholder: string;
  joinFormDept: string;
  joinFormLevel: string;
  joinFormReason: string;
  joinFormSubmit: string;
  joinValidationEmailErr: string;
  joinValidationIdErr: string;
  joinValidationRequired: string;
  joinSuccessTitle: string;
  joinSuccessText: string;
  joinCardTitle: string;
  joinCardIssued: string;
  joinCardKSU: string;
  close: string;
  allDepartments: string[];
}

export interface ClubEvent {
  id: string;
  title: { ar: string; en: string };
  date: { ar: string; en: string };
  location: { ar: string; en: string };
  description: { ar: string; en: string };
  details: { ar: string[]; en: string[] };
  category: { ar: string; en: string };
  metrics: { label: { ar: string; en: string }; value: string }[];
  tag: string;
}

export interface NewsItem {
  id: string;
  title: { ar: string; en: string };
  date: { ar: string; en: string };
  summary: { ar: string; en: string };
  content: { ar: string; en: string };
  imageUrl: string;
}

export interface TeamMember {
  id: string;
  name: { ar: string; en: string };
  role: { ar: string; en: string };
  department: { ar: string; en: string };
  bio: { ar: string; en: string };
  bgColorClass: string;
}

export interface GalleryItem {
  id: string;
  title: { ar: string; en: string };
  category: { ar: string; en: string };
  imageUrl: string;
}

export const translations: Record<"ar" | "en", LanguagePack> = {
  en: {
    navHome: "Home",
    navAbout: "About Us",
    navEvents: "Campaigns & Events",
    navNews: "News",
    navLeadership: "Leadership Team",
    navGallery: "Gallery",
    navJoin: "Join Us",
    clubName: "Community Health Club",
    ksuName: "King Saud University",
    collegeName: "College of Applied Medical Sciences",
    heroHeading: "Promoting Health and Community Education",
    heroSubheading: "The Community Health Club at the College of Applied Medical Sciences coordinates public campaigns, interactive screenings, and local workshops to raise health literacy and combat modern chronic diseases across Saudi Arabia.",
    heroCtaJoin: "Join Us",
    heroCtaEvents: "Our Past Events",
    statsSectionTitle: "Our Cumulative Impact",
    statsBeneficiaries: "Campaign Beneficiaries Reached",
    statsCampaigns: "Field Awareness Campaigns",
    statsMembers: "Registered Active Volunteers",
    statsHours: "Approved Volunteer Hours",
    aboutUsHeadline: "Nurturing Tomorrow's Healthcare Champions",
    aboutUsText: "The Community Health Club at the College of Applied Medical Sciences at King Saud University was established as a pioneering initiative following the historic merger of the Health Education Club and the Nutrition Club. Operating under the academic supervision and leadership of the Department of Community Health Sciences, this integration unifies student efforts to combine clinical nutritional sciences with direct public health awareness. We believe that preventative education is the primary defense against chronic health challenges. Under this academic alignment, our students design high-impact screening campaigns, execute vital health checks, and build clinical leadership skills, aligning directly with the health sector transformation goals of Saudi Vision 2030.",
    visionTitle: "Our Vision",
    visionText: "To be the most prominent, pioneering, and impactful student-led model across Saudi universities in disseminating preventative health and nutritional awareness, fostering a campus and local community that enjoys healthy, sustainable lifestyles.",
    missionTitle: "Our Mission",
    missionText: "To empower students of the College of Applied Medical Sciences by providing an interactive incubator that merges scientific knowledge with hands-on volunteer community work, refining their leadership skills to deliver innovative outreach campaigns that support public health in alignment with Saudi Vision 2030.",
    objectivesTitle: "Tactical Club Objectives",
    objectivesList: [
      "Promote preventative health habits and lifestyle corrections regarding obesity, physical activity, and balanced nutrition.",
      "Conduct professional on-campus and community outreach medical screening boot camps.",
      "Cultivate operational excellence, event medical protocols, and project management skills among CAMS students.",
      "Bridge the gap between academic medical theories and empirical community applications.",
      "Establish active dialogue and alignment with Saudi Vision 2030’s health sector transformation program."
    ],
    eventsSectionTitle: "Our Key Health Campaigns",
    eventsSectionSub: "Every year we coordinate massive, structured public initiatives to elevate the community's health IQ.",
    newsSectionTitle: "Latest Highlights & News",
    newsSectionSub: "Catch up on our recent accomplishments, awards, and upcoming academic operations.",
    leadershipTitle: "Eminent Board of Directors",
    leadershipSub: "The students guiding our departments, leading strategic alignments, and coordinating community impact.",
    galleryTitle: "Campaign Moments",
    gallerySub: "Glimpses of our active student crews on the ground during public check-ups and workshops.",
    joinTitle: "Embark on Your Health Leadership Journey",
    joinSub: "Represent the College of Applied Medical Sciences and influence community healthcare.",
    joinLimitNote: "Notice: Registration is strictly open only for active students enrolled at King Saud University (KSU). Valid student email domain and student ID format are required.",
    joinFormName: "Full Name",
    joinFormEmail: "University Email (KSU)",
    joinFormEmailPlaceholder: "e.g., student_id@student.ksu.edu.sa",
    joinFormId: "KSU Student ID",
    joinFormIdPlaceholder: "e.g., 441201550 or 443204992",
    joinFormDept: "Academic Department at CAMS",
    joinFormLevel: "Academic Year / Level",
    joinFormReason: "Why do you wish to join the health campaign crew?",
    joinFormSubmit: "Confirm Registry & Issue ID",
    joinValidationEmailErr: "Please provide a valid King Saud University email address ending with ksu.edu.sa.",
    joinValidationIdErr: "Student ID must begin with 43 or 44 and contain 9 numeric digits.",
    joinValidationRequired: "This field is requested for verification.",
    joinSuccessTitle: "Registration Validated Successfully!",
    joinSuccessText: "Welcome aboard! Your academic record has been validated and you have been formally registered in the Community Health Club database. Here is your student digital membership card:",
    joinCardTitle: "OFFICIAL STUDENT MEMBER",
    joinCardIssued: "Date of Issue: June 2026",
    joinCardKSU: "College of Applied Medical Sciences",
    close: "Dismiss",
    allDepartments: [
      "Clinical Nutrition (التغذية الإكلينيكية)",
      "Physical Therapy (العلاج الطبيعي)",
      "Community Health Sciences (علوم صحة المجتمع)",
      "Clinical Laboratory Sciences (المختبرات الإكلينيكية)",
      "Radiological Sciences (العلوم الإشعاعية)",
      "Optometry & Vision Sciences (البصريات وعلوم الرؤية)",
      "Dental Health (صحة الأسنان)",
      "Biomedical Technology (التكنولوجيا الطبية الحيوية)"
    ]
  },
  ar: {
    navHome: "الرئيسية",
    navAbout: "من نحن",
    navEvents: "الفعاليات",
    navNews: "الأخبار",
    navLeadership: "الهيكلة",
    navGallery: "استوديو الصور",
    navJoin: "انضم إلينا",
    clubName: "نادي صحة المجتمع",
    ksuName: "جامعة الملك سعود",
    collegeName: "كلية العلوم الطبية التطبيقية",
    heroHeading: "تعزيز الصحة والتثقيف المجتمعي",
    heroSubheading: "يقوم نادي صحة المجتمع بقسم علوم صحة المجتمع بكلية العلوم الطبية التطبيقية دوره في تنظيم الفعاليات الصحية التي لتهدف لزيادة وعي المجتمع صحياً.",
    heroCtaJoin: "انضم إلينا",
    heroCtaEvents: "فعالياتنا السابقة",
    statsSectionTitle: "أرقامنا وأثرنا ونمونا",
    statsBeneficiaries: "مستفيد من الفعاليات الميدانية",
    statsCampaigns: "فعالية ميدانية",
    statsMembers: "عضو ومتطوع فعال بالنادي",
    statsHours: "ساعة تطوعية معتمدة",
    aboutUsHeadline: "من نحن وأهداف النادي التوعوية",
    aboutUsText: "تأسس نادي صحة المجتمع بكلية العلوم الطبية التطبيقية بجامعة الملك سعود بعد دمج نادي التثقيف الصحي ونادي التغذية الإكلينيكية لتوحيد الطاقات الطلابية تحت إشراف قسم علوم صحة المجتمع ونشر ثقافة الصحة العامة. نهدف في النادي إلى تعزيز الوعي الصحي من خلال تبسيط المفاهيم الطبية والغذائية وتسهيل تطبيقها اليومي، تفعيلاً لدور الكلية والجامعة في خدمة المجتمع وتدريب وتطوير الطلاب والطالبات في المجالات التوعوية والوقائية.",
    visionTitle: "رؤيتنا",
    visionText: "تفعيل الدور الطلابي في نشر التوعية الصحية والغذائية السليمة، والمساهمة في بناء مجتمع جامعي ومحلي يتمتع بوافر الصحة العافية والوقائية بطرق تفاعلية وبسيطة.",
    missionTitle: "رسالتنا",
    missionText: "توفير بيئة طلابية تعاونية تمكن أعضاء النادي من تقديم خدمات توعوية وتثقيفية متميزة تدعم صحتهم وتخدم المجتمع الجامعي والمحلي بإخلاص وتفانٍ.",
    objectivesTitle: "أهداف النادي",
    objectivesList: [
      "نشر الوعي وتبسيط مفاهيم العادات اليومية الصحيحة كالتغذية السليمة والنشاط البدني.",
      "المشاركة الفعّالة في الأنشطة والفعاليات الصحية والوقائية داخل وخارج الجامعة.",
      "صقل وتطوير مهارات الطلاب والطالبات في تنظيم وإدارة اللقاءات والحملات التوعوية.",
      "توفير فرص تطوعية ممتعة ومفيدة لخدمة الزملاء ومجتمعنا في جامعة الملك سعود.",
      "التعاون المثمر والمستمر مع الأقسام الأكاديمية والجهات الصحية ذات العلاقة."
    ],
    eventsSectionTitle: "فعالياتنا السابقة ونجاحاتها التوعوية",
    eventsSectionSub: "استعراض لأبرز المبادرات والحملات الصحية التي نفذها النادي بنجاح، محققاً أثراً وقائياً ملموساً وتوعية مجتمعية متميزة.",
    newsSectionTitle: "الأخبار وأحدث المستجدات",
    newsSectionSub: "تابع أحدث إنجازات النادي، والتكريمات الأكاديمية والفعاليات القادمة بالكلية.",
    leadershipTitle: "الهيكلة التنظيمية واللجان",
    leadershipSub: "توزيع الهيكل الإداري ولجان العمل الحيوية التي تضمن تنظيم فعاليات النادي وتكاملها الأكاديمي والمهني.",
    galleryTitle: "ألبوم المبادرات الميدانية",
    gallerySub: "مقتطفات مصوّرة من حضور طواقمنا الطبية الطلابية على أرض الميدان ومحطات الفحص.",
    joinTitle: "ابدأ مسيرتك القيادية والصحية معنا",
    joinSub: "كن جزءاً من ممثلي كلية العلوم الطبية التطبيقية واصنع فارقاً حقيقياً في مجتمعك البريء.",
    joinLimitNote: "تنبيه هام ومقيد: فتح باب الانضمام مقصور كلياً وبشكل صارم على طلاب وطالبات جامعة الملك سعود الفاعلين. يتطلب إدخال البريد الجامعي وسجل جامعي صحيح لتأكيد الهوية.",
    joinFormName: "الاسم الكامل ثلاثي",
    joinFormEmail: "البريد الإلكتروني الجامعي (KSU Email)",
    joinFormEmailPlaceholder: "مثال: student_id@student.ksu.edu.sa",
    joinFormId: "الرقم الجامعي (KSU ID)",
    joinFormIdPlaceholder: "مثال: 441201550 أو 443204992",
    joinFormDept: "القسم الأكاديمي بالكلية",
    joinFormLevel: "العام الأكاديمي / المستوى الدراسي",
    joinFormReason: "لماذا تود الانضمام لفريق حملات صحة المجتمع؟",
    joinFormSubmit: "تأكيد الطلب وإصدار بطاقة النادي",
    joinValidationEmailErr: "يرجى كتابة البريد الجامعي المعتمد لجامعة الملك سعود بشكل صحيح (ينتهي بـ ksu.edu.sa).",
    joinValidationIdErr: "يجب أن يبدأ الرقم الجامعي بـ 43 أو 44 ويتكون من 9 أرقام بدون فراغات.",
    joinValidationRequired: "هذا الحقل ضروري للمصادقة وتأكيد العضوية.",
    joinSuccessTitle: "تمت المصادقة وقبول التسجيل بنجاح!",
    joinSuccessText: "أهلاً بك في النادي! لقد تم التحقق من أهليتك الجامعية وسجلنا عُضويتك في نظام النادي. تم إصدار بطاقتك الرقمية الرسمية أدناه بنجاح:",
    joinCardTitle: "عضو طلابي رسمي",
    joinCardIssued: "تاريخ الإصدار: يونيو ٢٠٢٦ م",
    joinCardKSU: "كلية العلوم الطبية التطبيقية",
    close: "إغلاق",
    allDepartments: [
      "التغذية الإكلينيكية (Clinical Nutrition)",
      "العلاج الطبيعي (Physical Therapy)",
      "علوم صحة المجتمع (Community Health Sciences)",
      "المختبرات الإكلينيكية (Clinical Laboratory Sciences)",
      "العلوم الإشعاعية (Radiological Sciences)",
      "البصريات وعلوم الرؤية (Optometry)",
      "صحة الأسنان (Dental Health)",
      "التكنولوجيا الطبية الحيوية (Biomedical Technology)"
    ]
  }
};

export const eventsData: ClubEvent[] = [
  {
    id: "nutrition-education-2026",
    tag: "nutrition-edu",
    title: {
      ar: "فعالية التوعية الغذائية (الطعام يربطنا)",
      en: "Nutritional Awareness Event (Food Connects Us)"
    },
    date: {
      ar: "١٢ فبراير ٢٠٢٦",
      en: "February 12, 2026"
    },
    location: {
      ar: "مكتب التعليم بمحافظة الدرعية",
      en: "Diriyah Education Office"
    },
    description: {
      ar: "مبادرة توعوية تفاعلية استهدفت طلاب المدارس والموجهين الصحيين لترسيخ عادات التغذية السليمة، ومكافحة استهلاك الوجبات السريعة والمشروبات المحلاة وتبني نمط غذائي معزز للنمو الصحي السليم.",
      en: "An interactive educational initiative targeting school students and health counselors to establish healthy eating habits, combat fast food and sugary drink consumption, and promote growth-supportive diets."
    },
    details: {
      ar: [
        "ركن 'وجباتي الذكية': تركيب وجبات متكاملة تفاعلياً بمشاركة الطلاب لفهم العناصر الغذائية الأساسية وعلاقتها بالنشاط والصحة.",
        "ورش عمل تخصصية للموجهين الصحيين لتزويدهم بأدوات الكشف المبكر عن السمنة في المدارس والتوجيه السلوكي.",
        "شرح 'مخاطر فائض السكر': محاكاة بصرية تفاعلية لمعدلات السكر المخفي داخل الأطعمة المدرسية الأكثر استهلاكاً.",
        "توزيع أدلة التغذية المدرسية الذكية المعتمدة من الكلية لدعم بيئة مدرسية صحية خالية من المظاهر الضارة."
      ],
      en: [
        "My Smart Meals Station: Interactive meal builders for students to design balanced food plates and trace caloric outcomes.",
        "Health Counselors Workshops: Equipping school health leads with diagnostic guidelines and behavior trackers for pediatric obesity.",
        "Hidden Sugar Simulation: Visual representations showing sugar spoon quantities in popular school snacks and drinks.",
        "School Nutrition Guides: Distribution of academic dietary sheets supporting parents and teachers with healthy alternatives."
      ]
    },
    category: {
      ar: "التوعية المدرسية والغذائية",
      en: "School & Nutrition Awareness"
    },
    metrics: [
      { label: { ar: "طلاب المدارس المستفيدين", en: "School Students Engaged" }, value: "1,200+" },
      { label: { ar: "موجهين صحيين تم تدريبهم", en: "Health Counselors Trained" }, value: "45" },
      { label: { ar: "أدلة تغذية تفاعلية موزعة", en: "Educational Packs Distributed" }, value: "850+" }
    ]
  },
  {
    id: "world-health-day-2026",
    tag: "world-health",
    title: {
      ar: "فعالية يوم الصحة العالمي في الهيئة العامة للعقار",
      en: "World Health Day Campaign at REGA"
    },
    date: {
      ar: "٧ أبريل ٢٠٢٦",
      en: "April 7, 2026"
    },
    location: {
      ar: "الهيئة العامة للعقار",
      en: "Real Estate General Authority"
    },
    description: {
      ar: "مبادرة حيوية متكاملة لتعزيز الوعي حول أهمية الرعاية الصحية وأساليب الحياة الوقائية، والمساهمة في الحد من انتشار الأمراض المزمنة من خلال إجراء فحوصات ميدانية لموظفي الهيئة.",
      en: "A comprehensive metabolic health initiative celebrating World Health Day, reinforcing preventative medicine habits and reducing chronic disease prevalence through active screening for company employees."
    },
    details: {
      ar: [
        "عيادة الفحص السريع: قياس الضغط وسكر الدم العشوائي وعلامات الجسم الحيوية لكافة منسوبي هيئة العقار.",
        "استوديو الاستشارة الوقائية: تشخيص مبكر لعوامل خطر الإصابة بالسكري عالي التراكمي وتوفير مسارات وقائية سريعة وعلمية.",
        "ندوة 'أثر العصر والإنتاجية': ربط الصحة البدنية والنفسية بالإنتاجية وحل المشاكل الناتجة عن الخمول البدني ببيئات العمل.",
        "توزيع باركودات الحقائب الطبية والأدلة الوقائية الرقمية التفاعلية الصادرة عن لجان النادي."
      ],
      en: [
        "Vitals Screening Station: Instant blood pressure, glucose, and heart rate diagnostics for employees and visitors.",
        "Preventative Consultation Cabin: Targeted risk scoring and early warning signs mapping for metabolic syndromes.",
        "Workplace Wellness & Focus Talk: Demonstrating the tight correlation between physical movement and job productivity.",
        "Interactive Digital Medical Kit: Distributing QR codes for personalized nutrition and clinical guides."
      ]
    },
    category: {
      ar: "يوم الصحة العالمي وصحة العمل",
      en: "Workplace Wellness & Health Day"
    },
    metrics: [
      { label: { ar: "موظفون خضعوا للفحص السريع", en: "Employees Screened" }, value: "680+" },
      { label: { ar: "استشارات طبية فورية", en: "On-site Medical Consults" }, value: "240+" },
      { label: { ar: "منشورات وقائية تم تحميلها", en: "Digital Pamphlets Loaded" }, value: "1,150+" }
    ]
  },
  {
    id: "kidney-health-hydration-2026",
    tag: "hydration",
    title: {
      ar: "فعالية بالإرتواء يكتمل التوازن",
      en: "With Hydration Comes Balance"
    },
    date: {
      ar: "١٠ مارس ٢٠٢٦",
      en: "March 10, 2026"
    },
    location: {
      ar: "هيئة الهلال الأحمر السعودي",
      en: "Saudi Red Crescent Authority"
    },
    description: {
      ar: "حملة وطنية تفاعلية تهدف إلى تعزيز صحة الكلى والتوعية بأهمية نسبة ارتواء الجسم بالمياه بانتظام وبطريقة صحيحة، إلى جانب التحذير من العادات الضارة مثل الاستهلاك المفرط والعشوائي للمسكنات الطبية.",
      en: "An interactive national public campaign aiming to promote kidney health and raise awareness on maintaining daily hydration logs, while warning against reckless self-prescribed analgesic consumption."
    },
    details: {
      ar: [
        "ركن 'حساب نسبة الارتواء الرقمي': قياس ومعايرة نسبة احتياج المياه الشخصي اليومي للمنتسبين بناءً على الكتلة والنشاط.",
        "عروض تفاعلية 'وظائف الكلى المذهلة': توضيح مرئي دقيق لسعة الفلترة الكلوية وأبرز الفروق بين تصفية السوائل الصحية وتأثير الترسب الحصوي.",
        "ملف 'مخاطر مسكنات الألم': التحذير العلمي المدعم بالبراهين لتجنب مضادات الالتهاب غير الستيروئيدية وتأثيرها على النفرونات الكلوية.",
        "توزيع زجاجات مياه ذكية بهوية الفعالية مصممة خصيصاً لتشجيع شرب المياه على مدار الساعات."
      ],
      en: [
        "Hydration Ratio Calculator: Precise daily water fluid calculations adjusted by user body composition and local environment.",
        "The Kidney Wonders Visuals: High-tier models explaining blood purification functions and fluid dynamics inside kidney structures.",
        "Silent Threat - Analgesic Warning: Evidence-based tutorials highlighting kidney damage risks from NSAIDs overuse.",
        "Visual Slogan Bottles: Custom-branded hydration tools distributed to motivate hourly liquid intake goals dynamically."
      ]
    },
    category: {
      ar: "صحة الكلى والتأهيل الوقائي",
      en: "Kidney Health & Hydration"
    },
    metrics: [
      { label: { ar: "حساب نسبة الارتواء الرقمي", en: "Hydration Calculators Configured" }, value: "950+" },
      { label: { ar: "توزيع زجاجات المبادرة التذكيرية", en: "Hydration Bottles Given" }, value: "1,500+" },
      { label: { ar: "تعهدات وقائية (الحد من المسكنات)", en: "Analgesic Reduction Pledges" }, value: "480+" }
    ]
  },
  {
    id: "step-by-step-obesity-2026",
    tag: "obesity",
    title: {
      ar: "فعالية خطوة بخطوة لمكافحة السمنة",
      en: "Step by Step Obesity Defense"
    },
    date: {
      ar: "٤ يناير ٢٠٢٦",
      en: "January 4, 2026"
    },
    location: {
      ar: "ساحة القيصرية بمشاركة كافة أندية الكلية",
      en: "Al-Qaysariyah Square (With All College Clubs)"
    },
    description: {
      ar: "برنامج ميداني جماهيري ضخم نظمه نادي صحة المجتمع في ساحة القيصرية وبمشاركة كافة أندية الكلية للتوعية عن السمنة ومخاطرها وتقديم حلول حركية وتأهيلية وتثقيفية متفق عليها علمياً.",
      en: "A massive field campaign organized by the Community Health Club at Qaysariyah Square with active participation of all applied medical sciences college clubs to address obesity risks, offering comprehensive fitness, nutritional, and preventative checks."
    },
    details: {
      ar: [
        "تحدي 'مضمار خطوة بخطوة': مضمار مشي تفاعلي لحساب حرق السعرات الحرارية حياً ومباشرة عند استكمال النشاط.",
        "محطات القياسات والتشخيص المشترك: فحص مؤشر كتلة الجسم وتوصيل أجهزة تتبع السكر من خلال أندية الكلية المتنوعة.",
        "عيادة 'الوقاية السلوكية': إرشادات مكافحة السمنة وخطط الوجبات الصحية المتكاملة المقدمة بالتعاون مع لجان علوم التغذية.",
        "أجنحة الأندية المتخصصة: توحيد الجهود لتوضيح أثر السمنة المباشر على مشاكل الإبصار، الضغط، والمفاصل الطرفية بنماذج حية."
      ],
      en: [
        "Step Tracker Circuit: Active walking lane tracking calories burnt and heart rates of participants.",
        "Clinical Diagnostic Stations: Advanced body composition index profiling powered by laboratory sciences and optometry teams.",
        "Active Behavior Clinic: Physical activity plans and custom home nutrition sheets delivered by clinical therapy graduates.",
        "Inter-Club Interactive Hubs: Dynamic booths demonstrating obesity's impact on vision, blood counts, and joint health."
      ]
    },
    category: {
      ar: "مكافحة السمنة والنشاط الحركي",
      en: "Obesity Defense & Fitness"
    },
    metrics: [
      { label: { ar: "زوار الفعالية بساحة القيصرية", en: "Campaign Active Visitors" }, value: "3,200+" },
      { label: { ar: "فحوص كتل وبنية الجسم التامة", en: "Complete InBody Diagnostics" }, value: "1,450+" },
      { label: { ar: "أندية الكلية المشاركة بالكامل", en: "Participating College Clubs" }, value: "7 أندية" }
    ]
  },
  {
    id: "sustainable-health-diriyah-2026",
    tag: "diriyah-health",
    title: {
      ar: "فعالية خطوة لصحة مستدامة في السمحانية",
      en: "A Step Toward Sustainable Health at Al-Samhaniah"
    },
    date: {
      ar: "١٥ مايو ٢٠٢٦",
      en: "May 15, 2026"
    },
    location: {
      ar: "السمحانية بمحافظة الدرعية",
      en: "Al-Samhaniah, Diriyah District"
    },
    description: {
      ar: "حملة توعوية تراثية فريدة أقيمت بالدرعية لتعزيز أساليب الوقاية ضد الأمراض المزمنة ورصد مسببات السمنة ومستويات مقاومة الأنسولين، في إطار تفعيل صحة البيئة والمجتمع التاريخي بالسمحانية.",
      en: "A distinct heritage-themed health campaign conducted in Diriyah to boost chronic disease prevention, screen for insulin resistance, and advocate for sustainable lifestyles inside the historic Al-Samhaniah quarters."
    },
    details: {
      ar: [
        "رصد ومسح الأمراض المزمنة: فحص فوري ونمذجة لمعايير ضغط الدم ونواقل الغلوكوز وتقديم كشوفات وقائية متخصصة للأهالي.",
        "مختبر السلوكية الغذائية: كسر العادات اليومية غير الصحية وتنظيم طرق منع الطفرات الحادة بمستويات السكري بالدم.",
        "التكامل الصحي البيئي التراثي: تفعيل مسير المشي التثقيفي في السمحانية التاريخية لحرق السعرات وتوعية السكان بالوقاية.",
        "توزيع كتيبات ورقميات مجلة صحة المجتمع المطبوعة بباركود المتابعة الذاتية لأمراض السكري والضغط."
      ],
      en: [
        "Chronic Disease Screening: Real-time screening for HbA1c glucose levels and active arterial tension checks for locals.",
        "Dietary Behavior Laboratory: Correcting daily consumption issues and managing glycemic curves without crash diets.",
        "Heritage Wellness Walk: Arranging active walking sessions in Al-Samhaniah lanes promoting 30-minute daily goals.",
        "Digital Magazine & Vitals Log: Handouts of QR codes linking to KSU community health research papers and home files."
      ]
    },
    category: {
      ar: "الأمراض المزمنة والوقاية المستدامة",
      en: "Chronic Disease & Sustainable Habits"
    },
    metrics: [
      { label: { ar: "مستفيدين تم فحصهم وتثقيفهم", en: "Diriyah Residents Screened" }, value: "1,800+" },
      { label: { ar: "اكتشاف مبكر لمؤشرات ما قبل السكري", en: "Early Pre-Diabetes Flags" }, value: "14%" },
      { label: { ar: "حضور الندوة المفتوحة بالسمحانية", en: "Symposium Seat Attendants" }, value: "350+" }
    ]
  },
  {
    id: "world-cancer-day-2026",
    tag: "cancer-awareness",
    title: {
      ar: "تفعيل اليوم العالمي للسرطان بالتعاون مع عيادات الكلية",
      en: "World Cancer Day Campaign with College Clinics"
    },
    date: {
      ar: "٤ فبراير ٢٠٢٦",
      en: "February 4, 2026"
    },
    location: {
      ar: "مركز الملك سلمان الاجتماعي",
      en: "King Salman Social Center"
    },
    description: {
      ar: "مبادرة تثقيفية وتخصصية نوعية بالتعاون مع عيادات كلية العلوم الطبية التطبيقية للتوعية حول طرق الوقاية من السرطان، كشف الإشاعات الغذائية، وأهمية الفحوص الدورية المبكرة.",
      en: "A premier oncology awareness and specialized seminar held in coordination with College Clinics to clear cancer myths, highlighting preventative lifestyle solutions and the power of routine diagnostic checks."
    },
    details: {
      ar: [
        "المناعة والغذاء المبرهن: هدم الخرافات والأساطير الشائعة حول تغذية الأورام، والوقوف على المغذيات المعززة لمقاومة الخلايا.",
        "النشاط البدني كدرع وقائي: استعراض البراهين والدراسات الطبية التي تشرح دور التدريبات الرياضية المستمرة بخفض معامل الالتهابات.",
        "محطة الاستشارات وعيادات الكلية: توفير حجز فوري ومجاني لفحوص الكشف الأولي والأوعية بمقر عيادات الكلية الجامعية.",
        "محاضرات أطباء وأكاديميي جامعة الملك سعود: جلسات تفاعلية ناقشت العوامل البيئية ومسببات السرطان وطرق السلامة الغذائية."
      ],
      en: [
        "Evidence-based Food & Immunity: Correcting oncology related food myths and delivering antioxidant dietary guides.",
        "Movement as a Shield: Studies proving the relationship between regular cardiorespiratory tasks and cancer prevention.",
        "College Clinics Checkup Bridge: Direct booking paths for visitors to access free clinic diagnostic appointments.",
        "Specialist Faculty Panel: Live discussion by clinical professors on avoiding biological and chemical environmental carcinogens."
      ]
    },
    category: {
      ar: "الوقاية والتشخيص المبكر للسرطان",
      en: "Oncology Awareness & Early Diagnoses"
    },
    metrics: [
      { label: { ar: "حضور لافت بمركز الملك سلمان", en: "Center Visitors & Attendees" }, value: "1,100+" },
      { label: { ar: "استشارات توجيهية لعيادات الكلية", en: "On-site Clinic Referrals" }, value: "190+" },
      { label: { ar: "مطويات 'الحقيقة والدواء' الموزعة", en: "Myth-Buster Booklets Out" }, value: "2,000+" }
    ]
  }
];

export const newsData: NewsItem[] = [
  {
    id: "news-award-2026",
    title: {
      ar: "النادي يتوّج بجائزة عمادة شؤون الطلاب للتميز والريادة المجتمعية",
      en: "Community Health Club Wins Deanship Award for Exemplary Service"
    },
    date: {
      ar: "١٥ مايو ٢٠٢٦",
      en: "May 15, 2026"
    },
    summary: {
      ar: "تكريم رسمي للنادي كأفضل المنشآت والنوادي لالتزامه بالخدمات وفحوصات الضغط والسمنة التي شملت آلاف المستفيدين.",
      en: "Official recognition from the Deanship of Student Affairs as the top-ranking university club for outstanding medical drive contributions."
    },
    content: {
      ar: "حصل نادي صحة المجتمع على درع جائزة أفضل نادٍ قيادي بفضل جهوده ومبادراته الوقائية الميدانية التي امتدت خارج مرافق الكلية لتشمل المجمعات التجارية والحدائق العامة بالرياض، محققاً أرقاماً ريادية وتفاعل مذهل لطلبة الكلية المتطوعين.",
      en: "In a grand celebration hosted by the Vice President of KSU, our club was honored with the Student Activities Golden Trophy. The award celebrates the club's exceptional performance in coordinating external health cabins, high-impact clinical screenups, and creating valuable voluntary pathways for medical trainees."
    },
    imageUrl: "🏆"
  },
  {
    id: "news-collaboration-2026",
    title: {
      ar: "بروتوكول تعاون علمي جديد مع مركز السكري بمدينة الملك سعود الطبية",
      en: "Strategic Clinical Affiliation Signed with King Saud Medical City (KSMC)"
    },
    date: {
      ar: "٢٨ أبريل ٢٠٢٦",
      en: "April 28, 2026"
    },
    summary: {
      ar: "اتفاقية مميزة لتعهيد برامج ومحاضرات للتوعية المشتركة وتدريب طلاب النادي على مهارات الفرز المجتمعي الدقيق.",
      en: "A robust agreement defining training collaborations and equipping student volunteers with high-tier modern clinical tools."
    },
    content: {
      ar: "وقع النادي بروتوكول تعاون تدريبي يمنح طلاب كلية العلوم الطبية التطبيقية فرصة التدرب مع كادر مدينة الملك سعود الطبية لتنظيم مبادرات وقائية احترافية وحضور ورش عمل دقيقة حول أساليب السلوكية العلاجية للعملا ومحاربة اعتلالات الأيض.",
      en: "This pioneering protocol focuses on academic mentorship, facilitating joint research-driven health booths, and letting our club members gain directly certified clinical training inside KSMC's leading endocrinology wings."
    },
    imageUrl: "🤝"
  }
];

export const teamData: TeamMember[] = [
  {
    id: "team-president",
    name: { ar: "عبدالرحمن بن خالد بن سعود", en: "Abdulrahman K. Bin Saud" },
    role: { ar: "رئيس مجلس إدارة النادي", en: "Club President" },
    department: { ar: "قسم التغذية الإكلينيكية", en: "Clinical Nutrition Dept." },
    bio: {
      ar: "طالب بالسنة الرابعة مهتم بتخطيط المبادرات الطوعية الوقائية وتعزيز مهارات إدارة المجموعات الطبية وقيادة حملات السمنة الإقليمية.",
      en: "A senior clinical nutrition student. Passionate about health logistics, coordinating metabolic campaigns, and driving community-wide healthy lifestyle transformation."
    },
    bgColorClass: "bg-gradient-to-br from-blue-500/20 to-teal-500/20"
  },
  {
    id: "team-vice-president",
    name: { ar: "ريم بنت فيصل المطيري", en: "Reem F. Al-Mutairi" },
    role: { ar: "نائب رئيس النادي", en: "Vice President" },
    department: { ar: "علوم صحة المجتمع - علوم صحية", en: "Community Health Sciences" },
    bio: {
      ar: "باحثة طلابية شابة في الصحة الوقائية العامة المبدئية، تقود فرق التنظيم اللوجستي وإيجاد الشراكات الميدانية المعتمدة مع المراكز.",
      en: "Committed to clinical epidemiology research and public health initiatives. Directs event execution logistics, municipal alliances, and partner relations."
    },
    bgColorClass: "bg-gradient-to-br from-teal-500/20 to-cyan-500/20"
  },
  {
    id: "team-activities",
    name: { ar: "فيصل بن عبدالعزيز المقرن", en: "Faisal A. Al-Muqrin" },
    role: { ar: "رئيس لجنة الفعاليات والحملات", en: "Head of Events & Campaigns" },
    department: { ar: "قسم العلاج الطبيعي", en: "Physical Therapy Dept." },
    bio: {
      ar: "مسؤول عن صياغة السيناريو اللوجستي والبدني للحملات الميدانية الرياضية ومتابعة تجهيزات المحطات الحيوية والطبية.",
      en: "Specialist in kinesiology and neuromuscular activities. Designs on-the-ground physical fitness tasks and coordinates volunteer schedules during community checks."
    },
    bgColorClass: "bg-gradient-to-br from-blue-500/20 to-indigo-500/20"
  },
  {
    id: "team-media",
    name: { ar: "سارة بنت خالد القحطاني", en: "Sarah K. Al-Qahtani" },
    role: { ar: "رئيس اللجنة الإعلامية والتصميم", en: "Creative Media Director" },
    department: { ar: "علوم التثقيف والإرشاد الصحي", en: "Health Informatics & Education" },
    bio: {
      ar: "تشرف على الهوية البصرية للنادي، صياغة الكتيبات الطبية الثنائية، والمنشورات التوعوية وتحرير التغطيات المصورة المميزة.",
      en: "A dynamic health visual communicator. Manages club branding assets, translations, printing pamphlets, and producing short highlight campaign films."
    },
    bgColorClass: "bg-gradient-to-br from-purple-500/20 to-teal-500/20"
  }
];

export const galleryData: GalleryItem[] = [
  {
    id: "g1",
    title: { ar: "محطة قياس الوزن InBody - اليوم العالمي للسمنة", en: "InBody Screening Zone - World Obesity campaign" },
    category: { ar: "اليوم العالمي للسمنة", en: "World Obesity Day" },
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "g2",
    title: { ar: "استشاريو التغذية في حوارات مباشرة مع أفراد المجتمع", en: "Clinical Nutrition Specialists Guiding Public Walk-ins" },
    category: { ar: "استشارات ميدانية", en: "Field Consultation" },
    imageUrl: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "g3",
    title: { ar: "طاقم النادي الطلابي يحمل درع التميز الطلابي الجامعي", en: "CAMS Pride - Our Student Members Group Photo with Trophy" },
    category: { ar: "تكريم رسمي", en: "Official Ceremonies" },
    imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "g4",
    title: { ar: "حملة قياس الضغط ومستوى سكر الدم المبكر", en: "Vitals Checkup - Blood Cuff & Glucose Tests" },
    category: { ar: "فحص العلامات الحيوية", en: "Vital Testing" },
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "g5",
    title: { ar: "أجنحة النادي التفاعلية في مجمع الرياض بارك الترفيهي", en: "Public Health Hub Installed inside Riyadh Park Mall" },
    category: { ar: "حملات خارجية", en: "Shopping Malls Outreaches" },
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "g6",
    title: { ar: "ورشة عمل تدريب طلاب كلية العلوم الطبية على تقنيات الفحص", en: "Hands-on Student Volunteer Academic Training Workshop" },
    category: { ar: "دورات داخلية", en: "Internal Workshops" },
    imageUrl: "https://images.unsplash.com/photo-1581056771107-24bf5f507847?auto=format&fit=crop&w=600&q=80"
  }
];
