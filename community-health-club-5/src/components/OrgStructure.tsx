import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Users,
  ShieldCheck,
  Award,
  Heart,
  TrendingUp,
  Sparkles,
  BookOpen,
  Calendar,
  Layers,
  ChevronDown,
  User,
  Activity,
  Bookmark,
  Search,
  ExternalLink
} from "lucide-react";

// Structure interfaces
interface Person {
  name: string;
  role: string;
  department: string;
  bio?: string;
  avatarLetter: string;
}

interface Committee {
  id: string;
  title: string;
  titleEn: string;
  focus: string;
  focusEn: string;
  leader: Person;
  deputies: Person[];
  responsibilities: string[];
  icon: React.ElementType;
  themeColor: string; // Tailwind border/text color configuration
}

export default function OrgStructure() {
  const [selectedCommittee, setSelectedCommittee] = useState<string | null>(null);

  // Core Leadership Data from official structure
  const supervisor: Person = {
    name: "أ. نوف الصقر",
    role: "مشرفة الأندية الطلابية بكلية العلوم الطبية التطبيقية",
    department: "كلية العلوم الطبية التطبيقية",
    bio: "",
    avatarLetter: "ن"
  };

  const deputySupervisor: Person = {
    name: "أ. عبدالهادي عبدالواحد",
    role: "نائب مشرف الأندية الطلابية بكلية العلوم الطبية التطبيقية",
    department: "كلية العلوم الطبية التطبيقية",
    bio: "",
    avatarLetter: "ع"
  };

  const president: Person = {
    name: "مثنى البلوي",
    role: "رئيس النادي",
    department: "كلية العلوم الطبية التطبيقية",
    bio: "",
    avatarLetter: "م"
  };

  const vicePresidents: Person[] = [
    {
      name: "خالد المطيري",
      role: "نائب رئيس النادي",
      department: "كلية العلوم الطبية التطبيقية",
      bio: "",
      avatarLetter: "خ"
    },
    {
      name: "وئام الشهري",
      role: "نائبة رئيس النادي",
      department: "كلية العلوم الطبية التطبيقية",
      bio: "",
      avatarLetter: "و"
    }
  ];

  // The Eight Official Committees from the tweet chart
  const committees: Committee[] = [
    {
      id: "hr-c",
      title: "لجنة الموارد البشرية",
      titleEn: "Human Resources",
      focus: "إدارة شؤون المتطوعين، وتنظيم الساعات، ومتابعة الحضور الميداني وكفاءة توزيع الكوادر.",
      focusEn: "Manages volunteers records, coordinates training rosters, and outputs volunteer schedules.",
      icon: Users,
      themeColor: "border-blue-200 text-blue-600 bg-blue-50/50",
      leader: {
        name: "مرام محرزي",
        role: "رئيسة لجنة الموارد البشرية",
        department: "الموارد البشرية",
        avatarLetter: "م"
      },
      deputies: [
        {
          name: "الين القرني",
          role: "نائبة لجنة الموارد البشرية",
          department: "كلية العلوم الطبية",
          avatarLetter: "ا"
        },
        {
          name: "وتين الغنام",
          role: "نائبة لجنة الموارد البشرية",
          department: "كلية العلوم الطبية",
          avatarLetter: "و"
        }
      ],
      responsibilities: [
        "أرشفة بيانات المتطوعين وتوزيع المهام المناسبة في الميدان.",
        "تسجيل الساعات التطوعية عبر المنصة الوطنية للعمل التطوعي.",
        "تنظيم عملية تقييم الأداء للأعضاء وتحديد المتميزين شهرياً."
      ]
    },
    {
      id: "reports-c",
      title: "لجنة التقارير والجودة",
      titleEn: "Reports & Quality Compliance",
      focus: "توثيق مخرجات الحملات وصياغة التقارير الفنية الختامية وتطبيق معايير الكفاءة والتميز.",
      focusEn: "Evaluates KPIs, documents operational closures, and compiles academic data summaries.",
      icon: ShieldCheck,
      themeColor: "border-teal-200 text-teal-600 bg-teal-50/50",
      leader: {
        name: "ندى الرميثي",
        role: "رئيسة لجنة التقارير والجودة",
        department: "الجودة والامتياز",
        avatarLetter: "ن"
      },
      deputies: [
        {
          name: "نوره الربيع",
          role: "نائبة لجنة التقارير والجودة",
          department: "علوم صحة المجتمع",
          avatarLetter: "ن"
        }
      ],
      responsibilities: [
        "كتابة وتدقيق التقارير الإحصائية والمالية بعد انتهاء كل حدث أو حملة ميدانية.",
        "التنسيق مع المشرفين لتسليم الحقائب التوثيقية لعمادة شؤون الطلاب.",
        "مراقبة معايير الجودة الطبية والمهنية المعتمدة دولياً في مواد النادي."
      ]
    },
    {
      id: "content-c",
      title: "لجنة المحتوى",
      titleEn: "Health Scientific Content",
      focus: "صياغة المادة العلمية التوعوية للنادي وتدقيق صحة المراجع الطبية المعتمدة ومراجعتها أكاديمياً.",
      focusEn: "Develops healthcare flyers, bilingually translates, and verifies accuracy of references.",
      icon: BookOpen,
      themeColor: "border-emerald-200 text-emerald-600 bg-emerald-50/50",
      leader: {
        name: "رغد ال محمد",
        role: "رئيسة لجنة المحتوى",
        department: "المحتوى التوعوي",
        avatarLetter: "ر"
      },
      deputies: [
        {
          name: "عهود الشهري",
          role: "نائبة لجنة المحتوى",
          department: "علوم صحة المجتمع",
          avatarLetter: "ع"
        },
        {
          name: "نور العمر",
          role: "نائبة لجنة المحتوى",
          department: "التثقيف والتغذية",
          avatarLetter: "ن"
        }
      ],
      responsibilities: [
        "كتابة الثقافة الصحية والمصطلحات الوقائية السهلة للفهم العام.",
        "تزويد المصممين بالمتون والرسائل النصية والوسومات الطبية لحساب منصة إكس.",
        "الرجوع للقسم الأكاديمي لمراجعة مواضيع السكري، الضغط، والربو بدقة."
      ]
    },
    {
      id: "pr-c",
      title: "لجنة العلاقات العامة",
      titleEn: "Public Relations",
      focus: "بناء الشراكات، والاتصال مع الجهات الخارجية واستحصال الدعوات والموافقات الرسمية للحملات.",
      focusEn: "Bridges public sectors, invites eminent speakers, and coordinates outreach licensing.",
      icon: Users,
      themeColor: "border-sky-200 text-sky-600 bg-sky-50/50",
      leader: {
        name: "حصة النوبيت",
        role: "رئيسة لجنة العلاقات العامة",
        department: "كلية العلوم الطبية التطبيقية",
        avatarLetter: "ح"
      },
      deputies: [
        {
          name: "عبدالله المزروع",
          role: "نائب لجنة العلاقات العامة",
          department: "العلاقات والاتصال",
          avatarLetter: "ع"
        },
        {
          name: "زياد المسعود",
          role: "نائب لجنة العلاقات العامة",
          department: "العلاقات العامة",
          avatarLetter: "ز"
        }
      ],
      responsibilities: [
        "التنسيق لدخول منسوبي النادي في الفعاليات الوطنية والمشاركات والمجمعات الكبرى.",
        "إرسال خطابات الشكر للمتحدثين الرسميين والجهات الراعية.",
        "المحافظة على الصورة الإيجابية والهوية الفخرية لجامعة الملك سعود."
      ]
    },
    {
      id: "logistics-c",
      title: "لجنة الدعم اللوجستي",
      titleEn: "Logistics Support",
      focus: "التجهيز الفني والميداني للمعارض وتوفير الأجهزة والمستلزمات الطبية والتحقق من جاهزية المحطات.",
      focusEn: "In charge of equipment transportation, hardware checks, and on-ground booth decorations.",
      icon: Calendar,
      themeColor: "border-orange-200 text-orange-600 bg-orange-50/50",
      leader: {
        name: "عبدالله الحربي",
        role: "رئيس لجنة الدعم اللوجستي",
        department: "الدعم اللوجستي والعمليات",
        avatarLetter: "ع"
      },
      deputies: [
        {
          name: "حاتم الأحمري",
          role: "نائب لجنة الدعم اللوجستي",
          department: "كلية العلوم الطبية",
          avatarLetter: "ح"
        },
        {
          name: "عبدالعزيز الأشقر",
          role: "نائب لجنة الدعم اللوجستي",
          department: "كلية العلوم الطبية",
          avatarLetter: "ع"
        }
      ],
      responsibilities: [
        "نقل أجهزة تحليل الجسم InBody وموازين قياس الضغط وتوفير مستلزمات التعقيم الميدانية.",
        "تنسيق هندسة مساحات حملة اليوم العالمي للسمنة والفحوصات في البهو الرئيسي للحرم.",
        "تسهيل اللوحات الإرشادية وضمان تكامل مصادر الطاقة وقوة الربط التقني."
      ]
    },
    {
      id: "media-c-tweet",
      title: "لجنة الإعلام",
      titleEn: "Media & Production",
      focus: "إدارة البث الرقمي، التغطية المباشرة للحملات، ونشر المعرفة الصحية الوقائية عبر الحسابات الرسمية.",
      focusEn: "Documents all live moments, manages official X channel, and publishes informative campaigns.",
      icon: Bookmark,
      themeColor: "border-purple-200 text-purple-600 bg-purple-50/50",
      leader: {
        name: "بيان العجمي",
        role: "رئيسة لجنة الإعلام",
        department: "الإعلام والتوثيق",
        avatarLetter: "ب"
      },
      deputies: [
        {
          name: "ناصر القحطاني",
          role: "نائب لجنة الإعلام",
          department: "الإعلام الصحي",
          avatarLetter: "ن"
        },
        {
          name: "عبدالرحمن ال مطلقه",
          role: "نائب لجنة الإعلام",
          department: "الإعلام والإنتاج",
          avatarLetter: "ع"
        }
      ],
      responsibilities: [
        "تصوير وإنتاج الفيديو التوثيقي عالي الجودة للفعاليات والمقابلات الحقلية.",
        "نشر التغريدات والمقاطع التوعوية في حساب منصة إكس @CHC_KSU.",
        "تنظيم الحملات الرقمية ونشر الإحصائيات لرفع مستوى الجاذبية المجتمعية."
      ]
    },
    {
      id: "design-c",
      title: "لجنة التصميم",
      titleEn: "Creative Graphic Design",
      focus: "إخراج المنشورات البصرية، والإنفوغرافيكس الطبي، وتصميم المطبوعات والهوية الوقائية المرئية.",
      focusEn: "Translates facts into visually-enticing typography charts and custom branding sets.",
      icon: Sparkles,
      themeColor: "border-pink-200 text-pink-600 bg-pink-50/50",
      leader: {
        name: "شيخه بن جمعه",
        role: "رئيسة لجنة التصميم",
        department: "التصميم الغرافي والإبداعي",
        avatarLetter: "ش"
      },
      deputies: [
        {
          name: "ميسم النفيسه",
          role: "نائبة لجنة التصميم",
          department: "كلية العلوم الطبية",
          avatarLetter: "م"
        },
        {
          name: "رناد الرويلي",
          role: "نائبة لجنة التصميم",
          department: "كلية العلوم الطبية",
          avatarLetter: "ر"
        }
      ],
      responsibilities: [
        "تنفيذ تصاميم السوشيال ميديا وصور البانر بشعارات تخصصية متناغمة.",
        "توحيد الهوية البصرية لجميع فعاليات النادي وتصميم البطاقات التعريفية والمطبوعات المباشرة.",
        "معالجة النماذج الفنية لعرض ملاعق السكر الخفية وحساب دهون الجسم تفاعلياً."
      ]
    },
    {
      id: "planning-c",
      title: "لجنة التخطيط والابتكار",
      titleEn: "Strategic Planning & Innovation",
      focus: "تطوير برامج الحملات المبتكرة لتجنب المألوف وإيجاد مسارات حديثة وحيوية للمجتمع في التثقيف.",
      focusEn: "Architects interactive on-field games, custom tracking software, and innovative engagement metrics.",
      icon: TrendingUp,
      themeColor: "border-yellow-200 text-yellow-600 bg-yellow-50/50",
      leader: {
        name: "شهد العنزي",
        role: "رئيسة لجنة التخطيط والابتكار",
        department: "كلية العلوم الطبية التطبيقية",
        avatarLetter: "ش"
      },
      deputies: [
        {
          name: "فهد العلياني",
          role: "نائب لجنة التخطيط والابتكار",
          department: "علوم صحة المجتمع والتخطيط",
          avatarLetter: "ف"
        },
        {
          name: "حصة المغيصيب",
          role: "نائبة لجنة التخطيط والابتكار",
          department: "التخطيط والتوعية",
          avatarLetter: "ح"
        }
      ],
      responsibilities: [
        "رسم الهيكل الهندسي والتفاعلي للحملات والفعاليات الميدانية السنوية تماشياً مع مستهدفات 2030.",
        "صياغة الأنشطة الابتكارية الترفيهية لزيادة التفاعل مع الفحوصات الطبية وعرض ملاعق السعرات المخفية.",
        "تقديم حلول ومنصات ذكية لتسجيل المتطوعين وتقييم الأثر الإيجابي المستدام للنادي صحياً."
      ]
    }
  ];

  const clubAdvisors = [
    { name: "د. عالية المعجل", title: "مستشارة النادي" },
    { name: "د. نواف النويصر", title: "مستشار النادي" },
    { name: "د. العنود العدل", title: "مستشارة النادي" },
    { name: "د. نايف العيسى", title: "مستشار النادي" },
    { name: "عبدالرحمن القحطاني", title: "مستشار النادي" },
    { name: "عبدالرحمن العتيبي", title: "مستشار النادي" },
    { name: "لنا المطيري", title: "مستشارة النادي" },
    { name: "عائشة المهري", title: "مستشارة النادي" }
  ];

  const clubAdministration = [
    { name: "نورة العضيبي", role: "إدارة النادي" },
    { name: "عبير الشمري", role: "إدارة النادي" },
    { name: "عبدالله السنيدي", role: "إدارة النادي" },
    { name: "غادة الغنام", role: "إدارة النادي" },
    { name: "جنى الشهري", role: "إدارة النادي" },
    { name: "محسن النخلي", role: "إدارة النادي" }
  ];

  // Helper inside loop to display Lucide components dynamically
  const IconWrapper = ({ component, className }: { component: React.ElementType; className?: string }) => {
    const LucideIcon = component;
    return <LucideIcon className={className || "w-5 h-5"} />;
  };

  return (
    <div id="org-structure-container" className="space-y-12">
      


      {/* CORE BOARD SECTION - SKELETON TREE */}
      <div id="leadership-tree-hierarchy" className="space-y-8 animate-fadeIn">
          
          {/* Tier 1: Academic Supervisor */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              
              {/* Supervisor Card */}
              <div 
                id="card-academic-supervisor"
                className="bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-slate-700 p-6 rounded-2xl text-right text-white shadow-xl relative"
              >
                <div className="absolute top-4 left-4 w-12 h-12 bg-slate-850 rounded-full border border-slate-700 flex items-center justify-center font-black text-brand-teal text-xl">
                  {supervisor.avatarLetter}
                </div>
                <div className="space-y-1 pl-12">
                  <span className="text-[10px] bg-brand-teal/20 text-brand-teal px-2.5 py-1 rounded font-bold whitespace-normal leading-normal inline-block">{supervisor.role}</span>
                  <h3 className="font-sans font-black text-base pt-1.5 leading-tight">{supervisor.name}</h3>
                </div>
              </div>

              {/* Deputy Supervisor Card */}
              <div 
                id="card-deputy-supervisor"
                className="bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-slate-700 p-6 rounded-2xl text-right text-white shadow-xl relative"
              >
                <div className="absolute top-4 left-4 w-12 h-12 bg-slate-850 rounded-full border border-slate-700 flex items-center justify-center font-black text-brand-teal text-xl">
                  {deputySupervisor.avatarLetter}
                </div>
                <div className="space-y-1 pl-12">
                  <span className="text-[10px] bg-brand-teal/20 text-brand-teal px-2.5 py-1 rounded font-bold whitespace-normal leading-normal inline-block">{deputySupervisor.role}</span>
                  <h3 className="font-sans font-black text-base pt-1.5 leading-tight">{deputySupervisor.name}</h3>
                </div>
              </div>

            </div>
            {/* Visual connector line */}
            <div className="w-0.5 h-8 bg-slate-300 my-1"></div>
          </div>

          {/* Tier 2: Club President */}
          <div className="flex flex-col items-center">
            <div 
              id="card-club-president"
              className="bg-white border-2 border-brand-teal/80 p-6 rounded-2xl max-w-md w-full text-right shadow-lg relative group hover:border-brand-teal transition-all hover:shadow-brand-teal/5"
            >
              <div className="absolute top-4 left-4 w-12 h-12 bg-slate-50 rounded-full border border-slate-200 flex items-center justify-center font-black text-slate-700 text-xl">
                {president.avatarLetter}
              </div>
              <div className="space-y-1">
                <span className="text-[10px] bg-brand-teal/10 text-brand-teal px-2 py-0.5 rounded font-extrabold">{president.role}</span>
                <h3 className="font-sans font-black text-slate-850 text-base pt-1 leading-tight">{president.name}</h3>
              </div>
            </div>
            {/* Visual connector line split on desktop */}
            <div className="w-0.5 h-8 bg-slate-300"></div>
          </div>

          {/* Tier 3: Two Club Vice Presidents */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 relative">
              
              {/* Optional background horizontal connecting line */}
              <div className="hidden md:block absolute top-0 left-1/4 right-1/4 h-0.5 bg-slate-200 -mt-8"></div>

              {vicePresidents.map((vp, index) => (
                <div key={index} className="flex flex-col items-center relative">
                  
                  {/* Vertical mini split lines */}
                  <div className="hidden md:block w-0.5 h-8 bg-slate-200 -mt-8 mb-4"></div>

                  <div 
                    id={`card-vp-${index}`}
                    className="bg-white border border-slate-200/90 p-5 rounded-2xl w-full text-right shadow-md hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                      <div className="w-10 h-10 bg-slate-50 rounded-full border border-slate-200 flex items-center justify-center font-bold text-slate-600 text-base">
                        {vp.avatarLetter}
                      </div>
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">{vp.role}</span>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-sans font-black text-slate-800 text-sm leading-none">{vp.name}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      {/* COMMITTEES SECTION (8 COMMITTEES GRID) */}
      <div id="executive-committees-section" className="space-y-8 pt-8 border-t border-slate-100 animate-fadeIn">
          
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1CAADA]">الروافع التنفيذية والعملية للنادي</span>
            <h3 className="font-sans font-black text-xl md:text-2xl text-slate-800">لجان النادي الثمانية التنفيذية</h3>
            <p className="text-xs md:text-sm text-slate-400 font-medium">تحتوي كل لجنة على رئيس مباشر ونائبين لضمان قيادة واضحة وأداء دقيق مبرهن.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {committees.map((c) => {
              return (
                <div
                  id={`committee-card-${c.id}`}
                  key={c.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  <div className="p-5 flex-grow space-y-4">
                    {/* Committee Header Icon */}
                    <div className="flex items-center justify-end">
                      <div className={`p-2.5 rounded-xl ${c.themeColor} flex items-center justify-center shadow-inner`}>
                        <IconWrapper component={c.icon} className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Committee Name */}
                    <div className="space-y-1 text-right">
                      <h4 className="font-sans font-black text-slate-800 text-sm leading-tight">
                        {c.title}
                      </h4>
                    </div>

                    {/* Hierarchy display inside the card */}
                    <div className="pt-3 border-t border-slate-50 space-y-2.5 text-right">
                      <div>
                        <span className="text-[9px] font-bold text-slate-350 block">رئيس اللجنة</span>
                        <div className="flex items-center justify-end gap-1.5 mt-0.5">
                          <span className="text-xs font-bold text-slate-700">{c.leader.name}</span>
                          <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-500">
                            {c.leader.avatarLetter}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[9px] font-bold text-slate-350 block">نائبا رئيس اللجنة</span>
                        <div className="space-y-1 pt-0.5">
                          {c.deputies.map((dep, dIdx) => (
                            <div key={dIdx} className="flex items-center justify-end gap-1.5">
                              <span className="text-[11px] text-slate-500 font-bold">{dep.name}</span>
                              <div className="w-4 h-4 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-[7px] font-bold text-slate-450">
                                {dep.avatarLetter}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      {/* ADVISORS AND ADMINISTRATION SECTION */}
      <div id="advisors-and-admin-section" className="space-y-10 pt-8 border-t border-slate-100 animate-fadeIn">
          
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-teal">مرجعية استشارية وخبرات أكاديمية</span>
            <h3 className="font-sans font-black text-xl md:text-2xl text-slate-800">مستشارو وإدارة النادي</h3>
            <p className="text-xs md:text-sm text-slate-400">نخبة متميزة مكرّسة لتوجيه وتمكين المخرجات الإيجابية لنادي صحة المجتمع بجامعة الملك سعود.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Advisors Column */}
            <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/60 text-right">
              <h4 className="font-sans font-black text-base text-slate-800 mb-4 border-r-4 border-brand-teal pr-3 flex items-center justify-end gap-2">
                <span>مستشارو النادي</span>
                <Users className="w-5 h-5 text-brand-teal inline" />
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {clubAdvisors.map((adv, idx) => (
                  <div key={idx} className="bg-white/90 p-3.5 rounded-xl border border-slate-100 hover:border-brand-teal/40 transition-colors shadow-sm flex items-center justify-center text-center">
                    <span className="text-xs font-bold text-slate-800">{adv.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Administration Support Column */}
            <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/60 text-right">
              <h4 className="font-sans font-black text-base text-slate-800 mb-4 border-r-4 border-blue-500 pr-3 flex items-center justify-end gap-2">
                <span>إدارة النادي</span>
                <Layers className="w-5 h-5 text-blue-500 inline" />
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {clubAdministration.map((admin, idx) => (
                  <div key={idx} className="bg-white/90 p-3.5 rounded-xl border border-slate-100 hover:border-blue-400/40 transition-colors shadow-sm flex items-center justify-center text-center">
                    <span className="text-xs font-bold text-slate-800">{admin.name}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

    </div>
  );
}
