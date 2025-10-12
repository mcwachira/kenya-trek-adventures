import { useAppSettings } from "@/hooks/useAppSettings";

// Base currency rates (USD as base)
const EXCHANGE_RATES = {
  usd: 1,
  kes: 129.5, // 1 USD = ~129.5 KES
  eur: 0.92, // 1 USD = ~0.92 EUR
};

export type Currency = "usd" | "kes" | "eur";

export const useCurrency = () => {
  const { getSetting } = useAppSettings();
  const currency = (getSetting("currency") || "usd") as Currency;

  const getCurrencySymbol = (curr?: Currency): string => {
    const targetCurrency = curr || currency;
    switch (targetCurrency) {
      case "kes":
        return "KSh";
      case "eur":
        return "€";
      case "usd":
      default:
        return "$";
    }
  };

  /**
   * Convert amount from one currency to another
   */

  const convertCurrency = (
    amount: number,
    fromCurrency: Currency = "usd",
    toCurrency?: Currency,
  ): number => {
    const targetCurrency = toCurrency || currency;

    // Convert to USD first (base currency)
    const amountInUSD = amount / EXCHANGE_RATES[fromCurrency];

    // Then convert to target currency
    return amountInUSD * EXCHANGE_RATES[targetCurrency];
  };

  /**
   * Format price with currency symbol and conversion
   * Assumes prices in Sanity are stored in USD
   */
  const formatPrice = (
    amount: number | string,
    sourceCurrency: Currency = "usd",
  ): string => {
    const numAmount =
      typeof amount === "string"
        ? parseFloat(amount.replace(/[^0-9.]/g, ""))
        : amount;

    if (isNaN(numAmount)) return String(amount);

    // Convert to selected currency
    const convertedAmount = convertCurrency(numAmount, sourceCurrency);
    const symbol = getCurrencySymbol();

    // Format based on currency
    if (currency === "kes") {
      return `${symbol} ${Math.round(convertedAmount).toLocaleString()}`;
    } else {
      return `${symbol}${convertedAmount.toFixed(2)}`;
    }
  };

  /**
   * Format price range
   */
  const formatPriceRange = (
    minAmount: number,
    maxAmount: number,
    sourceCurrency: Currency = "usd",
  ): string => {
    const minFormatted = formatPrice(minAmount, sourceCurrency);
    const maxFormatted = formatPrice(maxAmount, sourceCurrency);
    return `${minFormatted} - ${maxFormatted}`;
  };

  /**
   * Get raw converted amount without formatting
   */
  const getConvertedAmount = (
    amount: number,
    sourceCurrency: Currency = "usd",
  ): number => {
    return convertCurrency(amount, sourceCurrency);
  };

  return {
    currency,
    currencySymbol: getCurrencySymbol(),
    formatPrice,
    formatPriceRange,
    convertCurrency,
    getConvertedAmount,
    getCurrencySymbol,
  };
};
