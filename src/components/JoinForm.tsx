import React, { useState } from "react";
import { Check, ChevronRight, Award, Phone, User, Hash, Loader2 } from "lucide-react";
import { db, collection, addDoc, serverTimestamp } from "../lib/firebase";

interface JoinFormProps {
  lang: "ar" | "en";
}

interface FormState {
  fullName: string;
  studentId: string;
  phone: string;
  level: string;
  department: string;
  customDepartment: string;
  committee: string;
}

const initialFormState: FormState = {
  fullName: "",
  studentId: "",
  phone: "",
  level: "",
  department: "",
  customDepartment: "",
  committee: "",
};

export default function JoinForm({ lang = "ar" }: JoinFormProps) {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const levelsList = [
    "المستوى الأول",
    "المستوى الثاني",
    "المستوى الثالث",
    "المستوى الرابع",
    "المستوى الخامس",
    "المستوى السادس",
    "المستوى السابع",
    "المستوى الثامن",
    "سنة الامتياز"
  ];

  const majorsList = [
    { id: "clinical_nutrition", label: "التغذية السريرية" },
    { id: "health_education", label: "التثقيف الصحي" },
    { id: "other", label: "أخرى" }
  ];

  const committeesList = [
    { id: "hr-c", label: "لجنة الموارد البشرية", description: "إدارة شؤون المتطوعين، وتنظيم الساعات، ومتابعة الحضور الميداني وكفاءة توزيع الكوادر." },
    { id: "reports-c", label: "لجنة التقارير والجودة", description: "توثيق مخرجات الحملات وصياغة التقارير الفنية الختامية وتطبيق معايير الكفاءة والتميز." },
    { id: "content-c", label: "لجنة المحتوى", description: "صياغة المادة العلمية التوعوية للنادي وتدقيق صحة المراجع الطبية المعتمدة ومراجعتها أكاديمياً." },
    { id: "pr-c", label: "لجنة العلاقات العامة", description: "بناء الشراكات، والاتصال مع الجهات الخارجية واستحصال الدعوات والموافقات الرسمية للحملات." },
    { id: "logistics-c", label: "لجنة الدعم اللوجستي", description: "التجهيز الفني والميداني للمعارض وتوفير الأجهزة والمستلزمات الطبية والتحقق من جاهزية المحطات." },
    { id: "media-c-tweet", label: "لجنة الإعلام", description: "إدارة البث الرقمي، التغطية المباشرة للحملات، ونشر المعرفة الصحية الوقائية عبر الحسابات الرسمية." },
    { id: "design-c", label: "لجنة التصميم", description: "إخراج المنشورات البصرية، والإنفوغرافيكس الطبي، وتصميم المطبوعات والهوية الوقائية المرئية." },
    { id: "planning-c", label: "لجنة التخطيط والابتكار", description: "تطوير برامج الحملات المبتكرة لتجنب المألوف وإيجاد مسارات حديثة وحيوية للمجتمع في التثقيف." }
  ];

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = "الاسم الكامل مطلوب";
    }

    const idRegex = /^\d{9}$/;
    if (!form.studentId) {
      newErrors.studentId = "الرقم الجامعي مطلوب";
    } else if (!idRegex.test(form.studentId)) {
      newErrors.studentId = "يجب أن يتكون الرقم الجامعي من 9 أرقام";
    }

    // Saudi phone regex (e.g. 05xxxxxxxx or 5xxxxxxxx, 9-10 digits)
    const phoneRegex = /^(05|5)\d{8}$/;
    if (!form.phone) {
      newErrors.phone = "رقم الجوال مطلوب";
    } else if (!phoneRegex.test(form.phone)) {
      newErrors.phone = "يرجى إدخال رقم جوال صحيح (مثل: 05xxxxxxxx)";
    }
