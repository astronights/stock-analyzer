import { Quote } from "yahoo-finance2/dist/esm/src/modules/quote";
import { toZonedTime, formatInTimeZone } from 'date-fns-tz';

export interface Tick {
    symbol: string;
    quoteType: string;
    marketState: string;
    regularMarketChangePercent?: number;
    regularMarketPrice?: number;
    regularMarketChange?: number;
    regularMarketTime: Date;
    regularMarketOpen?: number;
    regularMarketDayHigh?: number;
    regularMarketDayLow?: number;
    regularMarketVolume?: number;
    bid?: number;
    ask?: number;
    bidSize?: number;
    askSize?: number;
    fiftyTwoWeekLowChange?: number;
    fiftyTwoWeekLowChangePercent?: number;
    fiftyTwoWeekHighChange?: number;
    fiftyTwoWeekHighChangePercent?: number;
    trailingPE?: number;
    priceEpsCurrentYear?: number;
    fiftyDayAverageChange?: number;
    fiftyDayAverageChangePercent?: number;
    twoHundredDayAverageChange?: number;
    twoHundredDayAverageChangePercent?: number;
    marketCap?: number;
    forwardPE?: number;
    priceToBook?: number;
}

export const getTick = (quote: Quote): Tick => {

    const regularMarketTimeUtc = quote.regularMarketTime ? new Date(quote.regularMarketTime) : new Date();
    const regularMarketTimeInZone = toZonedTime(regularMarketTimeUtc, quote.exchangeTimezoneName);
    const formattedTime = formatInTimeZone(regularMarketTimeInZone, quote.exchangeTimezoneName, 'yyyy-MM-dd HH:mm:ssXXX');
    return {
        symbol: quote.symbol,
        quoteType: quote.quoteType,
        marketState: quote.marketState,
        regularMarketChangePercent: quote.regularMarketChangePercent,
        regularMarketPrice: quote.regularMarketPrice,
        regularMarketChange: quote.regularMarketChange,
        regularMarketTime: regularMarketTimeInZone,
        regularMarketOpen: quote.regularMarketOpen,
        regularMarketDayHigh: quote.regularMarketDayHigh,
        regularMarketDayLow: quote.regularMarketDayLow,
        regularMarketVolume: quote.regularMarketVolume,
        bid: quote.bid,
        ask: quote.ask,
        bidSize: quote.bidSize,
        askSize: quote.askSize,
        fiftyTwoWeekLowChange: quote.fiftyTwoWeekLowChange,
        fiftyTwoWeekLowChangePercent: quote.fiftyTwoWeekLowChangePercent,
        fiftyTwoWeekHighChange: quote.fiftyTwoWeekHighChange,
        fiftyTwoWeekHighChangePercent: quote.fiftyTwoWeekHighChangePercent,
        trailingPE: quote.trailingPE,
        priceEpsCurrentYear: quote.priceEpsCurrentYear,
        fiftyDayAverageChange: quote.fiftyDayAverageChange,
        fiftyDayAverageChangePercent: quote.fiftyDayAverageChangePercent,
        twoHundredDayAverageChange: quote.twoHundredDayAverageChange,
        twoHundredDayAverageChangePercent: quote.twoHundredDayAverageChangePercent,
        marketCap: quote.marketCap,
        forwardPE: quote.forwardPE,
        priceToBook: quote.priceToBook,
    };
}