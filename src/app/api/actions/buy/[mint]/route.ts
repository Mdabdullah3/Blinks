// app/api/actions/buy/[mint]/route.ts
import { ActionGetResponse, ACTIONS_CORS_HEADERS } from "@solana/actions";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ mint: string }> }
) {
  const { mint } = await params;

  try {
    // 1. Fetch Real-time data from DexScreener (Free & No Key)
    const res = await fetch(
      `https://api.dexscreener.com/latest/dex/tokens/${mint}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
      }
    );

    const data = await res.json();

    // DEBUG: Look at your terminal/command prompt to see what this prints!
    console.log(
      "DexScreener Response:",
      JSON.stringify(data).substring(0, 200)
    );

    if (!data.pairs || data.pairs.length === 0) {
      return Response.json(
        {
          message:
            "Token not found on DexScreener. Make sure it has a Liquidity Pool.",
        },
        { status: 404, headers: ACTIONS_CORS_HEADERS }
      );
    }

    const token = data.pairs[0];
    const symbol = token.baseToken.symbol;
    const price = token.priceUsd;
    const icon = token.info?.imageUrl || "";

    // 2. Build the Blink Box UI
    const payload: ActionGetResponse = {
      icon: icon,
      title: `Buy $${symbol} on X`,
      description: `Live Price: $${price} | 24h Vol: $${token.volume.h24.toLocaleString()}`,
      label: "Buy",
      links: {
        actions: [
          {
            label: "0.1 SOL",
            href: `/api/actions/buy/${mint}?amount=0.1`,
            type: "transaction",
          },
          {
            label: "0.5 SOL",
            href: `/api/actions/buy/${mint}?amount=0.5`,
            type: "transaction",
          },
          {
            label: "1.0 SOL",
            href: `/api/actions/buy/${mint}?amount=1.0`,
            type: "transaction",
          },
        ],
      },
    };

    return Response.json(payload, { headers: ACTIONS_CORS_HEADERS });
  } catch (err) {
    console.error(err);
    return Response.json(
      { message: "Internal Error" },
      { status: 500, headers: ACTIONS_CORS_HEADERS }
    );
  }
}

// OPTIONS request handles pre-flight for CORS
export async function OPTIONS() {
  return new Response(null, { headers: ACTIONS_CORS_HEADERS });
}
