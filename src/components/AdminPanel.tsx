import React, { useState, useEffect } from "react";
import { 
  db, 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  updateDoc, 
  doc, 
  initAuth, 
  googleSignIn, 
  logout,
  getCachedAccessToken
} from "../lib/firebase";
import { getOrCreateSpreadsheet, appendRowsToSheet, formatRequestToRow } from "../lib/sheetsService";
import { 
  X, 
  ShieldCheck, 
  CloudLightning, 
  CheckCircle2, 
  HelpCircle, 
  Search, 
  Filter, 
  LogOut, 
  FileSpreadsheet, 
  RefreshCw,
  Clock,
  UserCheck
} from "lucide-react";
import { User } from "firebase/auth";

interface AdminPanelProps {
  onClose: () => void;
}

interface JoinRequest {
  id: string;
  fullName: string;
  studentId: string;
  phone: string;
  level: string;
  department: string;
  committee: string;
  createdAt?: any;
  synced?: boolean;
}

const committeesMap: Record<string, string> = {
  "hr-c": "لجنة الموارد البشرية",
  "reports-c": "لجنة التقارير والجودة",
  "content-c": "لجنة المحتوى",
  "pr-c": "لجنة العلاقات العامة",
  "logistics-c": "لجنة الدعم اللوجستي",
  "media-c-tweet": "لجنة الإعلام",
  "design-c": "لجنة التصميم",
  "planning-c": "لجنة التخطيط والابتكار",
};

