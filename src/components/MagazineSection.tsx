import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BookOpen,
  FileText,
  ExternalLink,
  Eye,
  Download,
  Search,
  Award,
  Users,
  CheckCircle,
  Heart,
  Sparkles,
  Clock,
  ArrowRight,
  Bookmark,
  Calendar,
  MessageSquare,
  HelpCircle,
  ChevronLeft
} from "lucide-react";

// Custom X (formerly Twitter) icon component
const XIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    aria-hidden="true" 
    className={className} 
    fill="currentColor"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

interface Article {
  title: string;
  author: string;
  category: string;
  readTime: string;
  summary: string;
  content: string;
  majorLink?: string;
}

interface Issue {
  number: number;
  title: string;
  date: string;
  theme: string;
  color: string;
  description: string;
  articles: Article[];
  featuredQuote: {
    text: string;
    author: string;
  };
  directLink?: string;
}

const magazineIssues: Issue[] = [
  {
    number: 14,
    title: "التثقيف الدوائي وسلامة المجتمع",
    date: "يونيو 2026",
    theme: "الدليل الإرشادي الشامل للحد من التداخلات الدوائية ودور الوعي التوعوي بسلامة الأسرة",
    color: "from-teal-850 to-indigo-900",
    description: "الإصدار الأحدث يستقصي مخاطر التعارضات العلاجية ومبادئ الاستخدام الرشيد للأدوية والمضادات، مع إجابات واستشارات تثقيفية شاملة لسلامة الفرد والمجتمع.",
    directLink: "https://drive.google.com/file/d/13seCaDhy82SLQ3mhXgdtTwlpgsVbySQi/view?usp=share_link",
    articles: [
      {
        title: "التثقيف الدوائي السليم: حماية مبرهنة من مخاطر التعارضات والتداخلات العلاجية",
        author: "إعداد شعبة التوعية والصيدلة بالكلية",
        category: "الوعي الدوائي وظائف البدن",
        readTime: "4 دقائق",
        summary: "الاستعمال المتوازن والرشيد لكافة المركبات الطبية وحماية الكلى والكبد من أخطار الجرعات العشوائية.",
        content: "يسلط هذا المقال الضوء على أهمية استشارة الطبيب والصيدلاني لضبط جدول تناول الأدوية وتلافي الأغذية التي تحد من امتصاص المادة الفعالة، تحقيقاً للغايات العلاجية القصوى بأمان واستقرار تام."
      }
    ],
    featuredQuote: {
      text: "الوعي باستخدام الدواء والالتزام بالوصفة الطبية الآمنة يمثلان خط الدفاع الأول لحفظ مرونة وكفاءة البدن.",
      author: "إشراف اللجنة العلمية لنادي صحة المجتمع"
    }
  },
  {
    number: 13,
    title: "طيف التوحد - المكتسبات التنموية والسلوكية",
    date: "أبريل 2026",
    theme: "قصة الغلاف تستقصي اضطراب طيف التوحد وأنواعه ودليله الشامل للمكتسبات المعرفية والسلوكية",
    color: "from-indigo-900 to-indigo-700",
    description: "الإصدار الأحدث يتناول طيف التوحد من منظور علمي ونفسي واجمالي، ويوضح طرق الدعم والعلاج وتنمية مهارات النطق واللغة والتحكم السلوكي المناسب.",
    directLink: "https://drive.google.com/file/d/111XlObvr6Rvas_V1geOkMt4m5xSzry-V/view?usp=share_link",
    articles: [
      {
        title: "أبطال في الظل: حين تكون الأم هي السند والكيان المنيع للطفل",
        author: "إعداد: جود أحمد الردادي",
        category: "الصحة النفسية",
        readTime: "5 دقائق",
        summary: "خطوات عملية لتعزيز المرونة النفسية والحد من الاحتراق النفسي للأمهات وأهمية توازن العطاء وقبول الواقع.",
        content: "خلف كل طفل يواجه تحديات التوحد، هناك بطلة تعمل في صمت، تعطي بلا حدود، وتجعل من صبرها جسرًا ليعبر عليه طفلها نحو العالم. هي جندي مجهول يخوض معارك يومية لا يراها الناس، تبدأ من فهم لغة طفلها الخاصة، وتنتهي بمحاولة دمجه في مجتمع قد لا يستوعب اختلافه دائمًا. إن جودة حياة الفرد تتسع بوعي ودعم الأم وقدرتها وصحتها."
      },
      {
        title: "طيف من الألوان: فهم البصمة العصبية والتباين الشاسع للقدرات",
        author: "إعداد: هتون النفيسه",
        category: "تعليم سلوكي وإرشادي",
        readTime: "4 دقائق",
        summary: "يسلط المقال الضوء على تفاوت القدرات وتصنيفات طيف التوحد والتميز الدماغي والفردية التامة في مسارات العلاج والتدخل.",
        content: "عندما ننظر إلى قوس قزح، نرى ألوانًا متداخلة لكنها متميزة، فلا يمكن للون أن يلغي الآخر، بل تتكامل الألوان لتشكّل لوحة بديعة. هكذا هو اضطراب طيف التوحد، عالم واسع لا يشبه فيه طفل طفلاً آخر. إن تسميته بـ 'الطيف' يعكس التباين المعرفي والحسي للأفراد مما يوجب هندسة علاجية خاصة لكل مريض."
      },
      {
        title: "التشخيص الفارق والتدخل المبكر لتحسين عزم النطق واللغة",
        author: "أخصائية التخاطب. رغد القرشي وبمشاركة هدى الشلاش",
        category: "علاج النطق والتخاطب",
        readTime: "5 دقائق",
        summary: "التشخيص العلمي الفعال وخطط العلاج السلوكية المتكاملة والفرق السيكولوجي بين خجل الطفل وتوحه الحقيقي.",
        content: "يؤكد خبراء البصريات والكلام أن الكشف المبكر والتدريب البدني والتنفيذي يسهم في تسهيل تأهيل دمج الأطفال. تستعرض المقابلة خطوات الملاحظة السلوكية الدقيقة، وصياغة الحقائب الداعمة في غرف التعليم وصنع القرار لتنشئة جيل مستقر ومنفتح علمياً ولغوياً."
      }
    ],
    featuredQuote: {
      text: "أنتِ لستِ مجرد مقدمة رعاية، أنتِ القلب النابض والقدوة الأولى لطفلك في مرونته وقوته وصموده.",
      author: "جود أحمد الردادي - أبطال في الظل"
    }
  },
  {
    number: 12,
    title: "الماء حياة... وللكلى نجاة",
    date: "مارس 2026",
    theme: "الدليل الشامل للوظائف الكلوية وعلم السوائل والتغذية السريرية المصاحبة للحفاظ على البدن",
    color: "from-sky-800 to-sky-600",
    description: "يستقصي هذا العدد البنية المتكاملة للكليتين، عوامل الخطر المباشرة، وكيفية حماية خلايا البدن بتوازن السوائل الحيوية والأدوية الآمنة.",
    directLink: "https://drive.google.com/file/d/10zP8H2sWCyFSLSV4B1v-NOmOQ5rpmRxQ/view?usp=share_link",
    articles: [
      {
        title: "وظائف الكلى في جسم الإنسان ودورها في موازنة الحموضة ومستويات ضغط الدم الشرياني",
        author: "شعبة الأبحاث برعاية الكلية",
        category: "صحة الكلى",
        readTime: "4 دقائق",
        summary: "البنية التشريحية بالتفصيل، تنقية الدم من السموم والفضلات، وإفراز الهرمونات المنشطة للعظام وكريات الدم الحمراء.",
        content: "الكليتان عضوان في جسم الإنسان ينتميان إلى الجهاز البولي، تقومان بتنقية الدم من الفضلات والمياه الزائدة لتكوين البول، وتحافظان على توازن الماء والأملاح والمعادن في الدم، وإنتاج هرمونات لتنظيم ضغط الدم والمساهمة في إنتاج كتل الدم الحمراء ودعم العظام. يقعان في تجويف البطن الخلفي بمحاذاة العمود الفقري."
      },
      {
        title: "الإرشادات التغذوية السريرية المتقدمة لمرضى الغسيل الكلوي (الديلزة)",
        author: "أخصائية التغذية. مرام عصام شيخ",
        category: "التغذية العلاجية",
        readTime: "5 دقائق",
        summary: "تنظيم كمية البروتين والمكونات الغنية بالبوتاسيوم والفوسفور وعلامات التورم والتحكم بالوزن المائي والمكملات المستقرة.",
        content: "يواجه مرضى غسيل الكلى تحديات صحية تجعل اختيار الطعام والحفاظ على نظام غذائي متوازن أمراً رئيسياً لرفع كفاءة التصفية وتقليص المضاعفات. تركز المقالة على حساب جرعات السوائل اليومية ونسب البوتاسيوم في الموز والأفوكادو وصرف بدائل منخفضة الفوسفور وبناء حميات مخصصة لكل مريض."
      },
      {
        title: "الاستخدام الآمن للأدوية لتفادي أخطار الفشل الكلوي الحاد والمزمن",
        author: "إعداد: لولوه المانع وبمشاركة فريق التوعية الصيدلانية",
        category: "التوعية الدوائية والصيدلانية",
        readTime: "4 دقائق",
        summary: "مخاطر تناول الأدوية خارج الرعاية الطبية وأثرها السلبي المباشر على الأنسجة وأداء التصفية الكلوية.",
        content: "الاستخدام غير المسئول للمسكنات ومضادات الالتهاب غير الستيروئيدية وغيرها من المركبات الطبية دون إرشادات الطبيب أو الصيدلاني، يسهم في تراجع معدل التصفية وزيادة مخاطر الفشل الكلوي الحاد. يوصي البحث بالمتابعة الطبية لضبط مرونة الجسد واستقراره."
      }
    ],
    featuredQuote: {
      text: "الماء شريان الحياة وصانع التوازن للكليتين، والتقنين بجرعات ومسكنات الألم يحمي صمود خلايا التصفية الحيوية.",
      author: "د. هتون السبيعي - مستشارة التثقيف السريري"
    }
  },
  {
    number: 11,
    title: "صحة المجتمع والوعي الوقائي",
    date: "ديسمبر 2025",
    theme: "أهداف نادي صحة المجتمع وطموحاته ونموذجه التوعوي الرائد في تعزيز رعاية وصحة البدن",
    color: "from-purple-800 to-indigo-950",
    description: "يستعرض هذا العدد مفاهيم الرعاية والوقاية وبناء الوعي الصحي السليم ضد الأمراض الحيوية والممارسات اليومية الإرشادية.",
    directLink: "https://drive.google.com/file/d/1mg4KXJLhNG9Jm10cE2T3NM7EPb_5-k4u/view?usp=share_link",
    articles: [
      {
        title: "الرؤية والرسالة لنادي صحة المجتمع بجامعة الملك سعود وأبعادها التوعوية",
        author: "إعداد فريق العلاقات والتثقيف",
        category: "التثقيف والريادة",
        readTime: "4 دقائق",
        summary: "تأطير عازم وأكاديمي لنشر السلوكيات الحميدة وحفظ البدن وبذل العطاء المعرفي والوعي الوقائي.",
        content: "نسعى جاهدين في نادي صحة المجتمع بكلية العلوم الطبية التطبيقية إلى إمداد المجتمع الجامعي والمحلي بأقوى الحقائق الطبية المدعمة بالأبحاث، لنكون الجسر الواصل بين صميم العلم بسلامة البدن والمستفيدين المباشرين لتقليص الأوبئة والارتقاء بجودة الحياة."
      }
    ],
    featuredQuote: {
      text: "التوعية هي الركيزة الأولى لبناء غدٍ معافى وصحي وخالٍ من الأخطار والاعتلالات.",
      author: "إدارة التثقيف بالنادي"
    }
  },
  {
    number: 10,
    title: "صحة الرجل والالتهاب الرئوي",
    date: "نوفمبر 2025",
    theme: "محددات صحة الرجل الحيوية ومواجهة الأمراض التنفسية الحادة والمزمنة وسبل الوقاية التحصينية",
    color: "from-neutral-700 to-neutral-900",
    description: "يستقصي هذا العدد مفهوم صحة الرجل ومتلازمات القلق وإجهاد العمل، مع دراسة وبائية كاملة لالتهابات الرئة وعزل الميكروبات.",
    directLink: "https://drive.google.com/file/d/18fkHIWMPU8RenhLMDotjGzP8vOYfth5n/view?usp=share_link",
    articles: [
      {
        title: "مفهوم صحة الرجل الشامل ومواجهة تصلب الشرايين والضغوط المهنية المزمنة",
        author: "د. وافي البلوي",
        category: "إرشاد ذكوري وقائي",
        readTime: "4 دقائق",
        summary: "تأثير العمل المجهد في تراجع اللياقة، وأهم ممارسات الرياضة والتحكم بالوزن وتأهيل عزم عضلة القلب.",
        content: "صحة الرجل تتكامل فيها السلامة الجسدية والنفسية، حيث تشير التقديرات إلى ارتفاع مخاطر تصلب الشرايين تدريجياً لقلة النشاط البدني وإرهاق ساعات العمل والضغوط اليومية. يعرض الكاتب نقاط الرعاية المستهدفة لضبط مؤشرات الطاقة وحفظ التوازن الحيوي وعزم الدورة الدموية."
      },
      {
        title: "الالتهاب الرئوي: الأسباب والأنواع وعزل الميكروبات الموسمية",
        author: "دكتورة صغرى علوي",
        category: "العناية التنفسية",
        readTime: "5 دقائق",
        summary: "الفرق الفارق بين الغزو البكتيري والفيروسي للرئتين ومضاعفات السكتة الرئوية وخطوات التحصين.",
        content: "الالتهاب الرئوي هو عدوى حادة تصيب الحويصلات الهوائية في إحدى الرئتين أو كلتيهما، مما يؤدي إلى امتلائها بالسوائل أو القيح. يهدف هذا البحث لدراسة السلوك الوبائي لعزل الميكروبات وتحديد الفروق الفنية بين الأنماط البكتيرية الطارئة والفيروسية الشائعة لضمان دقة العلاج الدوائي للحد من السكتات والاعتلالات التنفسية."
      }
    ],
    featuredQuote: {
      text: "الوقاية من الأمراض الصدرية تبدأ من الوعي بسبل انتقال العدوى والمبادرة بالتحصين لحفظ أفراد المجتمع وأسرهم.",
      author: "دكتورة صغرى علوي - استشارية علم الميكروبات"
    }
  },
  {
    number: 9,
    title: "الإنفلونزا والوقاية",
    date: "أكتوبر 2025",
    theme: "التثقيف ضد نزلات البرد وعزل الفيروسات وبناء آليات المناعة",
    color: "from-teal-700 to-sky-900",
    description: "دليل غني وتفاعلي للفرق والتشخيص السريع لنزلات البرد والإنفلونزا، بمشاركة أكاديمية متميزة لعزل الفيروسات وبناء آليات المناعة والتغذية.",
    directLink: "https://drive.google.com/file/d/1sbfcNj12bdy9a7zK21StBtnXe_P8fJpx/view?usp=share_link",
    articles: [
      {
        title: "الفرق بين الإنفلونزا ونزلات البرد من حيث السبب والأعراض وعزم الانتقال والتنظيف",
        author: "بقلم: خالد سعود العتيبي",
        category: "الأمراض المعدية",
        readTime: "4 دقائق",
        summary: "قصاصة طبية ممتازة تكشف آليات الانتقال الرذاذي، فترة الحضانة، التحذير من المضادات، ومتى تجب زيارة الطبيب.",
        content: "الإنفلونزا عدوى فيروسية حادة تصيب الجهاز التنفسي وتتميز بظهور مفاجئ لارتفاع درجات الحرارة والآلام المفصلية، على عكس نزلات البرد (الزكام) التي تتدرج ببطء عبر سيلان الأنف والعطاس الخفيف. يوثق المقال أهمية فترات الحضانة ونقاط الوقاية ببيئات الدراسة والعمل."
      },
      {
        title: "اللقاح الموسمي للإنفلونزا وتحديثات السلالات ومأمونية الجرعة بالمدن الجامعية",
        author: "مقابلة مع د. محمد فوزي",
        category: "اللقاحات والتحصين",
        readTime: "5 دقائق",
        summary: "الدراسة المعملية والسريرية للقاحات السنوية الرباعية وأثره الفاعل في حماية الفئات الأكثر عرضة لتوقف الرئة.",
        content: "يوضح الدكتور محمد فوزي بكلية العلوم الطبية التطبيقية بجامعة الملك سعود أن لقاح الإنفلونزا السنوي يفرز استجابة مضادة تعزل الفيروسات المتوقعة، ويعد ركيزة لخفض فترات الطوارئ والاستشفاء. يستعرض المقال الفئات المستهدفة وحساب الجودة والاتفاقيات الدولية المصاحبة."
      },
      {
        title: "التغذية والمناعة أثناء الإصابة بالإنفلونزا: فيتامينات التمكين",
        author: "أخصائية التثقيف. مرام الشيخي",
        category: "التغذية والمناعة",
        readTime: "4 دقائق",
        summary: "دور فيتامين C، d، والزنك في دعم كريات الدم البيضاء وأثر السوائل والشوربات التلقائية لترطيب الصدر.",
        content: "إن الغذاء المتوازن يعتبر خط الدفاع الأول لدعم مقاومة الجسد للأمراض الفيروسية. يستقصي المقال بالبراهين العلمية كيف يسرع الزنك من التئام الخلايا وأثر السوائل والشوربات الدافئة في ترطيب الحلق والحد من الجفاف الصدري المصاحب للشفاء السريع."
      }
    ],
    featuredQuote: {
      text: "الوقاية باللقاح وغسل اليدين هما الدرع الأقوى لمجتمع مدرسي وجامعي خالٍ من العدوى الموسمية والاعتلال التنفسي.",
      author: "عمادة الكلية - تقديم العدد التاسع"
    }
  },
  {
    number: 8,
    title: "دليلك الصحي للدراسة",
    date: "سبتمبر 2025",
    theme: "الملف المتكامل للطلاب والتحصيل الدراسي والتركيز وتوفير وجبة إفطار صحية ومكافحة الجفاف المدرسي",
    color: "from-blue-700 to-blue-900",
    description: "مجلة نادي صحة المجتمع تضع بين يدي الطلاب دليلاً صحياً شاملاً يحمي عافيتهم ويزيد استيعابهم بوجبات إفطار هادئة وترطيب مائي متكامل وساعات نوم وعزم الحركة.",
    directLink: "https://drive.google.com/file/d/1AXjjDmDkZpZQQvy7ry36CSG4NatlLplO/view?usp=share_link",
    articles: [
      {
        title: "التغذية الصحية للطلاب: هندسة الإفطار التلقائي لفرز الطاقة والتركيز",
        author: "كتابة: لمى الحسين",
        category: "تغذية الطلاب",
        readTime: "4 دقائق",
        summary: "وجبات سريعة وصحية، دور الجلوكوز المستقر في تدرج الفهم، وتجاوز الحلويات المصنعة المسببة لخمول الفصول.",
        content: "التغذية الصحية هي الأساس الفعلي لتحصيل طلابي متميز، حيث يعد تأمين الفيتامينات والحبوب الكاملة وقوداً طبيعياً للدماغ. يستعرض المقال وجبات خفيفة وبدائل الشوفان والمكسرات والعسل لبناء وجبة إفطار مبرهنة تمد الطلاب بالطاقة بعيداً عن الحلويات والمحليات الضارة بالأداء المستقر."
      },
      {
        title: "الماء كوقود خفي للدماغ: دراسة الجفاف المدرسي وعادات شرب المياه",
        author: "كتابة: دانه معدي العمري",
        category: "علم السوائل ومدرسي",
        readTime: "4 دقائق",
        summary: "أعراض الجفاف من صداع وشتات التركيز، وتخطيط حقيبة الطالب الصحية اليومية للياقة ذهنية هادئة.",
        content: "الماء جوهر الحياة، ونقصه في البدن يؤدي فوراً إلى تراجع الوظائف الحيوية والذهنية لطلاب المدارس والجامعات. تفرز الكاتبة علامات الجفاف المبكر كالصداع والخمول والمفاهيم الكلوية المصاحبة لحساب لترات السوائل اليومية لضبط البدن وقائياً."
      },
      {
        title: "النوم والنشاط البدني: التوافق المنظم للتحصيل وإصلاح الذاكرة والدورة البيولوجية",
        author: "كتابة: روان عرار حدور",
        category: "إرشاد ونوم وسلوك",
        readTime: "5 دقائق",
        summary: "تأثير السهر في تشويش قراءة المعارف الرقمية، ونصائح التخلص من السموم والضوء الأزرق وموعد ممارسة الرياضة.",
        content: "النوم والنشاط عنصران متكاملان، حيث تشير الدراسات إلى أن تأخير ساعات النوم والسهر يؤثر بالحيود في قراءة وفهم المكتسبات المعرفية. يستعرض البحث نصائح التخلص من السموم الرقمية والضوء الأزرق للشاشات لتوفير بيئة نوم مريحة تستعيد كفاءة الذاكرة وخلايا العقل."
      }
    ],
    featuredQuote: {
      text: "طاقتك سر تفوقك الأكاديمي، فلا تهمل صحة لدنك والتزم بالعادات الوقائية السليمة في مسارك التعليمي والابتكاري.",
      author: "أ.د. نواف بن علي النويصر - رئيس مجلس النشر"
    }
  },
  {
    number: 7,
    title: "الرعاية التكاملية وجودة الحياة",
    date: "يونيو 2025",
    theme: "التثقيف والتأهيل الحركي والتغذوي كأعمدة أساسية لبناء لياقة جسدية عالية وحماية المفاصل",
    color: "from-sky-700 to-teal-950",
    description: "إصدار يستثير مهارات الحفاظ على كفاءة البدن من خلال النشاط الحركي والبدني السليم والتحذير من الخمول المزمن.",
    directLink: "https://drive.google.com/file/d/1HqKz9p3xf_RROBDUwIIC3ywLRqZR9AX8/view?usp=share_link",
    articles: [
      {
        title: "كفاءة العضلات والمفاصل وأهمية الحركة والتحميل البدني التدريجي",
        author: "إعداد أخصائيي العلاج الطبيعي والتأهيل",
        category: "الحياة الحركية والبدنية",
        readTime: "4 دقائق",
        summary: "تأثير الخمول على صحة العظام والأجهزة التنفسية وأثر الرياضة الفاعل في رفع نبض الخلايا ومستوى الحيوية.",
        content: "الحفاظ على حركية البدن يعتبر الركن الجوهري لصحة كبار السن والشباب معاً، حيث تسهم الأنشطة التمارينية في مرونة المفاصل وصمود الخلايا وتحفيز عزم التنفس."
      }
    ],
    featuredQuote: {
      text: "الوقاية والنشاط يصنعان درع الأمان لحماية مفاصل البدن.",
      author: "أخصائي التأهيل الحركي بجامعة الملك سعود"
    }
  },
  {
    number: 6,
    title: "صحة متزنة",
    date: "أبريل 2025",
    theme: "التوازن الشامل بين الجوانب الجسدية والنفسية والمهنية وتخطيط برامج التثقيف بالدراسات المعملية والسريرية",
    color: "from-teal-800 to-brand-blue",
    description: "إصدار يستقرئ أهم المعالم الصحية المعاصرة والنشاط البدني وأثر التطوع على الصحة النفسية، وبحوث معالجة القلق والإجهاد بالفحوصات.",
    directLink: "https://drive.google.com/file/d/1GGpXAckTdwA9ICqBHxW_71guRRGGHGz4/view?usp=share_link",
    articles: [
      {
        title: "الصحة الجسدية: مفتاح الجودة والتوازن الحيوي لمقاومة أمراض العصر",
        author: "بقلم: أخصائية الصفاء حكيم",
        category: "الصحة العامة",
        readTime: "5 دقائق",
        summary: "التناول السليم لمجموعات الأغذية، الرياضة، ساعات النوم، وغسل الأيدي والتحصين كدرع وقائي للأوبئة.",
        content: "الصحة الجسدية لا تقتصر عىل غياب الاعتلالات، بل تعكس التوافق المستقر لجميع أجهزة الجسد الحيوية. يستكشف المقال أثر الأنشطة الهوائية وتقوية العظام والعضلات، والتحول الكامل لعادات غسل اليدين وحفظ البيئات الحيوية السليمة من الأوبئة المعاصرة."
      },
      {
        title: "تأثير الضغوط النفسية عىل كفاءة البدن وعماؤه: أخطار الكورتيزول والاعتلال الهضمي",
        author: "إعداد: متعب المرشدي وهادي مدخلي",
        category: "صحة نفسية وسلوكية",
        readTime: "5 دقائق",
        summary: "تأثير القلق في إفراز الأدرينالين وإضعاف حواجز المعدة والبشرة ومتلازمات القولون وعيادات التأهيل.",
        content: "إن العقل والبدن وجهان لعملة صحية واحدة، والتوتر المزمن لا يقف عند شتات الذهن بل يضعف استجابة جهاز المناعة ويسرع اعتلالات البدن. يعرض الكاتبان أثر الدعم العائلي والتطوع الطبي في خفض نسب الاكتئاب ومرونة معالجة معضلات العصر."
      },
      {
        title: "منهجية PRECEDE-PROCEED وتخطيط البرامج التثقيفية بالجامعة والمدارس ورؤية 2030",
        author: "أ. نايف العيسى (أخصائي التخطيط والتطوير المعملي)",
        category: "علوم التثقيف والتعزيز",
        readTime: "5 دقائق",
        summary: "كيف ننتقل للتخطيط المستند عىل مسوح الفرز والاحتياجات، والأوبئة، وأسس قياس الأثر السلوكي.",
        content: "إنشاء البرامج الصحية الوقائية يتطلب تخطيطاً مبرهناً مبنياً عىل أحدث نماذج التقصي الوبائي والاجتماعي. يستعرض الباحث المتخصص منهجية نموذج PRECEDE-PROCEED في فرز السلوكيات المهيمنة، وربط الاحتياجات بالأهداف المستدامة لرؤية المملكة 2030."
      }
    ],
    featuredQuote: {
      text: "التثقيف الصحي هو الترجمان الحقيقي بين تعقيد العلوم وصحة المستفيد المباشرة لتأمين مجتمع واعد وصحي ومعافى.",
      author: "أمجد عبدالعزيز الغامدي - الهيئة التحضيرية"
    }
  },
  {
    number: 5,
    title: "ثقفني في رمضان",
    date: "مارس 2025",
    theme: "الدليل الشامل للتحكم بالجهاز الهضمي، الصداع، العطش، والتغذية السليمة المتوازنة لإرساء صيام مبرهن",
    color: "from-amber-700 to-amber-900",
    description: "إصدار يستعرض كيفية حماية البدن من الصداع والكسل الهضمي وعطش البدن في نهار الصيام بمشاركات غذائية وسريرية هادفة.",
    directLink: "https://drive.google.com/file/d/1xAeQCh3UrhA7VByXZh58fRJpZ45ndiPv/view?usp=share_link",
    articles: [
      {
        title: "اضطرابات الهضم الشائعة في رمضان: الأسباب والتوجيهات الطبية والوقائية",
        author: "بقلم: روان عبدالله الزهراني",
        category: "صحة الهضم",
        readTime: "4 دقائق",
        summary: "حرقة المعدة، عسر الهضم، والتخمة السريعة، وأفضل الأطعمة الداعمة للبكتيريا النافعة لراحة الأمعاء.",
        content: "تغيير روتين الغذاء وساعات الصيام قد يسبب للبعض اضطرابات هضمية ناتجة عىل الأكل السريع والدسم بالصلصات والمقليات. يعرض المقال أفضل المقترحات لدمج البكتيريا النافعة والزبادي، والاهتمام بالبدء المائي الهادئ لضمان حركة مستقرة للأمعاء."
      },
      {
        title: "الصداع الرمضاني وعادات انسحاب الكافيين والوقاية منه قبل الشهر الفضيل",
        author: "كتابة: ريوف منير العتيبي",
        category: "علوم عصبية وقائية",
        readTime: "4 دقائق",
        summary: "صداع مقدمة الرأس وتدرج وتأثير انسحاب الشاي والقهوة ونقاط تنظيم ساعات النوم والنشاط البدني.",
        content: "يعد الصداع الرمضاني من أكثر الشكاوى انتشاراً لدى الصائمين، وينتج في الغالب عىل انخفاض مستويات الكافيين بالدم ونقص الترطيب. يستقبل البحث عادات النوم وتناول وجبة السحور المتأخرة، وتجنب الإجهاد الذهني لضمان صيام آمن بلا آلام عصبية."
      },
      {
        title: "شرب الماء والترطيب المدروس في ليالي رمضان: فوائد السوائل والجرعات",
        author: "بقلم أخصائية التثقيف. غلا مغربي",
        category: "حفظ السوائل",
        readTime: "4 دقائق",
        summary: "جرعات السوائل وجدولة تناولها وتفادي الإفراط المسبب للتسمم المائي وإجهاد الكلى الكببي.",
        content: "يحتاج البدن الصائم لنسب ترطيب تقيه عزم الصيف والحرارة، لكن صب لترات عديدة في وقت قصير قد يجهد الكلى ويحدث حيوداً في صوديوم الدم. توضح الكاتبة كيفية جدولة جرعات المياه الموزعة عىل ساعات الإفطار، والاهتمام بوجبات السحور الغنية بالسوائل كالبطيخ والخيار."
      }
    ],
    featuredQuote: {
      text: "توزيع السوائل الكافية بانتظام وتنظيم مواعيد وجبات السحور هما صمام الحركة لنهار صيام طيب ومعافى.",
      author: "وجدان العتيبي وعلي الرميح - عيادات السكري"
    }
  },
  {
    number: 4,
    title: "التضامن والصحة العامة",
    date: "يناير 2025",
    theme: "التوعية الطبية ونشر المعرفة الصحية الوقائية بالمدارس والمقاصف لتحفيز الطلبة",
    color: "from-teal-850 to-emerald-950",
    description: "إصدار يستكشف رعاية أفراد البدن وزيادة الثقافة الصحية ودعم الأسر بالاستشارات الطبية واللقاحات الأساسية.",
    directLink: "https://drive.google.com/file/d/1qkSarqqcOPO7t-V-2pROFqtoi8UNIRyF/view?usp=share_link",
    articles: [
      {
        title: "أهمية اللقاحات الوقائية السنوية والالتزام بمواعيد الجرعات الدورية للأطفال والكبار",
        author: "إعداد رئيسية التوعية باللجنة",
        category: "الصحة العامة",
        readTime: "4 دقائق",
        summary: "قراءة في اللقاحات وأثر المناعة الذاتية في الحد من الأوبئة المعدية والتعاون الأسري الفعال.",
        content: "نسلط الضوء في هذا البحث على ريادة اللقاحات الوطنية ودورها في عزل السلالات المرضية وحماية البنية المجتمعية."
      }
    ],
    featuredQuote: {
      text: "الوقاية والالتزام بالجدول الوطني للقاحات هما الضامن لصحة أجيالنا.",
      author: "أخصائي الصحة العامة"
    }
  },
  {
    number: 3,
    title: "سكر الحياة وأنفاس الأمل",
    date: "نوفمبر 2024",
    theme: "الملف التفصيلي للسكري النوع الأول أثناء الحمل وتأثير النظام الأيضي وحملات سرطان الرئة الوبائي والأبحاث",
    color: "from-emerald-700 to-emerald-950",
    description: "إصدار النسخة الثالثة من مجلة التثقيف الصحي يستكشف السكري وتدرجه وسكري الحمل، مع كشف الارتباط بين تلوث الهواء وسرطان الرئة وأهمية التشخيص المبكر وجرعات الحليب وصحة العظام.",
    directLink: "https://drive.google.com/file/d/1eC-h5WlzRP0ntHbL2kTCVPHrp4LbJmuE/view?usp=share_link",
    articles: [
      {
        title: "السكري النوع الأول كاعتراض مناعي وتأثير السلوك والوعي العائلي بالتكيف والتعايش السريري",
        author: "بقلم أخصائية التثقيف. جمانة عسيري ومشاركة أصايل الثقفي",
        category: "الغدد والسكري",
        readTime: "5 دقائق",
        summary: "عزل المعتقدات الخاطئة والفرق الطبي الوراثي وتخطيط الحصص والنشاط لتأهيل الأطفال وجرعات الإنسولين.",
        content: "السكري النوع الأول ينشأ لهجوم مناعي ذاتي يدمر خلايا بيتا المصنعة للإنسولين بالبنكرياس، ويتطلب موازية دقيقة الكربوهيدرات والحصص الغذائية. يعقد المقال دراسة واضحة لخطط العلاج بضخات الإنسولين وأثر الدعم العائلي والنفسي الرائع لخدمة الأطفال."
      },
      {
        title: "سرطان الرئة وتلوث الهواء ومخاطر الجسيمات الدقيقة والدخان ومسببات الأورام لغير المدخنين",
        author: "بقلم: أمل العنزي وردينه بن عوشن",
        category: "علوم الأورام الرئوية",
        readTime: "5 دقائق",
        summary: "دراسة حالة الجسيمات الدقيقة وتدرج الطفرات الجينية وأهمية وريادة الفحص المبكر بالمدينة الطبية الجامعية.",
        content: "تغيرات المناخ وتلوث الغبار تفرز جسيمات دقيقة تسهم في إحداث تشنجات والتهابات رئوية مزمنة تحفز كتل الخلايا السرطانية. يستعرض هذا البحث عوامل الوراثة وأهمية التشخيص التصويري السريع بالأشعة للكشف الفوري قبل ظهور الأعراض القاسية."
      }
    ],
    featuredQuote: {
      text: "التشخيص الفارق والسريع بأبحاث الأورام هو حبل المزاوجة لإنقاذ الصدر والاستئصال التام للسرطان في مراحله المبكرة والصامتة.",
      author: "تهاني القحطاني - أخصائية أورام الصدر بالمدينة الجامعية"
    }
  },
  {
    number: 2,
    title: "وقاية وبصيرة",
    date: "أكتوبر 2024",
    theme: "حملات التوعية بسرطان الثدي، وهشاشة العظام السريرية والوقاية، واعتلالات الشبكية السكرية للإبصار والعيون",
    color: "from-rose-800 to-rose-950",
    description: "إصدار غني يلم بطفرات الجينات، وأورام الثدي وسجلات الصحة الإنجابية بجمعية زهرة، مع دراسة مبرهنة لهشاشة العظام وقياس دكسا وفسيولوجيا البصريات والماء الأبيض.",
    directLink: "https://drive.google.com/file/d/17bayv-SbVCW-cwctTTk8cIM-3E2h8I-K/view?usp=share_link",
    articles: [
      {
        title: "سرطان الثدي: الأسباب الجينية الحيوية وفاعلية الماموغرام والكشف المبكر السريع",
        author: "إعداد: نورة العضيبي ورنا سعود الحربي",
        category: "التوعية الطبية",
        readTime: "5 دقائق",
        summary: "طفرات BRCA1 و BRCA2، أخطار السمنة وصمامات الرعاية بجمعية زهرة وسبل الشفاء المتكاملة.",
        content: "سرطان الثدي يعد من الكتل الشائعة التي تتطلب توعوية دورية مستمرة، حيث يساهم الكشف المبكر عبر الأشعة الشعاعية بالمنشآت في تصفية الغدد وتحقيق نسب علاج مصلية أيائل ممتازة للحد من حيود ومضاعفات التراجع الأيضي."
      },
      {
        title: "هشاشة العظام وصنت التآكل العظمي وأثر المعايرة السلوكية وهرمون الإستروجين",
        author: "بقلم: رشا عرقسوس وحصة نائف السهلي",
        category: "صحة العظام السريرية",
        readTime: "5 دقائق",
        summary: "قياس دكسا المتطور لتفادي الكسور الحادة وتصميم جرعات الكالسيوم ومخاطر الهشاشة بعد انقطاع الطمث.",
        content: "قراءة معملية لآثار الهشاشة العظمية الصامتة وكيف تسهم الأنشطة والتحميل التدريجي وتلافي السقوط في وقاية كبار السن وحفظ مفاصل الحوض وفقرات الظهر من كسور الضغط والانضغاط."
      },
      {
        title: "اعتلال الشبكية السكري والبصريات: حماية خلايا الإبصار والماء الأبيض",
        author: "إعداد: مريم القوزي وريم الزهراني",
        category: "البصريات والعيون",
        readTime: "4 دقائق",
        summary: "أثر ارتفاع السكر الطويل في التسريب الوعائي الشبكي وعتامة عدسة العين، وخطط ونظارات الوقاية.",
        content: "تخطيط وعلاج اعتلال الشبكية يستلزم فحصاً دورياً لقاع العين ومتابعة السكر التراكمي لضمان حماية الشرايين الشبكية الدقيقة والحد من مضاعفات اعتلال الرؤية."
      },
      {
        title: "مرض آلزايمر وتدهور الذاكرة: الفهم الحيوي وتأثير بروتينات الأميلويد",
        author: "إعداد: رزان العتيبي",
        category: "علوم وأبحاث عصبية",
        readTime: "4 دقائق",
        summary: "تراكم بروتينات الأميلويد وتأثيرها عىل المخ، والتدريب السلوكي والتغذوي لحماية كبار السن وحيود الذاكرة.",
        content: "المرض المتدحرج يبدأ بتناقص تدريجي للذاكرة القصيرة وقد ينتهي بالتراجع الروحي الكامل، والسيطرة عليه تتطلب تضافراً عائلياً ممتازاً. يستطلع المقال مراحل تقدم المرض وأطروحات الأبحاث الحديثة بكلية العلوم الطبية التطبيقية في تأهيل كبار السن وحل معضلات النبض العصبي."
      }
    ],
    featuredQuote: {
      text: "التثقيف الصحي علم ريادي يربط الفهم الوبائي ونماذج الأبحاث بحياة المستفيد لتصميم وقاية مستدامة لكل بيت.",
      author: "مشاري بن عبدالمحسن المالكي (وتين للتبرع بالدم)"
    }
  },
  {
    number: 1,
    title: "البداية والوعي التأسيسي",
    date: "سبتمبر 2024",
    theme: "العدد التأسيسي الأول لتدشين نادي صحة المجتمع ونشر المعرفة الصحية الأساسية",
    color: "from-slate-800 to-indigo-950",
    description: "باكورة أعمال نادي صحة المجتمع حيث وضع حجر الأساس للمجلة التثقيفية والصحية لجامعة الملك سعود.",
    directLink: "https://drive.google.com/file/d/18cAR2KwRir-3UfGbsz38WQ32Yf_FJOXr/view?usp=share_link",
    articles: [
      {
        title: "أهداف نادي صحة المجتمع ورسالته المستدامة لبناء وعي متطور",
        author: "إعداد الهيئة التأسيسية للنادي",
        category: "علوم التثقيف والتعزيز",
        readTime: "5 دقائق",
        summary: "كيف انطلق التعاون التوعوي بين شؤون الطلاب والكلية وصياغة مجلة مبرهنة تثقيفية علمية رصينة.",
        content: "تمثل البداية انطلاقة متجددة لنشر العادات الصحية السليمة ومساعدة كافة شرائح الطلاب وأسرهم على تبني أسلوب حياة صحي وممتلئ بالحيوية."
      }
    ],
    featuredQuote: {
      text: "الخطوة الأولى هي الأهم، ورسالتنا هي غرس بذور العافية لكل فرد.",
      author: "مشرف عام الأنشطة للكلية"
    }
  }
];

