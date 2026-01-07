"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Zap, ShieldCheck, Twitter, ArrowRight,
  Layers, Sparkles, Globe, Heart, CheckCircle2,
  Coins, Box, Workflow, ExternalLink,
  BarChart3, ArrowUpRight, Monitor, Lock,
  Share2, MousePointer2, AlertCircle,
  ChevronRight
} from "lucide-react";
import Image from "next/image";

export default function LandingPage() {
  const [activeSection, setActiveSection] = React.useState("");

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ["service", "security", "comparison", "pricing", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    <div className="min-h-screen bg-[#0a0206] text-white selection:bg-rose-500/30 overflow-x-hidden font-sans lowercase">

      {/* --- ELITE MESH BACKGROUND --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-rose-600/20 blur-[160px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-fuchsia-700/20 blur-[160px] rounded-full" />
      </div>

      {/* --- LUXE NAV --- */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl">
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full px-8 py-4 flex justify-between items-center shadow-2xl">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 bg-gradient-to-tr from-rose-500 to-violet-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(225,29,72,0.4)]">
              <Zap className="w-5 h-5 text-white fill-current" />
            </div>
            <span className="text-xl font-black tracking-tighter">mostlabz.</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-[0.2em]">
            {[
              { id: "service", label: "engine" },
              { id: "comparison", label: "comparison" },
              { id: "security", label: "security" },
              { id: "pricing", label: "pricing" },
            ].map((navItem) => (
              <a key={navItem.id} href={`#${navItem.id}`} className={`relative transition-colors ${activeSection === navItem.id ? "text-rose-400" : "text-gray-400 hover:text-white"}`}>
                {navItem.label}
              </a>
            ))}
          </div>

          <a href="https://t.me/@abdullah_gram">
            <button className="bg-rose-600 hover:bg-rose-500 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all">
              build now
            </button>
          </a>
        </div>
      </nav>

      {/* --- THE GALLERY BOUTIQUE HERO --- */}
      <section className="relative min-h-screen pt-32 pb-10 flex flex-col items-center overflow-hidden bg-[#030104]">

        {/* --- LUXE MARQUEE BACKGROUND (KEEPING YOUR FAVORITE) --- */}
        <div className="absolute top-1/4 left-0 w-full -translate-y-1/2 overflow-hidden opacity-[0.08] pointer-events-none rotate-[-5deg] scale-110">
          <motion.div
            animate={{ x: [0, -2000] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="inline-block whitespace-nowrap"
          >
            {[1, 2, 3, 4].map((i) => (
              <span key={i} className="text-[200px] font-black uppercase tracking-widest mx-10 text-rose-500 italic">
                MostLabz • MostLabz • MostLabz • MostLabz •
              </span>
            ))}
          </motion.div>
        </div>

        {/* --- CENTRAL STAGE --- */}
        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center">

          {/* Top Boutique Label */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-4 mb-16"
          >
            <div className="h-10 w-[1px] bg-gradient-to-b from-transparent to-rose-500" />
            <span className="text-rose-500 text-[9px] font-black uppercase tracking-[0.8em] pl-[0.8em]">
              Boutique Infrastructure 2026
            </span>
          </motion.div>

          {/* MAIN HEADLINE (STARK & LUXE) */}
          <div className="text-center mb-5">
            {/* MAIN HEADLINE */}
            <div className="text-center mb-2 px-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-[70px] md:text-[140px] font-black leading-[0.8] tracking-[-0.05em] uppercase italic"
              >
                social <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-rose-500 to-fuchsia-600">
                  terminal.
                </span>
              </motion.h1>

              {/* THE MEANINGFUL EXPLANATION (One detailed sentence) */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8 text-rose-200/40 text-xs md:text-sm font-black uppercase tracking-[0.4em] italic leading-relaxed max-w-2xl mx-auto"
              >
                MostLabz builds high-speed Solana infrastructure that turns every tweet into a 1-click buy button, allowing your community to swap tokens without ever leaving their feed.
              </motion.p>
            </div>
          </div>

          {/* THE "PRODUCT" ON A PEDESTAL */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="relative w-full max-w-lg px-6"
          >
            {/* Stage Glow */}
            <div className="absolute inset-0 bg-rose-600/10 blur-[100px] rounded-full animate-pulse" />

            {/* The Terminal Box (Luxury Finish) */}
            <div className="relative bg-white rounded-[2.5rem] p-8 flex flex-col gap-6 shadow-[0_0_100px_-20px_rgba(225,29,72,0.3)] transition-transform duration-700 hover:scale-[1.02]">

              {/* Product Header */}
              <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center">
                    <Zap className="w-3 h-3 text-white fill-current" />
                  </div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">MostLabz V6</span>
                </div>
                <div className="px-2 py-1 rounded bg-rose-50 text-[8px] font-black text-rose-500 uppercase tracking-widest">Limited</div>
              </div>

              {/* Product Info */}
              <div className="text-left">
                <h4 className="text-black text-3xl font-black italic tracking-tighter leading-none uppercase">Buy $BULL</h4>
                <p className="text-gray-400 text-xs mt-2 lowercase leading-relaxed">Direct X timeline fulfillment. Institutional slippage protection enabled.</p>
              </div>

              {/* Selection Grids (The "Shopping" Vibe) */}
              <div className="grid grid-cols-2 gap-2">
                {['0.1 sol', '1.0 sol'].map(a => (
                  <div key={a} className="py-4 border border-gray-100 rounded-2xl text-center text-black font-black text-[10px] uppercase tracking-widest hover:border-rose-500 hover:text-rose-500 cursor-pointer transition-all">
                    {a}
                  </div>
                ))}
              </div>

              <button className="w-full py-5 bg-black text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] italic shadow-xl active:scale-95 transition-all">
                Add to Wallet
              </button>

              <div className="flex justify-center opacity-20">
                <span className="text-[8px] font-black text-black uppercase tracking-[0.3em]">Verified Boutique Infrastructure</span>
              </div>
            </div>

            {/* Pedestal Shadow */}
            <div className="mt-12 w-[60%] mx-auto h-[2px] bg-rose-500/20 blur-md rounded-full" />
          </motion.div>



        </div>

        {/* --- SECONDARY BOTTOM MARQUEE (REVERSE) --- */}
        <div className="absolute bottom-1/4 left-0 w-full overflow-hidden opacity-[0.08] pointer-events-none">
          <motion.div
            animate={{ x: [-2000, 0] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="inline-block whitespace-nowrap"
          >
            {[1, 2, 3, 4].map((i) => (
              <span key={i} className="text-[120px] font-black uppercase tracking-widest mx-10 text-white italic">
                Conversion • Speed • Hype • Revenue •
              </span>
            ))}
          </motion.div>
        </div>

      </section>

      {/* --- COMPARISON SECTION (The Pain vs. The Cure) --- */}
      {/* --- UPGRADED COMPARISON SECTION: THE FRICTION KILLER --- */}
      <section id="comparison" className="py-20 px-6 relative overflow-hidden">
        {/* Deep Glow for the "Winner" Side */}
        <div className="absolute top-1/2 right-[-10%] w-[40%] h-[60%] bg-rose-600/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-24">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="px-4 py-1 rounded-full border border-rose-500/20 bg-rose-500/5 text-[10px] font-black uppercase tracking-[0.4em] text-rose-500 mb-6"
            >
              performance benchmark
            </motion.div>
            <h2 className="text-6xl md:text-[100px] font-black tracking-tighter italic uppercase leading-[0.85]">
              the death of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-fuchsia-400 to-rose-600">
                10-step buying.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

            {/* THE "PAIN" SIDE (Standard Links) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 p-1 rounded-[3.5rem] bg-white/3 border border-white/5 relative group"
            >
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
              <div className="p-10 flex flex-col h-full opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700">
                <div className="flex items-center justify-between mb-12">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-100">legacy workflow</span>
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-100">01</div>
                </div>

                <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-8">the friction <br /> wall</h3>

                <div className="space-y-4 flex-1">
                  {[
                    'Find Telegram Link', 'Copy CA Address', 'Open Browser Tab', 'Visit Raydium/DEX',
                    'Connect Wallet', 'Paste CA Address', 'Wait for Metadata', 'Set Custom Slippage',
                    'Sign Multi-Tx', 'Wait for Finality'
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-4 text-xs font-bold text-gray-100 line-through decoration-rose-500/40">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-800" />
                      {step}
                    </div>
                  ))}
                </div>

                <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
                  <p className="text-rose-500 font-black italic uppercase tracking-widest text-xs">90% user drop-off</p>
                  <AlertCircle className="w-5 h-5 text-rose-500" />
                </div>
              </div>
            </motion.div>

            {/* THE "VS" BADGE (Mobile Hidden) */}
            <div className="hidden lg:flex lg:col-span-2 items-center justify-center relative">
              <div className="h-full w-[1px] bg-gradient-to-b from-transparent via-rose-500/20 to-transparent" />
              <div className="absolute w-16 h-16 rounded-full bg-black border-2 border-rose-500 flex items-center justify-center shadow-[0_0_30px_rgba(225,29,72,0.4)]">
                <span className="text-rose-500 font-black italic">VS</span>
              </div>
            </div>

            {/* THE "CURE" SIDE (MostLabz Terminal) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 p-1 rounded-[3.5rem] bg-gradient-to-br from-rose-600 to-fuchsia-700 shadow-[0_0_80px_-20px_rgba(225,29,72,0.4)] relative"
            >
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none" />

              <div className="bg-[#0d0308]/90 backdrop-blur-3xl rounded-[3.4rem] p-10 h-full flex flex-col relative overflow-hidden">
                {/* Internal Glow */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-rose-500/20 blur-[60px] rounded-full" />

                <div className="flex items-center justify-between mb-12">
                  <span className="text-[10px] font-black uppercase tracking-widest text-rose-500">mostlabz engine</span>
                  <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center text-white shadow-lg">
                    <Zap className="w-5 h-5 fill-current" />
                  </div>
                </div>

                <h3 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-12">instant <br /> conversion</h3>

                <div className="space-y-12 flex-1">
                  <div className="relative pl-12 group">
                    <div className="absolute left-0 top-0 w-8 h-8 rounded-full border-2 border-rose-500 flex items-center justify-center text-rose-500 text-[10px] font-black">01</div>
                    <p className="text-xl font-black uppercase italic tracking-tight group-hover:text-rose-400 transition-colors">input amount</p>
                    <p className="text-gray-500 text-sm mt-2">user enters SOL value directly on the X timeline.</p>
                  </div>

                  <div className="relative pl-12 group">
                    <div className="absolute left-0 top-0 w-8 h-8 rounded-full border-2 border-rose-500 flex items-center justify-center text-rose-500 text-[10px] font-black">02</div>
                    <p className="text-xl font-black uppercase italic tracking-tight group-hover:text-rose-400 transition-colors">execute swap</p>
                    <p className="text-gray-500 text-sm mt-2">instant wallet signature via jupiter. trade complete.</p>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="mt-16 p-8 bg-gradient-to-r from-rose-600/10 to-fuchsia-600/10 rounded-[2.5rem] border border-rose-500/30 flex items-center justify-between group cursor-pointer"
                >
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-rose-500 mb-1">conversion lift</p>
                    <p className="text-4xl font-black italic tracking-tighter">+300%</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-rose-600 flex items-center justify-center group-hover:rotate-45 transition-transform">
                    <ArrowUpRight className="text-white w-6 h-6" />
                  </div>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- THE BENTO ENGINE GRID --- */}
      <section id="service" className="py-20 px-6">
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div variants={item} className="md:col-span-2 h-[420px] rounded-[3.5rem] bg-[#1a0510] border border-rose-500/20 p-12 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-rose-600/20 blur-[100px] group-hover:bg-rose-600/30 transition-all duration-700" />
            <motion.div animate={{ top: ["0%", "100%", "0%"] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-rose-500/40 to-transparent z-10" />
            <div className="relative z-20">
              <Sparkles className="w-12 h-12 text-rose-400 mb-8" />
              <h3 className="text-5xl font-black italic mb-4 tracking-tighter uppercase leading-[0.9]">universal <br /> engine</h3>
              <p className="text-rose-200/60 text-lg max-w-sm font-medium leading-tight">one blink to rule them all. support any solana mint address instantly with zero configuration.</p>
            </div>
            <div className="relative z-20 flex gap-2">
              <span className="px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-[10px] font-black uppercase tracking-widest text-rose-400">jupiter v6</span>
              <span className="px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-[10px] font-black uppercase tracking-widest text-rose-400">real-time</span>
            </div>
          </motion.div>

          <motion.div variants={item} className="h-[420px] rounded-[3.5rem] bg-[#0a0206] border border-fuchsia-500/20 p-10 flex flex-col justify-between relative overflow-hidden group hover:bg-fuchsia-950/10 transition-all">
            <Coins className="w-14 h-14 text-fuchsia-400 p-3 bg-fuchsia-500/10 rounded-2xl border border-fuchsia-500/20" />
            <div>
              <h3 className="text-3xl font-black tracking-tighter leading-none mb-4 uppercase italic text-fuchsia-100">0.5% trade <br /> royalty</h3>
              <p className="text-fuchsia-300/40 text-sm font-bold uppercase tracking-widest">fund your marketing wallet automatically.</p>
            </div>
          </motion.div>

          <motion.div variants={item} className="h-[420px] rounded-[3.5rem] bg-[#0a0206] border border-indigo-500/20 p-10 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `radial-gradient(circle, #6366f1 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />
            <ShieldCheck className="w-14 h-14 text-indigo-400 p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20" />
            <div>
              <h3 className="text-3xl font-black tracking-tighter leading-none mb-2 uppercase italic text-indigo-100">dialect <br /> verified</h3>
              <p className="text-indigo-300/40 text-[10px] font-bold uppercase tracking-widest">registry approved link standards.</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* --- SECURITY & WHALE EXPERIENCE --- */}
      <section id="security" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <div className="absolute -inset-10 bg-rose-500/10 blur-[100px] rounded-full" />
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.85] relative z-10">
                bulletproof <br /> <span className="text-rose-500">security.</span>
              </h2>
              <p className="mt-12 text-gray-400 text-xl max-w-md leading-relaxed">
                we build for whales. institutional security protocols ensure your community&apos;s funds are always safe and transactions are transparent.
              </p>
              <div className="mt-12 space-y-6">
                <div className="flex items-start gap-4">
                  <Lock className="w-6 h-6 text-rose-500 mt-1" />
                  <div>
                    <p className="font-black uppercase italic text-lg">non-custodial execution</p>
                    <p className="text-gray-500 text-sm">we never touch private keys. trades happen directly on Jupiter DEX.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <BarChart3 className="w-6 h-6 text-fuchsia-500 mt-1" />
                  <div>
                    <p className="font-black uppercase italic text-lg">slippage protection</p>
                    <p className="text-gray-500 text-sm">integrated price-impact warnings for high-volume transactions.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="h-64 rounded-[3rem] bg-white/5 border border-white/10 p-8 flex flex-col justify-end">
                <p className="text-rose-500 font-black text-4xl mb-2 italic tracking-tighter">verified</p>
                <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">Action Registry</p>
              </div>
              <div className="h-64 rounded-[3rem] bg-rose-600 p-8 flex flex-col justify-end shadow-xl shadow-rose-600/20">
                <p className="text-white font-black text-4xl mb-2 italic tracking-tighter">audited</p>
                <p className="text-rose-200 text-[10px] font-bold uppercase tracking-widest">logic standards</p>
              </div>
              <div className="h-64 rounded-[3rem] bg-white/5 border border-white/10 p-8 flex flex-col justify-end">
                <p className="text-fuchsia-500 font-black text-4xl mb-2 italic tracking-tighter">jup v6</p>
                <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">aggregator engine</p>
              </div>
              <div className="h-64 rounded-[3rem] bg-zinc-900 p-8 flex flex-col justify-end">
                <p className="text-indigo-400 font-black text-4xl mb-2 italic tracking-tighter">edge</p>
                <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">latency optimized</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- THE ULTIMATE SHOWCASE (3D HUD) --- */}
      <section className=" pb-20 px-6">
        <motion.div variants={item} className="max-w-7xl mx-auto md:col-span-4 min-h-[800px] rounded-[4rem] bg-[#0d0308] border border-white/5 relative overflow-hidden flex flex-col items-center justify-center p-4 md:p-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-rose-600/10 blur-[120px] rounded-full animate-pulse" />

          <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-20 left-10 md:left-24 z-30 p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl hidden lg:block">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
              <p className="text-[10px] font-black uppercase tracking-widest text-rose-200/50">live raid buy</p>
            </div>
            <p className="mt-2 text-2xl font-black italic tracking-tighter text-rose-400">+5.00 SOL</p>
          </motion.div>

          <motion.div whileHover={{ rotateY: -5, rotateX: 5, scale: 1.02 }} className="relative z-20 w-full max-w-4xl transition-all duration-500" style={{ perspective: "1000px" }}>
            <div className="bg-[#121212]/90 backdrop-blur-3xl rounded-[3rem] border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden">
              <div className="h-14 w-full bg-white/5 border-b border-white/5 flex items-center justify-between px-8">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/20" />
                  <div className="w-3 h-3 rounded-full bg-fuchsia-500/20" />
                </div>
                <div className="px-4 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-mono text-gray-500 tracking-widest">
                  mostlabz.xyz/terminal
                </div>
                <Share2 className="w-4 h-4 text-gray-700" />
              </div>

              <div className="p-10 flex justify-center bg-gradient-to-b from-transparent to-rose-950/10">
                <div className="relative w-full max-w-[420px] bg-white rounded-[2rem] overflow-hidden flex flex-col shadow-2xl">
                  <div className="h-44 w-full bg-[#121212] relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-600/40 to-indigo-900/40" />
                    <span className="relative z-10 text-white font-black text-4xl italic tracking-tighter opacity-40 uppercase">Blink Terminal</span>
                  </div>
                  <div className="p-8 flex flex-col gap-4 text-left">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-rose-500 flex items-center justify-center"><Zap className="w-2 h-2 text-white fill-current" /></div>
                      <span className="text-[11px] font-bold text-gray-500">mostlabz.xyz</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-rose-500" />
                    </div>
                    <h4 className="text-black text-2xl font-black tracking-tight leading-none lowercase italic">Buy $BULL on X</h4>
                    <p className="text-gray-500 text-xs leading-relaxed lowercase">Enter SOL amount or select a fast-buy option below.</p>
                    <div className="grid grid-cols-3 gap-2 py-2">
                      {['0.1 sol', '1 sol', '5 sol'].map((amt) => (
                        <div key={amt} className="py-3 bg-[#272727] text-white text-[10px] font-black rounded-xl text-center uppercase italic tracking-tighter">{amt}</div>
                      ))}
                    </div>
                    <div className="flex items-center justify-center gap-1 mt-2 opacity-30">
                      <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">powered by dialect</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="mt-16 flex flex-wrap justify-center gap-16 relative z-30">
            {[{ val: "0.1s", label: "latency" }, { val: "100%", label: "uptime" }, { val: "live", label: "status" }].map((stat, i) => (
              <div key={i} className="text-center group">
                <p className="text-rose-500 font-black text-5xl tracking-tighter italic group-hover:-translate-y-2 transition-transform duration-500">{stat.val}</p>
                <p className="text-gray-600 text-[10px] uppercase font-black tracking-[0.3em] mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* --- PRICING --- */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none italic uppercase">choose <br /> your <span className="text-rose-500">power.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div whileHover={{ y: -10 }} className="p-12 rounded-[4rem] bg-white/5 border border-white/10 hover:border-rose-500/50 transition-all">
              <h4 className="text-rose-500 font-black uppercase tracking-widest text-[10px] mb-4">standard build</h4>
              <div className="text-7xl font-black tracking-tighter mb-8">$150</div>
              <ul className="space-y-4 mb-12">
                {['Registry Submission', 'Universal API Routing', 'Vercel Edge Deployment'].map((l, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-400 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-rose-500" /> {l}
                  </li>
                ))}
              </ul>
              <button className="w-full py-6 rounded-3xl bg-white text-black font-black uppercase tracking-tighter italic text-xl hover:bg-rose-500 hover:text-white transition-all">select standard</button>
            </motion.div>

            <motion.div whileHover={{ y: -10 }} className="p-12 rounded-[4rem] bg-gradient-to-br from-rose-600 to-indigo-700 relative overflow-hidden shadow-[0_30px_100px_-20px_rgba(225,29,72,0.4)]">
              <div className="absolute top-0 right-0 p-8 opacity-20"><Heart className="w-32 h-32 text-white fill-current" /></div>
              <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-4 uppercase tracking-[0.4em]">elite terminal</h4>
              <div className="text-7xl font-black tracking-tighter mb-8 italic">$300</div>
              <ul className="space-y-4 mb-12 relative z-10">
                {['Revenue-Share Fees', 'Whale Price Impact HUD', 'Full Source Handover', 'Custom Domain Verification'].map((l, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/90 text-sm font-bold">
                    <CheckCircle2 className="w-4 h-4 text-white" /> {l}
                  </li>
                ))}
              </ul>
              <button className="w-full py-6 rounded-3xl bg-black text-white font-black uppercase tracking-tighter italic text-xl hover:scale-105 transition-all">get priority</button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <section id="contact" className="py-32 px-6 border-t border-white/5 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-600/5 blur-[120px] rounded-full -z-10" />
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-6 h-6 bg-rose-600 rounded-full animate-pulse shadow-[0_0_15px_rgba(225,29,72,0.4)]" />
                <span className="text-3xl font-black tracking-tighter italic uppercase">mostlabz.</span>
              </div>
              <p className="text-gray-500 text-lg max-w-sm leading-tight mb-8 font-medium">the high-speed social commerce engine for the solana network. hype to cash in 2 clicks.</p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-12 lg:pl-20">
              <div className="flex flex-col gap-6">
                <span className="text-rose-500 font-black text-xs uppercase tracking-[0.4em]">talk to us</span>
                <a href="https://t.me/@abdullah_gram" target="_blank" className="group text-4xl font-black tracking-tighter flex items-center gap-3 hover:text-rose-400 transition-all uppercase italic">telegram <ArrowUpRight className="w-8 h-8 text-gray-700 group-hover:text-rose-400 group-hover:-translate-y-1 transition-all" /></a>
                <p className="text-gray-500 text-lg font-medium">hello@mostlabz.xyz</p>
              </div>

              <div className="flex flex-col gap-6">
                <span className="text-rose-500 font-black text-xs uppercase tracking-[0.4em]">follow vision</span>
                <div className="flex flex-col gap-4 font-bold text-xl tracking-tighter">
                  <a href="https://x.com/abdullahdevo" className="hover:text-rose-500 transition-colors uppercase italic">twitter/x</a>
                  <a href="https://github.com/Mdabdullah3" className="hover:text-rose-500 transition-colors uppercase italic">github</a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-32 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.5em] text-gray-800">
            <p>&copy; 2026 mostlabz labs. all rights reserved.</p>
            <div className="flex gap-8">
              <span className="hover:text-rose-500 cursor-pointer">privacy</span>
              <span className="hover:text-rose-500 cursor-pointer">terms</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}