import yahooFinance from 'yahoo-finance2';
import { Quote } from 'yahoo-finance2/dist/esm/src/modules/quote';

const getTick = (quote: Quote) => {
    return {
        currency: quote.currency,
        open: quote.regularMarketOpen,
        high: quote.regularMarketDayHigh,
        low: quote.regularMarketDayLow,
        close: quote.regularMarketPreviousClose,
        volume: quote.regularMarketVolume
    };
}

export const getQuotes = (assets: string[]) => {
    return assets.map(async (asset) => {
        const curQuote = await yahooFinance.quoteCombine(asset);
        console.log(curQuote);
        const tick = getTick(curQuote);
    })
}

