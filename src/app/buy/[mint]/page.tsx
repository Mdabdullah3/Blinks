"use client";

import { use, useState } from "react";
import { motion } from "framer-motion";
import { Zap, Smartphone, Copy, CheckCircle2, Globe, ShieldCheck } from "lucide-react";

export default function Page({ params }: { params: Promise<{ mint: string }> }) {
    const { mint } = use(params);
    const [copied, setCopied] = useState(false);

    // The Universal Action Protocol (Works for Solflare, Backpack, Phantom, etc.)
    const actionApiUrl = `https://www.mostlabz.xyz/api/actions/buy/${mint}`;
    const universalProtocol = `solana-action:${actionApiUrl}`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(actionApiUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-[#0a0206] text-white flex flex-col items-center justify-center p-6 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md p-10 rounded-[3rem] bg-gradient-to-b from-white/10 to-transparent border border-rose-500/20 backdrop-blur-3xl shadow-[0_0_50px_-12px_rgba(225,29,72,0.2)]"
            >
                <div className="w-20 h-20 bg-rose-500 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl">
                    <Zap className="w-10 h-10 text-white fill-current" />
                </div>

                <h1 className="text-3xl font-black tracking-tighter mb-4 italic uppercase">
                    Ready to Swap
                </h1>

                <p className="text-gray-400 text-sm mb-10 leading-tight">
                    Click below to open this transaction in your preferred Solana wallet (Phantom, Solflare, Backpack, etc.)
                </p>

                <div className="flex flex-col gap-4">
                    {/* UNIVERSAL BUTTON */}
                    <a
                        href={universalProtocol}
                        className="w-full py-5 bg-rose-600 hover:bg-rose-500 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3 shadow-lg shadow-rose-600/20 active:scale-95"
                    >
                        <Smartphone className="w-5 h-5" /> Connect Wallet
                    </a>

                    <div className="flex items-center gap-2 my-4">
                        <div className="h-[1px] flex-1 bg-white/5" />
                        <span className="text-[10px] font-black text-gray-700 uppercase tracking-widest">or use dApp browser</span>
                        <div className="h-[1px] flex-1 bg-white/5" />
                    </div>

                    {/* COPY LINK OPTION (Safe for any wallet browser) */}
                    <button
                        onClick={copyToClipboard}
                        className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl font-black uppercase tracking-widest text-[10px] text-gray-500 hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                        {copied ? (
                            <><CheckCircle2 className="w-3 h-3 text-green-500" /> Link Copied</>
                        ) : (
                            <><Copy className="w-3 h-3" /> Copy Action Link</>
                        )}
                    </button>
                </div>

                <div className="mt-10 pt-8 border-t border-white/5 flex justify-center gap-6 grayscale opacity-30">
                    {/* Wallet Icons (Dummy placeholders for trust) */}
                    <Globe className="w-5 h-5" />
                    <Zap className="w-5 h-5" />
                    <ShieldCheck className="w-5 h-5" />
                </div>
            </motion.div>

            <p className="mt-8 text-[10px] uppercase font-black tracking-[0.5em] text-gray-900">
                Infrastructure by MostLabz &copy; 2026
            </p>
        </div>
    );
}