'use client';

import { motion } from "framer-motion";
import { Crown, Sparkles, CheckCircle2, Circle, Users, Home, Building, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

interface OnboardingStep {
  key: string;
  label: string;
  done: boolean;
  icon: any;
  link: string;
}

export default function WelcomeSection({ greeting, userName, clientCount = 0, propertyCount = 0, uid }: any) {
  const router = useRouter();

  const steps: OnboardingStep[] = [
    { key: 'client', label: 'Add your first client', done: clientCount > 0, icon: Users, link: `/realstate/${uid}/clients/addclient` },
    { key: 'property', label: 'Add your first property', done: propertyCount > 0, icon: Home, link: `/realstate/${uid}/properties/addproperty` },
    { key: 'settings', label: 'Set up your profile', done: false, icon: Settings, link: `/realstate/${uid}/settings` },
  ];

  const allDone = steps.every(s => s.done);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-10 ml-2 sm:ml-0"
    >
      <div className="relative">
        <div className="relative">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
            <div className="flex-1">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 shadow-sm mb-6"
              >
                <Sparkles size={12} className="text-purple-500" />
                <span className="text-xs font-medium text-slate-600 uppercase tracking-wider">Dashboard Overview</span>
              </motion.div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.3 }}
                    className="hidden sm:block p-2.5 rounded-xl bg-gradient-to-br from-indigo-100/50 to-purple-100/50 border border-indigo-100 shadow-sm"
                  >
                    <Crown className="h-5 w-5 text-amber-500" />
                  </motion.div>

                  <div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800">
                      {greeting},{" "}
                      <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {userName}
                      </span>
                    </h1>
                    <p className="text-slate-500 mt-2 max-w-xl text-sm sm:text-base">
                      Your real estate management hub. Track properties, connect with clients, and grow your business.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Onboarding Checklist — only shown when steps remain */}
          {!allDone && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="mt-6 p-4 rounded-xl bg-gradient-to-r from-indigo-50/60 to-purple-50/60 border border-indigo-100"
            >
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={14} className="text-indigo-500" />
                <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Getting Started</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                {steps.filter(s => !s.done).map((step) => {
                  const Icon = step.icon;
                  return (
                    <button
                      key={step.key}
                      onClick={() => router.push(step.link)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/80 hover:bg-white border border-indigo-200/60 hover:border-indigo-300 transition-all text-sm text-left group"
                    >
                      <Circle size={14} className="text-indigo-400 flex-shrink-0 group-hover:text-indigo-600" />
                      <Icon size={14} className="text-indigo-400 flex-shrink-0" />
                      <span className="text-slate-600 group-hover:text-slate-800">{step.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* All-done message */}
          {allDone && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 flex items-center gap-2 text-sm text-emerald-600"
            >
              <CheckCircle2 size={16} />
              <span>All setup steps complete. You&apos;re ready to go!</span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
