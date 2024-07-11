import { Quote } from "yahoo-finance2/dist/esm/src/modules/quote";
import { toZonedTime, format } from 'date-fns-tz';
import { ParquetSchema } from "parquetjs";

export interface Tick {
    symbol: string;
    quoteType: string;
    marketState: string;
    regularMarketChangePercent?: number;
    regularMarketPrice?: number;
    regularMarketChange?: number;
    regularMarketTime: string;
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

export const tickSchema = new ParquetSchema({
    symbol: { type: 'UTF8' },
    quoteType: { type: 'UTF8' },
    marketState: { type: 'UTF8' },
    regularMarketChangePercent: { type: 'DOUBLE'},
    regularMarketPrice: { type: 'DOUBLE', optional: true }, 
    regularMarketChange: { type: 'DOUBLE', optional: true },
    regularMarketTime: { type: 'UTF8' },
    regularMarketOpen: { type: 'DOUBLE', optional: true },
    regularMarketDayHigh: { type: 'DOUBLE', optional: true },
    regularMarketDayLow: { type: 'DOUBLE', optional: true },
    regularMarketVolume: { type: 'INT64', optional: true }, 
    bid: { type: 'DOUBLE', optional: true },
    ask: { type: 'DOUBLE', optional: true },
    bidSize: { type: 'INT64', optional: true },
    askSize: { type: 'INT64', optional: true },
    fiftyTwoWeekLowChange: { type: 'DOUBLE', optional: true },
    fiftyTwoWeekLowChangePercent: { type: 'DOUBLE', optional: true },
    fiftyTwoWeekHighChange: { type: 'DOUBLE', optional: true },
    fiftyTwoWeekHighChangePercent: { type: 'DOUBLE', optional: true },
    trailingPE: { type: 'DOUBLE', optional: true },
    priceEpsCurrentYear: { type: 'DOUBLE', optional: true },
    fiftyDayAverageChange: { type: 'DOUBLE', optional: true },
    fiftyDayAverageChangePercent: { type: 'DOUBLE', optional: true },
    twoHundredDayAverageChange: { type: 'DOUBLE', optional: true },
    twoHundredDayAverageChangePercent: { type: 'DOUBLE', optional: true },
    marketCap: { type: 'INT64', optional: true },
    forwardPE: { type: 'DOUBLE', optional: true },
    priceToBook: { type: 'DOUBLE', optional: true }
});

export const getTick = (quote: Quote): Tick => {

    const regularMarketTimeUtc = quote.regularMarketTime ? new Date(quote.regularMarketTime) : new Date();
    const regularMarketTimeInZone = toZonedTime(regularMarketTimeUtc, quote.exchangeTimezoneName);
    const formattedTime = format(regularMarketTimeInZone, 'yyyy-MM-dd HH:mm:ssXXX');
    return {
        symbol: quote.symbol,
        quoteType: quote.quoteType,
        marketState: quote.marketState,
        regularMarketChangePercent: quote.regularMarketChangePercent,
        regularMarketPrice: quote.regularMarketPrice,
        regularMarketChange: quote.regularMarketChange,
        regularMarketTime: formattedTime,
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