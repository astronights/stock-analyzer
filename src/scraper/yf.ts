import yahooFinance from 'yahoo-finance2';

import { writeQuote } from './io';
import { getTick } from '../types';

export const getQuotes = (assets: string[]) => {
    return (assets.forEach(async (asset) => {
        const curQuote = await yahooFinance.quoteCombine(asset);
        const tick = getTick(curQuote);
        writeQuote(tick);
    }));

}

