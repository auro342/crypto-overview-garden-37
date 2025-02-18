
import { useQuery } from "@tanstack/react-query";
import { fetchAssets, formatMarketCap, formatPrice } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, Cube } from "lucide-react";

export default function AssetList() {
  const navigate = useNavigate();
  const { data: assets, isLoading, error } = useQuery({
    queryKey: ["assets"],
    queryFn: fetchAssets,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-4xl font-bold animate-pulse">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-4xl font-bold text-brutal-red">Error loading assets</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <h1 className="text-7xl font-black tracking-tight border-b-8 border-brutal-black pb-2">
          CRYPTO<span className="text-brutal-red">VERSE</span>
        </h1>
        <button
          onClick={() => navigate('/3d')}
          className="flex items-center gap-2 px-6 py-3 bg-brutal-black text-brutal-white hover:bg-brutal-red transition-colors duration-200 text-xl font-bold"
        >
          <Cube className="w-6 h-6" />
          3D View
        </button>
      </div>

      <div className="grid gap-6">
        <div className="p-8 border-4 border-brutal-black bg-[url('https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center">
          <div className="bg-brutal-white/90 p-6 border-4 border-brutal-black">
            <h2 className="text-4xl font-black mb-4">Track Your Crypto Universe</h2>
            <p className="text-xl">
              Explore the top cryptocurrencies ranked by market cap. Click on any asset to see detailed analytics and price history.
            </p>
          </div>
        </div>

        {assets?.map((asset) => (
          <button
            key={asset.id}
            onClick={() => navigate(`/asset/${asset.id}`)}
            className="group grid grid-cols-[auto_1fr_auto] gap-4 p-6 border-4 border-brutal-black hover:bg-brutal-black hover:text-brutal-white transition-colors duration-200"
          >
            <div className="text-2xl font-mono font-bold">{asset.rank}</div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-black">{asset.symbol}</span>
                <span className="text-brutal-gray text-xl">{asset.name}</span>
              </div>
              <div className="text-lg text-brutal-gray">
                Market Cap: {formatMarketCap(asset.marketCapUsd)}
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-2xl font-bold">{formatPrice(asset.priceUsd)}</div>
                <div
                  className={`text-lg ${
                    parseFloat(asset.changePercent24Hr) >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  } font-bold`}
                >
                  {parseFloat(asset.changePercent24Hr).toFixed(2)}%
                </div>
              </div>
              <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
