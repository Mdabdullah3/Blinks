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

    const symbol =
      token?.baseToken?.symbol || mint.substring(0, 4).toUpperCase();

    
    const icon =
      token?.info?.imageUrl ||
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/info/logo.png";

    const payload: ActionGetResponse = {
      type: "action",
      icon: icon,
      title: `Buy ${symbol}`,
      description: `Buy ${symbol} with SOL. Choose an amount from the options below, or enter a custom amount.`,
      label: "Buy",
      links: {
        actions: [
          // Row of buttons (0.1, 0.5, 1)
          {
            label: "0.1 SOL",
            href: `${baseHref}?amount=0.1`,
            type: "post",
          },
          {
            label: "0.5 SOL",
            href: `${baseHref}?amount=0.5`,
            type: "post",
          },
          {
            label: "1 SOL",
            href: `${baseHref}?amount=1.0`,
            type: "post",
          },
          // Custom input with the button "Buy $SYMBOL"
          {
            label: `Buy ${symbol}`, // This appears on the button next to the input
            href: `${baseHref}?amount={amount}`,
            parameters: [
              {
                name: "amount",
                label: "Enter a custom SOL amount",
                required: true,
              },
            ],
            type: "post",
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
  const { mint } = await params;
  const url = new URL(req.url);
  const amount = url.searchParams.get("amount") || "0.1";
  const nextBaseHref = `${url.protocol}//${url.host}/api/actions/confirm/${mint}`;

  try {
    const tokenRes = await fetch(
      `https://api.dexscreener.com/latest/dex/tokens/${mint}`
    );
    const tokenData = await tokenRes.json();
    const token = tokenData.pairs?.[0];
    const symbol = token?.baseToken?.symbol || "Token";
    const usdPrice = parseFloat(token?.priceUsd || "0");

    const amountInLamports = Math.floor(Number(amount) * 1_000_000_000);
    const quoteRes = await fetch(
      `https://quote-api.jup.ag/v6/quote?inputMint=So11111111111111111111111111111111111111112&outputMint=${mint}&amount=${amountInLamports}&slippageBps=100`
    );
    const quote = await quoteRes.json();

    // Jupiter returns outAmount in decimals. Most tokens are 6 decimals.
    const outAmount = Number(quote.outAmount) / Math.pow(10, 6);
    const totalUsdValue = (outAmount * usdPrice).toFixed(2);

    const payload: ActionPostResponse = {
      type: "post",
      message:
        `----------------------------------------\n` +
        `📥 **SWAP SUMMARY**\n` +
        `----------------------------------------\n` +
        `You pay: **${amount} SOL**\n` +
        `You receive min: **${outAmount.toLocaleString()} ${symbol}** (~$${totalUsdValue})\n\n` +
        `Platform Fee: 0.5%\n` +
        `----------------------------------------`,
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