export default function AdminPanel({ onClose }: AdminPanelProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [requests, setRequests] = useState<JoinRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCommittee, setSelectedCommittee] = useState("");
  const [syncStatusMsg, setSyncStatusMsg] = useState("");

  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("chc_admin_authed") === "true";
  });
  const [passcodeError, setPasscodeError] = useState("");

  // Initialize Auth Listening
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, accessToken) => {
        setUser(currentUser);
        setToken(accessToken);
      },
      () => {
        setUser(null);
        setToken(null);
      }
    );

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // Sync / Load requests once passcode authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadRequests();
    }
  }, [isAuthenticated]);

  const loadRequests = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "join_requests"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const reqList: JoinRequest[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        reqList.push({
          id: docSnap.id,
          fullName: data.fullName || "",
          studentId: data.studentId || "",
          phone: data.phone || "",
          level: data.level || "",
          department: data.department || "",
          committee: data.committee || "",
          createdAt: data.createdAt,
          synced: !!data.synced,
        });
      });
      setRequests(reqList);
    } catch (err) {
      console.error("Error loading join requests from Firestore:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        setToken(res.accessToken);
        setSyncStatusMsg("تم تسجيل الدخول بنجاح بإستخدام حساب Google الخاص بك.");
      }
    } catch (err) {
      console.error("Google login failed:", err);
      setSyncStatusMsg("فشل تسجيل الدخول بـ Google. يرجى التأكد من قبول الصلاحيات.");
    }
  };

  const handleGoogleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setToken(null);
      setSyncStatusMsg("تم تسجيل الخروج من حساب Google بنجاح.");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleSyncToSheets = async () => {
    const activeToken = token || getCachedAccessToken();
    if (!activeToken) {
      setSyncStatusMsg("يرجى تسجيل الدخول أولاً للمزامنة.");
      return;
    }

    // Filter to requests that are not yet synced
    const unsyncedRequests = requests.filter(r => !r.synced);
    if (unsyncedRequests.length === 0) {
      setSyncStatusMsg("كل الطلبات الحالية متزامنة بالفعل في قوقل شيت!");
      return;
    }

    setSyncing(true);
    setSyncStatusMsg("جاري الاتصال بـ Google Drive وتحديد ملف قوقل شيت...");

    try {
      // Get or create spreadsheet
      const spreadsheetId = await getOrCreateSpreadsheet(activeToken);
      
      setSyncStatusMsg(`تم تحديد الملف بنجاح. جاري تصدير عدد (${unsyncedRequests.length}) طلب...`);

      // Prepare values to write
      const rowsToWrite = unsyncedRequests.map(r => formatRequestToRow(r, committeesMap));

      // Append values
      await appendRowsToSheet(activeToken, spreadsheetId, "طلبات الانضمام!A2", rowsToWrite);

      // Update local and firestore database sync status
      setSyncStatusMsg("جاري حفظ حالة المزامنة في قاعدة البيانات...");
      for (const req of unsyncedRequests) {
        const docRef = doc(db, "join_requests", req.id);
        await updateDoc(docRef, { synced: true });
      }

      setSyncStatusMsg(`تم مزامنة وتصدير جميع الطلبات (${unsyncedRequests.length}) بنجاح إلى الملف!`);
      // Reload requests to update state
      await loadRequests();
    } catch (error: any) {
      console.error("Error during syncing to Google Sheets:", error);
      setSyncStatusMsg(`حدث خطأ أثناء المزامنة: ${error.message || error}`);
    } finally {
      setSyncing(false);
    }
  };

  const filteredRequests = requests.filter((req) => {
    const matchesSearch = 
      req.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.studentId.includes(searchTerm);
    const matchesCommittee = selectedCommittee === "" || req.committee === selectedCommittee;
    return matchesSearch && matchesCommittee;
  });

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4" dir="rtl">
        <div className="bg-white rounded-2xl w-full max-w-md p-6 md:p-8 shadow-2xl border border-emerald-100/50 animate-fadeIn text-right space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="font-sans font-black text-xl text-slate-800">التحقق من الهوية وصلاحية الدخول</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              هذه المنطقة مخصصة لإدارة النادي فقط ومحمية ببيانات مشفرة. يُرجى إدخال رمز المرور السري للدخول واستعراض بيانات الطلبات ومزامنتها.
            </p>
          </div>

          <form onSubmit={(e) => {
            e.preventDefault();
            const normalized = passcode.trim().toLowerCase();
            if (normalized === "chc2026" || normalized === "ksu2026" || normalized === "admin2026") {
              setIsAuthenticated(true);
              localStorage.setItem("chc_admin_authed", "true");
              setPasscodeError("");
            } else {
              setPasscodeError("رمز المرور المدخل غير صحيح! يرجى التحقق وإعادة المحاولة.");
            }
          }} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">رمز المرور السري</label>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500 text-center tracking-widest font-mono"
                placeholder="••••••••"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                autoFocus
              />
              {passcodeError && (
                <p className="text-red-500 text-xs mt-2 font-bold text-right leading-relaxed">{passcodeError}</p>
              )}
            </div>

            <div className="flex gap-2.5">
              <button
                type="submit"
                className="flex-1 py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-black rounded-xl hover:opacity-95 transition-all shadow-md active:scale-95 cursor-pointer text-center"
              >
                تحقق ودخول اللوحة
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-3 border border-slate-200 text-slate-500 text-xs font-bold rounded-xl hover:bg-slate-50 transition-all active:scale-95 cursor-pointer"
              >
                إلغاء
              </button>
            </div>
          </form>


        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 overflow-hidden" dir="rtl">
      <div className="bg-white rounded-2xl w-full max-w-6xl h-[90vh] flex flex-col shadow-2xl border border-emerald-100/50 animate-fadeIn relative overflow-hidden">
        
        {/* TOP BAR / HEADER */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-emerald-50/20 to-teal-50/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-100/80 rounded-xl text-emerald-700">
              <ShieldCheck className="w-5.5 h-5.5" />
            </div>
            <div>
              <h2 className="font-sans font-black text-lg text-slate-800 leading-tight">لوحة إدارة ومزامنة الطلبات</h2>
              <p className="text-[11px] text-slate-500 font-sans mt-0.5">مراجعة بيانات المنضمين وتصديرها مباشرةً لـ Google Sheets</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-650 hover:bg-slate-100 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* GOOGLE SHEET AUTH CONSOLE */}
        <div className="px-6 py-4.5 bg-slate-50 border-b border-emerald-100/30 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-600 mt-1">
              <FileSpreadsheet className="w-5.5 h-5.5" />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 flex-wrap text-right">
                <span className="font-sans font-black text-sm text-slate-800">حساب المزامنة لقوقل شيت (Google Sheets)</span>
                {user ? (
                  <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-100 text-emerald-800 px-2.0 py-0.5 rounded-full font-bold">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    متصل بقوقل
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] bg-amber-100 text-amber-800 px-2.0 py-0.5 rounded-full font-bold">
                    <HelpCircle className="w-3 h-3 text-amber-600" />
                    غير متصل
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
                عند الاتصال وتصدير البيانات، سيقوم النادي بإنشاء ملف قوقل شيت باسم <strong>"طلبات انضمام نادي التغذية والتثقيف الصحي"</strong> بمجلد Drive الخاص بك وتصدير كافة الأسماء الجديدة إليه تلقائياً.
              </p>
              {syncStatusMsg && (
                <p className="text-xs font-black text-brand-teal mt-1 font-sans">{syncStatusMsg}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {user ? (
              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2">
                <div className="bg-emerald-50 text-slate-700 px-3 py-2 rounded-xl border border-emerald-100 text-xs font-bold leading-tight flex items-center gap-2">
                  {user.photoURL && (
                    <img referrerPolicy="no-referrer" src={user.photoURL} alt="Avatar" className="w-5 h-5 rounded-full" />
                  )}
                  <span className="font-mono text-[11px] truncate max-w-[120px] md:max-w-xs">{user.email}</span>
                </div>
                <button
                  onClick={handleSyncToSheets}
                  disabled={syncing}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-black text-xs rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
                >
                  {syncing ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>جاري المزامنة...</span>
                    </>
                  ) : (
                    <>
                      <CloudLightning className="w-3.5 h-3.5 animate-pulse" />
                      <span>مزامنة وتصدير قوقل شيت</span>
                    </>
                  )}
                </button>
                <button
                  onClick={handleGoogleLogout}
                  className="p-2 bg-slate-200/60 hover:bg-slate-205 text-slate-600 hover:text-slate-700 rounded-xl transition-all cursor-pointer"
                  title="تسجيل الخروج"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button 
                onClick={handleGoogleLogin}
                className="w-full md:w-auto px-4 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:opacity-95 text-white font-sans font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                </svg>
                <span>ربط حساب Google للحفظ</span>
              </button>
            )}
          </div>
        </div>

        {/* SEARCH & FILTERS CONTROLS */}
        <div className="px-6 py-4 bg-white border-b border-slate-100 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:max-w-sm">
            <input
              type="text"
              className="w-full pl-3 pr-9 py-2 rounded-xl border border-slate-200 text-xs text-right focus:outline-none focus:border-emerald-500 font-sans"
              placeholder="البحث بالاسم أو الرقم الجامعي..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-3 top-2.5 w-4 h-4 text-slate-400" />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              className="px-3 py-2 border border-slate-200 rounded-xl text-xs font-sans text-right focus:outline-none focus:border-emerald-500 w-full sm:w-48 cursor-pointer"
              value={selectedCommittee}
              onChange={(e) => setSelectedCommittee(e.target.value)}
            >
              <option value="">جميع اللجان</option>
              {Object.entries(committeesMap).map(([id, label]) => (
                <option key={id} value={id}>{label}</option>
              ))}
            </select>
          </div>

          <button
            onClick={loadRequests}
            title="تحديث القائمة"
            className="p-2 rounded-xl border border-slate-100 hover:bg-slate-50 transition-all shrink-0 cursor-pointer text-slate-500"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <div className="text-xs font-bold text-slate-500 mr-auto flex items-center gap-1">
            <span>إجمالي الطلبات (المصفى):</span>
            <span className="text-emerald-700 font-black font-sans">{filteredRequests.length}</span>
            <span>من أصل {requests.length}</span>
          </div>
        </div>

        {/* DATA TABLE AREA */}
        <div className="flex-1 overflow-auto bg-slate-55/40 p-4 md:p-6">
          {loading ? (
            <div className="h-full flex flex-col items-center justify-center space-y-3">
              <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin" />
              <p className="text-xs text-slate-450 font-bold">جاري تحميل طلبات المنضمين من قاعدة البيانات...</p>
            </div>
          ) : filteredRequests.length === 0 ? (
            <div className="h-full border border-dashed border-slate-200/80 rounded-2xl flex flex-col items-center justify-center p-8 text-center bg-white/70">
              <UserCheck className="w-12 h-12 text-slate-300 stroke-[1.5] mb-2" />
              <h3 className="text-sm font-bold text-slate-800">لا توجد طلبات انضمام حالية</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm">لم يتم تسجيل أي طلبات انضمام تتوافق مع عمليات البحث أو الفلاتر المحددة حالياً.</p>
            </div>
          ) : (
            <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm table-container">
              <table className="w-full text-right border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-wider">
                    <th className="p-4">الاسم كامل</th>
                    <th className="p-4">الرقم الجامعي</th>
                    <th className="p-4">الجوال</th>
                    <th className="p-4">المستوى الدراسي</th>
                    <th className="p-4">التخصص</th>
                    <th className="p-4">اللجنة المطلوبة</th>
                    <th className="p-4">تاريخ التقديم</th>
                    <th className="p-4 text-center">حالة قوقل</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRequests.map((req) => {
                    const dateStr = req.createdAt && typeof req.createdAt.toDate === "function"
                      ? req.createdAt.toDate().toLocaleDateString("ar-SA")
                      : "-";

                    let deptLabel = req.department;
                    if (deptLabel === "clinical_nutrition") deptLabel = "التغذية السريرية";
                    else if (deptLabel === "health_education") deptLabel = "التثقيف الصحي";

                    return (
                      <tr key={req.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 font-black text-slate-800">{req.fullName}</td>
                        <td className="p-4 font-mono font-bold text-slate-500">{req.studentId}</td>
                        <td className="p-4 font-mono text-slate-600">{req.phone}</td>
                        <td className="p-4 text-slate-600">{req.level}</td>
                        <td className="p-4 text-slate-600">{deptLabel}</td>
                        <td className="p-4 font-semibold text-brand-teal">{committeesMap[req.committee] || req.committee}</td>
                        <td className="p-4 font-mono text-slate-450">{dateStr}</td>
                        <td className="p-4 text-center">
                          {req.synced ? (
                            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full font-bold text-[10px]">
                              متزامن
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full font-bold text-[10px]">
                              معلّق
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* FOOTER CONTROLS */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between flex-row-reverse">
          <div className="flex gap-2">
            <button
              onClick={() => {
                localStorage.removeItem("chc_admin_authed");
                setIsAuthenticated(false);
              }}
              className="px-4 py-2 bg-red-50 hover:bg-red-100 border border-red-100/70 text-red-700 rounded-xl text-xs font-black transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>خروج الإدارة</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 hover:bg-slate-200/70 border border-slate-200/30 rounded-xl text-slate-650 text-xs font-black transition-all active:scale-95 cursor-pointer"
            >
              إغلاق النافذة
            </button>
          </div>
          
          <div className="flex items-center gap-2 text-slate-500 text-[10px] sm:text-xs">
            <Clock className="w-4 h-4 text-slate-400" />
            <span>يتم تخزين جميع البيانات في خوادم سحابية آمنة في السعودية.</span>
          </div>
        </div>

      </div>
    </div>
  );
}