const openArticlePDF = (article: Article, issueNum: number, issueDate: string, issueTitle: string) => {
  const htmlContent = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${article.title} - العدد ${issueNum}</title>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Cairo', sans-serif;
      background-color: #f1f5f9;
      color: #1e293b;
      margin: 0;
      padding: 40px 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .print-control {
      background: white;
      padding: 15px 25px;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      margin-bottom: 25px;
      width: 100%;
      max-width: 800px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-right: 4px solid #0f172a;
    }
    .print-control-text h3 {
      margin: 0;
      font-size: 14px;
      color: #0f172a;
      font-weight: 800;
    }
    .print-control-text p {
      margin: 4px 0 0 0;
      font-size: 11px;
      color: #64748b;
    }
    .print-btn {
      background-color: #0f172a;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.15s ease;
      font-family: 'Cairo', sans-serif;
    }
    .print-btn:hover {
      background-color: #1e293b;
      transform: translateY(-1px);
    }
    .pdf-page {
      background-color: #ffffff;
      width: 100%;
      max-width: 800px;
      box-sizing: border-box;
      padding: 50px 60px;
      border-radius: 16px;
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);
      border-top: 10px solid #1e3a8a;
      position: relative;
    }
    .pdf-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 3px double #e2e8f0;
      padding-bottom: 25px;
      margin-bottom: 35px;
    }
    .hospital-logo-area {
      text-align: right;
    }
    .hospital-logo-area h1 {
      font-size: 20px;
      font-weight: 900;
      margin: 0;
      color: #1e3a8a;
      letter-spacing: -0.5px;
    }
    .hospital-logo-area h2 {
      font-size: 12px;
      font-weight: 700;
      margin: 5px 0 0 0;
      color: #64748b;
    }
    .hospital-logo-area p {
      font-size: 11px;
      margin: 2px 0 0 0;
      color: #94a3b8;
    }
    .pdf-meta {
      text-align: left;
      font-size: 12px;
      color: #475569;
      line-height: 1.7;
    }
    .pdf-meta strong {
      color: #0f172a;
    }
    .category-badge {
      display: inline-block;
      background-color: #e2fbf5;
      color: #0d9488;
      border: 1px solid #ccfbf1;
      padding: 4px 12px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 800;
      margin-bottom: 15px;
    }
    .article-title {
      font-size: 24px;
      font-weight: 900;
      color: #0f172a;
      line-height: 1.45;
      margin: 0 0 15px 0;
    }
    .article-author {
      font-size: 13px;
      color: #475569;
      margin-bottom: 30px;
      padding-bottom: 12px;
      border-bottom: 1px solid #f1f5f9;
    }
    .article-author strong {
      color: #0f172a;
    }
    .executive-summary {
      background-color: #f8fafc;
      border-right: 4px solid #1e3a8a;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 35px;
    }
    .executive-summary-title {
      font-size: 13px;
      font-weight: 800;
      color: #1e3a8a;
      margin: 0 0 8px 0;
    }
    .executive-summary-text {
      font-size: 13.5px;
      line-height: 1.7;
      color: #334155;
      margin: 0;
      font-style: italic;
    }
    .article-content {
      font-size: 15px;
      line-height: 2.1;
      color: #1e293b;
      text-align: justify;
      white-space: pre-line;
    }
    .pdf-footer {
      margin-top: 70px;
      border-top: 1px solid #e2e8f0;
      padding-top: 25px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
      color: #94a3b8;
    }
    .pdf-footer-brand {
      font-weight: 700;
      color: #64748b;
    }
    @media print {
      body {
        background-color: white;
        padding: 0;
        margin: 0;
      }
      .print-control {
        display: none !important;
      }
      .pdf-page {
        box-shadow: none !important;
        border-radius: 0 !important;
        padding: 40px 50px !important;
        border-top: none !important;
      }
    }
  </style>
