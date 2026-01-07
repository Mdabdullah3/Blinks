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
    const price = token?.priceUsd ? `$${token.priceUsd}` : "Live";
    const icon =
      token?.info?.imageUrl ||
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/info/logo.png";

    const payload: ActionGetResponse = {
      type: "action",
      icon: icon,
      title: `Buy ${symbol}`,
      description: `Direct buy via Jupiter. Price: ${price}`,
      label: "Buy",
      links: {
        actions: [
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
          {
            label: `Buy ${symbol}`,
            href: `${baseHref}?amount={amount}`,
            parameters: [
              { name: "amount", label: "Enter SOL amount", required: true },
            ],
            type: "post",
          },
        ],
      },
    };

    // CRITICAL: We MUST pass the headers here
    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: {
        ...ACTIONS_CORS_HEADERS,
        "X-Action-Version": "2.1.3",
        "X-Blockchain-Ids": "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp", // Full Mainnet ID
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return Response.json(
      { message: "Error" },
      { headers: ACTIONS_CORS_HEADERS }
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

    const outAmount = Number(quote.outAmount) / Math.pow(10, 6);
    const totalUsdValue = (outAmount * usdPrice).toFixed(2);

    // THIS IS THE PAYLOAD YOU BUILT
    const payload: ActionPostResponse = {
      type: "post", // Tells the wallet this is a metadata update
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

    // FIXED: Return the ACTUAL payload with headers
    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: {
        ...ACTIONS_CORS_HEADERS,
        "X-Action-Version": "2.1.3",
        "X-Blockchain-Ids": "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return Response.json(
      { message: "Quote Error" },
      { status: 500, headers: ACTIONS_CORS_HEADERS }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      ...ACTIONS_CORS_HEADERS,
      "X-Action-Version": "2.1.3",
      "X-Blockchain-Ids": "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
    },
  });
}
