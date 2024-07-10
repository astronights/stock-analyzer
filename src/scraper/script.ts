import * as fs from 'fs';
import { getQuotes } from './yf';
import { isMarketHours, log, resetFile } from './utils'

const assetFile = './src/data/assets.txt'

export const startUp = () => {

    resetFile(new Date());
    log(new Date(), 'Starting Process');
    const assets = fs.readFileSync(assetFile, 'utf-8').split(',');
    log(new Date(), 'Assets: ' + assets.join(', '));

    if (isMarketHours(new Date())) {
        log(new Date(), 'Market is open.')
    } else {
        log(new Date(), 'Market is yet to open...')
    }

    return assets
}

export const daily = () => {
    resetFile(new Date());
}

export const quote = (assets: string[]) => {
    log(new Date(), `Fetching market quotes: ${assets}`)
    const quotes = getQuotes(assets);
}

export const dailyEx = '0 59 8 * * *'
export const quoteEx = '0 */1 9-16 * * 1-5';