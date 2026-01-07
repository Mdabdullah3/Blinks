/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { use, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Zap,
    Smartphone,
    Copy,
    CheckCircle2,
    Globe,
    ShieldCheck,
    Monitor,
    ExternalLink,
    BarChart3
} from "lucide-react";

export default function Page({ params }: { params: Promise<{ mint: string }> }) {
    const { mint } = use(params);
    const [isMobile, setIsMobile] = useState(false);
    const [copied, setCopied] = useState(false);

    // 1. Check if user is on Mobile or Desktop for smart redirect
    useEffect(() => {
        const userAgent = navigator.userAgent.toLowerCase();
        const mobileCheck = /iphone|ipad|ipod|android/.test(userAgent);
        setIsMobile(mobileCheck);
    }, []);

    const actionApiUrl = `https://www.mostlabz.xyz/api/actions/buy/${mint}`;

    // URL for Mobile (Triggers Wallet App)
    const mobileUrl = `solana-action:${actionApiUrl}`;

    // URL for Desktop (Opens Dialect Interstitial Player)
    const desktopUrl = `https://dial.to/?action=solana-action:${actionApiUrl}`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(actionApiUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-[#0a0206] text-white flex flex-col items-center justify-center p-6 text-center">
            {/* Background Decorative Glow */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,#e11d4808_0,transparent_70%)] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-md p-10 rounded-[3rem] bg-white/[0.03] border border-rose-500/20 backdrop-blur-3xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
            >
                {/* Animated Glow Logo */}
                <div className="relative w-20 h-20 mx-auto mb-8">
                    <div className="absolute inset-0 bg-rose-500 blur-2xl opacity-20 animate-pulse" />
                    <div className="relative w-full h-full bg-rose-500 rounded-[2rem] flex items-center justify-center shadow-2xl">
                        <Zap className="w-10 h-10 text-white fill-current" />
                    </div>
                </div>

                <h1 className="text-3xl font-black tracking-tighter mb-4 italic uppercase">
                    Ready to Swap
                </h1>

                <p className="text-gray-400 text-sm mb-10 leading-tight max-w-[280px] mx-auto">
                    {isMobile
                        ? "Connect your mobile wallet to complete the transaction."
                        : "Use the Blink terminal to complete the transaction on your desktop."}
                </p>

                <div className="flex flex-col gap-4">
                    {/* THE SMART ACTION BUTTON */}
                    <a
                        href={isMobile ? mobileUrl : desktopUrl}
                        target={isMobile ? "_self" : "_blank"}
                        rel="noopener noreferrer"
                        className="group w-full py-5 bg-rose-600 hover:bg-rose-500 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3 shadow-lg shadow-rose-600/20 active:scale-95"
                    >
                        {isMobile ? (
                            <><Smartphone className="w-5 h-5" /> Open in Wallet</>
                        ) : (
                            <><Monitor className="w-5 h-5" /> Open in terminal</>
                        )}
                        <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                    </a>

                    <div className="flex items-center gap-2 my-4">
                        <div className="h-[1px] flex-1 bg-white/5" />
                        <span className="text-[9px] font-black text-gray-700 uppercase tracking-widest">Protocol Secured</span>
                        <div className="h-[1px] flex-1 bg-white/5" />
                    </div>

                    {/* SECONDARY COPY OPTION */}
                    <button
                        onClick={copyToClipboard}
                        className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl font-black uppercase tracking-widest text-[10px] text-gray-500 hover:text-white transition-all flex items-center justify-center gap-2 active:scale-95"
                    >
                        {copied ? (
                            <><CheckCircle2 className="w-3 h-3 text-green-500" /> API Link Copied</>
                        ) : (
                            <><Copy className="w-3 h-3" /> Copy Blink URL</>
                        )}
                    </button>
                </div>

                {/* TRUST BADGES */}
                <div className="mt-10 pt-8 border-t border-white/5 flex justify-center gap-8 grayscale opacity-20">
                    <ShieldCheck className="w-5 h-5" />
                    <Globe className="w-5 h-5" />
                    <BarChart3 className="w-5 h-5" />
                </div>
            </motion.div>

            {/* FOOTER CAPTION */}
            <div className="mt-12 flex flex-col items-center gap-2 relative z-10">
                <p className="text-[10px] uppercase font-black tracking-[0.5em] text-gray-800">
                    Infrastructure by MostLabz &copy; 2026
                </p>
                <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                    <p className="text-[8px] font-bold text-rose-500/50 uppercase tracking-widest">3x Superteam Bounty Winner</p>
                </div>
            </div>
        </div>
    );
}