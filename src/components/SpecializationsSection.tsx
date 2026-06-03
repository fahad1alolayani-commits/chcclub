import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  GraduationCap, 
  BookOpen, 
  Activity, 
  Heart, 
  Stethoscope, 
  Award, 
  Search, 
  FileText, 
  AlertCircle,
  HelpCircle,
  BookMarked,
  ArrowLeft,
  Calendar,
  Users,
  ChevronLeft,
  Apple,
  Megaphone,
  Calculator,
  Sliders,
  Sparkles,
  Info
} from "lucide-react";

interface SpecializationYear {
  yearNum: string;
  yearTitle: string;
  arabicName: string;
  headline: string;
  description: string;
  keyCourses: string[];
  skillsGained: string[];
  icon: React.ElementType;
}

interface SpecializationMajor {
  id: string;
  title: string;
  englishTitle: string;
  subtitle: string;
  overview: string;
  careerPaths: string[];
  years: SpecializationYear[];
  icon?: React.ElementType;
}

const specializationsData: SpecializationMajor[] = [
  {
    id: "clinical_nutrition",
    title: "التغذية السريرية",
    englishTitle: "Clinical Nutrition",
    subtitle: "أحد الأقسام الأكاديمية الرائدة في كلية العلوم الطبية التطبيقية بجامعة الملك سعود لتدريب أخصائيين أكفاء في الرعاية التغذوية العلاجية والوقائية.",
    overview: "تأسس قسم التغذية السريرية ليكون أحد الأقسام الأكاديمية الرائدة في كلية العلوم الطبية التطبيقية بجامعة الملك سعود. يهدف البرنامج إلى إعداد خريجين متميزين مؤهلين علمياً وعملياً في مجال التغذية العلاجية والسريرية لتلبية احتياجات المجتمع وتقديم رعاية غذائية وقائية وعلاجية للأفراد والمرضى في شتى المؤسسات الصحية بكفاءة واحترافية عالية، متبعين الأسس الصحية القائمة على البراهين العلمية والبحثية الحديثة.",
    icon: Apple,
    careerPaths: [
      "أخصائي تغذية سريرية بمستشفيات وزارة الصحة والمدن الطبية العسكرية والجامعية",
      "أخصائي تغذية في أقسام العناية المركزة (ICU) والخدج والحروق والعمليات",
      "استشاري ومصمم خطط الحمية المعوية والوريدية بجمعيات عيادات السكري والغدد",
      "أخصائي تغذية في الأندية الرياضية ومصانع الأغذية وهيئة الغذاء والدواء",
      "باحث وأكاديمي في مجالات التغذية والتمثيل الغذائي وحساب السعرات السريرية"
    ],
    years: [
      {
        yearNum: "1",
        yearTitle: "السنة الأولى",
        arabicName: "السنة الأولى المشتركة للكليات الصحية",
        headline: "تأسيس العلوم الطبيعية وتطوير اللغة الصحية والبحثية",
        description: "السنة الأولى المشتركة للكليات الصحية بجامعة الملك سعود. تسعى لتعزيز التواصل الصحي باللغة الإنجليزية، وتأسيس البيولوجيا الخلوية وقوانين الكيمياء الحيوية.",
        keyCourses: ["اللغة الإنجليزية الأكاديمية الطبية", "علم الأحياء ومكونات الخلية البشرية", "الكيمياء العامة والعضوية", "الفيزياء الطبية الحيوية"],
        skillsGained: ["استخدام وفهم وإتقان المصطلحات الطبية والصحية بدقة بالغة", "أساسيات ومهارات البحث العلمي والتحليل الإحصائي السليم", "فهم المبادئ الإنسانية وأثر التفاعلات الكيميائية الأساسية حيوياً"],
        icon: BookOpen
      },
      {
        yearNum: "2",
        yearTitle: "السنة الثانية",
        arabicName: "مرحلة التأسيس وتكامل الأعضاء",
        headline: "فهم وظائف أعضاء جسم الإنسان والكيمياء الغذائية",
        description: "الانطلاقة الفعلية داخل الكلية، حيث يستكشف الطالب الكيفية التي يعمل بها البدن البشري، والتركيب الكيميائي للمغذيات الكبرى والصغرى وأثرها.",
        keyCourses: ["فسيولوجيا الإنسان (وظائف الأعضاء)", "أساسيات وتصنيفات التغذية البشرية", "كيمياء الأغذية العام والتمثيل", "التشريح البشري العام والتحليلي"],
        skillsGained: ["تحليل وبناء خطط السعرات واحتياجات الفرد اليومية من الطاقة", "تمييز وفحص المكونات الغذائية ومسارات امتصاص المركبات بالمعدة", "معرفة ورسم خرائط الأجهزة الهضمية والقلبية والتكامل بينها"],
        icon: Activity
      },
      {
        yearNum: "3",
        yearTitle: "السنة الثالثة",
        arabicName: "العمق السريري وتقييم الحالات والتمثيل",
        headline: "المقابلة السريرية، قياس نقص المؤشرات وصياغة الحمية",
        description: "الدخول الفعلي لعلوم التغذية الإكلينيكية، حيث يتعرف الطالب على آليات دراسة المرضى سريرياً، وإجراء استقصاء لمؤشرات الدم والجسد لفرز النقص الأيضي وحساب الوجبات العلاجية.",
        keyCourses: ["تقييم الحالة التغذوية الإكلينيكية", "العلاج الغذائي الطبي للمرضى (١)", "التغذية خلال فترات دورة الحياة والنمو", "علم الأيض والكيمياء الحيوية للمغذيات"],
        skillsGained: ["قياس تراكيب كتل الدهون والعضلات ومحاسبة فحوصات الدم سريرياً", "تصميم الوجبات والحصص الغذائية المعتدة بحسب الفئة العمرية والصحية", "المطابقة الدقيقة بين الفحوص والأعراض والاحتياج الاستقلابي للمريض"],
        icon: BookMarked
      },
      {
        yearNum: "4",
        yearTitle: "السنة الرابعة",
        arabicName: "التغذية المتقدمة والحالات الحرجة والعناية",
        headline: "صياغة التغذية للمرضى غير القادرين على البلع والمشكلات المعقدة",
        description: "التحصيل الدراسي الأكثر تقدماً. يركز على رعاية منومي العنايات المركزة والحروق، التغذية الأنبوبية والوريدية المبرهنة وأبحاث التخرج الطبية التخصصية.",
        keyCourses: ["العلاج الغذائي الطبي للمرضى الحرجين (٢)", "التغذية الأنبوبية والوريدية المتقدمة (Enteral/Parenteral)", "تنظيم وتخطيط الخدمات الغذائية بالمستشفيات", "مناهج البحث وأطروحة تخرج التغذية السريرية"],
        skillsGained: ["حساب جرعات ومحاليل التغذية المعوية والوريدية للكبار والصغار بدقة", "المصادقة والمراقبة لتفادي متلازمة إعادة التغذية (Refeeding Syndrome)", "إصدار وإجراء دراسات التغذية السريرية المبرهنة وتحليل النتائج إحصائياً"],
        icon: Stethoscope
      },
      {
        yearNum: "5",
        yearTitle: "سنة الامتياز",
        arabicName: "سنة التدريب الميداني والخبرة العملية (١٢ شهراً)",
        headline: "الممارسة الكلية المستقلة والمباشرة في كبرى المدن والمستشفيات",
        description: "قضاء التدريب الميداني الإلزامي المكثف في الأجنحة والعيادات العلاجية لخدمة المرضى بالمدن الطبية وصقل المكتسبات المعرفية مع الفرق الطبية السريرية.",
        keyCourses: ["تدريب عيادات السكري والغدد والتأهيل القلبي", "تدريب أقسام العناية المركزة وغرف الإنقاذ والطوارئ", "تدريب عيادات الأطفال والتمثيل الغذائي والعيادات الخارجية", "المناقشات الطبية وصياغة بروتوكولات التوجيه الغذائي السريري"],
        skillsGained: ["إدارة الجلسات العلاجية وتنمية الوعي الغذائي للمستفيدين باحترافية", "الموازنة مع الفرق الطبية ورسم مستويات الحمية والجرعات في أوراق المريض", "اتخاذ وتصميم القرارات الصائبة بموجب البراهين وحفظ ملف الاستشفاء الفوري"],
        icon: Award
      }
    ]
  },
  {
    id: "health_education",
    title: "التثقيف الصحي-تعليم صحي",
    englishTitle: "Health Education",
    subtitle: "البرنامج الريادي الأول بالمملكة لتمكين المخططين والمنسقين من تصميم وتوجيه برامج تغيير السلوك البشري والوقاية من الأزمات الصحية.",
    overview: "يعد برنامج التثقيف الصحي بجامعة الملك سعود هو الأول والريادي في المملكة العربية السعودية لإعداد أخصائيين مؤهلين في التثقيف وتعزيز الصحة. يهدف البرنامج إلى تمكين الطلاب من إعداد، وتخطيط، وتنفيذ، وتقييم البرامج والبحوث التثقيفية والصحية التي تركز على السلوك البشري والمحددات البيئية؛ للحد من انتشار الأمراض المزمنة ومواجهة الأزمات الصحية بالاعتماد على الممارسة السلوكية السليمة والاتصال الإبداعي لرفع جودة حياة المجتمع تماشياً مع رؤية المملكة العربية السعودية في تمكين التدخل الوقائي المبرهن.",
    icon: Megaphone,
    careerPaths: [
      "أخصائي تثقيف صحي ومخطط برامج بالمدن الطبية والمستشفيات",
      "أخصائي وموجه سلوكي في مراكز الرعاية الأولية والوزارات والبلديات",
      "منسق حملات وقائية وإعلامية في الجمعيات والهيئات المتخصصة",
      "مستشار برامج تعزيز الصحة وصحة البيئة في المنشآت المهنية والمدارس",
      "باحث وأكاديمي في الإرشاد والتثقيف وعلوم السلوك الصحي"
    ],
    years: [
      {
        yearNum: "1",
        yearTitle: "السنة الأولى",
        arabicName: "السنة الأولى المشتركة للكليات الصحية",
        headline: "بناء الرابط العلمي واللغوي الأكاديمي",
        description: "السنة الأولى المشتركة للكليات الصحية بجامعة الملك سعود. يتدرب الطالب فيها على التفكير العلمي المبرهن والتكنيكات الطبية واللغوية وتجاوز مهارات التعلم التقليدية.",
        keyCourses: ["اللغة الإنجليزية الطبية التخصصية", "الفيزياء الطبية الحيوية", "مهارات الاتصال والتعلم التفاعلي", "الرياضيات والإحصاء الحيوي الأساسي"],
        skillsGained: ["التواصل والبحث العلمي الكفؤ باللغة الإنجليزية", "مبادئ الاستنباط وحل المعضلات الأكاديمية", "معرفة البنية الطبية الأساسية لجسم الإنسان"],
        icon: BookOpen
      },
      {
        yearNum: "2",
        yearTitle: "السنة الثانية",
        arabicName: "مرحلة الأساس والاتصال السلوكي",
        headline: "فهم أسس السلوك الإنساني والدافعية الوقائية",
        description: "الانتقال للكلية والتخصص؛ يبدأ الطالب بفهم تاريخ ورسالة التثقيف والإرشاد ومبادئه عالمياً ومحلياً، ويدرس وظائف الأعضاء، وأدوات ونظريات تغيير مواقف وجاذبية السلوك الإنساني.",
        keyCourses: ["المدخل إلى التثقيف والتعزيز الصحي", "مهارات الاتصال والإرشاد في التثقيف", "تشريح وفسيولوجيا جسم الإنسان", "علم الاجتماع والمحددات الصحية للبيئات"],
        skillsGained: ["صياغة رسائل وقائية مبسطة وواضحة للمستهلك", "تطبيق آليات الحوار الطبيب الإرشادي الفعال", "تحليل بنية المحددات الاجتماعية المحيطة بالصحة"],
        icon: Activity
      },
      {
        yearNum: "3",
        yearTitle: "السنة الثالثة",
        arabicName: "التخطيط ومنهجية هندسة البرامج",
        headline: "تصميم وتقييم البرامج التوعوية من منطلق وبائي علمي",
        description: "يركز هذا العام الأكاديمي على كيفية تصميم الحملات والمشاريع الكبرى وتوظيف الإحصاء وعلم الأوبئة لرصد مدى انتشار واستجابة السلوكيات واحتياجات المجتمعات وتصميم خطط مستدامة.",
        keyCourses: ["تخطيط وتقييم برامج التثقيف الصحي", "مبادئ علم الوبائيات للصحة العامة", "نظريات ونماذج التغيير السلوكي التفاعلي", "الإحصاء الحيوي الطبي المتقدم"],
        skillsGained: ["تصميم خطة متكاملة لمشروع حملة تثقيفية موجهة", "قراءة وتحليل البيانات الوبائية لوزارة الصحة ومقارنتها", "تقييم العائد الاستثماري والصحي للحملات التوعوية"],
        icon: BookMarked
      },
      {
        yearNum: "4",
        yearTitle: "السنة الرابعة",
        arabicName: "التطبيق الميداني وصحة البيئات والعمل",
        headline: "الممارسة التوعوية وإرشاد مجموعات العمل المعقدة",
        description: "أوج التحصيل الدراسي النظري والعملي بالكلية. يخرج الطلاب برحلات تطبيقية وتخطيطات مستهدفة للشركات والمستشفيات لتأمين نمط عيش مثالي، بالإضافة لبحث التخرج.",
        keyCourses: ["التثقيف التوجيهي في المنشآت الصحية", "التثقيف في بيئات العمل والمدارس والمصانع", "صحة البيئة وصحة المجتمع التكاملي", "مناهج ومشروع البحث التثقيفي التخرجي"],
        skillsGained: ["تنفيذ تقييم للجهوزية والمخاطر البيئية بالمصانع والمدارس", "إصدار وتصميم حقائب تعليمية توعوية وطنية معتمدة", "إعداد بحوث صحة مجتمعية بمؤشرات علمية قابلة للنشر"],
        icon: Stethoscope
      },
      {
        yearNum: "5",
        yearTitle: "سنة الامتياز",
        arabicName: "سنة الممارسة والتدريب الشامل (١٢ شهراً)",
        headline: "الممارسة الميدانية الإجبارية وصناعة القرار الفعلي",
        description: "سنة التدريب الكلي المكثف في المستشفيات والمدن الطبية الكبرى والمؤسسات الصحية التوعوية. يتنقل فيها الطالب لاختبار كفاءة خططه والقيادة والإلمام بمسارات التثقيف الفعلي.",
        keyCourses: ["تدريب توعوي في أقسام الرعاية الأولية والمستشفيات", "تدريب إداري في الشؤون والأجنحة العلاجية والوزارات", "دورة تعزيز وتوعية المجتمعات والمدارس والجمعيات", "مشروع الامتياز التثقيفي الميداني الشامل"],
        skillsGained: ["قيادة فرق ولجان التثقيف في المستشفيات بجودة تامة", "تصميم وتنفيذ دراسات لقياس رضا ورأي فئات المرضى بالخدمات", "المواءمة الفعالة والمهنية مع أطباء ومستشاري الأقسام"],
        icon: Award
      }
    ]
  }
];

