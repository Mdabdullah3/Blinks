"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Zap, ShieldCheck, Twitter, BarChart3, ArrowUpRight,
  Layers, Cpu, Globe, Rocket, CheckCircle2, ChevronRight
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30 overflow-x-hidden font-sans">

      {/* --- ELITE ANIMATED BACKGROUND --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-gradient-to-br from-indigo-600/20 via-transparent to-transparent blur-[140px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-gradient-to-tl from-cyan-500/10 via-transparent to-transparent blur-[140px]" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-purple-600/10 blur-[100px] animate-bounce duration-[10s]" />
      </div>

      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 w-full z-50 px-6 py-6 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:rotate-12 transition-transform">
              <Zap className="w-6 h-6 text-black fill-current" />
            </div>
            <span className="text-2xl font-black tracking-tighter italic">MostLabz</span>
          </div>
          <div className="hidden md:flex items-center gap-10 text-sm font-medium text-gray-400">
            <a href="#features" className="hover:text-cyan-400 transition-colors">Infrastructure</a>
            <a href="#pricing" className="hover:text-cyan-400 transition-colors">Pricing</a>
            <a href="#demo" className="hover:text-cyan-400 transition-colors">Live Demo</a>
          </div>
          <button className="px-6 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:bg-cyan-400 transition-all active:scale-95">
            Get Started
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-44 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(6,182,212,0.1)]"
          >
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Vetted by Superteam — 3x Winner</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-[120px] font-black mb-8 tracking-tighter leading-[0.9] uppercase"
          >
            Power Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-x">
              Community
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Don&apos;t let your community leave X to buy. MostLabz injects professional
            trading terminals directly into your tweets.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <button className="group px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-black rounded-2xl flex items-center gap-3 hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all active:scale-95 uppercase italic tracking-tighter">
              Start Building <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
            <button className="px-10 py-5 bg-white/5 border border-white/10 backdrop-blur-md font-bold rounded-2xl hover:bg-white/10 transition-all uppercase tracking-tighter italic">
              View Showcase
            </button>
          </motion.div>
        </div>
      </section>

      {/* --- THE BENTO GRID SECTION --- */}
      <section id="features" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* LARGE BENTO CARD */}
            <div className="md:col-span-2 p-10 rounded-[3rem] bg-gradient-to-br from-zinc-900 to-black border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] group-hover:bg-cyan-500/20 transition-all" />
              <Layers className="w-12 h-12 text-cyan-400 mb-8" />
              <h2 className="text-4xl font-black mb-4 italic uppercase">Universal Infrastructure</h2>
              <p className="text-gray-400 text-lg max-w-md">Our Blink engine handles every Solana token dynamically. Just paste your mint address and launch.</p>
              <div className="mt-12 flex gap-4">
                <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase">Jupiter V6</div>
                <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase">Edge Computing</div>
              </div>
            </div>

            {/* SMALL BENTO CARD */}
            <div className="p-10 rounded-[3rem] bg-gradient-to-br from-purple-900/20 to-zinc-900 border border-white/5 flex flex-col justify-between group">
              <Cpu className="w-12 h-12 text-purple-400 mb-8 group-hover:rotate-180 transition-transform duration-700" />
              <div>
                <h3 className="text-2xl font-black mb-2 uppercase italic">Verified</h3>
                <p className="text-gray-400 text-sm">Full registry support ensuring your links never get flagged as spam.</p>
              </div>
            </div>

            {/* SECOND ROW */}
            <div className="p-10 rounded-[3rem] bg-zinc-900/50 border border-white/5 flex flex-col justify-between">
              <BarChart3 className="text-green-400 w-10 h-10 mb-8" />
              <h3 className="text-2xl font-black uppercase italic">0.1s Latency</h3>
              <p className="text-gray-400 text-sm">Built on Vercel Edge for global transaction speed.</p>
            </div>

            <div className="md:col-span-2 p-10 rounded-[3rem] bg-gradient-to-r from-blue-900/20 to-zinc-900 border border-white/5 flex flex-col md:flex-row items-center gap-10 group">
              <div className="flex-1">
                <Globe className="text-blue-400 w-12 h-12 mb-6" />
                <h3 className="text-4xl font-black italic uppercase mb-4">Revenue Engine</h3>
                <p className="text-gray-400">Integrated referral system. Earn SOL for every trade your community makes.</p>
              </div>
              <div className="w-full md:w-64 h-40 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center relative overflow-hidden italic font-black text-white/10 text-4xl uppercase">
                Cashflow
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- PRICING: THE RICH SECTION --- */}
      <section id="pricing" className="py-32 px-6 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-6xl md:text-8xl font-black uppercase italic mb-6 tracking-tighter">Choose Your <br /><span className="text-cyan-400 underline decoration-purple-500 underline-offset-8">Tier</span></h2>
            <p className="text-gray-500 text-xl font-medium">Scalable solutions for every project size.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">

            {/* STARTER */}
            <div className="p-1 w-full bg-gradient-to-b from-white/10 to-transparent rounded-[3rem]">
              <div className="bg-[#050505] rounded-[2.9rem] p-12 h-full flex flex-col group hover:bg-zinc-900/50 transition-all">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 mb-4">Community</h3>
                <div className="text-6xl font-black mb-8 italic tracking-tighter">$150</div>
                <ul className="space-y-6 mb-12 flex-1">
                  <li className="flex items-center gap-4 text-gray-400 font-medium">
                    <CheckCircle2 className="w-6 h-6 text-cyan-500" /> Custom Branding
                  </li>
                  <li className="flex items-center gap-4 text-gray-400 font-medium">
                    <CheckCircle2 className="w-6 h-6 text-cyan-500" /> Standard Registry Help
                  </li>
                  <li className="flex items-center gap-4 text-gray-400 font-medium">
                    <CheckCircle2 className="w-6 h-6 text-cyan-500" /> Hosted by MostLabz
                  </li>
                </ul>
                <button className="w-full py-5 rounded-2xl border border-white/10 font-black uppercase italic tracking-tighter hover:bg-white hover:text-black transition-all">
                  Launch Standard
                </button>
              </div>
            </div>

            {/* ENTERPRISE */}
            <div className="p-1 w-full bg-gradient-to-b from-cyan-400 to-purple-600 rounded-[3rem] shadow-[0_0_60px_-15px_rgba(6,182,212,0.5)]">
              <div className="bg-[#050505] rounded-[2.9rem] p-12 h-full flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8">
                  <Rocket className="w-10 h-10 text-cyan-400 animate-bounce" />
                </div>
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-cyan-400 mb-4">Elite Terminal</h3>
                <div className="text-6xl font-black mb-8 italic tracking-tighter">$300</div>
                <ul className="space-y-6 mb-12 flex-1">
                  <li className="flex items-center gap-4 text-white font-bold">
                    <CheckCircle2 className="w-6 h-6 text-cyan-400" /> Revenue-Share Setup
                  </li>
                  <li className="flex items-center gap-4 text-white font-bold">
                    <CheckCircle2 className="w-6 h-6 text-cyan-400" /> Full Source Code Handover
                  </li>
                  <li className="flex items-center gap-4 text-white font-bold">
                    <CheckCircle2 className="w-6 h-6 text-cyan-400" /> Priority Foundation Approval
                  </li>
                  <li className="flex items-center gap-4 text-white font-bold">
                    <CheckCircle2 className="w-6 h-6 text-cyan-400" /> Custom Subdomain (buy.token.com)
                  </li>
                </ul>
                <button className="w-full py-5 rounded-2xl bg-cyan-500 text-black font-black uppercase italic tracking-tighter hover:bg-white transition-all shadow-xl shadow-cyan-500/20">
                  Secure Elite
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-20 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10 border-b border-white/5 pb-20 mb-10">
            <div className="text-center md:text-left">
              <h2 className="text-5xl font-black italic uppercase tracking-tighter mb-2">Build The Future.</h2>
              <p className="text-gray-500">The 2026 Standard for Social Commerce on Solana.</p>
            </div>
            <div className="flex gap-4">
              <button className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center hover:bg-cyan-500 hover:text-black transition-all cursor-pointer">
                <Twitter className="w-6 h-6" />
              </button>
              <button className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center hover:bg-cyan-500 hover:text-black transition-all cursor-pointer">
                <ArrowUpRight className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-600">
            <p>&copy; 2026 MostLabz Infrastructure. All rights reserved.</p>
            <p>Built by 3x Superteam Bounty Winner</p>
          </div>
        </div>
      </footer>
    </div>
  );
}