import React, { useState } from "react";
import { 
  Scale, 
  Sliders, 
  Heart, 
  Activity, 
  Sparkles 
} from "lucide-react";

export default function BMICalculatorSection() {
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(170);
  const [age, setAge] = useState<number>(22);
  const [gender, setGender] = useState<"male" | "female">("male");
  const [activity, setActivity] = useState<string>("moderate");

  // Calculations with safe fallbacks
  const safeHeight = height > 0 ? height : 170;
  const safeWeight = weight > 0 ? weight : 70;
  const heightInMeters = safeHeight / 100;
  const bmi = safeWeight / (heightInMeters * heightInMeters);

  // Ideal weight range using Devine formula as reference
  const getIdealWeight = () => {
    const heightInInches = safeHeight / 2.54;
    if (heightInInches < 60) {
      return gender === "male" ? "50.0 - 62.0" : "45.5 - 56.0";
    }
    const base = gender === "male" ? 50 : 45.5;
    const computed = base + 2.3 * (heightInInches - 60);
    return `${(computed - 4).toFixed(1)} - ${(computed + 4).toFixed(1)}`;
  };

  // Approximate Calories Needs (BMR + TDEE factor) via revised Harris-Benedict Page guidelines
  const getDailyCalories = () => {
    let bmr = 0;
    if (gender === "male") {
      bmr = 88.362 + 13.397 * safeWeight + 4.799 * safeHeight - 5.677 * age;
    } else {
      bmr = 447.593 + 9.247 * safeWeight + 3.098 * safeHeight - 4.330 * age;
    }

    let multiplier = 1.2; // Sedentary
    if (activity === "light") multiplier = 1.375;
    if (activity === "moderate") multiplier = 1.55;
    if (activity === "active") multiplier = 1.725;

    return Math.round(bmr * multiplier);
  };

  // Categories and levels
  const getBmiCategory = () => {
    if (height <= 0 || weight <= 0) {
      return {
        label: "يرجى كتابة الطول والوزن بشكل صحيح فوق الصفر",
        color: "text-slate-500 bg-slate-100 border-slate-200",
        indicatorBg: "bg-slate-300",
        description: "يرجى كتابة الوزن والطول لمشاهدة تحليل دقيق وملاحظات التوعية الغذائية.",
        tips: ["أدخل طولك بالسنتمتر بدقة", "أدخل وزنك الحالي بالكيلوجرام بصدق"],
        badge: "Waiting"
      };
    }
    if (bmi < 18.5) {
      return {
        label: "نقص في الوزن (تحت الوزن الطبيعي)",
        color: "text-amber-500 bg-amber-500/10 border-amber-300",
        indicatorBg: "bg-amber-500",
        description: "وزنك أقل من المعدل الصحي المناسب لطولك. قد يعني ذلك نقصاً طفيفاً في المغذيات الحيوية أو ضعف الكتلة العضلية.",
        tips: [
          "ركز على تناول وجبات غنية بالبروتينات والدهون الصحية مثل المكسرات والأفوكادو.",
          "مارس تمارين المقاومة لزيادة الكتلة العضلية بشكل صحي بدلاً من زيادة الكربوهيدرات المكررة فقط.",
          "قم باستشارة عيادة التغذية السريرية بكلية العلوم الطبية التطبيقية جامعة الملك سعود لوضع خطة وجبات متوازنة وعلاجية."
        ],
        badge: "Underweight"
      };
    } else if (bmi >= 18.5 && bmi < 25) {
      return {
        label: "وزن مثالي وطبيعي متميز 💚",
        color: "text-emerald-500 bg-emerald-500/10 border-emerald-300",
        indicatorBg: "bg-emerald-500",
        description: "تبارك الله! وزنك في النطاق الصحي السليم والمثالي جداً لطولك. تحافظ على نسب وقائية ممتازة ضد الأمراض الأيضية.",
        tips: [
          "واصل اتباع نمط غذائي متكامل ومتنوع غني بالألياف ومضادات الأكسدة.",
          "احرص على ممارسة النشاط البدني المعتدل بمقدار 150 دقيقة أسبوعياً للحفاظ على لياقة جهاز الدوران.",
          "كأحد قادة تعزيز الصحة، ساهم في نشر الوعي الصحي لزملائك والمجتمع المحيط بك!"
        ],
        badge: "Normal"
      };
    } else if (bmi >= 25 && bmi < 30) {
      return {
        label: "زيادة في الوزن (مرحلة ما قبل السمنة)",
        color: "text-orange-500 bg-orange-500/10 border-orange-300",
        indicatorBg: "bg-orange-500",
        description: "مؤشر الكتلة يشير لزيادة تفوق المعدل القياسي لطولك. هذه مرحلة وقائية هامة للتدخل وتفادي التقدم لنطاق السمنة.",
        tips: [
          "قلل من تناول السكريات المضافة والمشروبات الغازية واستبدلها بالماء والمشروبات الطبيعية.",
          "ابدأ بزيادة حركتك اليومية عن طريق المشي السريع لمدة 30 دقيقة يومياً بمعدل 5 أيام كحد أدنى.",
          "تحكّم في أحجام الحصص الغذائية ومارس الأكل الواعي (بطء المضغ والتركيز في الشعور بالشبع)."
        ],
        badge: "Overweight"
      };
    } else {
      return {
        label: "سمنة مفرطة (تتطلب رعاية توعوية)",
        color: "text-rose-500 bg-rose-500/10 border-rose-300",
        indicatorBg: "bg-rose-500",
        description: "مؤشر الكتلة يقع حالياً في نطاق السمنة. يترافق ذلك مع زيادة احتمالية الإصابة بالسكري والضغط والاضطرابات الاستقلابية الوقائية.",
        tips: [
          "استبدل الدهون المتحمسة بالدهون الأحادية غير المشبعة واعتمد الطهل بالبخار أو الشوي والفرن.",
          "ضع بالتنسيق مع أخصائيو التثقيف الصحي أهدافاً تدريجية (مثال: خسارة 5% إلى 10% من الوزن الأولي خلال ستة أشهر).",
          "راجع العيادات التخصصية الشاملة بجامعة الملك سعود لتصميم برنامج تغذية سريرية متكامل ومراقب طبياً لدوام سلامتك."
        ],
        badge: "Obese"
      };
    }
  };

  const category = getBmiCategory();

  return (
    <section 
      id="section-bmi-calculator" 
      className="py-16 bg-gradient-to-b from-[#e8f6f0] via-white to-[#f0f9f5] relative scroll-mt-20 overflow-hidden min-h-[82vh] flex flex-col justify-center border-y border-emerald-100/30 font-sans"
      dir="rtl"
    >
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-brand-teal/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 space-y-10">
        {/* Visual Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold text-brand-teal bg-brand-teal/10 shadow-sm border border-brand-teal/15 animate-pulse">
              <Scale className="w-3.5 h-3.5" />
              <span>أدوات تعزيز الصحة والوعي الذاتي</span>
            </span>
          </div>
          <h2 className="font-sans font-black text-2xl md:text-3xl text-brand-academic">
            حاسبة مؤشر كتلة الجسم (BMI) 📊
          </h2>
          <p className="text-xs md:text-sm text-slate-500 leading-relaxed max-w-2xl mx-auto">
            مؤشر كتلة الجسم هو صيغة معتمدة عالمياً لتقدير فئة وزنك وتوجيه السلوك الغذائي والوقائي للأفراد.
          </p>
        </div>

        {/* Dashboard Grid Card Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          
          {/* Right Inputs Column */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-xl shadow-slate-100/50 flex flex-col justify-between space-y-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-row-reverse mb-1 justify-start">
                <Sliders className="w-4.5 h-4.5 text-brand-teal" />
                <span className="text-xs md:text-sm font-sans font-black text-slate-800">
                  أدخل بياناتك الحيوية يدوياً:
                </span>
              </div>
            </div>

            {/* Gender Switch Toggle */}
            <div className="space-y-1 px-0.5">
              <label className="text-xs font-bold text-slate-600 block text-right">الجنس الفيزيولوجي:</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setGender("male")}
                  className={`py-2 px-3 rounded-xl font-sans font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    gender === "male"
                      ? "bg-slate-900 border border-slate-900 text-white shadow-md active:scale-95"
                      : "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <span>ذكر 🚹</span>
                </button>
                <button
                  type="button"
                  onClick={() => setGender("female")}
                  className={`py-2 px-3 rounded-xl font-sans font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    gender === "female"
                      ? "bg-slate-900 border border-slate-900 text-white shadow-md active:scale-95"
                      : "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <span>أنثى 🚺</span>
                </button>
              </div>
            </div>

            {/* Manual Keyboard Input for Height */}
            <div className="space-y-1">
              <label htmlFor="bmi-height-input" className="text-xs font-bold text-slate-600 block text-right">
                الطول (بالسنتمتر):
              </label>
              <div className="relative">
                <input
                  id="bmi-height-input"
                  type="number"
                  min="50"
                  max="250"
                  value={height === 0 ? "" : height}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setHeight(isNaN(val) ? 0 : val);
                  }}
                  className="w-full text-right py-2.5 pr-4 pl-12 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:bg-white font-sans text-xs font-bold transition-all text-slate-800"
                  placeholder="مثال: 170"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 font-sans pointer-events-none">
                  سم
                </span>
              </div>
            </div>

            {/* Manual Keyboard Input for Weight */}
            <div className="space-y-1">
              <label htmlFor="bmi-weight-input" className="text-xs font-bold text-slate-600 block text-right">
                الوزن (بالكيلوجرام):
              </label>
              <div className="relative">
                <input
                  id="bmi-weight-input"
                  type="number"
                  min="10"
                  max="300"
                  value={weight === 0 ? "" : weight}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setWeight(isNaN(val) ? 0 : val);
                  }}
                  className="w-full text-right py-2.5 pr-4 pl-12 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:bg-white font-sans text-xs font-bold transition-all text-slate-800"
                  placeholder="مثال: 70"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 font-sans pointer-events-none">
                  كجم
                </span>
              </div>
            </div>

            {/* Input fields for Age and Activity */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 block text-right">العمر:</label>
                <input
                  type="number"
                  min="1"
                  max="99"
                  value={age || ''}
                  onChange={(e) => setAge(e.target.value ? Number(e.target.value) : '')}
                  className="w-full text-center py-2 px-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-teal font-sans text-xs font-bold text-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 block text-right">النشاط الأسبوعي:</label>
                <select
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  className="w-full text-center py-2 px-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-teal font-sans text-xs font-bold text-slate-800"
                >
                  <option value="sedentary">قليل الحركة</option>
                  <option value="light">حركة خفيفة</option>
                  <option value="moderate">نشاط متوسط</option>
                  <option value="active">نشط جداً</option>
                </select>
              </div>
            </div>

            {/* Ideal metric values */}
            <div className="bg-slate-900 text-white rounded-2xl p-4 space-y-3">
              <div className="flex justify-between items-center text-right flex-row-reverse text-xs">
                <div className="flex items-center gap-1.5 flex-row-reverse text-right">
                  <Heart className="w-3.5 h-3.5 text-brand-teal" />
                  <span className="text-[10px] sm:text-xs font-sans font-bold text-slate-300">الوزن المثالي الطبيعي المقترح:</span>
                </div>
                <span className="text-xs font-mono font-black text-brand-teal text-left">{getIdealWeight()} كجم</span>
              </div>
              <div className="h-[1px] bg-slate-800" />
              <div className="flex justify-between items-center text-right flex-row-reverse text-xs">
                <div className="flex items-center gap-1.5 flex-row-reverse text-right">
                  <Activity className="w-3.5 h-3.5 text-brand-blue" />
                  <span className="text-[10px] sm:text-xs font-sans font-bold text-slate-300">معدل الاحتياج اليومي (TDEE):</span>
                </div>
                <span className="text-xs font-mono font-black text-brand-blue text-left">{getDailyCalories()} سعرة</span>
              </div>
            </div>
          </div>

          {/* Left Results Column */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* Visual Computed Circle Meter and highlight category */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-xl shadow-slate-100/50 flex flex-col md:flex-row items-center justify-between gap-6 flex-row-reverse">
              <div className="text-right space-y-2.5 flex-1 w-full select-none">
                <div className="flex items-center justify-start gap-1 p-0.5 flex-row-reverse">
                  <span className="text-[10px] font-black uppercase text-brand-teal tracking-wider bg-brand-teal/10 px-2.5 py-0.5 rounded">
                    حساب مباشر ⚡
                  </span>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded border ${category.color}`}>
                    {category.badge}
                  </span>
                </div>
                <h4 className="font-sans font-black text-base md:text-lg text-slate-800">مؤشر الكتلة المحسوب</h4>
                <p className="text-xs text-slate-500 font-sans font-bold leading-relaxed">
                  القيم المدخلة تُعطيك مؤشراً بمقدار:
                </p>
                <div className={`p-3 rounded-2xl border text-xs font-sans font-extrabold ${category.color} leading-snug`}>
                  {category.label}
                </div>
              </div>

              {/* Colorful Round Display Indicator */}
              <div className="relative shrink-0 flex items-center justify-center p-2">
                <div className="absolute w-32 h-32 rounded-full border-4 border-slate-100" />
                <div 
                  id="final-weighted-score-badge"
                  className="w-28 h-28 rounded-full border-4 border-brand-teal/30 bg-slate-900 flex flex-col items-center justify-center ring-8 ring-brand-teal/5 shadow-xl shadow-brand-teal/5"
                >
                  <span className="font-mono font-black text-3xl text-white">
                    {height > 0 && weight > 0 ? bmi.toFixed(1) : "0.0"}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 mt-1">كجم/م²</span>
                </div>
              </div>
            </div>

            {/* Dynamic Interactive Gauge Progress Indicator Bar representing standard obesity ranges */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xl shadow-slate-100/50 space-y-4 text-right">
              <div className="flex items-center gap-2 flex-row-reverse justify-start">
                <Activity className="w-4 h-4 text-brand-teal" />
                <span className="text-xs font-sans font-black text-slate-800">تحديد موقعك على خريطة الوزن الصحية:</span>
              </div>
              
              <div className="relative pt-2">
                {/* Visual colored gauge sections */}
                <div className="h-2.5 rounded-full w-full bg-slate-100 flex overflow-hidden">
                  <div className="h-full bg-amber-400" style={{ width: "23%" }} title="وزن ناقص" />
                  <div className="h-full bg-emerald-500" style={{ width: "32%" }} title="وزن طبيعي" />
                  <div className="h-full bg-orange-400" style={{ width: "20%" }} title="وزن زائد" />
                  <div className="h-full bg-rose-500" style={{ width: "25%" }} title="سمنة" />
                </div>
                
                {/* Sliding indicator handle marker based on calculated BMI range */}
                {(() => {
                  if (height <= 0 || weight <= 0) return null;
                  // Scale from BMI 14 to 38 into percent 0-100
                  const bmiMin = 14;
                  const bmiMax = 38;
                  const percentage = Math.min(100, Math.max(0, ((bmi - bmiMin) / (bmiMax - bmiMin)) * 100));
                  return (
                    <div 
                      className="absolute top-0 transition-all duration-300 flex flex-col items-center select-none"
                      style={{ right: `${percentage}%`, transform: "translateX(50%)" }}
                    >
                      <div className={`w-3 h-3 rounded-full border border-white ring-2 ring-slate-900 shadow ${category.indicatorBg}`} />
                      <span className="text-[9px] font-mono font-black text-slate-900 bg-white shadow-md border rounded px-1 mt-0.5">
                        {bmi.toFixed(1)}
                      </span>
                    </div>
                  );
                })()}
              </div>

              {/* Labels below Gauge bar */}
              <div className="grid grid-cols-4 text-center font-sans text-[9px] font-black text-slate-400 pt-3">
                <span className="text-rose-550">سمنة &gt;= 30</span>
                <span className="text-orange-400 text-right">زائد (25-30)</span>
                <span className="text-emerald-500 text-right">طبيعي (18.5-25)</span>
                <span className="text-amber-500 text-right">نقص &lt; 18.5</span>
              </div>
            </div>

            {/* Custom guidance tips and detailed advice */}
            <div className="bg-slate-950 text-white rounded-3xl border border-slate-900 p-6 shadow-2xl relative overflow-hidden">
              <div className="absolute -top-24 -left-24 w-72 h-72 bg-brand-teal/5 rounded-full blur-3xl pointer-events-none" />
              <div className="space-y-4">
                <div className="flex items-center gap-2 flex-row-reverse justify-start text-right pb-3 border-b border-slate-800">
                  <span className="p-1 bg-brand-teal/20 text-brand-teal rounded-lg shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="text-[10px] font-black uppercase text-brand-teal tracking-wider block">
                      التثقيف والتوجيه الوقائي المخصص لك
                    </span>
                    <h5 className="font-sans font-black text-sm text-slate-100 mt-0.5">
                      النصيحة الأكاديمية والتوجيه الوقائي لوزنك:
                    </h5>
                  </div>
                </div>

                <p className="text-xs text-slate-300 font-sans leading-relaxed text-right font-medium">
                  {category.description}
                </p>

                <div className="space-y-3.5 pt-1">
                  <span className="text-[11px] text-brand-blue font-black block text-right">التوصيات الطبية والممارسات السلوكية المقترحة:</span>
                  <div className="space-y-2.5">
                    {category.tips.map((tip, idx) => (
                      <div 
                        key={idx}
                        className="bg-slate-900/40 border border-slate-800/80 p-3 rounded-xl text-xs text-slate-300 font-sans font-semibold flex items-start gap-2.5 flex-row-reverse text-right"
                      >
                        <div className="w-5 h-5 bg-brand-teal/15 rounded-full flex items-center justify-center shrink-0 text-brand-teal mt-0.5">
                          <span className="font-sans text-[10px] font-bold">{idx + 1}</span>
                        </div>
                        <p className="flex-1 pr-1">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
