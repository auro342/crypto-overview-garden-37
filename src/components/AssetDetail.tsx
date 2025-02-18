
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAsset, fetchAssetHistory, formatPrice, formatMarketCap } from "@/lib/api";
import { ArrowLeft } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function AssetDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: asset, isLoading: assetLoading } = useQuery({
    queryKey: ["asset", id],
    queryFn: () => fetchAsset(id!),
    enabled: !!id,
  });

  const { data: history, isLoading: historyLoading } = useQuery({
    queryKey: ["assetHistory", id],
    queryFn: () => fetchAssetHistory(id!),
    enabled: !!id,
  });

  if (assetLoading || historyLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-4xl font-bold animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!asset) return null;

  return (
    <div className="w-full max-w-5xl mx-auto p-4 animate-slide-up">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-xl font-bold mb-8 hover:text-brutal-red transition-colors"
      >
        <ArrowLeft />
        Back
      </button>

      <div className="border-2 border-brutal-black p-6 mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-5xl font-bold mb-2">{asset.name}</h1>
            <div className="text-2xl text-brutal-gray">{asset.symbol}</div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold mb-2">{formatPrice(asset.priceUsd)}</div>
            <div
              className={`text-xl ${
                parseFloat(asset.changePercent24Hr) >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {parseFloat(asset.changePercent24Hr).toFixed(2)}%
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="border-2 border-brutal-black p-4">
            <div className="text-brutal-gray mb-1">Market Cap</div>
            <div className="text-2xl font-bold">{formatMarketCap(asset.marketCapUsd)}</div>
          </div>
          <div className="border-2 border-brutal-black p-4">
            <div className="text-brutal-gray mb-1">24h Volume</div>
            <div className="text-2xl font-bold">{formatMarketCap(asset.volumeUsd24Hr)}</div>
          </div>
        </div>

        <div className="h-[400px] border-2 border-brutal-black p-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={history}>
              <XAxis
                dataKey="date"
                tickFormatter={(str) => new Date(str).toLocaleDateString()}
                stroke="#000000"
              />
              <YAxis
                dataKey="priceUsd"
                tickFormatter={(num) => formatPrice(num)}
                stroke="#000000"
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-brutal-black text-brutal-white p-2">
                        <div>{new Date(payload[0].payload.date).toLocaleDateString()}</div>
                        <div className="font-bold">
                          {formatPrice(payload[0].payload.priceUsd)}
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="priceUsd"
                stroke="#FF0000"
                fill="#FF0000"
                fillOpacity={0.1}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
