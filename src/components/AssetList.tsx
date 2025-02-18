
import { useQuery } from "@tanstack/react-query";
import { fetchAssets, formatMarketCap, formatPrice } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

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
      <h1 className="text-6xl font-bold mb-8 border-b-4 border-brutal-black pb-4">
        Crypto Assets
      </h1>
      <div className="grid gap-4">
        {assets?.map((asset) => (
          <button
            key={asset.id}
            onClick={() => navigate(`/asset/${asset.id}`)}
            className="group grid grid-cols-[auto_1fr_auto] gap-4 p-4 border-2 border-brutal-black hover:bg-brutal-black hover:text-brutal-white transition-colors duration-200"
          >
            <div className="text-xl font-mono">{asset.rank}</div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{asset.symbol}</span>
                <span className="text-brutal-gray">{asset.name}</span>
              </div>
              <div className="text-sm text-brutal-gray">
                Market Cap: {formatMarketCap(asset.marketCapUsd)}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-xl font-bold">{formatPrice(asset.priceUsd)}</div>
                <div
                  className={`text-sm ${
                    parseFloat(asset.changePercent24Hr) >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {parseFloat(asset.changePercent24Hr).toFixed(2)}%
                </div>
              </div>
              <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
