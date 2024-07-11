import * as fs from 'fs';
import { getQuotes } from './yf';
import { writeCsvsToParquet } from './io';
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
    log(new Date(), 'Resetting logs')
    resetFile(new Date());
}

export const quote = (assets: string[]) => {
    log(new Date(), `Fetching market quotes: ${assets}`)
    const quotes = getQuotes(assets);
}

export const post = (assets: string[]) => {
    log(new Date(), `Cleaning parquets: ${assets}`)
    writeCsvsToParquet(assets).then(dummy => {});
}

export const dailyEx = '0 55 8 * * 1-5'
export const quoteEx = '0 */1 9-16 * * 1-5';
export const postEx = '0 5 16 * * 1-5';