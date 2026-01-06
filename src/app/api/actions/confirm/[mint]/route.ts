import {
  ActionPostRequest,
  ActionPostResponse,
  ACTIONS_CORS_HEADERS,
} from "@solana/actions";

type Context = { params: Promise<{ mint: string }> };

export async function POST(req: Request, { params }: Context) {
  const { mint } = await params;
  const { searchParams } = new URL(req.url);
  const amount = searchParams.get("amount") || "0.1";

  try {
    const body: ActionPostRequest = await req.json();
    const userWallet = body.account;
    const amountInLamports = Math.floor(Number(amount) * 1_000_000_000);

    // 1. Fresh Quote
    const quoteRes = await fetch(
      `https://quote-api.jup.ag/v6/quote?inputMint=So11111111111111111111111111111111111111112&outputMint=${mint}&amount=${amountInLamports}&slippageBps=100`
    );
    const quote = await quoteRes.json();

    // 2. Build Swap with Fee Logic
    const swapRes = await fetch("https://quote-api.jup.ag/v6/swap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quoteResponse: quote,
        userPublicKey: userWallet,
        wrapAndUnwrapSol: true,
        // UNCOMMENT THIS TO START EARNING:
        // platformFeeBps: 50, // 0.5% fee
      }),
    });
    const { swapTransaction } = await swapRes.json();

    const payload: ActionPostResponse = {
      type: "transaction",
      transaction: swapTransaction,
      message: `Transaction created! Sign in your wallet to confirm the swap.`,
    };

    return Response.json(payload, { headers: ACTIONS_CORS_HEADERS });
  } catch (err) {
    return Response.json(
      { message: "Swap failed" },
      { status: 500, headers: ACTIONS_CORS_HEADERS }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, { headers: ACTIONS_CORS_HEADERS });
}