if (!form.email) {
    newErrors.email = "البريد الإلكتروني مطلوب";
} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    newErrors.email = "يرجى إدخال بريد إلكتروني صحيح";
}

    if (!form.level) {
      newErrors.level = "يرجى اختيار المستوى الدراسي";
    }

    if (!form.department) {
      newErrors.department = "يرجى اختيار التخصص";
    } else if (form.department === "other" && !form.customDepartment.trim()) {
      newErrors.customDepartment = "يرجى كتابة التخصص";
    }

    if (!form.committee) {
      newErrors.committee = "يرجى اختيار اللجنة المطلوبة";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      setSubmitError("");
      try {
        const finalDepartment = form.department === "other" && form.customDepartment.trim()
          ? form.customDepartment.trim()
          : form.department;

        await addDoc(collection(db, "join_requests"), {
          fullName: form.fullName.trim(),
          studentId: form.studentId.trim(),
          phone: form.phone.trim(),
          level: form.level,
          department: finalDepartment,
          committee: form.committee,
          createdAt: serverTimestamp(),
          synced: false,
        });

        setSuccess(true);
      } catch (error: any) {
        console.error("Error adding document: ", error);
        const errMsg = error?.message || String(error);
        setSubmitError(`حدث خطأ أثناء حفظ طلبك: ${errMsg}. يرجى المحاولة مرة أخرى.`);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleReset = () => {
    setForm(initialFormState);
    setSuccess(false);
  };

  return (
    <div id="join-card-container" className="w-full">
      {!success ? (
        <form
          id="join-registration-form"
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg shadow-slate-100/60 border border-slate-200/60 p-6 md:p-8 space-y-6 animate-fadeIn text-right"
          dir="rtl"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wide mb-2 text-right flex items-center justify-start gap-1">
                <span>الاسم كامل</span>
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="form-full-name"
                  type="text"
                  className={`w-full pl-4 pr-10 py-3 rounded-xl border text-sm font-sans bg-white/85 text-right focus:outline-none transition-all duration-200 ${
                    errors.fullName
                      ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                      : "border-slate-200 hover:border-slate-350 focus:border-brand-teal focus:ring-4 focus:ring-brand-teal/10"
                  }`}
                  value={form.fullName}
                  onChange={(e) => {
                    setForm({ ...form, fullName: e.target.value });
                    if (errors.fullName) setErrors({ ...errors, fullName: "" });
                  }}
                  placeholder="الاسم الثلاثي أو الرباعي"
                />
                <User className="absolute right-3.5 top-3.5 w-4.5 h-4.5 text-slate-400" />
              </div>
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1.5 font-bold text-right">{errors.fullName}</p>
              )}
            </div>

            {/* Student ID */}
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wide mb-2 text-right flex items-center justify-start gap-1">
                <span>الرقم الجامعي</span>
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="form-student-id"
                  type="text"
                  maxLength={9}
                  className={`w-full pl-4 pr-10 py-3 rounded-xl border text-sm font-sans bg-white/85 text-right focus:outline-none transition-all duration-200 ${
                    errors.studentId
                      ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                      : "border-slate-200 hover:border-slate-350 focus:border-brand-teal focus:ring-4 focus:ring-brand-teal/10"
                  }`}
                  value={form.studentId}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    setForm({ ...form, studentId: val });
                    if (errors.studentId) setErrors({ ...errors, studentId: "" });
                  }}
                  placeholder="مثال: 441201550"
                />
                <Hash className="absolute right-3.5 top-3.5 w-4.5 h-4.5 text-slate-400" />
              </div>
              {errors.studentId && (
                <p className="text-red-500 text-xs mt-1.5 font-bold text-right">{errors.studentId}</p>
              )}
            </div>
{/* Email Input */}
<div>
    <div class="relative">
        <input 
            type="email" 
            name="email" 
            value={form.email || ''} 
            onChange={(e) => {
                setForm({ ...form, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: "" });
            }}
            required 
            class="w-full pl-4 pr-10 py-3 rounded-xl border text-sm font-sans bg-white/85 text-right border-slate-200 focus:border-brand-teal focus:ring-4 focus:ring-brand-teal/10 outline-none transition-all duration-200 placeholder-slate-400" 
            placeholder="example@ksu.edu.sa" 
        />
    </div>
    {errors.email && (
        <p class="text-red-500 text-xs mt-1.5 font-bold text-right">{errors.email}</p>
    )}
</div>

            {/* Mobile / Phone Number */}
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wide mb-2 text-right flex items-center justify-start gap-1">
                <span>رقم الجوال</span>
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="form-phone"
                  type="text"
                  maxLength={10}
                  className={`w-full pl-4 pr-10 py-3 rounded-xl border text-sm font-sans bg-white/85 text-right focus:outline-none transition-all duration-200 ${
                    errors.phone
                      ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                      : "border-slate-200 hover:border-slate-350 focus:border-brand-teal focus:ring-4 focus:ring-brand-teal/10"
                  }`}
                  value={form.phone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    setForm({ ...form, phone: val });
                    if (errors.phone) setErrors({ ...errors, phone: "" });
                  }}
                  placeholder="مثال: 05xxxxxxxx"
                />
                <Phone className="absolute right-3.5 top-3.5 w-4.5 h-4.5 text-slate-400" />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1.5 font-bold text-right">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Academic Level */}
          <div className="space-y-2">
            <label className="block text-xs font-black text-slate-700 uppercase tracking-wide mb-2 text-right">
              المستوى الدراسي <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 text-right" dir="rtl">
              {levelsList.map((lvl) => (
                <button
                  id={`form-level-btn-${lvl.replace(/\s+/g, "-")}`}
                  key={lvl}
                  type="button"
                  onClick={() => {
                    setForm({ ...form, level: lvl });
                    if (errors.level) setErrors({ ...errors, level: "" });
                  }}
                  className={`px-3 py-2.5 text-xs font-bold rounded-xl border transition-all duration-200 active:scale-95 cursor-pointer text-center ${
                    form.level === lvl
                      ? "bg-slate-900 border-slate-900 text-white shadow-md font-black"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
            {errors.level && (
              <p className="text-red-500 text-xs mt-1.5 font-bold text-right">{errors.level}</p>
            )}
          </div>

          {/* Major/Specialization */}
          <div className="space-y-3">
            <label className="block text-xs font-black text-slate-700 uppercase tracking-wide text-right">
              التخصص <span className="text-red-500">*</span>
            </label>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" dir="rtl">
              {majorsList.map((maj) => (
                <button
                  id={`form-major-btn-${maj.id}`}
                  key={maj.id}
                  type="button"
                  onClick={() => {
                    setForm({ ...form, department: maj.id, customDepartment: maj.id !== "other" ? "" : form.customDepartment });
                    if (errors.department) setErrors({ ...errors, department: "" });
                  }}
                  className={`p-4 rounded-xl border text-right font-sans text-sm font-bold transition-all duration-200 active:scale-95 flex items-center justify-between cursor-pointer ${
                    form.department === maj.id
                      ? "border-brand-teal bg-teal-50/10 text-brand-teal ring-2 ring-brand-teal/20"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <span>{maj.label}</span>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    form.department === maj.id ? "border-brand-teal bg-brand-teal" : "border-slate-350 bg-white"
                  }`}>
                    {form.department === maj.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </button>
              ))}
            </div>
            {errors.department && (
              <p className="text-red-500 text-xs mt-1 font-bold text-right">{errors.department}</p>
            )}

            {/* Custom Specialization Input if 'other' is selected */}
            {form.department === "other" && (
              <div className="pt-2 animate-fadeIn">
                <label className="block text-xs font-bold text-slate-600 mb-1.5 text-right">
                  يرجى كتابة التخصص <span className="text-red-500">*</span>
                </label>
                <input
                  id="form-custom-major"
                  type="text"
                  className={`w-full px-4 py-3 rounded-xl border text-sm font-sans bg-white text-right focus:outline-none transition-all duration-200 ${
                    errors.customDepartment
                      ? "border-red-400 focus:border-red-500"
                      : "border-slate-200 focus:border-brand-teal"
                  }`}
                  value={form.customDepartment}
                  onChange={(e) => {
                    setForm({ ...form, customDepartment: e.target.value });
                    if (errors.customDepartment) setErrors({ ...errors, customDepartment: "" });
                  }}
                  placeholder="مثال: علاج طبيعي، علوم مختبرات، إلخ..."
                />
                {errors.customDepartment && (
                  <p className="text-red-500 text-xs mt-1 font-bold text-right">{errors.customDepartment}</p>
                )}
              </div>
            )}
          </div>

          {/* Desired Committee Selection */}
          <div className="space-y-3">
            <label className="block text-xs font-black text-slate-700 uppercase tracking-wide text-right">
              اللجنة المطلوبة <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-slate-450 text-right font-sans leading-relaxed -mt-1 mb-2">
              اختر إحدى لجان النادي الثمانية التنفيذية للمشاركة والمساهمة في تفعيلها، وسيوضح لك عمل كل لجنة أدناه:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3" dir="rtl">
              {committeesList.map((comm) => (
                <button
                  id={`form-committee-btn-${comm.id}`}
                  key={comm.id}
                  type="button"
                  onClick={() => {
                    setForm({ ...form, committee: comm.id });
                    if (errors.committee) setErrors({ ...errors, committee: "" });
                  }}
                  className={`p-4 rounded-xl border text-right font-sans transition-all duration-200 flex flex-col gap-1.5 cursor-pointer items-start w-full leading-tight select-none relative overflow-hidden ${
                    form.committee === comm.id
                      ? "border-brand-teal bg-teal-50/10 ring-2 ring-brand-teal/20"
                      : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center justify-between w-full flex-row-reverse">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      form.committee === comm.id ? "border-brand-teal bg-brand-teal" : "border-slate-350 bg-white"
                    }`}>
                      {form.committee === comm.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <span className={`text-xs md:text-sm font-black ${form.committee === comm.id ? "text-brand-teal" : "text-slate-800"}`}>
                      {comm.label}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-normal text-right font-medium pr-0 w-full mt-1">
                    {comm.description}
                  </p>
                </button>
              ))}
            </div>
            {errors.committee && (
              <p className="text-red-500 text-xs mt-1 font-bold text-right">{errors.committee}</p>
            )}
          </div>

          {submitError && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-650 text-right text-xs font-bold leading-relaxed mb-4">
              {submitError}
            </div>
          )}

          {/* Send Button at the bottom */}
          <div className="pt-4">
            <button
              id="form-submit-button"
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 px-6 rounded-xl font-sans font-black text-white transition-all duration-200 bg-gradient-to-r from-brand-blue to-brand-teal shadow-md shadow-brand-blue/15 flex items-center justify-center gap-2 cursor-pointer ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:opacity-95 hover:shadow-lg hover:shadow-brand-blue/20 hover:scale-[1.01] active:scale-95"
              }`}
            >
              {isSubmitting ? (
                <>
                  <span>جاري الإرسال...</span>
                  <Loader2 className="w-5 h-5 animate-spin" />
                </>
              ) : (
                <>
                  <span>إرسال</span>
                  <ChevronRight className="w-5 h-5 rotate-180" />
                </>
              )}
            </button>
          </div>
        </form>
      ) : (
        /* Membership display on Registration Success - Clean, without digital membership card as requested */
        <div id="registration-success-badge" className="max-w-xl mx-auto animate-fadeIn text-center space-y-6 py-8" dir="rtl">
          <div className="bg-emerald-50/60 border border-emerald-100/80 p-8 rounded-3xl space-y-4 shadow-xl shadow-emerald-50/40">
            <div className="w-16 h-16 bg-emerald-100/90 rounded-full flex items-center justify-center mx-auto text-emerald-600 ring-8 ring-emerald-50">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="font-sans font-black text-xl md:text-2xl text-emerald-950 leading-tight">
              تم الإرسال بنجاح!
            </h3>
            <p className="text-base text-emerald-800 font-sans font-extrabold max-w-sm mx-auto leading-relaxed">
              تم الإرسال بنجاح سيتم التواصل معك قريباً.
            </p>
          </div>

          <div className="flex justify-center">
            <button
              id="reset-form-btn"
              type="button"
              onClick={handleReset}
              className="px-6 py-3 rounded-xl font-sans font-black text-sm bg-slate-900 text-white hover:bg-slate-800 shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              عودة لتقديم طلب آخر
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
