export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-4xl font-bold mb-4 bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        MostLabz Blink Store
      </h1>
      <p className="text-gray-400 mb-8 max-w-md">
        This is a high-speed Solana Action provider. To use this service, please share the links on X (Twitter) or use a Blink-aware wallet like Phantom or Backpack.
      </p>
      <div className="p-4 border border-gray-800 rounded-lg bg-gray-900">
        <p className="text-sm text-gray-500">Infrastructure provided by 3x Superteam Bounty Winner.</p>
      </div>
    </div>
  );
}