import { useState } from "react";
import {
  Eye, EyeOff, ArrowLeft, Mail, Lock, User, Dumbbell,
  ChevronRight, RefreshCw, CheckCircle,
} from "lucide-react";
import type { Screen } from "./BottomNav";

interface AuthPageProps {
  initialMode?: "login" | "register";
  onNavigate: (screen: Screen | "splash") => void;
}

type Step = "login" | "reg1" | "reg2" | "reg3";

/* Auto-calculate age from DD MM YYYY strings */
function calcAge(dd: string, mm: string, yyyy: string): string {
  if (!dd || !mm || !yyyy || yyyy.length < 4) return "";
  const d = parseInt(dd), mo = parseInt(mm), y = parseInt(yyyy);
  if (isNaN(d) || isNaN(mo) || isNaN(y) || mo < 1 || mo > 12 || d < 1 || d > 31) return "";
  const birth = new Date(y, mo - 1, d);
  if (isNaN(birth.getTime())) return "";
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const monthDiff = now.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) age--;
  return age >= 0 && age < 120 ? String(age) : "";
}

const inp: React.CSSProperties = {
  flex: 1, background: "none", border: "none", outline: "none",
  fontSize: 14, color: "#0F172A", fontFamily: "Inter, sans-serif",
};

function Field({ label, icon: Icon, optional, children }: {
  label: string; icon: React.FC<{ size?: number; color?: string }>;
  optional?: boolean; children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ fontSize: 11, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.6 }}>
        {label}{optional && <span style={{ fontWeight: 400, color: "#94A3B8", textTransform: "none", marginLeft: 4, fontSize: 10 }}>(optional)</span>}
      </label>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", background: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: 12 }}>
        <Icon size={16} color="#94A3B8" />
        {children}
      </div>
    </div>
  );
}

function Dots({ step }: { step: Step }) {
  const steps: Step[] = ["reg1", "reg2", "reg3"];
  const i = steps.indexOf(step);
  if (i < 0) return null;
  return (
    <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 22 }}>
      {steps.map((_, idx) => (
        <div key={idx} style={{ height: 5, borderRadius: 3, transition: "all 0.3s", background: idx <= i ? "#2563EB" : "#E2E8F0", width: idx === i ? 22 : 10 }} />
      ))}
    </div>
  );
}

