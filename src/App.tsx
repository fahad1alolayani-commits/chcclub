import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  translations,
  eventsData,
  teamData,
  ClubEvent,
  TeamMember,
} from "./types";
import Logo from "./components/Logo";
import JoinForm from "./components/JoinForm";
import OrgStructure from "./components/OrgStructure";
import SpecializationsSection from "./components/SpecializationsSection";
import MagazineSection from "./components/MagazineSection";
import BMICalculatorSection from "./components/BMICalculatorSection";
import AdminPanel from "./components/AdminPanel";
import AdminPortalBox from "./components/AdminPortalBox";
import {
  Menu,
  X,
  Heart,
  Calendar,
  MapPin,
  Activity,
  Users,
  Award,
  Clock,
  Target,
  Compass,
  BookOpen,
  ArrowUpRight,
  Check,
  ChevronRight,
  Sparkles,
  Trophy,
  TrendingUp,
  ShieldCheck,
  Instagram,
  Linkedin,
  Mail,
  ExternalLink,
  Upload,
  Camera,
  Trash2,
  Settings,
} from "lucide-react";

const XIcon = ({ className = "w-4.5 h-4.5" }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    aria-hidden="true" 
    className={className} 
    fill="currentColor"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const TikTokIcon = ({ className = "w-4.5 h-4.5" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={className}
    fill="currentColor"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .7.1v-3.5a6.35 6.35 0 0 0-.7-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.69A9.15 9.15 0 0 0 19.59 11V6.69z" />
  </svg>
);

const partnersList = [
  {
    name: "جامعة الملك سعود",
    subName: "جامعة الملك سعود",
    bg: "bg-white border-slate-100",
    logoUrl: "https://salogos.b-cdn.net/logos/png/1774932415820-8dc1fsyh.png"
  },
  {
    name: "مركز الملك سلمان الاجتماعي",
    subName: "مركز الملك سلمان الاجتماعي",
    bg: "bg-white border-slate-100",
    logoUrl: "https://upload.wikimedia.org/wikipedia/ar/3/3f/مركز_الملك_سلمان_الاجتماعي.png"
  },
  {
    name: "وزارة التعليم",
    subName: "وزارة التعليم",
    bg: "bg-white border-slate-100",
    logoUrl: "https://upload.wikimedia.org/wikipedia/ar/archive/1/17/20251102000021%21Saudi_Ministry_of_Education_Logo_2025.png"
  },
  {
    name: "واجهة روشن",
    subName: "واجهة روشن",
    bg: "bg-white border-slate-100",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/Roshn_Front_Logo.svg/250px-Roshn_Front_Logo.svg.png"
  },
  {
    name: "الهيئة العامة للعقار",
    subName: "الهيئة العامة للعقار",
    bg: "bg-white border-slate-100",
    logoUrl: "https://upload.wikimedia.org/wikipedia/ar/thumb/3/3f/شعارالهيئة_العامة_للعقار_%28السعودية%29.svg/3840px-شعارالهيئة_العامة_للعقار_%28السعودية%29.svg.png"
  },
  {
    name: "مدينة الدرعية الصحية",
    subName: "مدينة الدرعية الصحية",
    bg: "bg-white border-slate-100",
    logoUrl: "https://i.postimg.cc/3xx2GqmJ/PHOTO-2026-06-05-15-38-13.jpg"
  }
];

// Repeat the partners list so that we have enough elements to ensure a truly infinite, gapless, and continuous marquee across all screen sizes
const repeatedPartnersBase = [
  ...partnersList, ...partnersList, ...partnersList, ...partnersList,
  ...partnersList, ...partnersList, ...partnersList, ...partnersList
];
const marqueePartnersList = [...repeatedPartnersBase, ...repeatedPartnersBase];

function PartnerLogo({ partner }: { partner: typeof partnersList[number] }) {
  const [hasError, setHasError] = useState(false);

  if (!partner.logoUrl || hasError) {
    return (
      <div className="flex items-center justify-center select-none pointer-events-none p-1">
        <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300 font-mono shadow-sm">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <img
      src={partner.logoUrl}
      alt="Partner"
      referrerPolicy="no-referrer"
      onError={() => {
        setHasError(true);
      }}
      className="h-11 w-auto max-w-[150px] object-contain transition-all duration-300 pointer-events-none"
    />
  );
}

const defaultHeroSlides = [
  {
    image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900' width='100%' height='100%'><defs><linearGradient id='bgGradient' x1='0%' y1='0%' x2='0%' y2='100%'><stop offset='0%' stop-color='%23F6F5F3'/><stop offset='100%' stop-color='%23ECE8E4'/></linearGradient><radialGradient id='shadow' cx='50%' cy='50%' r='50%'><stop offset='0%' stop-color='rgba(0,0,0,0.12)'/><stop offset='100%' stop-color='rgba(0,0,0,0)'/></radialGradient><linearGradient id='goldGlow' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%23FAD980'/><stop offset='50%' stop-color='%23DFBA6B'/><stop offset='100%' stop-color='%23B48F37'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23bgGradient)'/><g opacity='0.3'><line x1='0' y1='220' x2='1600' y2='220' stroke='%23D0C9C0' stroke-width='1.5'/><line x1='0' y1='620' x2='1600' y2='620' stroke='%23D0C9C0' stroke-width='1.5'/></g><g font-family='&apos;Cairo&apos;, sans-serif' text-anchor='middle'><text x='800' y='95' fill='%235E6D82' font-size='24' font-weight='800' letter-spacing='1'>برعاية سعادة رئيس الجامعة المكلف</text><text x='800' y='170' fill='%231C64F2' font-size='48' font-weight='900' letter-spacing='1'>أ.د. علي بن محمد مسملي</text><text x='800' y='230' fill='%2356A8A7' font-size='18' font-weight='800'>تتشرف عمادة شؤون الطلاب بدعوتكم لحضور</text><text x='800' y='285' fill='%231F2937' font-size='38' font-weight='900'>ملتقى تكريم المتميزين</text><text x='800' y='330' fill='%231E3A8A' font-size='16' font-weight='700'>على مستوى جامعة الملك سعود وحصول نادي صحة المجتمع على صدارة الأندية والمركز الأول 🏆</text></g><g transform='translate(250, 310)'><ellipse cx='180' cy='520' rx='140' ry='25' fill='url(%23shadow)'/><path d='M 80 510 L 100 210 L 260 210 L 280 510 Z' fill='%23FFFFFF'/><path d='M 155 210 L 180 240 L 205 210 Z' fill='%23F1F5F9' stroke='%23E2E8F0' stroke-width='2'/><path d='M 80 510 L 115 270 Q 135 250 165 250 L 140 510 Z' fill='%231E2024'/><path d='M 135 250 Q 160 250 165 270 L 140 510' fill='none' stroke='url(%23goldGlow)' stroke-width='3.5'/><rect x='140' y='110' width='80' height='90' rx='40' fill='%23EED0B4'/><path d='M 140 165 C 140 210 220 210 220 165 C 220 180 180 215 140 165 Z' fill='%231A1A1A'/><path d='M 125 115 C 125 45 235 45 235 115 Q 235 125 240 140 L 225 120 Q 180 90 135 120 Z' fill='%23E11D48'/><path d='M 135 85 Q 180 60 225 85 M 145 72 Q 180 52 215 72' fill='none' stroke='%23FFFFFF' stroke-width='3.5' stroke-dasharray='5,5'/><rect x='132' y='90' width='96' height='11' rx='5.5' fill='%23111827'/><rect x='135' y='97' width='90' height='9' rx='4.5' fill='%23111827'/><path d='M 125 115 Q 105 285 135 410 Q 140 380 145 245 Z' fill='%23E11D48'/><path d='M 125 115 Q 105 285 135 410' fill='none' stroke='%23FFFFFF' stroke-width='4.5' stroke-dasharray='4,4'/><path d='M 235 115 Q 255 285 225 410 Q 220 380 215 245 Z' fill='%23E11D48'/><path d='M 235 115 Q 255 285 225 410' fill='none' stroke='%23FFFFFF' stroke-width='4.5' stroke-dasharray='4,4'/></g><g transform='translate(850, 310)'><ellipse cx='180' cy='520' rx='140' ry='25' fill='url(%23shadow)'/><path d='M 80 510 L 100 210 L 260 210 L 280 510 Z' fill='%23FFFFFF'/><path d='M 155 210 L 180 240 L 205 210 Z' fill='%23F1F5F9' stroke='%23E2E8F0' stroke-width='2'/><rect x='140' y='110' width='80' height='90' rx='40' fill='%23F1D4B9'/><path d='M 140 165 C 140 210 220 210 220 165 C 220 178 180 205 140 165 Z' fill='%23282828'/><path d='M 125 115 C 125 45 235 45 235 115 Q 235 125 240 140 L 225 120 Q 180 90 135 120 Z' fill='%23E11D48'/><path d='M 135 85 Q 180 60 225 85 M 145 72 Q 180 52 215 72' fill='none' stroke='%23FFFFFF' stroke-width='3.5' stroke-dasharray='5,5'/><rect x='132' y='90' width='96' height='11' rx='5.5' fill='%23090D16'/><rect x='135' y='97' width='90' height='9' rx='4.5' fill='%23090D16'/><path d='M 125 115 Q 105 285 130 430 Q 140 380 145 245 Z' fill='%23E11D48'/><path d='M 125 115 Q 105 285 130 430' fill='none' stroke='%23FFFFFF' stroke-width='4.5' stroke-dasharray='4,4'/><path d='M 235 115 Q 255 285 220 430 Q 215 380 210 245 Z' fill='%23E11D48'/><path d='M 235 115 Q 255 285 220 430' fill='none' stroke='%23FFFFFF' stroke-width='4.5' stroke-dasharray='4,4'/></g><g transform='translate(600, 500)'><rect x='-10' y='160' width='140' height='25' rx='8' fill='rgba(0,0,0,0.12)'/><rect x='0' y='0' width='120' height='150' rx='12' fill='rgba(86,168,167,0.15)' stroke='%2356A8A7' stroke-width='5'/><rect x='6' y='6' width='108' height='138' rx='8' fill='rgba(255,255,255,0.22)'/><rect x='-15' y='145' width='150' height='16' rx='3' fill='url(%23goldGlow)'/><rect x='-22' y='155' width='164' height='10' rx='2' fill='%23856404'/><rect x='15' y='25' width='90' height='95' rx='5' fill='%23ffffff' opacity='0.85'/><path d='M 30 40 L 90 40 M 35 55 L 85 55 M 32 70 L 88 70 M 45 85 L 75 85' stroke='%231E3A8A' stroke-width='2.5' stroke-linecap='round'/><circle cx='60' cy='105' r='6' fill='%23DFBA6B'/></g><g transform='translate(740, 560)'><rect x='-5' y='55' width='190' height='18' rx='4' fill='rgba(0,0,0,0.18)'/><rect x='0' y='0' width='180' height='120' rx='6' fill='%231F2A38' stroke='%23374151' stroke-width='2.5' transform='rotate(-10)'/><rect x='8' y='8' width='164' height='104' rx='4' fill='none' stroke='url(%23goldGlow)' stroke-width='1.5' transform='rotate(-10)'/><circle cx='90' cy='52' r='14' fill='none' stroke='url(%23goldGlow)' stroke-width='1.5' transform='rotate(-10)'/><path d='M 50 78 L 130 78' stroke='url(%23goldGlow)' stroke-width='1.5' transform='rotate(-10)'/><path d='M 60 90 L 120 90' stroke='url(%23goldGlow)' stroke-width='1.2' transform='rotate(-10)'/></g><g transform='translate(612, 512)'><path d='M0 -8 L1.5 -1.5 L8 0 L1.5 1.5 L0 8 L-1.5 1.5 L-8 0 L-1.5 -1.5 Z' fill='%23FFFFFF'/></g><g transform='translate(715, 615)'><path d='M0 -6 L1.2 -1.2 L6 0 L1.2 1.2 L0 6 L-1.2 1.2 L-6 0 L-1.2 -1.2 Z' fill='%23FFFFFF'/></g></svg>",
    caption: "تكريم معالي رئيس جامعة الملك سعود المكلف أ.د. علي بن محمد مسملي لنادي صحة المجتمع بجائزة التميز الطلابي وصدارة الأندية لعام 2026 🏆"
  },
  {
    image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900' width='100%' height='100%'><defs><linearGradient id='bg2' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%231e1b4b'/><stop offset='50%' stop-color='%23311042'/><stop offset='100%' stop-color='%230f172a'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23bg2)'/><g opacity='0.1'><line x1='0' y1='450' x2='1600' y2='450' stroke='%23ffffff' stroke-width='2' stroke-dasharray='5,5'/><circle cx='800' cy='450' r='250' fill='none' stroke='%23ffffff' stroke-width='1.5'/></g><g transform='translate(800, 420)' text-anchor='middle' font-family='&apos;Cairo&apos;, sans-serif'><text x='0' y='-120' fill='%2310b981' font-size='90'>&#127881;</text><text x='0' y='-20' fill='%23ffffff' font-size='38' font-weight='900'>تتويج نادي صحة المجتمع بالمركز الأول 💚</text><text x='0' y='40' fill='%2334d399' font-size='24' font-weight='850'>فرحة أعضاء النادي وعاملو الوفد بالصدارة المستحقة</text><text x='0' y='90' fill='%23a7f3d0' font-size='20' font-weight='600'>بمشاركة قادة النشاط والطلبة المبدعين بكليات الرياض لعام 2026 🎉</text></g></svg>",
    caption: "احتفالية وفرحة أعضاء نادي صحة المجتمع بالحصول على الصدارة وتتويج النادي بالمركز الأول على مستوى الجامعة 💚"
  },
  {
    image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900' width='100%' height='100%'><defs><linearGradient id='bg3' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%23022c22'/><stop offset='50%' stop-color='%230f172a'/><stop offset='100%' stop-color='%23020617'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23bg3)'/><g opacity='0.05'><pattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'><rect width='40' height='40' fill='none' stroke='%23ffffff' stroke-width='1'/></pattern><rect width='100%' height='100%' fill='url(%23grid)'/></g><g transform='translate(800, 420)' text-anchor='middle' font-family='&apos;Cairo&apos;, sans-serif'><text x='0' y='-120' fill='%230d9488' font-size='90'>&#128203;</text><text x='0' y='-20' fill='%232dd4bf' font-size='36' font-weight='900'>معرض إنجازات النادي السنوي للترم الأول</text><text x='0' y='40' fill='%23ffffff' font-size='22' font-weight='700'>اللوحات التعريفية لمؤتمر تعزيز واليوم العالمي للسكري والفعاليات الصحية والوقائية 📊</text><text x='0' y='90' fill='%2394a3b8' font-size='18' font-weight='600'>ملخص الأنشطة والانتشار وخدمة المجتمع بجامعة الملك سعود</text></g></svg>",
    caption: "معرض إنجازات النادي للترم الأول واللوحات التعريفية لمؤتمر تعزيز واليوم العالمي للسكري والفعاليات الصحية والوقائية 📊"
  }
];