</head>
<body>

  <div class="print-control">
    <div class="print-control-text">
      <h3>نسخة رقمية معدة للطباعة والحفظ كملف PDF</h3>
      <p>اضغط على زر الطباعة المرفق، ثم قم باختيار "حفظ كملف PDF" (Save as PDF) من نافذة الخيارات.</p>
    </div>
    <button class="print-btn" onclick="window.print()">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"/><rect x="6" y="14" width="12" height="8" rx="1"/></svg>
      <span>طباعة وحفظ PDF</span>
    </button>
  </div>

  <div class="pdf-page">
    <div class="pdf-header">
      <div class="hospital-logo-area">
        <h1>مجلة نادي صحة المجتمع</h1>
        <h2>جامعة الملك سعود | كلية العلوم الطبية التطبيقية</h2>
        <p>تحت إشراف عمادة شؤون الطلاب والنشاط الطلابي للكلية</p>
      </div>
      <div class="pdf-meta">
        <div><strong>رقم الإصدار:</strong> العدد (${issueNum})</div>
        <div><strong>عنوان العدد:</strong> ${issueTitle}</div>
        <div><strong>تاريخ النشر:</strong> ${issueDate}</div>
        <div><strong>الصفة العلمية:</strong> معالجة وبائية وتوعية صحية ومجتمعية مراجعة</div>
      </div>
    </div>

    <div>
      <span class="category-badge">${article.category}</span>
      <h1 class="article-title">${article.title}</h1>
      
      <div class="article-author">
        <span>المقال بإعداد وطرح الكاتب المتميز: <strong>${article.author}</strong></span>
        <span style="margin: 0 15px; color: #cbd5e1;">|</span>
        <span>الزمن التقديري للمطالعة والاستيعاب: <strong>${article.readTime}</strong></span>
      </div>

      <div class="executive-summary">
        <h4 class="executive-summary-title">خلاصة البحث والملخص التنفيذي للمقالة:</h4>
        <p class="executive-summary-text">
          &ldquo;${article.summary}&rdquo;
        </p>
      </div>

      <div class="article-content">
        ${article.content}
      </div>
    </div>

    <div class="pdf-header" style="border-bottom: none; border-top: 1px dashed #cbd5e1; padding-top: 25px; margin-top: 50px; margin-bottom: 0;">
      <div class="pdf-footer-brand">
        مجلة نادي صحة المجتمع الرقمية الكلوية والوبائية © 2026
      </div>
      <div style="font-size: 10px; color: #94a3b8;">
        رابط التوعية المباشر: @1975_magazine | جرى الاستخراج المبرهن والتلقائي بدقة متناهية
      </div>
    </div>
  </div>

