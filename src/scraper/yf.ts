import yahooFinance from 'yahoo-finance2';

import { writeQuote } from './io';
import { getTick } from '../types';

export const getQuotes = (assets: string[]): Promise<string[]> => {
    return Promise.all(assets.map(async (asset) => {
        const curQuote = await yahooFinance.quoteCombine(asset);
        const tick = getTick(curQuote);
        const csvFile = writeQuote(tick);
        return asset;
    }));

}

