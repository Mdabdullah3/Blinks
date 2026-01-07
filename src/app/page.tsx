"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Zap, ShieldCheck, Twitter, ArrowRight,
  Layers, Sparkles, Globe, Heart, CheckCircle2,
  Coins, Box, Workflow, ExternalLink,
  BarChart3,
  ArrowUpRight
} from "lucide-react";
import Image from "next/image";

export default function LandingPage() {

  // Inside your LandingPage component
  const [activeSection, setActiveSection] = React.useState("");

  React.useEffect(() => {
    const handleScroll = () => {
      // Get all sections you want to track
      const sections = ["service", "pricing", "contact"];
      const scrollPosition = window.scrollY + 200; // Offset for better trigger timing

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
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[#0a0206] text-white selection:bg-rose-500/30 overflow-x-hidden font-sans lowercase">

      {/* --- ELITE MESH BACKGROUND --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-rose-600/20 blur-[160px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-fuchsia-700/20 blur-[160px] rounded-full" />
        <div className="absolute top-[30%] left-[20%] w-[30%] h-[30%] bg-violet-600/10 blur-[120px] rounded-full animate-bounce duration-[15s]" />
      </div>

      {/* --- LUXE NAV --- */}
      {/* --- LUXE NAV --- */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl">
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full px-8 py-4 flex justify-between items-center shadow-2xl">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 bg-gradient-to-tr from-rose-500 to-violet-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(225,29,72,0.4)]">
              <Zap className="w-5 h-5 text-white fill-current" />
            </div>
            <span className="text-xl font-black tracking-tighter">mostlabz.</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-[0.2em] relative">
            {[
              { id: "service", label: "Service" },
              { id: "pricing", label: "Pricing" },
              { id: "contact", label: "Contact" },
            ].map((navItem) => (
              <a
                key={navItem.id}
                href={`#${navItem.id}`}
                className={`relative z-10 transition-colors duration-300 ${activeSection === navItem.id ? "text-rose-400" : "text-gray-400 hover:text-white"
                  }`}
              >
                {navItem.label}
                {activeSection === navItem.id && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-rose-500"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          <a href="https://t.me/@abdullah_gram">
            <div className="bg-rose-600 hover:bg-rose-500 text-white px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-rose-600/20">
              Lunch
            </div>
          </a>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-40 md:pt-60 md:pb-32 pb-0 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-[1px] w-12 bg-rose-500" />
            <span className="text-rose-500 text-xs font-black uppercase tracking-[0.4em]">vetted by superteam dev</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-7xl md:text-[140px] font-black leading-[0.85] tracking-tight"
              >
                social <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
                  commerce
                </span> <br />
                redefined.
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="lg:col-span-4 pb-4"
            >
              <p className="text-gray-400 text-lg md:text-xl leading-tight mb-8">
                converting twitter hype into instant on-chain liquidity. mostlabz injects institutional trading tools into every tweet.
              </p>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group hover:bg-rose-500 transition-all cursor-pointer">
                  <ArrowRight className="w-5 h-5 group-hover:-rotate-45 transition-transform" />
                </div>
                <span className="text-sm font-black uppercase tracking-widest self-center">explore the ecosystem</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- THE BENTO VIBE GRID --- */}
      <section className="py-20 px-6 relative" id="service">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {/* CARD 1: UNIVERSAL BLINKS (Mesh Gradient + Scanning Effect) */}
          <motion.div className="md:col-span-2 h-[400px] rounded-[3.5rem] bg-[#1a0510] border border-rose-500/20 p-12 flex flex-col justify-between relative overflow-hidden group">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-rose-500/10 via-transparent to-transparent opacity-50" />
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-rose-600/20 blur-[100px] group-hover:bg-rose-600/30 transition-all duration-700" />

            {/* Animated Scanning Line */}
            <motion.div
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-rose-500/40 to-transparent z-10"
            />

            <div className="relative z-20">
              <div className="w-16 h-16 rounded-2xl bg-rose-500/10 flex items-center justify-center border border-rose-500/20 mb-8">
                <Sparkles className="w-8 h-8 text-rose-400" />
              </div>
              <h3 className="text-5xl font-black italic mb-4 tracking-tighter uppercase leading-[0.9]">universal <br /> engine</h3>
              <p className="text-rose-200/60 text-lg max-w-sm font-medium leading-tight">one blink to rule them all. support any solana mint address instantly with zero configuration.</p>
            </div>

            <div className="relative z-20 flex gap-2">
              <span className="px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-[10px] font-black uppercase tracking-widest text-rose-400">jupiter v6</span>
              <span className="px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-[10px] font-black uppercase tracking-widest text-rose-400">real-time</span>
            </div>
          </motion.div>

          {/* CARD 2: REFERRAL (Glass stack + Floating Icon) */}
          <motion.div className="h-[420px] rounded-[3.5rem] bg-gradient-to-b from-[#120b1e] to-[#0a0206] border border-fuchsia-500/20 p-10 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] brightness-200" />

            {/* Floating Background Circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-fuchsia-600/10 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-1000" />

            <div className="relative z-10 w-14 h-14 rounded-xl bg-fuchsia-500/10 flex items-center justify-center border border-fuchsia-500/20">
              <Coins className="w-7 h-7 text-fuchsia-400 group-hover:rotate-12 transition-transform" />
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl font-black tracking-tighter leading-none mb-4 uppercase italic text-fuchsia-100">0.5% trade <br /> royalty</h3>
              <p className="text-fuchsia-300/40 text-sm font-bold uppercase tracking-widest">passive income on every click</p>
            </div>
          </motion.div>

          {/* CARD 3: WHITELISTING (Network Grid + Glow) */}
          <motion.div className="h-[420px] rounded-[3.5rem] bg-[#0a0206] border border-indigo-500/20 p-10 flex flex-col justify-between relative overflow-hidden group">
            {/* Grid Pattern Background */}
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `radial-gradient(circle, #6366f1 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />

            <div className="relative z-10 w-14 h-14 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
              <ShieldCheck className="w-7 h-7 text-indigo-400" />
            </div>

            <div className="relative z-10">
              <div className="w-full h-[1px] bg-indigo-500/30 mb-6" />
              <h3 className="text-3xl font-black tracking-tighter leading-none mb-2 uppercase italic text-indigo-100">dialect <br /> verified</h3>
              <p className="text-indigo-300/40 text-sm font-bold uppercase tracking-widest text-wrap">Registry Approved Links</p>
            </div>
          </motion.div>

          {/* CARD 4: THE BIG SHOWCASE (Glassmorphism Mockup Container) */}
          {/* CARD 4: THE ULTIMATE SHOWCASE (3D Perspective + Floating HUD) */}
          <motion.div className="md:col-span-4 min-h-[800px] rounded-[4rem] bg-[#0d0308] border border-white/5 relative overflow-hidden flex flex-col items-center justify-center p-4 md:p-20">

            {/* Background "Aura" Lighting */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-rose-600/10 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />

            {/* FLOATING HUD ELEMENTS (The "Luxe" touch) */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-20 left-10 md:left-24 z-30 p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl hidden lg:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                <p className="text-[10px] font-black uppercase tracking-widest text-rose-200/50">live transactions</p>
              </div>
              <p className="mt-2 text-sm font-mono text-rose-400">+1.42 SOL <span className="text-gray-600">via Blink</span></p>
            </motion.div>

            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-40 right-10 md:right-24 z-30 p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl hidden lg:block"
            >
              <BarChart3 className="w-5 h-5 text-fuchsia-400 mb-2" />
              <p className="text-[10px] font-black uppercase tracking-widest text-fuchsia-200/50">Volume Index</p>
              <p className="text-sm font-mono text-fuchsia-400">98.4% <span className="text-gray-600">Efficiency</span></p>
            </motion.div>

            {/* THE MAIN 3D MOCKUP CONTAINER */}
            <motion.div
              whileHover={{ rotateY: -5, rotateX: 5, scale: 1.02 }}
              className="relative z-20 w-full max-w-4xl transition-all duration-500 ease-out"
              style={{ perspective: "1000px" }}
            >
              {/* Reflection/Glow behind image */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-rose-500/20 to-indigo-500/20 blur-2xl rounded-[3rem] -z-10" />

              <div className="bg-[#121212]/90 backdrop-blur-3xl rounded-[3rem] border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden">
                {/* Browser-style Header */}
                <div className="h-14 w-full bg-white/5 border-b border-white/5 flex items-center justify-between px-8">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/20" />
                    <div className="w-3 h-3 rounded-full bg-fuchsia-500/20" />
                    <div className="w-3 h-3 rounded-full bg-indigo-500/20" />
                  </div>
                  <div className="px-4 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-mono text-gray-500">
                    mostlabz.xyz/terminal/buy/pengu
                  </div>
                  <div className="w-3 h-3" /> {/* Spacer */}
                </div>
                {/* --- REAL CODED BLINK TERMINAL (NO IMAGE) --- */}
                <div className="p-4 md:p-10 flex justify-center bg-gradient-to-b from-transparent to-rose-950/10">
                  <div className="relative group w-full max-w-[420px]">
                    {/* Outer Glow */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 to-fuchsia-600 rounded-[2.5rem] blur opacity-10 group-hover:opacity-30 transition duration-1000"></div>

                    {/* THE BLINK BOX CLONE */}
                    <div className="relative bg-white rounded-[2rem] overflow-hidden flex flex-col shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]">

                      {/* 1. Banner Image Area */}
                      <div className="h-44 w-full bg-[#121212] relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-rose-600/40 to-indigo-900/40 animate-pulse" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-white font-black text-4xl italic tracking-tighter opacity-40 uppercase">MostLabz</span>
                        </div>
                      </div>

                      {/* 2. Content Area */}
                      <div className="p-6 flex flex-col gap-4 text-left">
                        {/* Domain & Verified Header */}
                        <div className="flex items-center gap-1.5">
                          <div className="w-4 h-4 rounded-full bg-rose-500 flex items-center justify-center">
                            <Zap className="w-2 h-2 text-white fill-current" />
                          </div>
                          <span className="text-[11px] font-bold text-gray-500">mostlabz.xyz</span>
                          <ShieldCheck className="w-3.5 h-3.5 text-rose-500" />
                        </div>

                        {/* Title & Description */}
                        <div>
                          <h4 className="text-black text-xl font-black tracking-tight leading-none mb-2 lowercase">Buy $BULL on X</h4>
                          <p className="text-gray-500 text-xs leading-relaxed lowercase">
                            buy $bull with sol. choose an amount or enter custom. fees distributed to community wallet.
                          </p>
                        </div>

                        {/* 3. Action Buttons (Row 1) */}
                        <div className="grid grid-cols-3 gap-2">
                          {['0.1 sol', '0.5 sol', '1 sol'].map((amt) => (
                            <button key={amt} className="py-2.5 bg-[#272727] text-white text-[11px] font-black rounded-xl hover:bg-rose-600 transition-colors uppercase italic tracking-tighter">
                              {amt}
                            </button>
                          ))}
                        </div>

                        {/* 4. Custom Input (Row 2) */}
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-100 border border-gray-200 rounded-xl px-4 py-2.5">
                            <span className="text-gray-400 text-[11px] font-bold lowercase">enter amount...</span>
                          </div>
                          <button className="bg-[#272727] text-white px-5 py-2.5 rounded-xl text-[11px] font-black uppercase italic tracking-tighter hover:bg-rose-600 transition-colors whitespace-nowrap">
                            buy $bull
                          </button>
                        </div>

                        {/* 5. Footer */}
                        <div className="flex items-center justify-center gap-1 mt-2">
                          <span className="text-[10px] text-gray-400 font-bold lowercase">powered by</span>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-indigo-500" />
                            <span className="text-[10px] text-black font-black uppercase tracking-widest italic">dialect</span>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>

            {/* REDESIGNED STATS: THE HUD BAR */}
            <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16 relative z-30">
              {[
                { val: "0.1s", label: "latency", color: "text-rose-500" },
                { val: "100%", label: "uptime", color: "text-fuchsia-500" },
                { val: "live", label: "status", color: "text-indigo-500" }
              ].map((stat, i) => (
                <div key={i} className="group cursor-pointer">
                  <p className={`${stat.color} font-black text-3xl md:text-5xl tracking-tighter italic transition-transform group-hover:-translate-y-1`}>
                    {stat.val}
                  </p>
                  <p className="text-gray-600 text-[10px] uppercase font-black tracking-[0.3em] mt-2">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

          </motion.div>
        </motion.div>
      </section>

      {/* --- PRICING: THE RICH TIER --- */}
      <section className="md:py-20 py-12 px-6" id="pricing">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">choose <br /> your <span className="italic text-rose-500">power.</span></h2>
            <p className="text-gray-500 max-w-xs text-right text-sm uppercase font-bold tracking-widest">investment in infrastructure is investment in growth.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* STANDARD */}
            <motion.div whileHover={{ y: -10 }} className="p-12 rounded-[4rem] bg-white/5 border border-white/10 hover:border-rose-500/50 transition-all group">
              <h4 className="text-rose-500 font-black uppercase tracking-widest text-[10px] mb-4">standard build</h4>
              <div className="text-7xl font-black tracking-tighter mb-8">$150</div>
              <ul className="space-y-4 mb-12">
                {['Custom UI Design', 'Registry Submission', '24h Deployment'].map((l, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-400 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-rose-500" /> {l}
                  </li>
                ))}
              </ul>
              <button className="w-full py-6 rounded-3xl bg-white text-black font-black uppercase tracking-tighter italic text-xl hover:bg-rose-500 hover:text-white transition-all">start setup</button>
            </motion.div>

            {/* ELITE */}
            <motion.div whileHover={{ y: -10 }} className="p-12 rounded-[4rem] bg-gradient-to-br from-rose-600 to-indigo-700 relative overflow-hidden shadow-[0_30px_100px_-20px_rgba(225,29,72,0.4)] group">
              <div className="absolute top-0 right-0 p-8 opacity-20">
                <Heart className="w-32 h-32 text-white fill-current" />
              </div>
              <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-4">elite terminal</h4>
              <div className="text-7xl font-black tracking-tighter mb-8">$300</div>
              <ul className="space-y-4 mb-12 relative z-10">
                {['Revenue-Share Logic', 'Full Source Handover', 'Custom Subdomain', 'Priority Support'].map((l, i) => (
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
      {/* --- ELITE MINIMAL FOOTER --- */}
      <section className="py-20 px-6 border-t border-white/5 relative overflow-hidden" id="contact">
        {/* Subtle Background Glow */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-600/5 blur-[120px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            {/* BRAND SIDE */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-6 h-6 bg-rose-600 rounded-full animate-pulse shadow-[0_0_15px_rgba(225,29,72,0.4)]" />
                <span className="text-3xl font-black tracking-tighter italic">mostlabz.</span>
              </div>
              <p className="text-gray-500 text-lg max-w-sm leading-tight mb-8">
                building the high-speed social-commerce layer for the solana network.
                the future of hype is here.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-500/20 bg-rose-500/5">
                <ShieldCheck className="w-3 h-3 text-rose-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-500/80">3x superteam winner</span>
              </div>
            </div>

            {/* CONTACT & SOCIAL ZONE */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-12 lg:pl-20">

              {/* CONNECT */}
              <div className="flex flex-col gap-6">
                <span className="text-rose-500 font-black text-xs uppercase tracking-[0.4em]">talk to us</span>
                <a
                  href="https://t.me/@abdullah_gram"
                  target="_blank"
                  className="group text-4xl font-black tracking-tighter flex items-center gap-3 hover:text-rose-400 transition-all"
                >
                  telegram <ArrowUpRight className="w-8 h-8 text-gray-700 group-hover:text-rose-400 group-hover:-translate-y-1 transition-all" />
                </a>
                <a
                  href="mailto:hello@mostlabz.xyz"
                  className="text-gray-500 hover:text-white transition-colors text-lg font-medium"
                >
                  hello@mostlabz.xyz
                </a>
              </div>

              {/* SOCIALS */}
              <div className="flex flex-col gap-6">
                <span className="text-rose-500 font-black text-xs uppercase tracking-[0.4em]">follow vision</span>
                <div className="flex flex-col gap-4">
                  <a href="https://x.com/abdullahdevo" className="flex items-center gap-2 text-xl font-bold tracking-tighter hover:text-rose-500 transition-colors">
                    <Twitter className="w-5 h-5 text-rose-500/50" /> twitter/x
                  </a>
                  <a href="https://dexscreener.com/" className="flex items-center gap-2 text-xl font-bold tracking-tighter hover:text-rose-500 transition-colors">
                    <BarChart3 className="w-5 h-5 text-rose-500/50" /> dexscanner
                  </a>
                  <a href="https://github.com/Mdabdullah3" className="flex items-center gap-2 text-xl font-bold tracking-tighter hover:text-rose-500 transition-colors">
                    <ExternalLink className="w-5 h-5 text-rose-500/50" /> github
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* BOTTOM BAR */}
          <div className="mt-20 pt-10 border-t  border-rose-400 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-100 text-[10px] uppercase font-black tracking-[0.5em]">
              &copy; 2026 mostlabz labs. all rights reserved.
            </p>
            <div className="flex gap-8 text-[10px] uppercase font-black tracking-[0.5em] text-gray-100">
              <span className="hover:text-rose-500 cursor-pointer transition-colors">privacy</span>
              <span className="hover:text-rose-500 cursor-pointer transition-colors">terms</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}