</body>
</html>
  `;
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const blobUrl = URL.createObjectURL(blob);
  window.open(blobUrl, '_blank');
};

export default function MagazineSection() {
  const [selectedIssueNum, setSelectedIssueNum] = useState<number>(14);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }
  }, []);

  // Filter issues or search articles across all issues
  const currentIssue = magazineIssues.find((issue) => issue.number === selectedIssueNum) || magazineIssues[0];

  const handleCopyXHandle = () => {
    navigator.clipboard.writeText("@1975_magazine");
    setCopiedLink(true);
    setTimeout(() => {
      setCopiedLink(false);
    }, 2500);
  };

  // Search filter
  const allFilteredArticles: { issueNum: number; issueTitle: string; article: Article }[] = [];
  magazineIssues.forEach((issue) => {
    issue.articles.forEach((art) => {
      const matchQuery =
        art.title.includes(searchQuery) ||
        art.summary.includes(searchQuery) ||
        art.author.includes(searchQuery) ||
        art.category.includes(searchQuery) ||
        art.content.includes(searchQuery);
      if (matchQuery) {
        allFilteredArticles.push({
          issueNum: issue.number,
          issueTitle: issue.title,
          article: art
        });
      }
    });
  });

  return (
    <section id="section-magazine" className="py-12 md:py-20 bg-gradient-to-b from-[#e8f6f0] via-white to-[#f0f9f5] scroll-mt-20 min-h-[82vh] flex flex-col justify-center border-b border-emerald-100/30" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-12 animate-fadeIn">
        
        {/* HEADING PANEL */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="flex justify-center items-center gap-1.5 mb-2">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold text-brand-teal bg-brand-teal/10 border border-brand-teal/15 flex items-center gap-1">
              <Sparkles className="w-3 h-3 fill-current animate-pulse text-brand-teal" />
              <span>الإصدارات الأكاديمية والتثقيفية للنادي</span>
            </span>
          </div>
          <h2 className="font-sans font-black text-2xl md:text-4xl text-brand-academic tracking-tight">
            مجلة نادي صحة المجتمع 📖
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed font-sans max-w-2xl mx-auto">
            منبر التوعية الطلابي الرائد برعاية كلية العلوم الطبية التطبيقية بجامعة الملك سعود. ننقل من المقعد الجامعي والمختبر إلى يد القارئ أحدث المستجدات العلمية بأسلوب مبسط وشيق.
          </p>
        </div>

        {/* FEATURE: MAGAZINE TWITTER HERO BANNER */}
        <div id="magazine-twitter-highlight" className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand-academic to-[#1b384f] text-white p-6 md:p-8 border border-white/5 shadow-lg shadow-slate-200/50">
          <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-brand-teal/10 to-transparent pointer-events-none" />
          <div className="absolute bottom-[-100px] left-[-100px] w-64 h-64 bg-brand-blue/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="space-y-4 text-right max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-black/40 border border-white/10 text-xs font-bold text-white">
                <XIcon className="w-3.5 h-3.5" />
                <span>حساب المجلة الرسمي (منصة إكس)</span>
              </span>
              <h3 className="font-sans font-black text-lg md:text-2xl text-white">
                للمزيد من التغطيات والتحليلات الصحية اليومية والمشاركات
              </h3>
              <p className="text-xs md:text-sm opacity-90 text-slate-200 leading-relaxed font-sans">
                ندعوكم لمتابعة وتصفح منشورات المجلة وصور الإصدارات التفاعلية وحلقات النقاش الصحية من خلال حسابنا الرسمي على منصة إكس <span className="font-bold underline text-brand-teal text-sm">@1975_magazine</span> لتكون في قلب الأثر والفعاليات.
              </p>
              
              <div className="flex flex-wrap gap-3 pt-1">
                <a 
                  id="magazine-twitter-follow-btn"
                  href="https://x.com/1975_magazine"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-all border border-white/10 shadow-sm hover:scale-[1.02] transform flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <XIcon className="w-3.5 h-3.5" />
                  <span>تابعنا على @1975_magazine</span>
                  <ExternalLink className="w-3 h-3" />
                </a>


              </div>
            </div>

            {/* Simulated interactive physical magazine stacks */}
            <div className="w-full md:w-auto shrink-0 flex justify-center">
              <div className="relative w-44 h-56 bg-gradient-to-br from-brand-blue to-teal-800 rounded-xl shadow-2xl border border-white/10 flex flex-col justify-between p-4 rotate-3 hover:rotate-0 transition-transform duration-300 overflow-hidden group select-none">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.03] rounded-full blur-2xl" />
                <div className="flex justify-between items-start">
                  <span className="text-[9px] uppercase font-black tracking-widest text-[#1CAADA] bg-white/15 px-2 py-0.5 rounded-md leading-none">
                    KSU CAMS
                  </span>
                  <BookOpen className="w-4 h-4 text-brand-teal fill-current" />
                </div>

                <div className="space-y-1.5 text-right relative z-10">
                  <span className="text-[9px] font-mono font-extrabold text-brand-teal">
                    العدد الأحدث #{magazineIssues[0]?.number || 13}
                  </span>
                  <h4 className="font-sans font-black text-xs text-white leading-tight">
                    {magazineIssues[0]?.title || "طيف التوحد - المكتسبات التنموية والسلوكية"}
                  </h4>
                  <p className="text-[8px] opacity-75 font-sans leading-relaxed">
                    فهم البصمة العصبية، دعم صحة الأمهات لتفادي الاحتراق النفسي، ودور أخصائيي التخاطب
                  </p>
                </div>

                <div className="flex justify-between items-center border-t border-white/10 pt-2 text-[9px] text-slate-300 font-bold font-sans">
                  <span>كلية العلوم الطبية</span>
                  <span>{magazineIssues[0]?.date || "أبريل 2026"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DYNAMIC ISSUE NAVIGATOR & BROWSER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Issue Selector Sidebar (Left on Desktop, Top on Mobile) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm space-y-4">
              <h3 className="font-sans font-extrabold text-base text-brand-academic flex items-center gap-2 justify-start">
                <Bookmark className="w-5 h-5 text-brand-teal shrink-0" />
                <span>اختر عدد المجلة لتتصفحه:</span>
              </h3>
              
              <div className="flex flex-col gap-2.5">
                {magazineIssues.map((issue) => {
                  const isSelected = selectedIssueNum === issue.number;
                  return (
                    <button
                      id={`issue-select-btn-${issue.number}`}
                      key={issue.number}
                      onClick={() => {
                        setSelectedIssueNum(issue.number);
                        setActiveArticle(null);
                      }}
                      className={`w-full p-4 rounded-xl text-right transition-all flex justify-between items-center group cursor-pointer ${
                        isSelected 
                          ? "bg-slate-900 text-white shadow-md shadow-slate-900/10 hover:brightness-105" 
                          : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/30"
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[11px] font-sans font-black px-2 py-0.5 rounded ${
                            isSelected ? "bg-brand-teal text-white" : "bg-slate-200 text-slate-700"
                          }`}>
                            العدد {issue.number}
                          </span>
                          <span className={`text-xs font-sans font-medium ${isSelected ? "text-slate-300" : "text-slate-400"}`}>
                            {issue.date}
                          </span>
                        </div>
                        <h4 className="font-sans font-black text-xs md:text-sm line-clamp-1 leading-snug">
                          {issue.title}
                        </h4>
                      </div>
                      
                      <ChevronLeft className={`w-4 h-4 shrink-0 transition-transform ${
                        isSelected ? "text-brand-teal transform translate-x-[-2px]" : "text-slate-400 group-hover:translate-x-[-2px]"
                      }`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STATISTICS PILL */}
            <div className="bg-gradient-to-br from-[#1CAADA]/3 to-slate-50/50 p-5 rounded-2xl border border-slate-200/50 shadow-sm space-y-4 text-right">
              <h4 className="font-sans font-bold text-xs text-[#1CAADA]">أرقام وحقائق عن المجلة:</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-white rounded-xl border border-slate-200/40 text-center">
                  <p className="font-mono text-xl font-black text-brand-academic">{magazineIssues.length}</p>
                  <p className="text-[10px] text-slate-450 font-bold">أعداد منشورة كاملة</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200/40 text-center">
                  <p className="font-mono text-xl font-black text-brand-teal">32+</p>
                  <p className="text-[10px] text-slate-450 font-bold">مقال طبي مراجع</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200/40 text-center">
                  <p className="font-mono text-xl font-black text-brand-blue">25+</p>
                  <p className="text-[10px] text-slate-450 font-bold">عضو بفريق التحرير</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200/40 text-center">
                  <p className="font-mono text-xl font-black text-[#1CAADA]">4</p>
                  <p className="text-[10px] text-slate-450 font-bold">تخصصات مغطاة</p>
                </div>
              </div>
            </div>

          </div>

          {/* Dynamic Issue content Viewer (Right on Desktop, Bottom on Mobile) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden text-right">
              
              {/* Issue Banner Header */}
              <div className={`p-6 bg-gradient-to-br ${currentIssue.color} text-white space-y-4 relative overflow-hidden`}>
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/10 opacity-40 pointer-events-none" />
                <div className="relative z-10 flex flex-wrap justify-between items-center gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black tracking-widest text-[#2dd4bf] bg-white/10 px-2.5 py-1 rounded inline-block">
                      تصفح العدد {currentIssue.number} منشور رسمياً
                    </span>
                    <h3 className="font-sans font-black text-xl md:text-2xl">
                      {currentIssue.title}
                    </h3>
                  </div>
                  
                  <span className="text-xs font-mono font-bold bg-white/20 px-3 py-1.5 rounded-full border border-white/10 shrink-0">
                    تاريخ النشر: {currentIssue.date}
                  </span>
                </div>

                <p className="text-xs md:text-sm text-slate-100/90 leading-relaxed max-w-3xl pt-1 relative z-10 font-sans">
                  {currentIssue.description}
                </p>

                {/* Direct Browse Link CTA */}
                <div className="pt-2 relative z-10 flex flex-wrap gap-3">
                  {currentIssue.directLink && currentIssue.directLink.trim() !== "" && currentIssue.directLink !== "https://x.com/1975_magazine" && currentIssue.directLink !== "#" ? (
                    <a
                      href={currentIssue.directLink}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 md:px-5 md:py-2.5 bg-[#2dd4bf] text-slate-900 hover:bg-[#1f9d8d] hover:text-white text-xs font-extrabold rounded-xl transition-all duration-300 flex items-center gap-1.5 shadow-md transform hover:scale-[1.03] active:scale-[0.97]"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>تصفح العدد كاملاً 📖</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <div className="px-4 py-2 md:px-5 md:py-2.5 bg-white/10 text-white/80 text-xs font-bold rounded-xl border border-white/20 flex items-center gap-1.5 select-none font-sans">
                      <BookOpen className="w-3.5 h-3.5 text-[#2dd4bf] animate-pulse" />
                      <span>رابط تصفح هذا العدد مباشرةً قيد التحديث ⏳</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Browse Articles list */}
              <div className="p-6 md:p-8 space-y-6">
                <div>
                  <h3 className="font-sans font-black text-sm text-slate-700 mb-4 flex items-center gap-2 justify-start border-b border-slate-100 pb-2">
                    <FileText className="w-4 h-4 text-brand-teal" />
                    <span>محتويات ومقالات العدد {currentIssue.number}:</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentIssue.articles.map((art, idx) => (
                      <div
                        id={`article-card-${idx}`}
                        key={idx}
                        className="p-5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-brand-teal/30 hover:shadow-md transition-all duration-300 space-y-3 flex flex-col justify-between group cursor-pointer"
                        onClick={() => setActiveArticle(art)}
                      >
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center flex-row-reverse text-[10px]">
                            <span className="px-2 py-0.5 rounded bg-brand-teal/15 text-brand-teal font-sans font-bold">
                              {art.category}
                            </span>
                            <span className="text-slate-400 font-sans font-medium flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{art.readTime}</span>
                            </span>
                          </div>

                          <h4 className="font-sans font-black text-sm text-slate-800 line-clamp-2 leading-snug group-hover:text-brand-blue transition-colors">
                            {art.title}
                          </h4>
                          <p className="text-xs text-slate-500 font-sans line-clamp-2 leading-relaxed">
                            {art.summary}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-slate-100/50 flex justify-between items-center flex-row-reverse text-[11px] text-slate-450 font-bold font-sans">
                          <span>بأقلام: {art.author}</span>
                          <span className="text-brand-teal font-extrabold flex items-center gap-1 group-hover:underline">
                            <span>اقرأ الملخص</span>
                            <ChevronLeft className="w-3 h-4" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Featured quotation overlay */}
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-150 relative overflow-hidden flex flex-row-reverse gap-4">
                  <div className="absolute top-[-20px] left-[-20px] text-8xl text-brand-teal/5 font-serif select-none">”</div>
                  <div className="w-1 bg-[#1CAADA]/30 rounded-full shrink-0" />
                  <div className="space-y-2 text-right">
                    <p className="text-xs md:text-sm font-sans font-medium text-slate-600 leading-relaxed italic">
                      "{currentIssue.featuredQuote.text}"
                    </p>
                    <p className="text-[10px] font-bold text-slate-500">
                      — {currentIssue.featuredQuote.author}
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* LIGHTBOX FOR DETAILED ARTICLE CONTENT */}
        <AnimatePresence>
          {activeArticle && (
            <motion.div
              id="magazine-lightbox-tint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setActiveArticle(null)}
            >
              <motion.div
                id="magazine-lightbox-modal"
                initial={{ scale: isMobile ? 1 : 0.96, y: isMobile ? 0 : 10 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: isMobile ? 1 : 0.96, y: isMobile ? 0 : 10 }}
                transition={{ duration: isMobile ? 0.12 : 0.22, ease: "easeInOut" }}
                className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden relative p-6 md:p-8 space-y-5 text-right flex flex-col justify-between max-h-[85vh]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex justify-between items-start border-b border-slate-100 pb-3 flex-row-reverse shrink-0">
                  <div>
                    <span className="px-2.5 py-0.5 rounded bg-brand-teal/15 text-brand-teal font-sans font-bold text-[10px]">
                      {activeArticle.category}
                    </span>
                    <h3 className="font-sans font-black text-base md:text-xl text-brand-academic leading-tight mt-1">
                      {activeArticle.title}
                    </h3>
                  </div>
                  
                  <button
                    onClick={() => setActiveArticle(null)}
                    className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <ArrowRight className="w-5 h-5 rotate-180" />
                  </button>
                </div>

                {/* Subheader and info */}
                <div className="flex justify-between text-xs text-slate-400 font-sans font-medium border-b border-slate-100 pb-3 shrink-0">
                  <span>بقلم الكاتب: <strong className="text-slate-600">{activeArticle.author}</strong></span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>زمن القراءة: {activeArticle.readTime}</span>
                  </span>
                </div>

                {/* Article Body */}
                <div className="overflow-y-auto space-y-4 py-2 font-sans text-slate-600 text-sm md:text-base leading-relaxed selection:bg-brand-teal/20">
                  <div className="bg-slate-50 p-4 rounded-xl border-r-4 border-brand-teal">
                    <p className="font-bold text-slate-705 text-xs md:text-sm">ملخص المقالة:</p>
                    <p className="italic text-xs text-slate-500 mt-1 leading-relaxed">
                      {activeArticle.summary}
                    </p>
                  </div>

                  <p className="whitespace-pre-line text-slate-700 text-right leading-loose">
                    {activeArticle.content}
                  </p>
                </div>

                {/* Footer buttons */}
                <div className="pt-4 border-t border-slate-100 flex flex-row-reverse justify-between items-center shrink-0">
                  <a
                    id="lightbox-share-x-btn"
                    href={`https://x.com/intent/tweet?text=${encodeURIComponent(`أقرأ مقالاً رائعاً من مجلة نادي صحة المجتمع: ${activeArticle.title} @1975_magazine`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl border border-white/10 transition-all shadow-sm flex items-center gap-2 cursor-pointer active:scale-95"
                  >
                    <XIcon className="w-3.5 h-3.5" />
                    <span>شارك المقال عبر منصة إكس</span>
                  </a>

                  <button
                    onClick={() => {
                      if (activeArticle) {
                        const targetIssue = magazineIssues.find(iss => iss.articles.some(art => art.title === activeArticle.title)) || currentIssue;
                        openArticlePDF(activeArticle, targetIssue.number, targetIssue.date, targetIssue.title);
                      }
                    }}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800 text-xs font-bold rounded-xl transition-all border border-slate-200 flex items-center gap-2 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>عرض المقالة</span>
                  </button>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
