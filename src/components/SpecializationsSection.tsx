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
    title: "التغذية الإكلينيكية",
    englishTitle: "Clinical Nutrition",
    subtitle: "تخصص صحي يُعنى بتقييم الحالة الغذائية للأفراد واستخدام التغذية في الوقاية من الأمراض وعلاجها من خلال تقديم الرعاية والتدخلات الغذائية المبنية على الأدلة العلمية.",
    overview: "تأسس هذا التخصص الصحي الرائد بكلية العلوم الطبية التطبيقية بجامعة الملك سعود لتدقيق وتقييم الحالة الغذائية للأفراد وتثقيفهم. يركز البرنامج على دمج علوم التغذية المتقدمة ضمن الخطة العلاجية والوقائية المتكاملة لخدمة المرضى والأقسام الحرجة لتفادي المضاعفات وتحقيق التشافي المبني على الأدلة السريرية القاطعة.",
    icon: Apple,
    careerPaths: [
      "أخصائي تغذية إكلينيكية (علاجية) بالمستشفيات والمدن الطبية الكبرى",
      "أخصائي تغذية علاجية في العيادات الخارجية ومقاومة الأمراض المزمنة",
      "أخصائي تغذية في العناية المركزة (ICU) ورعاية الخدج والأطفال",
      "إدارة خدمات التغذية والإنتاج الغذائي الطبي في المؤسسات الاستشفائية",
      "باحث تخصصي وموجه برامج الرعاية الغذائية في الهيئات والمراكز البحثية"
    ],
    years: [
      {
        yearNum: "1",
        yearTitle: "السنة الأولى",
        arabicName: "السنة التحضيرية",
        headline: "بناء المهارات الأساسية في العلوم واللغة الإنجليزية",
        description: "بناء المهارات الأساسية في العلوم واللغة الإنجليزية ومهارات التعلم الجامعي لتهيئة الطلاب للعلوم التطبيقية والصحية بشكل رائد ومتكامل.",
        keyCourses: ["اللغة الإنجليزية", "الأحياء العامة", "الكيمياء العامة", "مهارات الحاسب", "المهارات الجامعية"],
        skillsGained: ["التفكير الطبي واللغوي الأكاديمي والاتصال الاحترافي بالإنجليزية", "استعمال الأنظمة التكنولوجية وإتقان مهارات ومنهجيات الحاسب", "مبادئ الاستنباط الطبي والتعامل المعرفي الجامعي المستقل"],
        icon: BookOpen
      },
      {
        yearNum: "2",
        yearTitle: "السنة الثانية",
        arabicName: "العلوم الصحية الأساسية",
        headline: "دراسة الأسس العلمية التي تُبنى عليها الممارسة السريرية",
        description: "التعرف على البنية الوظيفية لجسم الإنسان، ومفهوم صحة المجتمع وتكامل الأجهزة والعلوم الطبية الداعمة للتخصص المعرفي.",
        keyCourses: ["التشريح ووظائف الأعضاء", "الأحياء الدقيقة الطبية", "الكيمياء الحيوية التغذوية", "أسس التغذية", "صحة المجتمع"],
        skillsGained: ["فهم التركيب الفسيولوجي والتشريحي لأجهزة الجسم البشري", "تحليل التفاعلات الحيوية والكيمياء العضوية والتمثيل للمغذيات", "التمييز بين الاحتياجات الغذائية الصحية وتحليل مؤشرات صحة المجتمع"],
        icon: Activity
      },
      {
        yearNum: "3",
        yearTitle: "السنة الثالثة",
        arabicName: "علوم التغذية والتقييم الغذائي",
        headline: "التعمق في علوم التغذية واحتياجات الإنسان الغذائية",
        description: "فهم تراكيب الوجبات بمراحل النمو المتعددة، وبناء المعرفة التحليلية والوبائية لقياس النواقص والاحتياجات بدقة إستراتيجية.",
        keyCourses: ["تحليل الأغذية", "تقييم الحالة الغذائية", "تغذية دورة الحياة", "طرق البحث", "وبائيات التغذية"],
        skillsGained: ["تطبيق القياسات والتحاليل المخبرية والتغذوية السريرية بدقة", "تصميم البرامج والخطط الغذائية الملائمة لمختلف فترات دورة الحياة", "إعداد وتصميم منهجيات الدراسات وصياغة أدلة وبائيات التغذية"],
        icon: BookMarked
      },
      {
        yearNum: "4",
        yearTitle: "السنة الرابعة",
        arabicName: "التغذية العلاجية",
        headline: "دراسة التدخلات الغذائية للحالات المرضية المختلفة",
        description: "دراسة هندسة الوجبات المرضية وصياغة الأنظمة العلاجية لمختلف الاعتلالات المتقدمة وإدارة خدمات الغذاء في المنشآت الطبية.",
        keyCourses: ["التغذية العلاجية", "تغذية أمراض السكري", "تغذية أمراض الكلى", "تغذية أمراض الجهاز الهضمي", "إدارة خدمات الغذاء"],
        skillsGained: ["حساب وتعديل وتصميم الوجبات الطبية العلاجية لشتى الأمراض المعقدة", "تعديل سلوكيات السكري والكلى وتفادي تداعيات الاضطراب الهضمي", "تشغيل وتصميم وإدارة خدمات الغذاء وإمدادات التغذية بالمستشفيات"],
        icon: Stethoscope
      },
      {
        yearNum: "5",
        yearTitle: "السنة الخامسة",
        arabicName: "التدريب السريري والامتياز",
        headline: "تدريب عملي لتطبيق المهارات المهنية والتعامل المباشر مع المرضى",
        description: "ممارسة مهنية ميدانية حية لمدة عام كامل داخل المستشفيات والوحدات التغذوية التخصصية لرعاية وتأهيل المرضى بشكل مستقل.",
        keyCourses: ["أقسام التغذية العلاجية", "العيادات الخارجية للتغذية", "أقسام العناية المركزة", "تغذية الأطفال والخدج", "إدارة خدمات التغذية بالمستشفيات"],
        skillsGained: ["التواصل المستقل ومعاينة الحالات المرضية بالعيادات وأجنحة المعالجة", "تصميم التغذية المعوية والوريدية المتكاملة لمرضى العناية المركزة والحروق", "إدارة الأقسام السريرية بالمستشفى بكفاءة ومعايرة نواتج الاستشفاء"],
        icon: Award
      }
    ]
  },
  {
    id: "health_education",
    title: "التثقيف الصحي",
    englishTitle: "Health Education",
    subtitle: "تخصص صحي يهدف إلى تعزيز صحة الأفراد والمجتمعات من خلال نشر الوعي الصحي، وتغيير السلوكيات الصحية، والوقاية من الأمراض، وتمكين الأفراد من اتخاذ قرارات صحية سليمة وتحسين جودة الحياة.",
    overview: "يعد برنامج التثقيف الصحي بجامعة الملك سعود البرنامج الريادي الأول بالمملكة لإعداد أخصائيين ومنسقين أكفاء مؤهلين لتخطيط وتصميم وإدارة حملات التوعية الصحية، ودمج وسائل التسويق الاجتماعي والتواصل المنهجي للتأثير الإيجابي على السلوك البشري لتفادي الأمراض وتحسين جودة الحياة.",
    icon: Megaphone,
    careerPaths: [
      "أخصائي تثقيف صحي بالمستشفيات والمدن الطبية والأجهزة الصحية",
      "أخصائي تعزيز صحة في برامج التوعية وحملات الصحة العامة والجمعيات التخصصية",
      "مسؤول ومخطط برامج بالتوعية والتثقيف في المؤسسات التعليمية والصحة المدرسية",
      "أخصائي في الهيئات والوزارات والجمعيات الصحية والمؤسسات المجتمعية",
      "العمل في المراكز والمستشفيات والجهات الصحية الحكومية والخاصة كأخصائي معزز صحة"
    ],
    years: [
      {
        yearNum: "1",
        yearTitle: "السنة الأولى",
        arabicName: "السنة التحضيرية",
        headline: "تنمية المهارات الأساسية في العلوم واللغة الإنجليزية",
        description: "بناء المهارات الأساسية في العلوم واللغة الإنجليزية ومهارات التعلم الجامعي لتهيئة الطلاب للمسار الوقائي والصحي والتواصل الفعال.",
        keyCourses: ["اللغة الإنجليزية", "الأحياء العامة", "الكيمياء العامة", "مهارات الحاسب", "المهارات الجامعية"],
        skillsGained: [
          "تطوير الإنجليزية التخصصية والقدرة على قراءة المفاهيم العلمية",
          "استخدام مهام التقنية ومهارات الاتصال والتعلم التفاعلي الجامعي",
          "بناء الخلفية الطبية الأساسية للتفاعلات البيولوجية البسيطة"
        ],
        icon: BookOpen
      },
      {
        yearNum: "2",
        yearTitle: "السنة الثانية",
        arabicName: "العلوم الصحية الأساسية",
        headline: "دراسة أساسيات الصحة العامة والعلوم الطبية الداعمة للتخصص",
        description: "مرحلة الانتقال للتعرف على أدوات ومبادئ الصحة العامة وتصنيفات الوبائيات ومفهوم الإحصاء لتوصيف المشاكل المجتمعية وسلوك البشر.",
        keyCourses: ["مقدمة في الصحة العامة", "الأحياء الدقيقة", "أساسيات الوبائيات", "السلوك الصحي", "الإحصاء الحيوي"],
        skillsGained: [
          "استعراض وقراءة الوبائيات وإحصاء الصحة العامة لفهم الأمراض",
          "أدوات السلوك الصحي والدوافع الكامنة خلف تعديل سلوك المستهلكين",
          "تطبيق آليات استقصاء الأحياء الدقيقة والمخاطر المسببة للانتقال"
        ],
        icon: Activity
      },
      {
        yearNum: "3",
        yearTitle: "السنة الثالثة",
        arabicName: "أساسيات التثقيف الصحي",
        headline: "التعمج في مفاهيم التثقيف الصحي ونظريات تغيير السلوك",
        description: "دراسة كفاءة الاتصال الصحي والتدريب المدرسي وصياغة المناهج الإرشادية لتعميم الممارسات السليمة والحد من المخاطر.",
        keyCourses: ["مبادئ التثقيف الصحي", "الاتصال الصحي", "نظريات تغيير السلوك الصحي", "تعزيز الصحة", "التثقيف الصحي المدرسي"],
        skillsGained: [
          "تطبيق وبناء نماذج وأدوات تغيير المواقف والسلوك البشري بكفاءة",
          "إعداد الحملات واستعمال لغة الخطاب والإرشاد الصحي للفرد والعموم",
          "تخطيط وقيادة مبادرات التوعية الصحية المدرسية وتعزيز مقوماتها"
        ],
        icon: BookMarked
      },
      {
        yearNum: "4",
        yearTitle: "السنة الرابعة",
        arabicName: "البرامج والتطبيقات الصحية",
        headline: "تصميم وتنفيذ وتقييم البرامج والحملات التوعوية للفئات المختلفة",
        description: "امتلاك نواتج التعلم التطبيقية لهندسة وتمويل برامج وتخطيط التثقيف الصحي وإدارة رسائل الأمراض المزمنة والتسويق الاجتماعي الوقائي.",
        keyCourses: ["تخطيط البرامج الصحية", "إدارة برامج التثقيف الصحي", "التسويق الصحي", "صحة الأم والطفل", "التثقيف الصحي للأمراض المزمنة"],
        skillsGained: [
          "تصميم وإدارة البرامج الصحية المجتمعية المتكاملة وتقييم أثرها الفعلي",
          "وضع استراتيجيات التسويق الاجتماعي الموجه لتقويض الأنماط المزمنة",
          "تقديم وتطبيق حقائب تثقيف الأمومة والصحة المزمنة بأسلوب مبرهن وعلمي"
        ],
        icon: Stethoscope
      },
      {
        yearNum: "5",
        yearTitle: "السنة الخامسة",
        arabicName: "التدريب الميداني والامتياز",
        headline: "تطبيق المهارات المهنية في المستشفيات والهيئات الصحية",
        description: "سنة الممارسة العملية المتكاملة والتدريب لخدمة المرضى والمجتمع وتثبيت قواعد الريادة بالمدن الطبية والإدارات العامة والجهات الحكومية والجمعيات الصحية.",
        keyCourses: ["المستشفيات والمراكز الصحية", "برامج تعزيز الصحة", "حملات التوعية الصحية", "المؤسسات التعليمية", "الجهات الحكومية والجمعيات الصحية"],
        skillsGained: [
          "التوجيه وتعليم المرضى وقيادة اللجان التوجيهية في كبرى المنشآت",
          "صياغة وتنفيذ خطط التوعية والتثقيف الصحي بأسلوب قياسي مدروس",
          "المواءمة وتصميم حلول معززة للصحة العامة مع أطباء وفرق الرعاية الطبية"
        ],
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
