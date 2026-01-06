import {
  ActionGetResponse,
  ActionPostRequest,
  ActionPostResponse,
  ACTIONS_CORS_HEADERS,
} from "@solana/actions";

// Update the type for params to be a Promise (Next.js 15 requirement)
type Context = {
  params: Promise<{ mint: string }>;
};

export async function GET(req: Request, { params }: Context) {
  // We MUST await params in Next.js 15
  const { mint } = await params;

  try {
    const res = await fetch(
      `https://api.dexscreener.com/latest/dex/tokens/${mint}`
    );
    const data = await res.json();

    const token = data.pairs?.[0];

    // Professional Fallback UI
    const symbol = token?.baseToken?.symbol || "Token";
    const price = token?.priceUsd || "Live";
    const icon =
      token?.info?.imageUrl ||
      "https://ucarecdn.com/707aa3c6-67a4-4363-8c46-993425039f9b/";

    const payload: ActionGetResponse = {
      icon: icon,
      title: `Buy $${symbol} on X`,
      description: `Mint: ${mint.substring(0, 4)}...${mint.substring(
        mint.length - 4
      )} | Price: $${price}`,
      label: "Buy",
      links: {
        actions: [
          {
              label: "0.1 SOL",
              href: `/api/actions/buy/${mint}?amount=0.1`,
              type: "transaction"
          },
          {
              label: "0.5 SOL",
              href: `/api/actions/buy/${mint}?amount=0.5`,
              type: "transaction"
          },
          {
              label: "1.0 SOL",
              href: `/api/actions/buy/${mint}?amount=1.0`,
              type: "transaction"
          },
        ],
      },
    };

    return Response.json(payload, { headers: ACTIONS_CORS_HEADERS });
  } catch (err) {
    return Response.json(
      { message: "Network Error" },
      { status: 500, headers: ACTIONS_CORS_HEADERS }
    );
  }
}

export async function POST(req: Request, { params }: Context) {
  try {
    // We MUST await params in Next.js 15
    const { mint } = await params;

    const { searchParams } = new URL(req.url);
    const amount = searchParams.get("amount") || "0.1";

    const body: ActionPostRequest = await req.json();
    const userWallet = body.account;

    const amountInLamports = Math.floor(Number(amount) * 1_000_000_000);

    // 1. Get Quote from Jupiter
    const quoteRes = await fetch(
      `https://quote-api.jup.ag/v6/quote?inputMint=So11111111111111111111111111111111111111112&outputMint=${mint}&amount=${amountInLamports}&slippageBps=100`
    );
    const quote = await quoteRes.json();

    // 2. Create Swap Transaction
    const swapRes = await fetch("https://quote-api.jup.ag/v6/swap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quoteResponse: quote,
        userPublicKey: userWallet,
        wrapAndUnwrapSol: true,
      }),
    });
    const { swapTransaction } = await swapRes.json();

    const payload: ActionPostResponse = {
      type: "transaction",
      transaction: swapTransaction,
      message: `Swapping ${amount} SOL for token...`,
    };

    return Response.json(payload, { headers: ACTIONS_CORS_HEADERS });
  } catch (err) {
    return Response.json(
      { message: "Transaction Error" },
      { status: 500, headers: ACTIONS_CORS_HEADERS }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, { headers: ACTIONS_CORS_HEADERS });
}