export function AuthPage({ initialMode = "login", onNavigate }: AuthPageProps) {
  const [step, setStep] = useState<Step>(initialMode === "register" ? "reg1" : "login");

  /* login */
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);

  /* reg step 1 */
  const [name, setName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [dobD, setDobD] = useState("");
  const [dobM, setDobM] = useState("");
  const [dobY, setDobY] = useState("");

  /* reg step 2 */
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [resent, setResent] = useState(false);

  /* reg step 3 */
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConf, setShowConf] = useState(false);

  const age = calcAge(dobD, dobM, dobY);
  const otpFull = otp.every(Boolean);
  const passOk = newPass.length >= 8 && newPass === confirmPass;
  const reg1Ok = name.trim().length > 0 && regEmail.includes("@");

  const handleOtp = (val: string, i: number) => {
    const n = [...otp]; n[i] = val.replace(/\D/, "").slice(-1); setOtp(n);
    if (val && i < 5) document.getElementById(`otp-${i + 1}`)?.focus();
  };

  const strength = newPass.length === 0 ? 0 : newPass.length < 8 ? 1 : newPass.length < 12 ? 2 : 3;
  const sColor = ["#E2E8F0", "#EF4444", "#F59E0B", "#22C55E"][strength];

  const goBack = () => {
    if (step === "reg2") setStep("reg1");
    else if (step === "reg3") setStep("reg2");
    else onNavigate("splash" as Screen);
  };

  const titles: Record<Step, string> = { login: "Welcome Back", reg1: "Create Account", reg2: "Verify Email", reg3: "Set Password" };
  const subs: Record<Step, string> = {
    login: "Sign in to your fitness journey",
    reg1: "Step 1 of 3 — Your details",
    reg2: `Step 2 of 3 — Check ${regEmail || "your email"}`,
    reg3: "Step 3 of 3 — Choose a password",
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#F8FAFC", overflowY: "auto" }}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}`}</style>

      {/* Header */}
      <div style={{ background: "linear-gradient(160deg,#0F172A 0%,#1E3A5F 45%,#2563EB 100%)", padding: "52px 24px 28px", flexShrink: 0, position: "relative", overflow: "hidden" }}>
        {[[160, -40, -40], [80, 20, 48]].map(([s, t, r], i) => (
          <div key={i} style={{ position: "absolute", width: s, height: s, borderRadius: s / 2, border: "1px solid rgba(255,255,255,0.1)", top: t, right: r, pointerEvents: "none" }} />
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
          <button onClick={goBack} style={{ width: 34, height: 34, borderRadius: 12, background: "rgba(255,255,255,0.15)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <ArrowLeft size={17} color="#ffffff" />
          </button>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: "#2563EB", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Dumbbell size={16} color="#ffffff" />
          </div>
          <span style={{ fontSize: 15, fontWeight: 800, color: "#ffffff" }}>FitAustin</span>
        </div>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: "#ffffff", margin: "0 0 5px" }}>{titles[step]}</h1>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", margin: 0 }}>{subs[step]}</p>
      </div>

      {/* Form card */}
      <div style={{ flex: 1, padding: "0 20px 28px" }}>
        <div style={{ background: "#ffffff", borderRadius: "22px 22px 18px 18px", marginTop: -18, padding: "24px 20px", boxShadow: "0 -4px 20px rgba(0,0,0,0.07)", animation: "fadeUp 0.22s ease" }}>
          <Dots step={step} />

          {/* ══ LOGIN ══ */}
          {step === "login" && (
            <>
              <button onClick={() => onNavigate("home")} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "13px", background: "#ffffff", border: "1.5px solid #E2E8F0", borderRadius: 12, cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#0F172A", marginBottom: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                <svg width="17" height="17" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Continue with Google
              </button>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                <div style={{ flex: 1, height: 1, background: "#E2E8F0" }} />
                <span style={{ fontSize: 11, color: "#94A3B8" }}>or with email & password</span>
                <div style={{ flex: 1, height: 1, background: "#E2E8F0" }} />
              </div>
              <Field label="Email Address" icon={Mail}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" style={inp} />
              </Field>
              <Field label="Password" icon={Lock}>
                <input type={showPass ? "text" : "password"} value={pass} onChange={(e) => setPass(e.target.value)} placeholder="••••••••" style={inp} />
                <button onClick={() => setShowPass(!showPass)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                  {showPass ? <EyeOff size={15} color="#94A3B8" /> : <Eye size={15} color="#94A3B8" />}
                </button>
              </Field>
              <div style={{ textAlign: "right", marginTop: -6, marginBottom: 20 }}>
                <button style={{ fontSize: 12, fontWeight: 600, color: "#2563EB", background: "none", border: "none", cursor: "pointer" }}>Forgot password?</button>
              </div>
              <button onClick={() => onNavigate("home")} style={{ width: "100%", padding: "14px", borderRadius: 14, background: "linear-gradient(135deg,#1D4ED8,#2563EB)", border: "none", cursor: "pointer", fontSize: 15, fontWeight: 700, color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 18, boxShadow: "0 4px 14px rgba(37,99,235,0.35)" }}>
                Sign In <ChevronRight size={17} />
              </button>
              <p style={{ textAlign: "center", fontSize: 13, color: "#64748B", margin: 0 }}>
                New here? <button onClick={() => setStep("reg1")} style={{ fontWeight: 700, color: "#2563EB", background: "none", border: "none", cursor: "pointer" }}>Create account</button>
              </p>
            </>
          )}

          {/* ══ REG STEP 1 — Details ══ */}
          {step === "reg1" && (
            <>
              <Field label="Full Name" icon={User}>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jordan Davis" style={inp} />
              </Field>
              <Field label="Email Address" icon={Mail}>
                <input type="email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} placeholder="you@email.com" style={inp} />
              </Field>

              {/* DOB — 3 separate inputs */}
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: "#374151", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.6 }}>Date of Birth</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.5fr", gap: 8 }}>
                  {([
                    { v: dobD, s: setDobD, ph: "DD",   max: 2, l: "Day"   },
                    { v: dobM, s: setDobM, ph: "MM",   max: 2, l: "Month" },
                    { v: dobY, s: setDobY, ph: "YYYY", max: 4, l: "Year"  },
                  ] as const).map(({ v, s, ph, max, l }) => (
                    <div key={l}>
                      <p style={{ fontSize: 10, color: "#94A3B8", margin: "0 0 4px", fontWeight: 500 }}>{l}</p>
                      <input
                        type="number"
                        value={v}
                        onChange={(e) => (s as (x: string) => void)(e.target.value.slice(0, max))}
                        placeholder={ph}
                        style={{ width: "100%", padding: "11px 8px", background: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: 10, fontSize: 15, fontWeight: 700, color: "#0F172A", fontFamily: "Inter, sans-serif", outline: "none", textAlign: "center", boxSizing: "border-box" }}
                      />
                    </div>
                  ))}
                </div>

                {/* Age pill — auto-calculated */}
                {age && (
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, padding: "9px 14px", background: "#EFF6FF", borderRadius: 10, border: "1px solid #BFDBFE" }}>
                    <CheckCircle size={14} color="#2563EB" />
                    <span style={{ fontSize: 13, color: "#1D4ED8", fontWeight: 600 }}>
                      Age: <strong>{age} years old</strong>
                    </span>
                  </div>
                )}
              </div>

              <button
                onClick={() => reg1Ok && setStep("reg2")}
                style={{ width: "100%", padding: "14px", borderRadius: 14, background: reg1Ok ? "linear-gradient(135deg,#1D4ED8,#2563EB)" : "#E2E8F0", border: "none", cursor: reg1Ok ? "pointer" : "not-allowed", fontSize: 15, fontWeight: 700, color: reg1Ok ? "#ffffff" : "#94A3B8", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 16, boxShadow: reg1Ok ? "0 4px 14px rgba(37,99,235,0.35)" : "none", transition: "all 0.2s" }}
              >
                Next — Verify Email <ChevronRight size={17} />
              </button>
              <p style={{ textAlign: "center", fontSize: 13, color: "#64748B", margin: 0 }}>
                Already registered? <button onClick={() => setStep("login")} style={{ fontWeight: 700, color: "#2563EB", background: "none", border: "none", cursor: "pointer" }}>Sign In</button>
              </p>
            </>
          )}

          {/* ══ REG STEP 2 — OTP ══ */}
          {step === "reg2" && (
            <>
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <div style={{ width: 64, height: 64, borderRadius: 20, background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                  <Mail size={28} color="#2563EB" />
                </div>
                <p style={{ fontSize: 13, color: "#64748B", margin: 0, lineHeight: 1.6 }}>
                  We sent a 6-digit code to<br />
                  <strong style={{ color: "#0F172A" }}>{regEmail}</strong>
                </p>
              </div>

              <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 24 }}>
                {otp.map((d, i) => (
                  <input
                    key={i} id={`otp-${i}`} type="tel" inputMode="numeric" maxLength={1} value={d}
                    onChange={(e) => handleOtp(e.target.value, i)}
                    style={{ width: 44, height: 52, textAlign: "center", fontSize: 22, fontWeight: 800, border: d ? "2px solid #2563EB" : "2px solid #E2E8F0", borderRadius: 12, background: d ? "#EFF6FF" : "#F8FAFC", color: "#0F172A", outline: "none", fontFamily: "Inter, sans-serif" }}
                  />
                ))}
              </div>

              <button
                onClick={() => otpFull && setStep("reg3")}
                style={{ width: "100%", padding: "14px", borderRadius: 14, background: otpFull ? "linear-gradient(135deg,#1D4ED8,#2563EB)" : "#E2E8F0", border: "none", cursor: otpFull ? "pointer" : "not-allowed", fontSize: 15, fontWeight: 700, color: otpFull ? "#ffffff" : "#94A3B8", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 16, boxShadow: otpFull ? "0 4px 14px rgba(37,99,235,0.35)" : "none", transition: "all 0.2s" }}
              >
                Verify & Continue <ChevronRight size={17} />
              </button>
              <button
                onClick={() => setResent(true)}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "10px", fontSize: 13, fontWeight: 600, color: resent ? "#22C55E" : "#2563EB", background: "none", border: "none", cursor: "pointer" }}
              >
                {resent ? <><CheckCircle size={14} /> Code resent!</> : <><RefreshCw size={14} /> Resend Code</>}
              </button>
            </>
          )}

          {/* ══ REG STEP 3 — Password ══ */}
          {step === "reg3" && (
            <>
              <Field label="Password" icon={Lock}>
                <input type={showNew ? "text" : "password"} value={newPass} onChange={(e) => setNewPass(e.target.value)} placeholder="Minimum 8 characters" style={inp} />
                <button onClick={() => setShowNew(!showNew)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                  {showNew ? <EyeOff size={15} color="#94A3B8" /> : <Eye size={15} color="#94A3B8" />}
                </button>
              </Field>

              {newPass.length > 0 && (
                <div style={{ marginTop: -8, marginBottom: 14 }}>
                  <div style={{ display: "flex", gap: 4, marginBottom: 5 }}>
                    {[1, 2, 3].map((lvl) => <div key={lvl} style={{ flex: 1, height: 4, borderRadius: 2, background: strength >= lvl ? sColor : "#E2E8F0", transition: "background 0.3s" }} />)}
                  </div>
                  <p style={{ fontSize: 11, color: sColor, margin: 0, fontWeight: 700 }}>
                    {["", "Weak — use 8+ characters", "Medium — add numbers & symbols", "Strong password ✓"][strength]}
                  </p>
                </div>
              )}

              <Field label="Confirm Password" icon={Lock}>
                <input type={showConf ? "text" : "password"} value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} placeholder="Re-enter password" style={inp} />
                <button onClick={() => setShowConf(!showConf)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                  {showConf ? <EyeOff size={15} color="#94A3B8" /> : <Eye size={15} color="#94A3B8" />}
                </button>
              </Field>

              {confirmPass.length > 0 && (
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: -8, marginBottom: 14 }}>
                  {confirmPass === newPass
                    ? <><CheckCircle size={13} color="#22C55E" /><span style={{ fontSize: 12, color: "#22C55E", fontWeight: 600 }}>Passwords match</span></>
                    : <><span style={{ color: "#EF4444", fontWeight: 700, fontSize: 14 }}>✕</span><span style={{ fontSize: 12, color: "#EF4444", fontWeight: 600 }}>Passwords do not match</span></>
                  }
                </div>
              )}

              <button
                onClick={() => passOk && onNavigate("home")}
                style={{ width: "100%", padding: "14px", borderRadius: 14, background: passOk ? "linear-gradient(135deg,#1D4ED8,#2563EB)" : "#E2E8F0", border: "none", cursor: passOk ? "pointer" : "not-allowed", fontSize: 15, fontWeight: 700, color: passOk ? "#ffffff" : "#94A3B8", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, boxShadow: passOk ? "0 4px 14px rgba(37,99,235,0.35)" : "none", transition: "all 0.2s" }}
              >
                Create Account 🎉
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
