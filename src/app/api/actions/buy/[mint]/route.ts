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
    const res = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${mint}`);
    const data = await res.json();
    const token = data.pairs?.[0];

    const symbol = token?.baseToken?.symbol || mint.substring(0, 4).toUpperCase();
    const price = token?.priceUsd ? `$${token.priceUsd}` : "Live";
    const mcap = token?.fdv ? `$${(token.fdv / 1000000).toFixed(2)}M` : "Tracking...";

    const icon = token?.info?.imageUrl || "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/info/logo.png";

    const payload: ActionGetResponse = {
      type: "action",
      icon: icon,
      title: `Pro Terminal: ${symbol}`,
      description: 
        `💰 **Price:** ${price} | 🏦 **MCap:** ${mcap}\n` +
        `📈 **24h Vol:** $${token?.volume?.h24?.toLocaleString() || "0"}\n\n` +
        `Select an amount or enter custom SOL below. The terminal will calculate the best route via Jupiter V6.`,
      label: "Buy",
      links: {
        actions: [
          {
            label: "0.5 SOL", href: `${baseHref}?amount=0.5`,
            type: "post"
          },
          {
            label: "1.0 SOL", href: `${baseHref}?amount=1.0`,
            type: "post"
          },
          {
            label: "5.0 SOL", href: `${baseHref}?amount=5.0`,
            type: "post"
          },
          {
            label: "Calculate Custom",
            href: `${baseHref}?amount={amount}`,
            parameters: [
              {
                name: "amount",
                label: "Enter SOL Amount",
                required: true,
              },
            ],
            type: "post"
          },
        ],
      },
    };

    return Response.json(payload, { headers: ACTIONS_CORS_HEADERS });
  } catch (err) {
    return Response.json({ message: "Network Error" }, { status: 500, headers: ACTIONS_CORS_HEADERS });
  }
}

export async function POST(req: Request, { params }: Context) {
  const { mint } = await params;
  const url = new URL(req.url);
  const amount = url.searchParams.get("amount") || "0.1";
  const nextBaseHref = `${url.protocol}//${url.host}/api/actions/confirm/${mint}`;

  try {
    // 1. Get Token Info for USD math
    const tokenRes = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${mint}`);
    const tokenData = await tokenRes.json();
    const token = tokenData.pairs?.[0];
    const usdPrice = parseFloat(token?.priceUsd || "0");

    // 2. Get Quote from Jupiter
    const amountInLamports = Math.floor(Number(amount) * 1_000_000_000);
    const quoteRes = await fetch(
      `https://quote-api.jup.ag/v6/quote?inputMint=So11111111111111111111111111111111111111112&outputMint=${mint}&amount=${amountInLamports}&slippageBps=100`
    );
    const quote = await quoteRes.json();
    
    // Calculate output
    const outAmount = Number(quote.outAmount) / Math.pow(10, 6); // standard SPL decimals
    const totalUsdValue = (outAmount * usdPrice).toFixed(2);

    const payload: ActionPostResponse = {
      type: "post",
      message: 
        `----------------------------------------\n` +
        `📦 **ORDER PREVIEW**\n` +
        `----------------------------------------\n` +
        `Pay: **${amount} SOL**\n` +
        `Receive: **${outAmount.toLocaleString()} ${token?.baseToken?.symbol || 'Tokens'}**\n` +
        `Value: **~$${totalUsdValue}**\n\n` +
        `Platform Fee: 0.5% (Included)\n` +
        `Priority: High ⚡\n` +
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
    return Response.json({ message: "Quote Error" }, { status: 500, headers: ACTIONS_CORS_HEADERS });
  }
}

export async function OPTIONS() {
  return new Response(null, { headers: ACTIONS_CORS_HEADERS });
}