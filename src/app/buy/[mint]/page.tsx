import { Metadata } from "next";

type Props = {
    params: Promise<{ mint: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { mint } = await params;
    // This is the link to your API route
    const actionUrl = `solana-action:https://blinks-lovat.vercel.app/api/actions/buy/${mint}`;

    return {
        title: "Buy Token on MostLabz",
        description: "Instant Solana Swap via Blinks",
        openGraph: {
            title: "Buy Token",
            description: "Direct buy on X",
            images: ["https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/info/logo.png"],
        },
        other: {
            "solana-action": actionUrl,
        },
    };
}

export default function Page() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-black text-white">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-2">Solana Action Page</h1>
                <p className="text-gray-400">If you see this, share this link on X.com to use the Blink.</p>
            </div>
        </div>
    );
}