export default function SpecializationsSection() {
  const [activeMajor, setActiveMajor] = useState<string>("clinical_nutrition");
  const [selectedYearIndex, setSelectedYearIndex] = useState<number>(0);



  const major = specializationsData.find((m) => m.id === activeMajor) || specializationsData[0];
  const selectedYear = major.years[selectedYearIndex];

  const handleMajorChange = (majorId: string) => {
    setActiveMajor(majorId);
    setSelectedYearIndex(0); // Reset to first year when changing major
  };

  return (
    <section 
      id="section-majors" 
      className="py-24 bg-gradient-to-b from-[#e8f6f0] via-white to-[#f0f9f5] border-y border-emerald-100/30 relative scroll-mt-20 overflow-hidden min-h-[82vh] flex flex-col justify-center"
      dir="rtl"
    >
      {/* Background Decorative Graphic Spheres */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-brand-teal/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 space-y-16">
        
        {/* Header Introduction */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-black uppercase tracking-widest text-[#1CAADA] bg-brand-blue/5 px-3 py-1.5 rounded-lg inline-block">
            قسم علوم صحة المجتمع • كلية العلوم الطبية التطبيقية
          </span>
          <h2 className="font-sans font-black text-2xl md:text-5xl text-brand-academic leading-tight">
            تخصصات قسم علوم صحة المجتمع 🎓
          </h2>
          <p className="text-sm md:text-base text-slate-550 font-sans font-semibold leading-relaxed">
            استعرض مسار وخطة سنوات الدراسة للتخصصات الرسمية التابعة لقسم علوم صحة المجتمع بجامعة الملك سعود والتعريف بمناهج ونواتج التعلم ومستقبلك المهني المشرق.
          </p>
          <div className="h-1.5 w-16 bg-brand-teal rounded-full mx-auto mt-4" />
        </div>

        {/* Tab Selection Switcher for Majors */}
        <div className="flex justify-center" id="majors-tabs-container">
          <div className="bg-slate-100 p-1.5 rounded-2xl grid grid-cols-2 gap-2 border border-slate-200/60 shadow-inner max-w-md w-full">
            {specializationsData.map((m) => {
              const isActive = m.id === activeMajor;
              return (
                <button
                  id={`major-tab-${m.id}`}
                  key={m.id}
                  onClick={() => handleMajorChange(m.id)}
                  className={`py-3 px-4 rounded-xl font-sans font-black text-xs md:text-sm transition-all duration-300 relative cursor-pointer flex items-center justify-center text-center ${
                    isActive 
                      ? "bg-white text-brand-academic shadow-md font-black" 
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="activeMajorIndicator"
                      className="absolute inset-0 bg-white rounded-xl shadow-md -z-10 border border-slate-200/50"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span>{m.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Major Brief & Career Path Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Right Card: Overview */}
          <div 
            id="major-overview-card"
            className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/60 p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between"
          >
            <div className="space-y-4 text-right">
              <div className="flex items-center gap-3 justify-start flex-row-reverse">
                <div className="w-10 h-10 bg-brand-blue/10 rounded-xl flex items-center justify-center text-brand-blue shrink-0">
                  {major.icon ? React.createElement(major.icon, { className: "w-5.5 h-5.5" }) : <GraduationCap className="w-5.5 h-5.5" />}
                </div>
                <div>
                  <h3 className="font-sans font-black text-lg md:text-2xl text-brand-academic leading-tight">
                    تخصص {major.title}
                  </h3>
                  <p className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                    {major.englishTitle}
                  </p>
                </div>
              </div>
              <p className="text-sm md:text-base text-slate-705 font-sans leading-relaxed pt-2 font-black">
                {major.subtitle}
              </p>
              <p className="text-xs md:text-sm text-slate-500 font-sans leading-relaxed">
                {major.overview}
              </p>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6 text-right">
              <span className="text-[11px] font-black uppercase text-brand-teal tracking-wider bg-brand-teal/5 px-2 py-1 rounded">
                المستقبل والمسارات الوظيفية الكبرى للخريجين:
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3 text-right">
                {major.careerPaths.map((p, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 font-sans font-bold leading-normal justify-start flex-row-reverse">
                    <ArrowLeft className="w-3.5 h-3.5 text-brand-teal mt-0.5 flex-shrink-0" />
                    <span className="text-right flex-1">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Left Card: Years Interactive Step Timeline Slider */}
          <div 
            id="major-years-scroller-box"
            className="lg:col-span-5 bg-gradient-to-br from-[#1CAADA]/3 to-slate-50 p-6 md:p-8 rounded-2xl border border-slate-200/60 flex flex-col justify-between text-right"
          >
            <div className="space-y-3">
              <h4 className="font-sans font-black text-sm md:text-md text-brand-academic">
                الخطة الدراسية السنوية والمسار الأكاديمي
              </h4>
              <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
                اضغط على أي سنة دراسية في خطة التخصص أدناه لتستعرض المقررات والخبرات والمكتسبات الممنوحة للطالب في رحلته بجامعة الملك سعود:
              </p>
            </div>

            {/* Timeline Progress Step-Switcher Bar */}
            <div className="relative py-8 px-2" id="years-progress-bar-slider">
              
              {/* Connecting Line */}
              <div className="absolute top-1/2 left-2 right-2 h-[3px] bg-slate-200 -translate-y-1/2" />
              
              {/* Progress Line */}
              <div 
                className="absolute top-1/2 right-2 h-[3px] bg-brand-teal -translate-y-1/2 transition-all duration-300"
                style={{
                  left: "2px",
                  right: `${100 - (selectedYearIndex / (major.years.length - 1)) * 100}%`
                }}
              />

              {/* Milestones Buttons */}
              <div className="relative flex justify-between items-center w-full">
                {major.years.map((y, idx) => {
                  const isSelected = idx === selectedYearIndex;
                  const isPassed = idx < selectedYearIndex;

                  return (
                    <button
                      id={`timeline-year-btn-${idx}`}
                      key={idx}
                      onClick={() => setSelectedYearIndex(idx)}
                      className="focus:outline-none relative group flex flex-col items-center cursor-pointer"
                    >
                      {/* Step Circle Bubble */}
                      <div 
                        className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 flex items-center justify-center transition-all duration-300 relative z-10 active:scale-90 ${
                          isSelected
                            ? "bg-slate-900 border-slate-900 text-white shadow-md ring-4 ring-slate-900/15 scale-105"
                            : isPassed
                            ? "bg-brand-teal border-brand-teal text-white"
                            : "bg-white border-slate-300 text-slate-500 hover:border-slate-400 hover:text-slate-700"
                        }`}
                      >
                        <span className="text-[11px] sm:text-xs font-black font-sans">
                          {idx === 4 ? "الامتياز" : `س ${y.yearNum}`}
                        </span>
                      </div>

                      {/* Floating Indicator Tooltip */}
                      <span className="absolute -top-6 text-[10px] font-black text-slate-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        {y.yearTitle}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick overview of selected year step */}
            <div className="bg-white/90 border border-slate-200/50 p-4 rounded-xl mt-4">
              <div className="flex items-center gap-2.5 flex-row-reverse">
                <div className="p-1.5 bg-brand-teal/10 rounded-lg text-brand-teal flex-shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold text-slate-400 leading-none">
                    المرحلة الدراسية النشطة للتصفح:
                  </div>
                  <div className="text-xs font-sans font-black text-slate-800 mt-1">
                    {selectedYear.yearTitle} • {selectedYear.arabicName}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Selected Year Detailed Tab Viewer */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeMajor}-${selectedYearIndex}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            id="year-details-interactive-panel"
            className="bg-white rounded-3xl border border-slate-200/60 p-6 md:p-10 shadow-lg shadow-slate-100/50 relative overflow-hidden"
          >
            {/* Soft decorative visual band based on major theme */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-blue to-teal-500" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Year Summary Column */}
              <div className="lg:col-span-5 space-y-5 text-right">
                <div className="flex items-center gap-3.5 flex-row-reverse justify-start">
                  <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-800 shadow-sm shrink-0">
                    {React.createElement(selectedYear.icon, { className: "w-6 h-6 stroke-[2]" })}
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-brand-teal bg-brand-teal/5 px-2.5 py-1 rounded">
                      {selectedYear.yearTitle}
                    </span>
                    <h4 className="font-sans font-black text-lg md:text-xl text-brand-academic mt-1 leading-tight">
                      {selectedYear.arabicName}
                    </h4>
                  </div>
                </div>

                <p className="text-sm font-sans font-black text-brand-blue leading-snug">
                  {selectedYear.headline}
                </p>

                <p className="text-xs md:text-sm text-slate-500 font-sans leading-relaxed">
                  {selectedYear.description}
                </p>
              </div>

              {/* Course Units and Skills Gained Column */}
              <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 text-right md:border-r border-slate-100 md:pr-8">
                
                {/* Courses Module */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 flex-row-reverse justify-start">
                    <div className="w-1.5 h-4 bg-brand-blue rounded-full" />
                    <span className="text-xs md:text-sm font-black text-slate-800">
                      أبرز المقررات والمواضيع الدراسية:
                    </span>
                  </div>
                  <div className="space-y-2">
                    {selectedYear.keyCourses.map((c, idx) => (
                      <div 
                        key={idx}
                        className="bg-slate-50 border border-slate-150 p-3 rounded-xl text-xs text-slate-605 font-sans font-bold flex items-center justify-between flex-row-reverse"
                      >
                        <span className="text-right flex-1 pr-1">{c}</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-blue/80 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Scope of Skills Gained */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 flex-row-reverse justify-start">
                    <div className="w-1.5 h-4 bg-[#1CAADA] rounded-full" />
                    <span className="text-xs md:text-sm font-black text-slate-800">
                      أبرز نواتج ومكتسبات السنة الأكاديمية:
                    </span>
                  </div>
                  <div className="space-y-2">
                    {selectedYear.skillsGained.map((s, idx) => (
                      <div 
                        key={idx}
                        className="bg-slate-50 border border-slate-150 p-3 rounded-xl text-xs text-slate-605 font-sans font-bold flex items-center justify-between flex-row-reverse"
                      >
                        <span className="text-right flex-1 pr-1">{s}</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-teal/85 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
