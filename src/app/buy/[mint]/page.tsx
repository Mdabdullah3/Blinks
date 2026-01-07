// app/buy/[mint]/page.tsx
import { Metadata } from "next";

type Props = {
    params: Promise<{ mint: string }>;
};

// This tells Twitter and the Inspector: "I am a Solana Action"
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { mint } = await params;
    return {
        title: `Buy Token`,
        description: `Direct buy on X`,
        other: {
            "solana-action": `solana-action:https://blinks-lovat.vercel.app/api/actions/buy/${mint}`,
        },
    };
}

export default function Page() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-black text-white">
            <p>Redirecting to Solana Action...</p>
        </div>
    );
}