import {useAppSettings} from "@/hooks/useAppSettings";

export const useCurrency = () => {
    const {getSettings} = useAppSettings();

    const currency = getSettings("currency") || "usd";


    const getCurrencySymbol = () => {
        switch(currency) {
            case "kes":
                return "Ksh";
            case "eur":
                return "€";
            case "usd":
            default:
                return "$";
        }
    }

    const formatPrice = (amount: number | string) => {
        const symbol = getCurrencySymbol();
        const numAmount = typeof  amount === "string"  ? parseFloat(amount.replace(/[^0-9.]/g, "")) : amount;

        if (isNaN(numAmount)) return amount;

        return `${symbol}${numAmount.toFixed(0)}`;


    }
    return {
        currency,
        currencySymbol: getCurrencySymbol(),
        formatPrice,
    };
};
