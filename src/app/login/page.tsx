"use client";

import { useState } from "react";
import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import GreenAlgeriaLogo from "@/components/GreenAlgeriaLogo";
import { useLanguage } from "@/context/LanguageContext";
import { Lock, Mail, User, ShieldCheck, ArrowRight, Bot, Trees, Eye, EyeOff, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const { t } = useLanguage();
  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState<"citizen" | "researcher" | "ranger">("citizen");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loggedInSuccess, setLoggedInSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setLoggedInSuccess(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-black text-slate-900 dark:text-white transition-colors duration-200">
      {/* Shared Fixed Top Bar */}
      <TopNavBar />

      {/* Main Login Workspace Area */}
      <main className="flex-grow pt-24 pb-16 px-container-padding flex items-center justify-center relative overflow-hidden">
        {/* Background Satellite Accent Image */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center opacity-5 dark:opacity-20 pointer-events-none scale-105"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCMH0ECkHqkEsXHfyZwi3yBsh7o_IOsOCc16WWhPMyG40sPgPOZ139p_OLEH7ojdSYffj_OaBEUHySWwYFcTXJ9Ad7HWtA5ICWA8zSGGAvHskWgm5duRW7y2qou0oqcKDxxrZzkyYUgSugVOH82rR0vQDtV-zIBsNvL3VcOb_yTXTmOxJFK6vJLNSXvNxJGEdglD0-GpjmyDFrrJixr0vXgz6huDmK_0-1aG4NxH78vXgDkTJFSJ2L3')",
          }}
        />

        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-zinc-800 grid grid-cols-1 md:grid-cols-12">
            {/* Left Column: Visual Brand Banner */}
            <div className="md:col-span-5 bg-gradient-to-br from-emerald-800 via-emerald-900 to-zinc-950 p-8 text-white flex flex-col justify-between relative overflow-hidden min-h-[360px]">
              <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <GreenAlgeriaLogo className="w-9 h-9 shrink-0" />
                  <span className="font-extrabold text-xl tracking-tight text-white">
                    Green Algeria
                  </span>
                </div>

                <h2 className="font-headline-lg text-2xl md:text-3xl font-bold mb-3 leading-tight text-white">
                  {isSignUp ? "Join Algeria's Reforestation Era" : "Welcome Back, Environmental Pioneer"}
                </h2>

                <p className="text-xs text-emerald-100/90 leading-relaxed font-medium">
                  Access satellite multispectral analytics, field telemetry logging, and digital tree adoption certificates across 58 Wilayas.
                </p>
              </div>

              <div className="pt-6 border-t border-emerald-500/30 space-y-2">
                <div className="flex items-center gap-2 text-xs text-emerald-300 font-mono font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>National GIS Account Authentication</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-emerald-200/80 font-mono">
                  <Bot className="w-3.5 h-3.5" />
                  <span>Sentinel-2 Telemetry v4.2 Active</span>
                </div>
              </div>
            </div>

            {/* Right Column: Form Container */}
            <div className="md:col-span-7 p-8 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white flex flex-col justify-between">
              {loggedInSuccess ? (
                <div className="p-8 text-center animate-fadeIn my-auto space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-title-md text-2xl font-bold text-slate-900 dark:text-white">
                    Authentication Successful!
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-zinc-300 max-w-sm mx-auto font-mono">
                    Logged in as <span className="font-bold text-emerald-700 dark:text-emerald-400">{email || "dr.yassine@algeriagreen.dz"}</span>
                  </p>
                  <div className="flex flex-col gap-2.5 pt-2">
                    <a
                      href="/citizen-portal"
                      className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Go to Citizen Volunteer Hub <ArrowRight className="w-4 h-4" />
                    </a>
                    <a
                      href="/gis-console"
                      className="w-full py-3 bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-900 dark:text-white rounded-xl text-xs font-bold transition-colors cursor-pointer border border-slate-300 dark:border-zinc-700"
                    >
                      Open GIS Console & Data
                    </a>
                  </div>
                </div>
              ) : (
                <>
                  {/* Account Type Role Selector */}
                  <div className="mb-6">
                    <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200 uppercase tracking-wider mb-2">
                      Select Account Portal Role
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setRole("citizen")}
                        className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                          role === "citizen"
                            ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 shadow-2xs"
                            : "border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-100"
                        }`}
                      >
                        <Trees className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                        <span>Citizen</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setRole("researcher")}
                        className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                          role === "researcher"
                            ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 shadow-2xs"
                            : "border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-100"
                        }`}
                      >
                        <Bot className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                        <span>Researcher</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setRole("ranger")}
                        className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                          role === "ranger"
                            ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 shadow-2xs"
                            : "border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-100"
                        }`}
                      >
                        <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                        <span>Ranger</span>
                      </button>
                    </div>
                  </div>

                  {/* Form Body */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {isSignUp && (
                      <div>
                        <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200 mb-1">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500 pointer-events-none" />
                          <input
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="e.g. Dr. Yassine Benali"
                            className="w-full bg-slate-50 dark:bg-zinc-800 rounded-xl py-2.5 pl-9 pr-3 text-xs text-slate-900 dark:text-white border border-slate-300 dark:border-zinc-700 outline-none focus:bg-white dark:focus:bg-zinc-900 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 font-semibold transition-all"
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200 mb-1">
                        Email Address / Researcher ID
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500 pointer-events-none" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. yassine@algeriagreen.dz"
                          className="w-full bg-slate-50 dark:bg-zinc-800 rounded-xl py-2.5 pl-9 pr-3 text-xs text-slate-900 dark:text-white border border-slate-300 dark:border-zinc-700 outline-none focus:bg-white dark:focus:bg-zinc-900 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 font-semibold transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-xs font-bold text-slate-800 dark:text-zinc-200">
                          Password
                        </label>
                        {!isSignUp && (
                          <a href="#forgot" className="text-[11px] text-emerald-700 dark:text-emerald-400 font-bold hover:underline">
                            Forgot Password?
                          </a>
                        )}
                      </div>
                      <div className="relative">
                        <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500 pointer-events-none" />
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full bg-slate-50 dark:bg-zinc-800 rounded-xl py-2.5 pl-9 pr-10 text-xs text-slate-900 dark:text-white border border-slate-300 dark:border-zinc-700 outline-none focus:bg-white dark:focus:bg-zinc-900 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 font-semibold transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-700 cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer mt-3"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          Authenticating Credentials...
                        </span>
                      ) : (
                        <>
                          {isSignUp ? "Create Account & Join Platform" : "Sign In to GIS Platform"}
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>

                  {/* Toggle Sign Up / Sign In */}
                  <div className="mt-6 pt-4 border-t border-slate-200 dark:border-zinc-800 text-center text-xs text-slate-600 dark:text-zinc-400 font-medium">
                    {isSignUp ? (
                      <span>
                        Already have a GIS account?{" "}
                        <button
                          onClick={() => setIsSignUp(false)}
                          className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline cursor-pointer ml-1"
                        >
                          Sign In
                        </button>
                      </span>
                    ) : (
                      <span>
                        Don&apos;t have an account yet?{" "}
                        <button
                          onClick={() => setIsSignUp(true)}
                          className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline cursor-pointer ml-1"
                        >
                          Register Free
                        </button>
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}
