import { Quote } from "yahoo-finance2/dist/esm/src/modules/quote";
import { Tick } from '../types';
import * as fs from 'fs';
import path from 'path';

const priceDir = './prices';

export const writeQuote = (tick: Tick) => {

    const symbol = tick.symbol;
    const dt = tick.regularMarketTime.toISOString().split('T')[0].split('-').join('_');

    const csvFile = path.join(priceDir, symbol, `${dt}.csv`)

    if (!fs.existsSync(csvFile)) {
        fs.writeFileSync(csvFile, Object.keys(tick).join(',') + '\n');
    }

    fs.appendFileSync(csvFile, Object.values(tick).join(',') + '\n');
}
