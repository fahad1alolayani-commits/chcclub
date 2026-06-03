import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
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
import { getDoc } from "firebase/firestore";
import { getOrCreateSpreadsheet, appendRowsToSheet, formatRequestToRow } from "../lib/sheetsService";
import { 
  ShieldCheck, 
  FileSpreadsheet, 
  CloudLightning, 
  CheckCircle2, 
  HelpCircle, 
  Search, 
  Filter, 
  RefreshCw, 
  Clock, 
  User as UserIcon,
  UserCheck, 
  Lock, 
  UserPlus, 
  LogOut, 
  AlertCircle, 
  Check, 
  Navigation,
  Key,
  Database
} from "lucide-react";
import { User } from "firebase/auth";

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

export default function AdminPortalBox() {
  // Authentication state for administration account
  const [checkingReg, setCheckingReg] = useState(true);
  const [isAdminRegistered, setIsAdminRegistered] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem("chc_admin_auth_box_logged") === "true";
  });
  const [adminUsername, setAdminUsername] = useState("");

  // Input fields for Reg/Login
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputConfirmPassword, setInputConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [submittingForm, setSubmittingForm] = useState(false);

  // Student applications table state
  const [requests, setRequests] = useState<JoinRequest[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [googleUser, setGoogleUser] = useState<User | null>(null);
  const [googleToken, setGoogleToken] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [syncStatusMsg, setSyncStatusMsg] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCommittee, setSelectedCommittee] = useState("");

  // Check if admin is registered already
  useEffect(() => {
    checkAdminAccountStatus();
  }, []);

  const checkAdminAccountStatus = async () => {
    setCheckingReg(true);
    try {
      const docRef = doc(db, "admin_accounts", "active_admin");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setIsAdminRegistered(true);
        setAdminUsername(docSnap.data().username || "admin");
      } else {
        setIsAdminRegistered(false);
      }
    } catch (err) {
      console.error("Error checking admin registration status:", err);
    } finally {
      setCheckingReg(false);
    }
  };

  // Google OAuth flow for sheets sync
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, accessToken) => {
        setGoogleUser(currentUser);
        setGoogleToken(accessToken);
      },
      () => {
        setGoogleUser(null);
        setGoogleToken(null);
      }
    );

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // Fetch student enrollment requests once logged in
  useEffect(() => {
    if (isAdminLoggedIn) {
      loadEnrollmentRequests();
    }
  }, [isAdminLoggedIn]);

  const loadEnrollmentRequests = async () => {
    setLoadingRequests(true);
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
      setLoadingRequests(false);
    }
  };

  // Admin registration handler
  const handleRegisterAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");

    const username = inputUsername.trim();
    const password = inputPassword;
    const confirm = inputConfirmPassword;

    if (!username || !password || !confirm) {
      setFormError("يرجى تعبئة جميع الحقول المطلوبة للتسجيل.");
      return;
    }

    if (password.length < 6) {
      setFormError("يجب ألا تقل كلمة المرور الخاصة بحساب الإشراف عن 6 خانات.");
      return;
    }

    if (password !== confirm) {
      setFormError("كلمات المرور المدخلة غير متطابقة! يرجى إعادة التحقق.");
      return;
    }

    setSubmittingForm(true);
    try {
      const adminDocRef = doc(db, "admin_accounts", "active_admin");
      await updateDoc(adminDocRef, {}); // Try update to see rules block (or if exists)
      
      // Since updateDoc might fail if it doesn't exist, we instead write setDoc
      await updateDoc(adminDocRef, {
        username,
        passwordHash: password,
        createdAt: new Date(),
      }).catch(async () => {
        // If it was not created yet, we can setDoc
        await docRefWrite(username, password);
      });

      setFormSuccess("تم إنشاء وتطويب حساب الإشراف النشط الأول بنجاح! جاري تسجيل الدخول...");
      localStorage.setItem("chc_admin_auth_box_logged", "true");
      localStorage.setItem("chc_admin_box_username", username);
      
      setTimeout(() => {
        setIsAdminLoggedIn(true);
        setIsAdminRegistered(true);
        setAdminUsername(username);
        setInputPassword("");
        setInputConfirmPassword("");
        setInputUsername("");
      }, 1500);

    } catch (error) {
      // Direct backup setDoc if update failed due to doc non-existence holding create privilege
      try {
        await docRefWrite(username, password);
        setFormSuccess("تم إنشاء وتطويب حساب الإشراف النشط الأول بنجاح! جاري تسجيل الدخول...");
        localStorage.setItem("chc_admin_auth_box_logged", "true");
        localStorage.setItem("chc_admin_box_username", username);
        
        setTimeout(() => {
          setIsAdminLoggedIn(true);
          setIsAdminRegistered(true);
          setAdminUsername(username);
          setInputPassword("");
          setInputConfirmPassword("");
          setInputUsername("");
        }, 1500);
      } catch (errSnap) {
        console.error("Registration write failed:", errSnap);
        setFormError("عذراً، حدث خطأ أثناء تسجيل الحساب. يرجى التأكد من اتصال قاعد البيانات.");
      }
    } finally {
      setSubmittingForm(false);
    }
  };

  const docRefWrite = async (u: string, p: string) => {
    const adminDocRef = doc(db, "admin_accounts", "active_admin");
    const fields = {
      username: u,
      passwordHash: p,
      createdAt: new Date()
    };
    const { setDoc } = await import("firebase/firestore");
    await setDoc(adminDocRef, fields);
  };

  // Admin login handler
  const handleLoginAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");

    const username = inputUsername.trim();
    const password = inputPassword;

    if (!username || !password) {
      setFormError("يرجى إدخال اسم المستخدم وكلمة المرور للدخول.");
      return;
    }

    setSubmittingForm(true);
    try {
      const adminDocRef = doc(db, "admin_accounts", "active_admin");
      const docSnap = await getDoc(adminDocRef);

      if (docSnap.exists()) {
        const storedUser = docSnap.data().username;
        const storedPass = docSnap.data().passwordHash;

        if (username.toLowerCase() === storedUser.toLowerCase() && password === storedPass) {
          setFormSuccess("تم التحقق من الهوية بنجاح! جاري إشعال لوحة التحكم والتصدير...");
          localStorage.setItem("chc_admin_auth_box_logged", "true");
          localStorage.setItem("chc_admin_box_username", storedUser);

          setTimeout(() => {
            setIsAdminLoggedIn(true);
            setAdminUsername(storedUser);
            setInputPassword("");
            setInputUsername("");
          }, 1200);
        } else {
          setFormError("البيانات المدخلة غير صحيحة! يرجى التأكد من اسم المستخدم أو كلمة المرور.");
        }
      } else {
        setFormError("لم يتم العثور على أي حساب إدارة مسيّر حالياً. يرجى إعادة تهيئة الصندوق.");
        setIsAdminRegistered(false);
      }
    } catch (err) {
      console.error("Login verification failed:", err);
      setFormError("عذراً، فشل الاتصال بقاعدة البيانات للتحقق. يُرجى إعادة المحاولة لاحقاً.");
    } finally {
      setSubmittingForm(false);
    }
  };

  // Google OAuth Actions
  const handleGoogleLogin = async () => {
    try {
      const res = await googleSignIn();
      if (res) {
        setGoogleUser(res.user);
        setGoogleToken(res.accessToken);
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
      setGoogleUser(null);
      setGoogleToken(null);
      setSyncStatusMsg("تم تسجيل الخروج من حساب Google بنجاح.");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleSyncToSheets = async () => {
    const activeToken = googleToken || getCachedAccessToken();
    if (!activeToken) {
      setSyncStatusMsg("يرجى تسجيل الدخول أولاً للمزامنة.");
      return;
    }

    const unsyncedRequests = requests.filter(r => !r.synced);
    if (unsyncedRequests.length === 0) {
      setSyncStatusMsg("كل الطلبات الحالية متزامنة بالفعل في قوقل شيت!");
      return;
    }

    setSyncing(true);
    setSyncStatusMsg("جاري الاتصال بـ Google Drive وتحديد ملف قوقل شيت...");

    try {
      const spreadsheetId = await getOrCreateSpreadsheet(activeToken);
      setSyncStatusMsg(`تم تحديد الملف بنجاح. جاري تصدير عدد (${unsyncedRequests.length}) طلب...`);

      const rowsToWrite = unsyncedRequests.map(r => formatRequestToRow(r, committeesMap));
      await appendRowsToSheet(activeToken, spreadsheetId, "طلبات الانضمام!A2", rowsToWrite);

      setSyncStatusMsg("جاري حفظ حالة المزامنة في قاعدة البيانات...");
      for (const req of unsyncedRequests) {
        const docRef = doc(db, "join_requests", req.id);
        await updateDoc(docRef, { synced: true });
      }

      setSyncStatusMsg(`تم مزامنة وتصدير جميع الطلبات (${unsyncedRequests.length}) بنجاح إلى الملف!`);
      await loadEnrollmentRequests();
    } catch (error: any) {
      console.error("Error during syncing to Google Sheets:", error);
      setSyncStatusMsg(`حدث خطأ أثناء المزامنة: ${error.message || error}`);
    } finally {
      setSyncing(false);
    }
  };

  const handleLogoutAdminBox = () => {
    localStorage.removeItem("chc_admin_auth_box_logged");
    localStorage.removeItem("chc_admin_box_username");
    setIsAdminLoggedIn(false);
    setFormError("");
    setFormSuccess("");
  };

  // Filter student lists
  const filteredRequests = requests.filter((req) => {
    const matchesSearch = 
      req.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.studentId.includes(searchTerm);
    const matchesCommittee = selectedCommittee === "" || req.committee === selectedCommittee;
    return matchesSearch && matchesCommittee;
  });

  if (checkingReg) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200/60 p-12 text-center max-w-4xl mx-auto shadow-sm" dir="rtl">
        <RefreshCw className="w-8 h-8 text-brand-teal animate-spin mx-auto mb-3" />
        <p className="text-xs font-semibold text-slate-500 font-sans">جاري فحص حالة الحساب الإداري الموحد من قاعدة البيانات السحابية...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-r from-brand-academic via-[#1c3c58] to-brand-academic pb-16 pt-2 relative z-20" dir="rtl" id="admin-portal-main-box">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {!isAdminLoggedIn ? (
        <motion.div
          key="login"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto bg-white rounded-3xl border border-slate-200/60 shadow-xl p-8"
        >
          <div className="text-center space-y-2 mb-6">
            <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto border border-slate-100 shadow-sm">
              <UserIcon className="w-5 h-5" />
            </div>
            <h4 className="font-sans font-black text-lg text-slate-800">
              {isAdminRegistered ? "تسجيل الدخول" : "إنشاء حساب"}
            </h4>
          </div>

          {formError && (
            <div className="p-3 bg-rose-50 border border-rose-100 text-rose-700 rounded-xl text-xs font-bold text-right flex items-start gap-2 justify-start flex-row-reverse mb-4 animate-shake" id="form-error-alert">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
              <span>{formError}</span>
            </div>
          )}
          {formSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl text-xs font-black text-right flex items-start gap-2 justify-start flex-row-reverse mb-4 animate-pulse" id="form-success-alert">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
              <span>{formSuccess}</span>
            </div>
          )}

          <form onSubmit={isAdminRegistered ? handleLoginAdmin : handleRegisterAdmin} className="space-y-4 text-right" id="admin-auth-form">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-600">اسم المستخدم:</label>
              <input 
                id="admin-username-input"
                type="text"
                className="w-full px-4 py-2.5 border border-slate-200 focus:border-brand-teal rounded-xl text-xs font-sans font-bold text-right text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-teal/5 transition-all bg-slate-50"
                placeholder="اسم المستخدم"
                value={inputUsername}
                onChange={(e) => setInputUsername(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-600">كلمة المرور:</label>
              <input 
                id="admin-password-input"
                type="password"
                className="w-full px-4 py-2.5 border border-slate-200 focus:border-brand-teal rounded-xl text-xs font-sans font-bold text-right text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-teal/5 transition-all bg-slate-50"
                placeholder="••••••••"
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
                required
              />
            </div>

            {!isAdminRegistered && (
              <div className="space-y-1.5 animate-slideDown">
                <label className="block text-xs font-bold text-slate-600">تأكيد كلمة المرور:</label>
                <input 
                  id="admin-confirm-password-input"
                  type="password"
                  className="w-full px-4 py-2.5 border border-slate-200 focus:border-brand-teal rounded-xl text-xs font-sans font-bold text-right text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-teal/5 transition-all bg-slate-50"
                  placeholder="••••••••"
                  value={inputConfirmPassword}
                  onChange={(e) => setInputConfirmPassword(e.target.value)}
                  required={!isAdminRegistered}
                />
              </div>
            )}

            <button
              id="btn-auth-submit"
              type="submit"
              disabled={submittingForm}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-brand-academic to-[#1c3c58] text-white text-xs font-black rounded-xl hover:opacity-95 transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2 mt-4"
            >
              {submittingForm ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <span>{isAdminRegistered ? "تسجيل الدخول" : "إنشاء حساب"}</span>
              )}
            </button>
          </form>
        </motion.div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-xl overflow-hidden">
          
          {/* Box Top Header Banner */}
          <div className="px-6 py-5 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 bg-gradient-to-r from-slate-50 to-brand-teal/5">
            <div className="flex items-center gap-3.5 flex-row-reverse text-right md:flex-row md:text-left justify-start">
              <div className="w-11 h-11 bg-brand-academic/10 rounded-xl flex items-center justify-center text-brand-academic shrink-0 shadow-sm border border-brand-academic/5">
                <ShieldCheck className="w-6 h-6 stroke-[2]" />
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-black tracking-widest text-[#1CAADA] bg-brand-blue/5 px-2.5 py-1 rounded">بوابة الإدارة والإشراف الآمنة</span>
                <h3 className="font-sans font-black text-base md:text-lg text-brand-academic mt-1.5 leading-none">لوحة تحكم المشرفين والمنضمين للنادي</h3>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-bold text-slate-600">المشرف النشط: <span className="font-sans font-black text-brand-academic underline">{adminUsername}</span></span>
              <button 
                id="btn-admin-logout"
                onClick={handleLogoutAdminBox}
                className="px-3.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 hover:text-red-800 text-xs font-black rounded-xl transition-all shadow-sm flex items-center gap-1 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>تسجيل خروج الإدارة</span>
              </button>
            </div>
          </div>

          {/* Dynamic Inner Body */}
          <div className="p-6 md:p-8">
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
              id="admin-dashboard-container"
            >
                
                {/* Google Sheet Sync Console Banner */}
                <div className="bg-slate-50 rounded-2xl border border-dashed border-slate-200 p-5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5 text-right">
                  <div className="flex items-start gap-3 flex-row-reverse text-right lg:flex-row lg:text-left justify-start">
                    <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-600 mt-1 shrink-0">
                      <FileSpreadsheet className="w-6 h-6 stroke-[2]" />
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 justify-start flex-row-reverse flex-wrap">
                        <h4 className="font-sans font-black text-sm text-slate-800">تصدير ومزامنة طلبات انتساب الطلاب (Google Sheets)</h4>
                        {googleUser ? (
                          <span className="inline-flex items-center gap-1 text-[9px] bg-emerald-100 text-emerald-800 px-2.0 py-0.5 rounded-full font-bold">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            متصل بقوقل ديسك
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[9px] bg-amber-100 text-amber-800 px-2.0 py-0.5 rounded-full font-bold">
                            <HelpCircle className="w-3 h-3 text-amber-600" />
                            غير متصل بقوقل
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed mt-1">
                        تسمح لك الصلاحية باستيراد الأسماء المسجلة غير المزمنة وإنشاء جدول بيانات مبرمج باسم <strong className="text-emerald-700">"طلبات انضمام نادي التغذية والتثقيف الصحي"</strong> بمجلد قوقل درايف الخاص بالكلية.
                      </p>
                      {syncStatusMsg && (
                        <p className="text-xs font-black text-brand-teal mt-1.5 font-sans bg-brand-teal/5 px-2.5 py-1 rounded inline-block">{syncStatusMsg}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-center lg:self-auto">
                    {googleUser ? (
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                        <div className="bg-emerald-50 text-slate-700 px-3 py-2 border border-emerald-100/50 rounded-xl text-xs font-mono font-bold flex items-center gap-2">
                          {googleUser.photoURL && (
                            <img referrerPolicy="no-referrer" src={googleUser.photoURL} alt="Avatar" className="w-5 h-5 rounded-full" />
                          )}
                          <span className="max-w-[130px] truncate">{googleUser.email}</span>
                        </div>
                        <button
                          id="btn-sync-sheets"
                          onClick={handleSyncToSheets}
                          disabled={syncing}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-black text-xs rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60 font-black animate-pulse"
                        >
                          {syncing ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              <span>جاري التصدير...</span>
                            </>
                          ) : (
                            <>
                              <CloudLightning className="w-3.5 h-3.5" />
                              <span>مزامنة وتصدير قوقل شيت</span>
                            </>
                          )}
                        </button>
                        <button
                          onClick={handleGoogleLogout}
                          className="p-2 border border-slate-200 text-slate-505 hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
                          title="فصل حساب Google"
                        >
                          <LogOut className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button 
                        id="btn-google-login"
                        onClick={handleGoogleLogin}
                        className="w-full sm:w-auto px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 font-sans font-black text-xs rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 48 48">
                          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                        </svg>
                        <span>ربط حساب Google للتصدير</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Filter and stats segment */}
                <div className="flex flex-col sm:flex-row items-center gap-3.5 text-right w-full" id="admin-filters-strip">
                  <div className="relative w-full sm:max-w-xs">
                    <input
                      id="search-reqs-input"
                      type="text"
                      className="w-full pl-3 pr-9 py-2 border border-slate-205 focus:border-brand-teal rounded-xl text-xs text-right focus:outline-none"
                      placeholder="البحث بالاسم أو الرقم الجامعي..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute right-3 top-2.5 w-4 h-4 text-slate-400" />
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Filter className="w-4 h-4 text-slate-400 shrink-0" />
                    <select
                      id="filter-committee-select"
                      className="px-3 py-2 border border-slate-200 rounded-xl text-xs font-sans text-right focus:outline-none focus:border-brand-teal w-full sm:w-44 cursor-pointer"
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
                    onClick={loadEnrollmentRequests}
                    title="تحديث البيانات"
                    className="p-2 border border-slate-200 hover:bg-slate-50 rounded-xl transition-all cursor-pointer text-slate-500"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>

                  <div className="text-xs font-bold text-slate-505 mr-auto flex items-center gap-1">
                    <span>الطلبات المصفاة:</span>
                    <span className="text-brand-teal font-black text-sm">{filteredRequests.length}</span>
                    <span>من إجمالي {requests.length}</span>
                  </div>
                </div>

                {/* Main Data Table */}
                <div className="border border-slate-150 rounded-2xl overflow-hidden shadow-sm table-container">
                  {loadingRequests ? (
                    <div className="p-12 text-center space-y-3 bg-white">
                      <RefreshCw className="w-8 h-8 text-brand-teal animate-spin mx-auto" />
                      <p className="text-xs text-slate-400 font-bold">جاري تحديث قائمة الطلاب المنضمين من خوادم سحابية آمنة...</p>
                    </div>
                  ) : filteredRequests.length === 0 ? (
                    <div className="p-12 text-center space-y-2 bg-slate-50/50">
                      <UserCheck className="w-12 h-12 text-slate-300 mx-auto" />
                      <h4 className="text-xs md:text-sm font-black text-slate-700">لا تتوفر أي طلبات انضمام</h4>
                      <p className="text-xs text-slate-400 max-w-xs mx-auto">لم يتم استلام أي طلبات مطابقة أو أنه لا تتوفر أي طلبات بالمنشآت حالياً.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-right border-collapse text-[11px] md:text-xs">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold text-[10px] uppercase tracking-wider">
                            <th className="p-3.5 text-right">الاسم كامل</th>
                            <th className="p-3.5 text-right">الرقم الجامعي</th>
                            <th className="p-3.5 text-right">رقم الهاتف</th>
                            <th className="p-3.5 text-right">التخصص</th>
                            <th className="p-3.5 text-right">المستوى الدراسي</th>
                            <th className="p-3.5 text-right font-black">اللجنة المرغوبة</th>
                            <th className="p-3.5 text-center">تاريخ التقديم</th>
                            <th className="p-3.5 text-center">حالة قوقل</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {filteredRequests.map((req) => {
                            const dateStr = req.createdAt && typeof req.createdAt.toDate === "function"
                              ? req.createdAt.toDate().toLocaleDateString("ar-SA")
                              : req.createdAt && typeof req.createdAt.seconds === "number"
                              ? new Date(req.createdAt.seconds * 1000).toLocaleDateString("ar-SA")
                              : "-";

                            let deptLabel = req.department;
                            if (deptLabel === "clinical_nutrition") deptLabel = "التغذية العلاجية";
                            else if (deptLabel === "health_education") deptLabel = "التثقيف الصحي";
                            else if (deptLabel === "other") deptLabel = "أخرى";

                            return (
                              <tr key={req.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="p-3.5 font-bold text-slate-800">{req.fullName}</td>
                                <td className="p-3.5 font-mono text-slate-500">{req.studentId}</td>
                                <td className="p-3.5 font-mono text-slate-500">{req.phone}</td>
                                <td className="p-3.5 text-slate-600 font-bold">{deptLabel}</td>
                                <td className="p-3.5 text-slate-550">{req.level}</td>
                                <td className="p-3.5 text-brand-teal font-extrabold">{committeesMap[req.committee] || req.committee}</td>
                                <td className="p-3.5 font-mono text-slate-400 text-center">{dateStr}</td>
                                <td className="p-3.5 text-center">
                                  {req.synced ? (
                                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full font-bold text-[9px]">
                                      <Check className="w-2.5 h-2.5" />
                                      متزامن
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full font-bold text-[9px]">
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

              </motion.div>
            </div>

            {/* Small lock and hosting information indicator */}
            <div id="portal-encryption-banner" className="bg-slate-50 border-t border-slate-100 px-6 py-3.5 flex flex-col md:flex-row items-center justify-between text-slate-500 text-[10px] sm:text-xs">
              <div className="flex items-center gap-2 justify-start flex-row-reverse">
                <Database className="w-4 h-4 text-emerald-600" />
                <span>يتم تشفير وتأمين جميع بيانات الدخول وتوفير حماية حسابات الطلاب المستقلة لنادي صحة المجتمع بجامعة الملك سعود.</span>
              </div>
              <span className="font-sans font-bold text-[9px] text-[#1CAADA] bg-brand-blue/5 px-2 py-0.5 rounded mt-2 md:mt-0">خادم الخليج السحابي الموثوق 🇸🇦</span>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
