import {
  ActionGetResponse,
  ActionPostResponse,
  ACTIONS_CORS_HEADERS,
} from "@solana/actions";

type Context = { params: Promise<{ mint: string }> };

export async function GET(req: Request, { params }: Context) {
  const { mint } = await params;
  const url = new URL(req.url);
  const baseHref = `${url.protocol}//${url.host}/api/actions/buy/${mint}`;

  try {
    const res = await fetch(
      `https://api.dexscreener.com/latest/dex/tokens/${mint}`
    );
    const data = await res.json();
    const token = data.pairs?.[0];

    const symbol = token?.baseToken?.symbol || "TOKEN";
    const price = token?.priceUsd ? `$${token.priceUsd}` : "Live";
    const icon =
      token?.info?.imageUrl ||
      "https://ucarecdn.com/707aa3c6-67a4-4363-8c46-993425039f9b/";

    const payload: ActionGetResponse = {
      type: "action",
      icon: icon,
      title: `Buy $${symbol} - Pro Terminal`,
      description: `📊 **Price:** ${price} | **24h Vol:** $${
        token?.volume?.h24?.toLocaleString() || "0"
      }\n\nEnter the amount of SOL you want to spend below.`,
      label: "Buy",
      links: {
        actions: [
          {
            label: "Calculate Details",
            href: `${baseHref}?amount={amount}`,
            parameters: [
              {
                name: "amount",
                label: "Amount in SOL (e.g. 0.1)",
                required: true,
              },
            ],
            type: "transaction",
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

// This POST handles the calculation and returns the NEXT STEP
export async function POST(req: Request, { params }: Context) {
  const { mint } = await params;
  const url = new URL(req.url);
  const amount = url.searchParams.get("amount") || "0.1";

  const nextBaseHref = `${url.protocol}//${url.host}/api/actions/confirm/${mint}`;

  try {
    // 1. Get Quote from Jupiter to show the user the REAL amount
    const amountInLamports = Math.floor(Number(amount) * 1_000_000_000);
    const quoteRes = await fetch(
      `https://quote-api.jup.ag/v6/quote?inputMint=So11111111111111111111111111111111111111112&outputMint=${mint}&amount=${amountInLamports}&slippageBps=100`
    );
    const quote = await quoteRes.json();
    const outAmount = (
      Number(quote.outAmount) / Math.pow(10, quote.contextSlot ? 9 : 6)
    ).toFixed(2);

    // 2. Return the NEXT action (The Confirmation Screen)
    const payload: ActionPostResponse = {
      type: "post",
      message: `✅ Ready to swap!\n\nSpending: ${amount} SOL\nReceiving: ~${outAmount} Tokens\nSlippage: 1.0%`,
      links: {
        next: {
          type: "post",
          href: `${nextBaseHref}?amount=${amount}`,
        },
      },
    };

    return Response.json(payload, { headers: ACTIONS_CORS_HEADERS });
  } catch (err) {
    return Response.json(
      { message: "Quote Error" },
      { status: 500, headers: ACTIONS_CORS_HEADERS }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, { headers: ACTIONS_CORS_HEADERS });
}
