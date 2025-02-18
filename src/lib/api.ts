
const BASE_URL = "https://api.coincap.io/v2";

export interface Asset {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string | null;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
}

export interface AssetHistory {
  priceUsd: string;
  time: number;
  date: string;
}

export const fetchAssets = async (): Promise<Asset[]> => {
  const response = await fetch(`${BASE_URL}/assets`);
  const data = await response.json();
  return data.data;
};

export const fetchAsset = async (id: string): Promise<Asset> => {
  const response = await fetch(`${BASE_URL}/assets/${id}`);
  const data = await response.json();
  return data.data;
};

export const fetchAssetHistory = async (id: string, interval = "d1"): Promise<AssetHistory[]> => {
  const response = await fetch(`${BASE_URL}/assets/${id}/history?interval=${interval}`);
  const data = await response.json();
  return data.data;
};

export const formatPrice = (price: string | number): string => {
  const numPrice = typeof price === "string" ? parseFloat(price) : price;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numPrice);
};

export const formatMarketCap = (marketCap: string | number): string => {
  const numMarketCap = typeof marketCap === "string" ? parseFloat(marketCap) : marketCap;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(numMarketCap);
};
