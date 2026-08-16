export type MarketCategory = "crypto" | "stocks" | "forex" | "metals";

export type MarketAsset = {
  id: string;
  display: string;
  name: string;
  category: MarketCategory;
  source: "binance" | "yahoo";
  binance?: string;
  yahoo?: string;
};

export const MARKET_ASSETS: MarketAsset[] = [
  { id: "BTCUSDT", display: "BTC", name: "Bitcoin", category: "crypto", source: "binance", binance: "BTCUSDT" },
  { id: "ETHUSDT", display: "ETH", name: "Ethereum", category: "crypto", source: "binance", binance: "ETHUSDT" },
  { id: "SOLUSDT", display: "SOL", name: "Solana", category: "crypto", source: "binance", binance: "SOLUSDT" },
  { id: "BNBUSDT", display: "BNB", name: "BNB", category: "crypto", source: "binance", binance: "BNBUSDT" },
  { id: "XRPUSDT", display: "XRP", name: "XRP", category: "crypto", source: "binance", binance: "XRPUSDT" },
  { id: "DOGEUSDT", display: "DOGE", name: "Dogecoin", category: "crypto", source: "binance", binance: "DOGEUSDT" },
  { id: "ADAUSDT", display: "ADA", name: "Cardano", category: "crypto", source: "binance", binance: "ADAUSDT" },
  { id: "AVAXUSDT", display: "AVAX", name: "Avalanche", category: "crypto", source: "binance", binance: "AVAXUSDT" },
  { id: "LINKUSDT", display: "LINK", name: "Chainlink", category: "crypto", source: "binance", binance: "LINKUSDT" },
  { id: "DOTUSDT", display: "DOT", name: "Polkadot", category: "crypto", source: "binance", binance: "DOTUSDT" },
  { id: "LTCUSDT", display: "LTC", name: "Litecoin", category: "crypto", source: "binance", binance: "LTCUSDT" },
  { id: "NEARUSDT", display: "NEAR", name: "NEAR", category: "crypto", source: "binance", binance: "NEARUSDT" },
  { id: "APTUSDT", display: "APT", name: "Aptos", category: "crypto", source: "binance", binance: "APTUSDT" },
  { id: "ARBUSDT", display: "ARB", name: "Arbitrum", category: "crypto", source: "binance", binance: "ARBUSDT" },
  { id: "SUIUSDT", display: "SUI", name: "Sui", category: "crypto", source: "binance", binance: "SUIUSDT" },
  { id: "TONUSDT", display: "TON", name: "Toncoin", category: "crypto", source: "binance", binance: "TONUSDT" },
  { id: "TRXUSDT", display: "TRX", name: "TRON", category: "crypto", source: "binance", binance: "TRXUSDT" },
  { id: "AAVEUSDT", display: "AAVE", name: "Aave", category: "crypto", source: "binance", binance: "AAVEUSDT" },
  { id: "PEPEUSDT", display: "PEPE", name: "Pepe", category: "crypto", source: "binance", binance: "PEPEUSDT" },
  { id: "SHIBUSDT", display: "SHIB", name: "Shiba Inu", category: "crypto", source: "binance", binance: "SHIBUSDT" },
  { id: "UNIUSDT", display: "UNI", name: "Uniswap", category: "crypto", source: "binance", binance: "UNIUSDT" },

  { id: "AAPL", display: "AAPL", name: "Apple", category: "stocks", source: "yahoo", yahoo: "AAPL" },
  { id: "MSFT", display: "MSFT", name: "Microsoft", category: "stocks", source: "yahoo", yahoo: "MSFT" },
  { id: "NVDA", display: "NVDA", name: "NVIDIA", category: "stocks", source: "yahoo", yahoo: "NVDA" },
  { id: "GOOGL", display: "GOOGL", name: "Alphabet", category: "stocks", source: "yahoo", yahoo: "GOOGL" },
  { id: "AMZN", display: "AMZN", name: "Amazon", category: "stocks", source: "yahoo", yahoo: "AMZN" },
  { id: "META", display: "META", name: "Meta", category: "stocks", source: "yahoo", yahoo: "META" },
  { id: "TSLA", display: "TSLA", name: "Tesla", category: "stocks", source: "yahoo", yahoo: "TSLA" },
  { id: "AMD", display: "AMD", name: "AMD", category: "stocks", source: "yahoo", yahoo: "AMD" },
  { id: "NFLX", display: "NFLX", name: "Netflix", category: "stocks", source: "yahoo", yahoo: "NFLX" },
  { id: "JPM", display: "JPM", name: "JPMorgan", category: "stocks", source: "yahoo", yahoo: "JPM" },
  { id: "SPY", display: "SPY", name: "S&P 500 ETF", category: "stocks", source: "yahoo", yahoo: "SPY" },
  { id: "QQQ", display: "QQQ", name: "Nasdaq 100 ETF", category: "stocks", source: "yahoo", yahoo: "QQQ" },
  { id: "^GSPC", display: "SPX", name: "S&P 500", category: "stocks", source: "yahoo", yahoo: "^GSPC" },
  { id: "^DJI", display: "DJI", name: "Dow Jones", category: "stocks", source: "yahoo", yahoo: "^DJI" },
  { id: "^IXIC", display: "IXIC", name: "Nasdaq Composite", category: "stocks", source: "yahoo", yahoo: "^IXIC" },
  { id: "^VIX", display: "VIX", name: "Volatility Index", category: "stocks", source: "yahoo", yahoo: "^VIX" },

  { id: "EURUSD=X", display: "EUR/USD", name: "Euro / US Dollar", category: "forex", source: "yahoo", yahoo: "EURUSD=X" },
  { id: "GBPUSD=X", display: "GBP/USD", name: "Pound / US Dollar", category: "forex", source: "yahoo", yahoo: "GBPUSD=X" },
  { id: "USDJPY=X", display: "USD/JPY", name: "US Dollar / Yen", category: "forex", source: "yahoo", yahoo: "USDJPY=X" },
  { id: "AUDUSD=X", display: "AUD/USD", name: "Aussie / US Dollar", category: "forex", source: "yahoo", yahoo: "AUDUSD=X" },
  { id: "USDCAD=X", display: "USD/CAD", name: "US Dollar / Canadian", category: "forex", source: "yahoo", yahoo: "USDCAD=X" },
  { id: "USDCHF=X", display: "USD/CHF", name: "US Dollar / Franc", category: "forex", source: "yahoo", yahoo: "USDCHF=X" },
  { id: "NZDUSD=X", display: "NZD/USD", name: "Kiwi / US Dollar", category: "forex", source: "yahoo", yahoo: "NZDUSD=X" },
  { id: "EURGBP=X", display: "EUR/GBP", name: "Euro / Pound", category: "forex", source: "yahoo", yahoo: "EURGBP=X" },

  { id: "GC=F", display: "GOLD", name: "Gold Futures", category: "metals", source: "yahoo", yahoo: "GC=F" },
  { id: "SI=F", display: "SILVER", name: "Silver Futures", category: "metals", source: "yahoo", yahoo: "SI=F" },
  { id: "CL=F", display: "CRUDE", name: "Crude Oil", category: "metals", source: "yahoo", yahoo: "CL=F" },
  { id: "NG=F", display: "NATGAS", name: "Natural Gas", category: "metals", source: "yahoo", yahoo: "NG=F" },
  { id: "HG=F", display: "COPPER", name: "Copper Futures", category: "metals", source: "yahoo", yahoo: "HG=F" },
];

export const CATEGORIES: { id: MarketCategory; label: string }[] = [
  { id: "crypto", label: "Crypto" },
  { id: "stocks", label: "Stocks" },
  { id: "forex", label: "Forex" },
  { id: "metals", label: "Metals" },
];

export function assetsByCategory(category: MarketCategory) {
  return MARKET_ASSETS.filter((asset) => asset.category === category);
}

export function findAsset(id: string) {
  return MARKET_ASSETS.find((asset) => asset.id === id);
}

export function formatPrice(value: number, category: MarketCategory) {
  if (!Number.isFinite(value) || value === 0) return "—";
  const abs = Math.abs(value);
  let digits = 2;
  if (category === "forex") digits = abs < 10 ? 5 : 4;
  else if (abs >= 1000) digits = 2;
  else if (abs >= 1) digits = 2;
  else if (abs >= 0.01) digits = 4;
  else digits = 6;
  return value.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export function formatCompact(value: number) {
  if (!Number.isFinite(value) || value === 0) return "—";
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatChange(value: number, digits = 2) {
  if (!Number.isFinite(value)) return "0.00";
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(digits)}`;
}