const healthTips = [
  {
    text: "تناول كوب من الماء الدافئ أو المعتدل قبل الوجبات بـ 30 دقيقة يحسن العمليات الهضمية، ويقلل استهلاك السعرات الزائدة بشكل تلقائي.",
    category: "التغذية والتوازن البشري",
    department: "قسم التغذية الإكلينيكية"
  },
  {
    text: "ممارسة المشي السريع لمدة 10 دقائق فقط مباشرة بعد تناول الوجبات الرئيسية تساهم بشكل ملحوظ بخفض قفزات السكر بالدم وتنظيم الإنسولين.",
    category: "الصحة والنشاط البدني",
    department: "قسم علوم صحة المجتمع"
  },
  {
    text: "استبدال الخبز الأبيض والنشويات المقشورة بالحبوب الكاملة (كالقمح الكامل والشوفان الأسمر) يبطئ امتصاص الغلوكوز ويمنع الشعور المفاجئ بالتعب والجوع المتكرر.",
    category: "التثقيف والتحكّم بالوزن",
    department: "قسم التغذية الإكلينيكية"
  },
  {
    text: "الحصول على نوم كافٍ وعميق بمعدل 7 إلى 8 ساعات ليلاً ينظم عمل هرمونات الغريلين واللبتين المسؤولة عن تنظيم الشبع والجوع والحرق اللحمي.",
    category: "أمراض العصر وجائحة الكسل",
    department: "قسم علوم صحة المجتمع"
  },
  {
    text: "بدائل السكر الطبيعية مثل ستيفيا خيار ممتاز لمرضى السكري والراغبين في خفض الوزن، ولكن باعتدال ليتعود العقل على عدم طلب المذاق السكري المفرط.",
    category: "الوقاية وبدائل الغلوكوز",
    department: "قسم علوم صحة المجتمع"
  },
  {
    text: "المستويات الكافية من فيتامين دال تدعم صحة البنكرياس وإفراز الإنسولين، وتعزز متانة العظام ومرونتها والتمثيل الغذائي.",
    category: "الفيتامينات المانحة للوقاية",
    department: "قسم علوم صحة المجتمع"
  }
];

const triviaQuiz = [
  {
    id: 101,
    question: "شرب الماء البارد أثناء أو بعد تناول وجبة الطعام مباشرة يسبب تجمد الدهون وتراكمها في جدار الأوعية الدموية والكبد.",
    correctAnswer: "myth",
    explanation: "خرافة شائعة ليس لها أي أساس في علم وظائف الأعضاء. يقوم الجهاز الهضمي بتعديل حرارة الطعام فورياً، وعمليات تفكيك الدهون وامتصاصها هي عمليات كيميائية معقدة لا تتأثر بالماء البارد.",
    department: "التغذية الإكلينيكية"
  },
  {
    id: 102,
    question: "تناول الأطعمة المحتوية على السكر والحلويات هو المسبب الفردي والوحيد المباشر لحدوث داء السكري من النوع الثاني.",
    correctAnswer: "myth",
    explanation: "خرافة غير صحيحة علمياً. مسببات السكري من النوع الثاني معقدة وترتبط بمقاومة الإنسولين، قلة النشاط البدني، السمنة المفرطة، والعوامل الوراثية، والسكر يسهم فقط كجزء من فائض السعرات المؤدي للسمنة.",
    department: "علوم صحة المجتمع"
  },
  {
    id: 103,
    question: "قراءة منفردة مرتفعة لقياس ضغط الدم مرة واحدة كافية لإثبات الإصابة بمرض ضغط الدم المزمن والبدء بالخطة العلاجية.",
    correctAnswer: "myth",
    explanation: "خرافة طبية. لا يمكن تشخيص مرض ضغط الدم بقراءة منفردة لتأثره بالتوتر أو المجهود، بل يتطلب الفحص المكرر تحت ظروف معيارية وهادئة لأيام متعددة للتأكد.",
    department: "علوم صحة المجتمع والتشخيص"
  }
];

