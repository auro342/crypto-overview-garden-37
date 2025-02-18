
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

// Conversion rate from USD to INR (you might want to fetch this dynamically in a production environment)
const USD_TO_INR = 83.34; // Example fixed rate

export const formatPrice = (price: string | number): string => {
  const numPrice = typeof price === "string" ? parseFloat(price) : price;
  const priceInRupees = numPrice * USD_TO_INR;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(priceInRupees);
};

export const formatMarketCap = (marketCap: string | number): string => {
  const numMarketCap = typeof marketCap === "string" ? parseFloat(marketCap) : marketCap;
  const marketCapInRupees = numMarketCap * USD_TO_INR;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(marketCapInRupees);
};
