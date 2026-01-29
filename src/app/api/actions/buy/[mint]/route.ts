import {
  ActionGetResponse,
  ActionPostRequest,
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
      token?.info?.imageUrl || "https://i.ibb.co.com/392F91Jk/solana.png";

    const payload: ActionGetResponse = {
      type: "action",
      icon: icon,
      title: `Buy ${symbol}`,
      description: `Direct buy via Jupiter V6. Current Price: ${price}`,
      label: "Buy",
      links: {
        actions: [
          {
            label: "0.1 SOL", href: `${baseHref}?amount=0.1`,
            type: "transaction"
          },
          {
            label: "0.5 SOL", href: `${baseHref}?amount=0.5`,
            type: "transaction"
          },
          {
            label: "1.0 SOL", href: `${baseHref}?amount=1.0`,
            type: "transaction"
          },
          {
            label: `Buy ${symbol}`,
            href: `${baseHref}?amount={amount}`,
            parameters: [
              { name: "amount", label: "Enter SOL amount", required: true },
            ],
            type: "transaction"
          },
        ],
      },
    };
    return Response.json(payload, { headers: ACTIONS_CORS_HEADERS });
  } catch (err) {
    return Response.json(
      { message: "Network Error" },
      { status: 200, headers: ACTIONS_CORS_HEADERS }
    );
  }
}

export async function POST(req: Request, { params }: Context) {
  const { mint } = await params;
  const url = new URL(req.url);
  const amount = url.searchParams.get("amount") || "0.1";

  try {
    const body: ActionPostRequest = await req.json();
    const userWallet = body.account;

    // 1. Get Price Data for the Receipt
    const tokenRes = await fetch(
      `https://api.dexscreener.com/latest/dex/tokens/${mint}`
    );
    const tokenData = await tokenRes.json();
    const token = tokenData.pairs?.[0];
    const symbol = token?.baseToken?.symbol || "Tokens";
    const usdPrice = parseFloat(token?.priceUsd || "0");

    // 2. Get Real Quote and Transaction from Jupiter
    const amountInLamports = Math.floor(Number(amount) * 1_000_000_000);

    // FETCH QUOTE
    const quoteRes = await fetch(
      `https://quote-api.jup.ag/v6/quote?inputMint=So11111111111111111111111111111111111111112&outputMint=${mint}&amount=${amountInLamports}&slippageBps=100`
    );
    const quote = await quoteRes.json();

    if (!quote.outAmount) throw new Error("No Liquidity");

    // FETCH REAL TRANSACTION
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

    // 3. Create the "Summary Receipt" for the wallet message
    const outAmount = Number(quote.outAmount) / Math.pow(10, 6);
    const totalUsdValue = (outAmount * usdPrice).toFixed(2);

    const receiptMessage =
      `----------------------------------------\n` +
      `📥 SWAP SUMMARY\n` +
      `----------------------------------------\n` +
      `Pay: ${amount} SOL\n` +
      `Receive: ${outAmount.toLocaleString()} ${symbol} (~$${totalUsdValue})\n` +
      `----------------------------------------`;

    const payload: ActionPostResponse = {
      type: "transaction",
      transaction: swapTransaction, // THE REAL TRANSACTION DATA
      message: receiptMessage, // THIS SHOWS UP IN PHANTOM/OKX
    };

    return Response.json(payload, { headers: ACTIONS_CORS_HEADERS });
  } catch (err) {
    return Response.json(
      { message: "Swap Failed: Insufficient Liquidity" },
      { status: 200, headers: ACTIONS_CORS_HEADERS }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: ACTIONS_CORS_HEADERS });
}