export default function App() {
  const lang = "ar";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<ClubEvent | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const [activeSection, setActiveSection] = useState("section-home");
  const [activeTipIndex, setActiveTipIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [showQuizFeedback, setShowQuizFeedback] = useState<Record<number, boolean>>({});
  const [currentSlide, setCurrentSlide] = useState(0);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }
  }, []);
  const [showAdmin, setShowAdmin] = useState(false);

  const [slides, setSlides] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("chc_ksu_custom_slides");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // Only use saved slides if they are up-to-date with our new ceremony representation
          if (Array.isArray(parsed) && parsed[0] && parsed[0].image && parsed[0].image.includes("bgGradient")) {
            return parsed;
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
    return defaultHeroSlides;
  });

  const [isUploaderOpen, setIsUploaderOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const [showDevToast, setShowDevToast] = useState(false);
  const [isDeveloper, setIsDeveloper] = useState(() => {
    if (typeof window !== "undefined") {
      const isDevQuery = window.location.search.includes("dev=true") || window.location.search.includes("developer=true");
      const isLocalStorageDev = localStorage.getItem("chc_ksu_dev_mode") === "true";
      return isDevQuery || isLocalStorageDev;
    }
    return false;
  });

  const handleLogoClick = () => {
    setLogoClicks((prev) => {
      const next = prev + 1;
      if (next >= 5) {
        setIsDeveloper(true);
        localStorage.setItem("chc_ksu_dev_mode", "true");
        setShowDevToast(true);
        setTimeout(() => setShowDevToast(false), 5000);
        return 0;
      }
      return next;
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % (slides.length || 1));
    }, 5500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const promises = (Array.from(files) as File[]).map((file: File) => {
      return new Promise<{ image: string; caption: string }>((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve({
            image: event.target?.result as string,
            caption: file.name.substring(0, file.name.lastIndexOf('.')) || "صورة جديدة من فعاليات النادي 📸",
          });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then((newSlides) => {
      const updated = [...slides, ...newSlides];
      setSlides(updated);
      localStorage.setItem("chc_ksu_custom_slides", JSON.stringify(updated));
    });
  };

  const handleUpdateCaption = (index: number, caption: string) => {
    const updated = slides.map((slide, idx) =>
      idx === index ? { ...slide, caption } : slide
    );
    setSlides(updated);
    localStorage.setItem("chc_ksu_custom_slides", JSON.stringify(updated));
  };

  const handleDeleteSlide = (index: number) => {
    if (slides.length <= 1) return;
    const updated = slides.filter((_, idx) => idx !== index);
    setSlides(updated);
    localStorage.setItem("chc_ksu_custom_slides", JSON.stringify(updated));
    if (currentSlide >= updated.length) {
      setCurrentSlide(updated.length - 1);
    }
  };

  const handleResetToDefault = () => {
    setSlides(defaultHeroSlides);
    localStorage.removeItem("chc_ksu_custom_slides");
    setCurrentSlide(0);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.document.documentElement.classList.remove("dark");
      localStorage.removeItem("theme");
    }
  }, []);

  const t = translations[lang];

  // Detect scroll to style navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Set page title dynamically to fit the language
  useEffect(() => {
    document.title = "نادي صحة المجتمع | كلية العلوم الطبية التطبيقية";
    document.documentElement.dir = "rtl";
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: isMobile ? "auto" : "smooth" });
    }
  };

  const menuItems = [
    { label: t.navHome, id: "section-home" },
    { label: t.navAbout, id: "section-about" },
    { label: t.navLeadership, id: "section-leadership" },
    { label: "التخصصات", id: "section-majors" },
    { label: t.navEvents, id: "section-events" },
    { label: "الإنجازات", id: "section-achievements" },
    { label: "المجلة", id: "section-magazine" },
    { label: "حاسبة الكتلة (BMI)", id: "section-bmi" },
    { label: t.navJoin, id: "section-join", highlight: true },
  ];

  return (
    <div
      id="app-root-container"
      className="min-h-screen flex flex-col antialiased font-sans text-right bg-[#f8fafb] select-none text-slate-800"
    >
      {/* Main Sticky Header */}
      <header
        id="site-navbar"
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/75 backdrop-blur-xl shadow-md shadow-slate-100/60 border-b border-slate-200/50 py-2.5"
            : "bg-slate-50/90 backdrop-blur-md border-b border-slate-100 py-4"
        }`}
      >
        <div
          className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between"
        >
          {/* Brand Logo & Name */}
          <a
            id="brand-navigation-link"
            href="#section-home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("section-home");
              handleLogoClick();
            }}
            className="flex items-center hover:opacity-90 transition-opacity"
            title="نادي صحة المجتمع (انقر 5 مرات لوضع المطور 🛠️)"
          >
            <Logo showText lang="ar" size={42} />
          </a>

          {/* Desktop Navigation Links */}
          <nav
            id="desktop-navigation-links"
            className="hidden lg:flex items-center gap-1.5"
          >
            {menuItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  id={`nav-link-${item.id}`}
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 font-sans font-bold text-xs md:text-sm rounded-xl transition-all ${
                    item.highlight
                      ? "bg-gradient-to-r from-brand-blue to-brand-teal text-white hover:opacity-95 shadow-md shadow-brand-blue/15 hover:scale-[1.02] transform mr-2 active:scale-95"
                      : isActive
                      ? "text-brand-blue bg-brand-blue/10 scale-100 cursor-default"
                      : "text-slate-600 hover:text-brand-blue hover:bg-slate-100/70"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile Right Controls */}
          <div
            id="mobile-navigation-trigger"
            className="flex lg:hidden items-center gap-2.5"
          >
            {/* Hamburger Handle */}
            <button
              id="hamburger-trigger-button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-all shadow-sm active:scale-95"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Expanded Menu Drawer */}
        {mobileMenuOpen && (
          <>
            {/* Dark blur overlay backdrop behind mobile menu */}
            <div
              id="mobile-menu-backdrop"
              className="lg:hidden fixed inset-0 top-[60px] md:top-[72px] bg-slate-950/40 backdrop-blur-xs z-40 transition-opacity duration-300 animate-fadeIn"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            <div
              id="mobile-menu-drawer"
              className="lg:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-lg border-b border-slate-200/90 shadow-2xl px-4 py-6 space-y-4 animate-fadeIn z-50 rounded-b-2xl border-t border-slate-100/50"
            >
              <div className="flex flex-col gap-1.5">
                {menuItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      id={`mobile-nav-link-${item.id}`}
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full py-3 px-4 font-sans font-bold text-sm rounded-xl transition-all text-right flex items-center justify-between cursor-pointer ${
                        item.highlight
                          ? "bg-gradient-to-r from-brand-blue to-brand-teal text-white justify-center shadow-lg shadow-brand-blue/15 hover:opacity-95 active:scale-[0.98] transform mt-2"
                          : isActive
                          ? "text-brand-blue bg-brand-blue/10 px-5 font-black"
                          : "text-slate-700 hover:bg-slate-100/60 active:bg-slate-50"
                      }`}
                    >
                      <span>{item.label}</span>
                      {!item.highlight && (
                        <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? "text-brand-blue rotate-180" : "text-slate-350 opacity-40"}`} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </header>

      {/* Main Page Sections content */}
      <main id="main-content-area" className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: isMobile ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: isMobile ? 0 : -8 }}
            transition={{ duration: isMobile ? 0.12 : 0.22, ease: "easeInOut" }}
          >
            {activeSection === "section-home" && (
              <>
                {/* SECTION 1: HERO CONTAINER */}
                <section
                  id="section-home"
                  className="relative overflow-hidden min-h-[82vh] flex flex-col justify-center py-16 lg:py-24 font-sans scroll-mt-20 border-b border-emerald-100/30 bg-gradient-to-b from-[#e8f6f0] via-white to-[#f0f9f5]"
                >



                  {/* Clean Medical grid patterns on top of pictures */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-10">
                    <svg width="100%" height="100%">
                      <defs>
                        <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#008080" strokeWidth="1" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                    </svg>
                  </div>

                  {/* Sleek Ambient Dynamic Glows */}
                  <div className="absolute top-1/4 left-1/12 w-80 h-80 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none z-10" />
                  <div className="absolute bottom-1/4 right-1/12 w-80 h-80 bg-brand-teal/10 rounded-full blur-3xl pointer-events-none z-10" />

                  <div
                    className="max-w-4xl mx-auto px-4 md:px-6 relative text-center z-20 w-full"
                  >
                    <div className="space-y-6">
                      {/* Visual Pill Badge */}
                      <div className="flex justify-center">
                        <span
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-brand-teal bg-brand-teal/10 shadow-sm border border-brand-teal/15"
                        >
                          <Sparkles className="w-3.5 h-3.5 fill-current" />
                          <span>نادي طلابي</span>
                        </span>
                      </div>

                      <h1 className="font-sans font-black text-3xl md:text-5xl lg:text-5xl text-brand-academic tracking-tight leading-tight lg:leading-[1.12]">
                        {t.heroHeading}
                      </h1>

                      <p className="text-sm md:text-base lg:text-lg text-slate-550 font-medium leading-relaxed max-w-2xl mx-auto">
                        {t.heroSubheading}
                      </p>

                      {/* Call To Actions */}
                      <div
                        className="pt-4 flex flex-wrap gap-4 justify-center"
                      >
                        <button
                          id="hero-join-cta-btn"
                          onClick={() => scrollToSection("section-join")}
                          className="px-6 py-3.5 md:px-8 font-sans font-extrabold text-sm md:text-base text-white bg-gradient-to-r from-brand-blue to-brand-teal hover:opacity-95 rounded-xl transition-all shadow-md shadow-brand-blue/15 hover:shadow-lg hover:shadow-brand-blue/20 hover:scale-[1.02] transform mr-2 active:scale-95 flex items-center gap-2 cursor-pointer"
                        >
                          <span>{t.heroCtaJoin}</span>
                          <Heart className="w-4 h-4" />
                        </button>

                        <button
                          id="hero-events-cta-btn"
                          onClick={() => scrollToSection("section-events")}
                          className="px-6 py-3.5 md:px-8 font-sans font-extrabold text-sm md:text-base text-brand-academic hover:text-brand-blue bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl transition-all shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-95 flex items-center gap-2 cursor-pointer"
                        >
                          <span>{t.heroCtaEvents}</span>
                          <ChevronRight className="w-4 h-4 rotate-180" />
                        </button>
                      </div>


                    </div>
                  </div>
                </section>

                {/* SECTION 2: CLUB STATS GRAPHIC TICKER */}
                <section
                  id="section-stats"
                  className="bg-gradient-to-r from-brand-academic via-[#1c3c58] to-brand-academic text-white py-16 relative overflow-hidden border-y border-white/5"
                >
                  {/* Subtle decoration vector lines and glows */}
                  <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-brand-teal/10 to-transparent pointer-events-none" />
                  <div className="absolute -bottom-20 left-10 w-64 h-64 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
                    <h2 className="sr-only">{t.statsSectionTitle}</h2>

                    <div
                      className={`grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 text-center ${
                        lang === "ar" ? "direction-rtl" : ""
                      }`}
                    >
                      {/* Stat 1 */}
                      <div
                        id="stat-card-beneficiaries"
                        className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-6 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 shadow-sm hover:scale-[1.02] transform space-y-2 group"
                      >
                        <div className="mx-auto w-10 h-10 bg-[#56A8A7]/20 rounded-xl flex items-center justify-center text-[#56A8A7] mb-2 group-hover:scale-110 transition-transform">
                          <Users className="w-5 h-5" />
                        </div>
                        <p className="font-mono text-3xl md:text-4xl font-extrabold text-[#56A8A7] tracking-tight">
                          16,800+
                        </p>
                        <p className="text-xs md:text-sm font-semibold opacity-90 text-slate-300 font-sans">
                          {t.statsBeneficiaries}
                        </p>
                      </div>

                      {/* Stat 2 */}
                      <div
                        id="stat-card-campaigns"
                        className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-6 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 shadow-sm hover:scale-[1.02] transform space-y-2 group"
                      >
                        <div className="mx-auto w-10 h-10 bg-[#56A8A7]/20 rounded-xl flex items-center justify-center text-[#56A8A7] mb-2 group-hover:scale-110 transition-transform">
                          <Activity className="w-5 h-5" />
                        </div>
                        <p className="font-mono text-3xl md:text-4xl font-extrabold text-[#56A8A7] tracking-tight">
                          27+
                        </p>
                        <p className="text-xs md:text-sm font-semibold opacity-90 text-slate-300 font-sans">
                          {t.statsCampaigns}
                        </p>
                      </div>

                      {/* Stat 3 */}
                      <div
                        id="stat-card-members"
                        className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-6 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 shadow-sm hover:scale-[1.02] transform space-y-2 group"
                      >
                        <div className="mx-auto w-10 h-10 bg-[#56A8A7]/20 rounded-xl flex items-center justify-center text-[#56A8A7] mb-2 group-hover:scale-110 transition-transform">
                          <Award className="w-5 h-5" />
                        </div>
                        <p className="font-mono text-3xl md:text-4xl font-extrabold text-[#56A8A7] tracking-tight">
                          180+
                        </p>
                        <p className="text-xs md:text-sm font-semibold opacity-90 text-slate-300 font-sans">
                          {t.statsMembers}
                        </p>
                      </div>

                      {/* Stat 4 */}
                      <div
                        id="stat-card-hours"
                        className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-6 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 shadow-sm hover:scale-[1.02] transform space-y-2 group"
                      >
                        <div className="mx-auto w-10 h-10 bg-[#56A8A7]/20 rounded-xl flex items-center justify-center text-[#56A8A7] mb-2 group-hover:scale-110 transition-transform">
                          <Clock className="w-5 h-5" />
                        </div>
                        <p className="font-mono text-3xl md:text-4xl font-extrabold text-[#56A8A7] tracking-tight">
                          2,000+
                        </p>
                        <p className="text-xs md:text-sm font-semibold opacity-90 text-slate-300 font-sans">
                          {t.statsHours}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* SECTION 2.5: INTERACTIVE AWARENESS & TRIVIA HUB */}
                <section
                  id="section-interactive-hub"
                  className="py-16 md:py-24 bg-[#f8fafc]/40 border-b border-slate-200/50 relative overflow-hidden"
                  dir="rtl"
                >
                  {/* Subtle decorative glow */}
                  <div className="absolute top-1/2 left-0 w-72 h-72 bg-gradient-to-r from-brand-teal/5 to-transparent rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />

                  <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 space-y-12">
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto space-y-3">
                      <span className="text-xs font-bold uppercase tracking-widest text-[#1CAADA] bg-cyan-50 border border-cyan-100 px-3 py-1 rounded-full">
                        التثقيف الرقمي التفاعلي
                      </span>
                      <h2 className="font-sans font-black text-2xl md:text-4xl text-brand-academic leading-tight">
                        مركز الوعي والجرعات الصحية التجريبية
                      </h2>
                      <div className="h-1.5 w-16 bg-brand-teal rounded-full mx-auto" />
                      <p className="text-xs md:text-sm text-slate-550 max-w-xl mx-auto font-semibold">
                        صحة الفرد تبدأ بالتفنيد المعرفي العلمي. استمتع بقراءة جرعتك الوقائية لهذا اليوم واختبر معلوماتك الصحية معنا لتجنب المفاهيم المغلوطة.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                      {/* Left: Daily Tip Generator (5 cols) */}
                      <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-3xl border border-slate-200/70 shadow-sm space-y-6 flex flex-col justify-between min-h-[380px] hover:shadow-md transition-shadow">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-teal-50 text-brand-teal border border-teal-100 flex items-center gap-1">
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>الجرعة المعرفية اليومية</span>
                            </span>
                            <span className="text-[10px] font-mono text-slate-400 font-bold">
                              نصيحة {activeTipIndex + 1} من {healthTips.length}
                            </span>
                          </div>

                          <AnimatePresence mode="wait">
                            <motion.div
                              key={activeTipIndex}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 10 }}
                              transition={{ duration: 0.2 }}
                              className="space-y-4 pt-2"
                            >
                              <p className="text-slate-700 font-sans font-bold text-sm md:text-base leading-relaxed text-right min-h-[96px]">
                                "{healthTips[activeTipIndex].text}"
                              </p>
                              
                              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                                <span className="text-xs text-slate-500 font-sans font-medium flex items-center gap-1.5">
                                  <span className="w-2 h-2 rounded-full bg-brand-blue" />
                                  <span>{healthTips[activeTipIndex].category}</span>
                                </span>
                                <span className="text-xs text-brand-teal bg-brand-teal/5 px-2.5 py-1 rounded-full font-extrabold">
                                  {healthTips[activeTipIndex].department}
                                </span>
                              </div>
                            </motion.div>
                          </AnimatePresence>
                        </div>

                        <button
                          onClick={() => setActiveTipIndex((prev) => (prev + 1) % healthTips.length)}
                          className="w-full py-3 bg-gradient-to-r from-brand-blue to-teal-500 text-white rounded-2xl font-sans font-black text-xs md:text-sm hover:opacity-95 shadow-md shadow-brand-blue/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
                        >
                          <span>جرعة وقائية جديدة</span>
                          <Sparkles className="w-4 h-4 fill-white" />
                        </button>
                      </div>

                      {/* Right: Fact vs Myth Trivia Card (7 cols) */}
                      <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl border border-slate-200/70 shadow-sm space-y-6 hover:shadow-md transition-shadow">
                        <div className="space-y-2">
                          <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center gap-1 w-max">
                            <Award className="w-3.5 h-3.5" />
                            <span>مختبر الإشاعات والمفاهيم</span>
                          </span>
                          <h3 className="font-sans font-black text-lg text-slate-900 text-right">
                            حقيقة أم خرافة؟ تحدّ معلوماتك الطبية
                          </h3>
                          <p className="text-xs text-slate-500 text-right leading-relaxed font-medium">
                            اختر إجابتك لتتبين الحقيقة العلمية خلف أبرز الشائعات الصحية المنتشرة في مجتمعنا، تحت إشراف لجان النادي الأكاديمية وصحة المجتمع.
                          </p>
                        </div>

                        {/* Trivia Questions Grid */}
                        <div className="space-y-4 pt-1">
                          {triviaQuiz.map((item, index) => {
                            const isAnswered = quizAnswers[item.id] !== undefined;
                            const isFeedbackVisible = showQuizFeedback[item.id];
                            const selectedAnswer = quizAnswers[item.id];
                            const isCorrect = selectedAnswer === item.correctAnswer;

                            return (
                              <div
                                key={item.id}
                                className={`p-5 rounded-2xl border transition-all duration-300 space-y-4 ${
                                  isFeedbackVisible
                                    ? isCorrect
                                      ? "bg-emerald-50/20 border-emerald-300/65"
                                      : "bg-rose-50/25 border-rose-200/65"
                                    : "bg-[#f8fafc]/65 border-slate-200/60 hover:bg-white hover:border-slate-300/80"
                                }`}
                              >
                                <div className="flex gap-3 justify-start items-start text-right">
                                  <span className="w-6 h-6 bg-slate-200 text-slate-800 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 font-mono">
                                    {index + 1}
                                  </span>
                                  <h4 className="font-sans font-bold text-sm md:text-base text-slate-800 leading-relaxed">
                                    {item.question}
                                  </h4>
                                </div>

                                {/* Answer choices or scientific explanation */}
                                <AnimatePresence mode="wait">
                                  {!isFeedbackVisible ? (
                                    <div className="flex flex-wrap gap-3 pt-1 justify-start">
                                      <button
                                        onClick={() => {
                                          setQuizAnswers((prev) => ({ ...prev, [item.id]: "fact" }));
                                          setShowQuizFeedback((prev) => ({ ...prev, [item.id]: true }));
                                        }}
                                        className="px-5 py-2.5 bg-white border border-slate-200 hover:border-brand-blue hover:text-brand-blue rounded-xl text-xs md:text-sm font-sans font-bold transition-all hover:scale-[1.01] active:scale-95 shadow-sm cursor-pointer"
                                      >
                                        🟢 حقيقة مثبتة
                                      </button>
                                      
                                      <button
                                        onClick={() => {
                                          setQuizAnswers((prev) => ({ ...prev, [item.id]: "myth" }));
                                          setShowQuizFeedback((prev) => ({ ...prev, [item.id]: true }));
                                        }}
                                        className="px-5 py-2.5 bg-white border border-slate-200 hover:border-brand-blue hover:text-brand-blue rounded-xl text-xs md:text-sm font-sans font-bold transition-all hover:scale-[1.01] active:scale-95 shadow-sm cursor-pointer"
                                      >
                                        🔴 خرافة شائعة
                                      </button>
                                    </div>
                                  ) : (
                                    <motion.div
                                      initial={{ opacity: 0, y: 5 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      className="space-y-3 pt-2 text-right"
                                    >
                                      <div className="flex flex-wrap items-center gap-2 justify-start">
                                        <span
                                          className={`text-xs font-black px-2.5 py-1 rounded-lg flex items-center gap-1 ${
                                            isCorrect
                                              ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                                              : "bg-amber-100 text-amber-800 border border-amber-200"
                                          }`}
                                        >
                                          {isCorrect ? "✨ إجابتك صحيحة!" : "💡 علم وتصحيح!"}
                                        </span>
                                        <span className="text-xs text-slate-500 font-sans font-medium">
                                          التصنيف العلمي:{" "}
                                          <span className="font-extrabold text-slate-705">
                                            {item.correctAnswer === "fact" ? "حقيقة علمية" : "خرافة غير مبرهنة"}
                                          </span>
                                        </span>
                                      </div>

                                      <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-sans font-medium bg-white/70 p-3 rounded-xl border border-slate-100">
                                        {item.explanation}
                                      </p>

                                      <div className="flex gap-2 justify-between items-center bg-slate-50/80 p-2.5 rounded-xl border border-slate-100/60">
                                        <span className="text-[10px] text-slate-400 font-bold font-mono">
                                          بإشراف كوادر الكلية: {item.department}
                                        </span>
                                        
                                        <button
                                          onClick={() => {
                                            setQuizAnswers((prev) => {
                                              const updated = { ...prev };
                                              delete updated[item.id];
                                              return updated;
                                            });
                                            setShowQuizFeedback((prev) => ({ ...prev, [item.id]: false }));
                                          }}
                                          className="text-[10px] font-sans font-black text-indigo-600 hover:underline cursor-pointer"
                                        >
                                          إعادة المحاولة 🔄
                                        </button>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* SECTION: SUCCESS PARTNERS INFINITE MARQUEE */}
                <section
                  id="section-partners"
                  className="py-12 bg-gradient-to-r from-brand-academic via-[#1c3c58] to-brand-academic relative overflow-hidden scale-100 border-b border-white/5"
                  dir="rtl"
                >
                  <div className="max-w-7xl mx-auto px-4 md:px-6 mb-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-right">
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#56A8A7] bg-[#56A8A7]/10 px-2.5 py-1 rounded-md">
                          مسيرة التعاون والأثر المستدام
                        </span>
                        <h2 className="font-sans font-black text-xl md:text-2xl text-white">
                          شركاء النجاح والجهات المتعاونة
                        </h2>
                      </div>
                      <p className="text-xs md:text-sm text-slate-300 font-sans font-medium max-w-md leading-relaxed">
                        فخورون بشراكتنا وتعاوننا المستمر مع القطاعات الحكومية والأكاديمية والصحية لتقديم التطبيق العملي ونشر الوعي الوقائي المجتمعي.
                      </p>
                    </div>
                  </div>

                  {/* Marquee Wrapper with fading sides mask effects */}
                  <div dir="ltr" className="relative w-full overflow-hidden py-4 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-16 md:before:w-32 before:bg-gradient-to-r before:from-brand-academic before:to-transparent before:pointer-events-none after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-16 md:after:w-32 after:bg-gradient-to-l after:from-brand-academic after:to-transparent after:pointer-events-none">
                    
                    <div dir="ltr" className="animate-marquee flex whitespace-nowrap hover:[animation-play-state:paused] py-2">
                      {marqueePartnersList.map((p, idx) => (
                        <div
                          key={`${p.name}-${idx}`}
                          className="inline-flex items-center justify-center mx-5 group select-none"
                        >
                          <div className="h-[76px] px-8 bg-white hover:bg-[#fafafa] border border-white/20 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 hover:scale-[1.04] shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_18px_rgba(0,0,0,0.12)]">
                            <PartnerLogo partner={p} />
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                </section>
              </>
            )}

            {activeSection === "section-about" && (
              <section id="section-about" className="py-20 bg-gradient-to-b from-[#e8f6f0] via-white to-[#f0f9f5] border-b border-emerald-100/30 scroll-mt-20 min-h-[82vh] flex flex-col justify-center">
                <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-16">
                  
                  {/* Headline section */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start lg:flex-row-reverse">
                    <div className="lg:col-span-12 space-y-4">
                      <span className="text-xs font-bold uppercase tracking-widest text-[#1CAADA]">
                        هويتنا ورسالتنا الأكاديمية وصحة مجتمعنا
                      </span>
                      <h2 className="font-sans font-extrabold text-2xl md:text-4xl text-brand-academic leading-snug">
                        {t.aboutUsHeadline}
                      </h2>
                      <div className="h-1.5 w-16 bg-brand-teal rounded-full" />
                      <p className="text-base text-slate-600 font-sans leading-relaxed pt-2">
                        {t.aboutUsText}
                      </p>
                    </div>
                  </div>

                  {/* Vision and Mission Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Vision */}
                    <div
                      id="card-vision"
                      className="bg-slate-50/40 hover:bg-white p-8 rounded-2xl border border-slate-200/60 hover:border-brand-blue/30 transition-all duration-300 hover:shadow-lg hover:shadow-slate-100/60 space-y-4 relative overflow-hidden group text-right"
                    >
                      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-blue/50 to-brand-blue opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center text-brand-blue group-hover:scale-105 transition-transform ml-auto">
                        <Compass className="w-6 h-6" />
                      </div>
                      <h3 className="font-sans font-black text-xl text-brand-academic">
                        {t.visionTitle}
                      </h3>
                      <p className="text-sm md:text-base text-slate-550 leading-relaxed font-medium">
                        {t.visionText}
                      </p>
                    </div>

                    {/* Mission */}
                    <div
                      id="card-mission"
                      className="bg-slate-50/40 hover:bg-white p-8 rounded-2xl border border-slate-200/60 hover:border-brand-teal/30 transition-all duration-300 hover:shadow-lg hover:shadow-slate-100/60 space-y-4 relative overflow-hidden group text-right"
                    >
                      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-teal/50 to-brand-teal opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="w-12 h-12 bg-brand-teal/10 rounded-xl flex items-center justify-center text-brand-teal group-hover:scale-105 transition-transform ml-auto">
                        <Target className="w-6 h-6" />
                      </div>
                      <h3 className="font-sans font-black text-xl text-brand-academic">
                        {t.missionTitle}
                      </h3>
                      <p className="text-sm md:text-base text-slate-550 leading-relaxed font-medium">
                        {t.missionText}
                      </p>
                    </div>
                  </div>

                  {/* Objectives check list */}
                  <div id="objectives-interactive-panel" className="bg-gradient-to-br from-[#1CAADA]/3 via-white to-slate-50/30 p-6 md:p-10 rounded-2xl border border-slate-200/60 shadow-sm max-w-4xl mx-auto space-y-6">
                    <h3
                      className="font-sans font-extrabold text-lg md:text-2xl text-brand-academic flex items-center gap-2.5 justify-start flex-row-reverse"
                    >
                      <BookOpen className="w-6 h-6 text-brand-teal" />
                      <span>{t.objectivesTitle}</span>
                    </h3>

                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-sm md:text-base text-slate-550">
                      {t.objectivesList.map((obj, i) => (
                        <li
                          key={i}
                          className="flex gap-3 leading-relaxed items-start flex-row-reverse text-right"
                        >
                          <span className="w-5 h-5 bg-brand-teal/15 rounded-full flex items-center justify-center shrink-0 text-brand-teal mt-1">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </span>
                          <span className="font-medium text-slate-705">{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </section>
            )}

            {activeSection === "section-majors" && (
              <SpecializationsSection />
            )}

            {activeSection === "section-events" && (
              <section
                id="section-events"
                className="py-20 bg-gradient-to-b from-[#e8f6f0] via-white to-[#f0f9f5] border-y border-emerald-100/30 scroll-mt-20 min-h-[82vh] flex flex-col justify-center"
              >
                <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-12">
                  
                  {/* Header */}
                  <div className="text-center max-w-3xl mx-auto space-y-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#1CAADA]">
                      الفعاليات الميدانية والجهود المجتمعية للكلية
                    </span>
                    <h2 className="font-sans font-black text-2xl md:text-4xl text-brand-academic">
                      {t.eventsSectionTitle}
                    </h2>
                    <p className="text-xs md:text-sm text-slate-555">
                      {t.eventsSectionSub}
                    </p>
                  </div>

                  {/* Campaign Cards Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {eventsData.map((ev) => {
                      const titleText = ev.title.ar;
                      const descText = ev.description.ar;
                      const dateText = ev.date.ar;
                      const locText = ev.location.ar;
                      const catText = ev.category.ar;

                      return (
                        <div
                          id={`event-card-${ev.id}`}
                          key={ev.id}
                          className="bg-white rounded-2xl border border-slate-200/70 hover:border-brand-teal/30 overflow-hidden shadow-sm hover:shadow-lg hover:shadow-slate-100/50 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 cursor-pointer"
                          onClick={() => setSelectedEvent(ev)}
                        >
                          {/* Header card body */}
                          <div className="p-6 space-y-4">
                            {/* Chip representation */}
                            <div
                              className="flex justify-between items-center flex-row-reverse"
                            >
                              <span className="text-[10px] font-black tracking-wider text-brand-teal bg-brand-teal/10 px-2.5 py-1 rounded-md uppercase">
                                {catText}
                              </span>
                              <div className="text-[10px] text-brand-blue font-bold">
                                {ev.id === "obesity-day-2026" ? "★ مميز" : ""}
                              </div>
                            </div>

                            <h3
                              className="font-sans font-black text-base md:text-lg text-brand-academic group-hover:text-brand-blue transition-colors leading-snug line-clamp-2 text-right"
                            >
                              {titleText}
                            </h3>

                            <p
                              className="text-xs md:text-sm text-slate-500 font-sans leading-relaxed line-clamp-3 font-medium text-right"
                            >
                              {descText}
                            </p>

                            {/* Event Coordinates */}
                            <div className="space-y-2 pt-3 border-t border-slate-100 text-[11px] md:text-xs text-slate-500 font-medium">
                              <div
                                className="flex gap-2 items-center flex-row-reverse text-right"
                              >
                                <Calendar className="w-3.5 h-3.5 text-brand-teal shrink-0" />
                                <span>{dateText}</span>
                              </div>
                              <div
                                className="flex gap-2 items-center flex-row-reverse text-right"
                              >
                                <MapPin className="w-3.5 h-3.5 text-brand-blue shrink-0" />
                                <span className="truncate">{locText}</span>
                              </div>
                            </div>
                          </div>

                          {/* Quick Metrics display on card */}
                          <div className="bg-slate-50/80 px-6 py-4 border-t border-slate-200/60">
                            <div className="grid grid-cols-3 gap-2 text-center pb-2">
                              {ev.metrics.slice(0, 3).map((met, idx) => (
                                 <div key={idx} className="space-y-0.5">
                                   <p className="font-mono text-xs md:text-sm font-black text-brand-academic">
                                     {met.value}
                                   </p>
                                   <p className="text-[8px] md:text-[9px] text-slate-450 font-bold font-sans truncate">
                                     {met.label.ar}
                                   </p>
                                 </div>
                              ))}
                            </div>

                            {/* Action trigger to launch complete agenda details modal */}
                            <button
                              id={`event-action-panel-btn-${ev.id}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedEvent(ev);
                              }}
                              className="w-full mt-2 py-2.5 px-3 text-xs bg-white hover:bg-gradient-to-r hover:from-brand-blue hover:to-brand-teal hover:text-white border border-slate-200 hover:border-transparent text-slate-700 rounded-lg font-extrabold font-sans transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                            >
                              <span>تفاصيل واستشارات الحملة</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>
              </section>
            )}

            {activeSection === "section-magazine" && (
              <MagazineSection />
            )}

            {activeSection === "section-bmi" && (
              <BMICalculatorSection />
            )}

            {activeSection === "section-achievements" && (
              <section
                id="section-achievements"
                className="py-20 bg-gradient-to-b from-[#e8f6f0] via-white to-[#f0f9f5] border-y border-emerald-100/30 scroll-mt-20 min-h-[82vh] flex flex-col justify-center"
              >
                <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-12 animate-fadeIn">
                  {/* Header */}
                  <div className="text-center max-w-3xl mx-auto space-y-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#1CAADA]">
                      حصاد العطاء والتميز الأكاديمي والمجتمعي
                    </span>
                    <h2 className="font-sans font-black text-2xl md:text-4xl text-brand-academic">
                      مسيرة إنجازات نادي صحة المجتمع
                    </h2>
                    <div className="h-1.5 w-16 bg-brand-teal rounded-full mx-auto" />
                    <p className="text-xs md:text-sm text-slate-550 pt-2">
                      بخطوات هادفة ومؤشرات قياس مدروسة، نفخر بمسيرة حافلة بالعطاء والتأثير الإيجابي لتعزيز الوعي الصحي ونشر المعرفة والأنشطة الوقائية الموثوقة لجميع أفراد المجتمع والمنظومة الأكاديمية بجامعة الملك سعود.
                    </p>
                  </div>

                  {/* Achievement Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-right">
                    {/* Achievement 1 */}
                    <div
                      id="achievement-card-1"
                      className="bg-[#f8fafc]/50 hover:bg-white p-6 rounded-2xl border border-slate-200/60 hover:border-brand-teal/40 transition-all duration-300 hover:shadow-lg shadow-sm space-y-4 group"
                    >
                      <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-600 group-hover:scale-105 transition-transform">
                        <Trophy className="w-6 h-6" />
                      </div>
                      <h3 className="font-sans font-black text-lg text-brand-academic">
                        أفضل نادٍ طلابي لعام 2026
                      </h3>
                      <p className="text-xs md:text-sm text-slate-550 font-sans leading-relaxed font-medium">
                        حصل نادي صحة المجتمع على المركز الأول وجائزة أفضل نادٍ طلابي على مستوى جامعة الملك سعود لعام 2026م في دورتها السنوية، تحقيقاً لإنجاز استثنائي في أول عام دراسي بعد دمج وتأسيس النادي.
                      </p>
                    </div>

                    {/* Achievement 2 */}
                    <div
                      id="achievement-card-2"
                      className="bg-[#f8fafc]/50 hover:bg-white p-6 rounded-2xl border border-slate-200/60 hover:border-brand-teal/40 transition-all duration-300 hover:shadow-lg shadow-sm space-y-4 group"
                    >
                      <div className="w-12 h-12 bg-[#56A8A7]/10 rounded-xl flex items-center justify-center text-[#56A8A7] group-hover:scale-105 transition-transform">
                        <BookOpen className="w-6 h-6" />
                      </div>
                      <h3 className="font-sans font-black text-lg text-brand-academic">
                        توزيع المطويات التوعوية
                      </h3>
                      <p className="text-xs md:text-sm text-slate-550 font-sans leading-relaxed font-medium">
                        توزيع وتعميم المطويات والمنشورات التثقيفية والوقائية التي تعدها اللجان المختصة بالنادي للزوار من مختلف فئات المجتمع بهدف رفع التوعية الصحية العامة ونشر ثقافة سلوكية وغذائية وقائية سليمة دون الحاجة لإحصاء شكلي للكمية.
                      </p>
                    </div>

                    {/* Achievement 3 */}
                    <div
                      id="achievement-card-3"
                      className="bg-[#f8fafc]/50 hover:bg-white p-6 rounded-2xl border border-slate-200/60 hover:border-brand-teal/40 transition-all duration-300 hover:shadow-lg shadow-sm space-y-4 group"
                    >
                      <div className="w-12 h-12 bg-[#56A8A7]/10 rounded-xl flex items-center justify-center text-[#56A8A7] group-hover:scale-105 transition-transform">
                        <Users className="w-6 h-6" />
                      </div>
                      <h3 className="font-sans font-black text-lg text-brand-academic">
                        تأهيل الكوادر والقيادات الطلابية
                      </h3>
                      <p className="text-xs md:text-sm text-slate-550 font-sans leading-relaxed font-medium">
                        توفير بيئة تدريبية وعملية تفاعلية للطلاب والطالبات لصقل مهارات الإلقاء وتخطيط الأنشطة الصحية والعمل كفريق متماسك وتأهيلهم التام لشغل مناصب قيادية وميدانية مميزة في مستقبلهم الصحي الإكلينيكي.
                      </p>
                    </div>

                    {/* Achievement 4 */}
                    <div
                      id="achievement-card-4"
                      className="bg-[#f8fafc]/50 hover:bg-white p-6 rounded-2xl border border-slate-200/60 hover:border-brand-teal/40 transition-all duration-300 hover:shadow-lg shadow-sm space-y-4 group"
                    >
                      <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-600 group-hover:scale-105 transition-transform">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <h3 className="font-sans font-black text-lg text-brand-academic">
                        الفعاليات الجماهيرية والشراكات
                      </h3>
                      <p className="text-xs md:text-sm text-slate-550 font-sans leading-relaxed font-medium">
                        بناء وصياغة شراكات عمل وتكامل استراتيجي مع جهات حكومية وخاصة متخصصة لإطلاق مبادرات ممتدة لخدمة المجتمع وتسهيل حضور الكادر الطلابي الصحي بشكل لائق بالهوية الجامعية العريقة.
                      </p>
                    </div>

                    {/* Achievement 5 */}
                    <div
                      id="achievement-card-5"
                      className="bg-[#f8fafc]/50 hover:bg-white p-6 rounded-2xl border border-slate-200/60 hover:border-brand-teal/40 transition-all duration-300 hover:shadow-lg shadow-sm space-y-4 group"
                    >
                      <div className="w-12 h-12 bg-[#56A8A7]/10 rounded-xl flex items-center justify-center text-[#56A8A7] group-hover:scale-105 transition-transform">
                        <TrendingUp className="w-6 h-6" />
                      </div>
                      <h3 className="font-sans font-black text-lg text-brand-academic">
                        تجاوز 1,000 ساعة تطوعية معتمدة
                      </h3>
                      <p className="text-xs md:text-sm text-slate-500 font-sans leading-relaxed font-medium">
                        تسجيل وتوثيق مئات الفرص والأنشطة لعمل الطلبة الميداني بمجموع تخطى 1,000 ساعة تطوعية معتمدة عبر المنصة الوطنية للتطوع، لصقل وتطوير مهارات الطلاب الإكلينيكية والميدانية وتأهيلهم لسوق العمل.
                      </p>
                    </div>

                    {/* Achievement 6 */}
                    <div
                      id="achievement-card-6"
                      className="bg-[#f8fafc]/50 hover:bg-white p-6 rounded-2xl border border-slate-200/60 hover:border-brand-teal/40 transition-all duration-300 hover:shadow-lg shadow-sm space-y-4 group"
                    >
                      <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-600 group-hover:scale-105 transition-transform">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <h3 className="font-sans font-black text-lg text-brand-academic">
                        تنظيم فعاليات بمواقع جماهيرية كبرى
                      </h3>
                      <p className="text-xs md:text-sm text-slate-550 font-sans leading-relaxed font-medium">
                        التواجد الميداني الفعّال وتنظيم حملات توعوية تفاعلية بمواصفات إبداعية في وجهات ومواقع كبرى متميزة مثل حي السمحانية التاريخي، وواجهة روشن، وساحة القيصرية؛ لرفع الوعي الصحي الغذائي والوقائي لأعلى شريحة مجتمعية.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeSection === "section-leadership" && (
              <section
                id="section-leadership"
                className="py-20 bg-gradient-to-b from-[#e8f6f0] via-white to-[#f0f9f5] border-y border-emerald-100/30 scroll-mt-20 min-h-[82vh] flex flex-col justify-center"
              >
                <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-12">
                  
                  {/* Header */}
                  <div className="text-center max-w-2xl mx-auto space-y-3">
                    <h2 className="font-sans font-black text-2xl md:text-4xl text-brand-academic">
                      {t.leadershipTitle}
                    </h2>
                    <p className="text-xs md:text-sm text-slate-550 font-medium leading-relaxed">
                      {t.leadershipSub}
                    </p>
                  </div>

                  {/* Interactive Organizational Structure Tree and Committees */}
                  <OrgStructure />

                </div>
              </section>
            )}

            {activeSection === "section-join" && (
              <section
                id="section-join"
                className="py-20 bg-gradient-to-b from-[#e8f6f0] via-white to-[#f0f9f5] border-t border-emerald-100/30 scroll-mt-25 min-h-[82vh] flex flex-col justify-center"
              >
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                  <div className="max-w-3xl mx-auto space-y-10">
                    {/* Heading instructions */}
                    <div className="space-y-3 text-center">
                      <h2 className="font-sans font-black text-2xl md:text-4xl text-brand-academic">
                        {t.joinTitle}
                      </h2>
                      <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed">
                        {t.joinSub}
                      </p>
                    </div>

                    {/* Validation form */}
                    <JoinForm lang="ar" />
                  </div>
                </div>
              </section>
            )}

            {activeSection === "section-login" && (
              <AdminPortalBox />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* COMPACT FOOTER FOOTAGE */}
      <footer
        id="site-footer"
        className="bg-gradient-to-b from-[#0f172a] via-[#111827] to-[#0b0f19] text-slate-300 py-16 text-sm font-sans border-t border-white/5 relative overflow-hidden"
      >
        {/* Aesthetic Ambient Spotlights */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-brand-teal/5 rounded-full blur-[100px] pointer-events-none select-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none select-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div
            className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/5 items-start text-right"
          >
            {/* Branding Column */}
            <div className="md:col-span-5 space-y-5">
              <Logo showText lang="ar" size={48} light />
              <p className="text-xs md:text-[13px] leading-relaxed text-slate-400 font-sans">
                البوابة التعريفية والتفاعلية الرسمية لنادي صحة المجتمع بكلية العلوم الطبية التطبيقية في جامعة الملك سعود. منبرٌ طموح يقوده شغف الكوادر الطلابية الواعدة لترسيخ الوعي وتأصيل الثقافة الصحية العامة وبناء مجتمعٍ حيوي يسوده السلوك الوقائي السليم والمستدام.
              </p>
            </div>

            {/* Quick sections anchors */}
            <div className="md:col-span-3 space-y-4">
              <h3 className="font-sans font-extrabold text-white tracking-wide text-xs md:text-[14px] flex items-center gap-2 justify-end">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-teal" />
                <span>روابط سريعة</span>
              </h3>
              <ul className="space-y-3 text-slate-400 text-xs md:text-[13px]">
                <li>
                  <button
                    onClick={() => scrollToSection("section-home")}
                    className="hover:text-brand-teal transition-all duration-300 flex items-center gap-2 group text-right w-full cursor-pointer"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-brand-teal transition-colors shrink-0" />
                    <span className="group-hover:translate-x-[-4px] transition-transform">
                      الرئيسية
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("section-about")}
                    className="hover:text-brand-teal transition-all duration-300 flex items-center gap-2 group text-right w-full cursor-pointer"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-brand-teal transition-colors shrink-0" />
                    <span className="group-hover:translate-x-[-4px] transition-transform">
                      من نحن
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("section-leadership")}
                    className="hover:text-brand-teal transition-all duration-300 flex items-center gap-2 group text-right w-full cursor-pointer"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-brand-teal transition-colors shrink-0" />
                    <span className="group-hover:translate-x-[-4px] transition-transform">
                      الهيكلة
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("section-majors")}
                    className="hover:text-brand-teal transition-all duration-300 flex items-center gap-2 group text-right w-full cursor-pointer"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-brand-teal transition-colors shrink-0" />
                    <span className="group-hover:translate-x-[-4px] transition-transform">
                      التخصصات
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("section-events")}
                    className="hover:text-brand-teal transition-all duration-300 flex items-center gap-2 group text-right w-full cursor-pointer"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-brand-teal transition-colors shrink-0" />
                    <span className="group-hover:translate-x-[-4px] transition-transform">
                      الفعاليات
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("section-achievements")}
                    className="hover:text-brand-teal transition-all duration-300 flex items-center gap-2 group text-right w-full cursor-pointer"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-brand-teal transition-colors shrink-0" />
                    <span className="group-hover:translate-x-[-4px] transition-transform">
                      الإنجازات
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("section-magazine")}
                    className="hover:text-brand-teal transition-all duration-300 flex items-center gap-2 group text-right w-full cursor-pointer"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-brand-teal transition-colors shrink-0" />
                    <span className="group-hover:translate-x-[-4px] transition-transform">
                      المجلة
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("section-bmi")}
                    className="hover:text-brand-teal transition-all duration-300 flex items-center gap-2 group text-right w-full cursor-pointer"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-brand-teal transition-colors shrink-0" />
                    <span className="group-hover:translate-x-[-4px] transition-transform">
                      BMI (حاسبة الكتلة)
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("section-join")}
                    className="text-brand-teal font-extrabold hover:text-white transition-all duration-300 flex items-center gap-2 group text-right w-full cursor-pointer"
                  >
                    <span className="w-1 h-1 rounded-full bg-brand-teal shrink-0" />
                    <span className="group-hover:translate-x-[-4px] transition-transform decoration-brand-teal">
                      انضم إلينا
                    </span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Quick Contact & Social Media Icons */}
            <div className="md:col-span-4 space-y-4">
              <h3 className="font-sans font-extrabold text-white tracking-wide text-xs md:text-[14px] flex items-center gap-2 justify-end">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                <span>قنوات التواصل الرسمية</span>
              </h3>
              
              {/* Sleek, eye-catching social icons row */}
              <div className="flex gap-3 justify-end items-center flex-row">
                {/* Twitter / X */}
                <a
                  id="club-x-link"
                  href="https://x.com/chc_ksu"
                  target="_blank"
                  rel="noreferrer"
                  title="تابعنا على منصة إكس"
                  className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:bg-white/10 hover:border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.0)] hover:shadow-[0_4px_20px_rgba(255,255,255,0.15)] group"
                >
                  <XIcon className="w-4 h-4 transition-transform group-hover:rotate-6" />
                </a>

                {/* Instagram */}
                <a
                  id="club-instagram-link"
                  href="https://instagram.com/chc_ksu"
                  target="_blank"
                  rel="noreferrer"
                  title="تابعنا على انستقرام"
                  className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:bg-pink-500/10 hover:border-pink-500/30 shadow-[0_0_15px_rgba(236,72,153,0.0)] hover:shadow-[0_4px_20px_rgba(236,72,153,0.15)] group"
                >
                  <Instagram className="w-4.5 h-4.5 transition-transform group-hover:rotate-6" />
                </a>

                {/* TikTok */}
                <a
                  id="club-tiktok-link"
                  href="https://www.tiktok.com/@chc_ksu"
                  target="_blank"
                  rel="noreferrer"
                  title="تابعنا على تيك توك"
                  className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:bg-black/40 hover:bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] hover:from-cyan-500/10 hover:to-rose-500/10 hover:border-cyan-400/30 shadow-[0_0_15px_rgba(6,206,193,0.0)] hover:shadow-[0_4px_20px_rgba(6,206,193,0.15)] group"
                >
                  <TikTokIcon className="w-4.5 h-4.5 transition-transform group-hover:scale-110" />
                </a>

                {/* LinkedIn */}
                <a
                  id="club-linkedin-link"
                  href="https://www.linkedin.com/company/chc-ksu/"
                  target="_blank"
                  rel="noreferrer"
                  title="تابعنا على لينكد إن"
                  className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:bg-blue-500/10 hover:border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.0)] hover:shadow-[0_4px_20px_rgba(59,130,246,0.15)] group"
                >
                  <Linkedin className="w-4.5 h-4.5 transition-transform group-hover:rotate-6" />
                </a>

                {/* Email */}
                <a
                  id="club-email-link"
                  href="mailto:chccamsclub@gmail.com"
                  title="راسلنا عبر البريد الإلكتروني"
                  className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:bg-emerald-500/10 hover:border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.0)] hover:shadow-[0_4px_20px_rgba(16,185,129,0.15)] group"
                >
                  <Mail className="w-4.5 h-4.5 transition-transform group-hover:rotate-6" />
                </a>
              </div>

              {/* Precise college & team address card */}
              <div className="pt-2">
                <a
                  href="https://maps.google.com/?q=كلية+العلوم+الطبية+التطبيقية+جامعة+الملك+سعود+الرياض"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 text-right transition-all duration-300 hover:bg-white/[0.05] hover:border-brand-teal/30 hover:scale-[1.02] group cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 justify-end text-slate-400 text-xs font-sans font-medium">
                    <span className="text-[11px] leading-tight text-slate-300 group-hover:text-brand-teal transition-colors">الرياض، جامعة الملك سعود، كلية العلوم الطبية التطبيقية</span>
                    <MapPin className="w-3.5 h-3.5 text-brand-teal shrink-0 group-hover:scale-110 transition-transform" />
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Club signature section */}
          <div
            className="pt-8 flex flex-col md:flex-row-reverse justify-between items-center gap-4 text-center text-[11px] text-slate-500 font-sans font-normal border-t border-white/5"
          >
            <p className="text-slate-500 hover:text-slate-400 transition-colors selection:bg-brand-teal/30">
              © ٢٠٢٦ نادي صحة المجتمع. جميع الحقوق محفوظة.
            </p>
            <div className="flex items-center gap-3 justify-center md:justify-end text-slate-500 shrink-0">
              <span className="hover:text-slate-400 transition-colors">جامعة الملك سعود</span>
              <span className="text-slate-600">|</span>
              <button
                id="footer-login-btn"
                onClick={() => scrollToSection("section-login")}
                className="hover:text-brand-teal transition-colors focus:outline-none cursor-pointer flex items-center gap-1 text-[11px]"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                <span>بوابة الدخول</span>
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* ADMIN PANEL OVERLAY */}
      {showAdmin && (
        <AdminPanel onClose={() => setShowAdmin(false)} />
      )}

      {/* CAMPAIGN LIGHTBOX POPUP DETAILS OVERLAY */}
      {selectedEvent && (
        <div
          id="event-detail-overlay-tint"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            id="event-detail-popup"
            className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden relative p-6 md:p-8 space-y-6 text-right"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header controls */}
            <div
              className="flex justify-between items-center border-b border-slate-100 pb-4 flex-row-reverse"
            >
              <div>
                <span className="text-[10px] font-bold text-brand-teal uppercase bg-brand-teal/10 px-2 py-0.5 rounded">
                  {selectedEvent.category.ar}
                </span>
                <h3 className="font-sans font-black text-lg md:text-xl text-brand-academic mt-1.5 leading-snug">
                  {selectedEvent.title.ar}
                </h3>
              </div>
              <button
                id="close-event-details-cross"
                onClick={() => setSelectedEvent(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Narrative description */}
            <p className="text-xs md:text-sm text-slate-600 font-sans leading-relaxed">
              {selectedEvent.description.ar}
            </p>

            {/* Campaign checklist / outcomes details body */}
            <div className="space-y-3">
              <h4 className="font-sans font-bold text-xs md:text-sm text-slate-700">
                محاور عمل الحملة والخطط الطلابية:
              </h4>
              <ul className="space-y-2 font-sans text-[11px] md:text-xs text-slate-500">
                {selectedEvent.details.ar.map((det, idx) => (
                  <li
                    key={idx}
                    className="flex gap-2.5 items-start leading-relaxed flex-row-reverse"
                  >
                    <span className="w-4 h-4 rounded-full bg-slate-100 border border-slate-200 text-slate-600 flex items-center justify-center shrink-0 font-bold font-sans text-[9px] mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{det}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Location coordinates */}
            <div className="bg-slate-50 p-4 rounded-xl space-y-2 text-[11px] text-slate-500">
              <div
                className="flex gap-2.5 items-center flex-row-reverse text-right"
              >
                <Calendar className="w-4 h-4 text-brand-teal" />
                <span>{selectedEvent.date.ar}</span>
              </div>
              <div
                className="flex gap-2.5 items-center flex-row-reverse text-right"
              >
                <MapPin className="w-4 h-4 text-brand-blue" />
                <span>{selectedEvent.location.ar}</span>
              </div>
            </div>

            {/* Close button modal trigger */}
            <button
              id="close-event-details-btn"
              onClick={() => setSelectedEvent(null)}
              className="w-full py-3 bg-brand-academic hover:bg-brand-academic/90 text-white rounded-xl font-bold font-sans transition-colors cursor-pointer text-center text-sm"
            >
              {t.close}
            </button>
          </div>
        </div>
      )}

      {/* BACKGROUND SLIDESHOW CUSTOMIZATION MODAL */}
      {isUploaderOpen && (
        <div
          id="slideshow-uploader-overlay"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setIsUploaderOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden relative p-6 md:p-8 space-y-6 text-right flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b border-slate-100 pb-4 flex-row-reverse shrink-0">
              <div className="flex items-center gap-2 flex-row-reverse text-right">
                <Settings className="w-5 h-5 text-brand-teal animate-spin-slow" />
                <h3 className="font-sans font-black text-lg md:text-xl text-brand-academic">
                  إعدادات ومعرض خلفية النادي 📸
                </h3>
              </div>
              <button
                onClick={() => setIsUploaderOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors shrink-0 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Description note */}
            <p className="text-xs text-slate-500 font-sans leading-relaxed shrink-0">
              قم بتخصيص الشرائح المعروضة في خلفية الصفحة الرئيسية. يمكنك رفع الصور الثلاث التي قمت بالتقاطها أو أي صور تذكارية للنادي من منصة إكس <span className="text-brand-blue font-bold">@chc_ksu</span> لتظهر فوراً في دورة العرض التلقائي!
            </p>

            {/* Drag and Drop zone */}
            <div className="border-2 border-dashed border-slate-200 hover:border-brand-teal/50 rounded-2xl p-6 transition-all text-center group cursor-pointer relative bg-slate-50/50 shrink-0">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Upload className="w-8 h-8 text-slate-400 group-hover:text-brand-teal mx-auto mb-2 transition-colors" />
              <p className="text-xs font-sans font-extrabold text-slate-700">اضغط أو اسحب صور النادي الجديدة للرفع 💾</p>
              <p className="text-[10px] text-slate-450 font-sans mt-0.5">يدعم صيغ JPG، PNG، WEBP وتتحول لروابط وتخزين آمن محلياً</p>
            </div>

            {/* Scrollable list of existing slides */}
            <div className="overflow-y-auto space-y-3 pr-1 flex-grow divide-y divide-slate-100">
              <h4 className="font-sans font-black text-xs text-slate-700 pb-2 flex-row-reverse text-right">
                الشرائح الحالية ({slides.length}):
              </h4>
              {slides.map((slide, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 pt-3 pb-1 first:pt-0 items-center flex-row-reverse text-right"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0 border border-slate-200">
                    <img src={slide.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>

                  {/* Caption edit & delete controls */}
                  <div className="flex-grow space-y-1">
                    <input
                      type="text"
                      value={slide.caption}
                      onChange={(e) => handleUpdateCaption(idx, e.target.value)}
                      placeholder="أدخل عنواناً مخصصاً لهذه الصورة..."
                      className="w-full text-xs font-sans font-bold text-slate-705 bg-white border border-slate-200 focus:border-brand-teal/50 rounded-lg px-2.5 py-1.5 focus:outline-none"
                    />
                    <div className="flex justify-between items-center text-[10px] text-slate-400 flex-row-reverse select-none">
                      <span>الشريحة #{idx + 1}</span>
                      {slides.length > 1 && (
                        <button
                          onClick={() => handleDeleteSlide(idx)}
                          className="text-red-500 hover:text-red-600 font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>حذف الصورة</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions Footer */}
            <div className="flex justify-between items-center pt-4 border-t border-slate-100 shrink-0 flex-row-reverse">
              <button
                onClick={() => setIsUploaderOpen(false)}
                className="px-5 py-2.5 bg-brand-academic hover:bg-brand-academic/95 text-white rounded-xl font-sans text-xs font-black transition-all cursor-pointer shadow-md shadow-brand-academic/10"
              >
                موافق وحفظ وعرض الخلفية ✨
              </button>
              <button
                onClick={handleResetToDefault}
                className="px-4 py-2 border border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-xl font-sans text-xs font-bold transition-all cursor-pointer"
              >
                إعادة تعيين للأصل 🔄
              </button>
            </div>
          </div>
        </div>
      )}



    </div>
  );
}
