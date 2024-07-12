import * as fs from 'fs';
import { getQuotes } from './yf';
import { writeCsvsToParquet } from './io';
import { isMarketHours, log, resetFile } from './utils'

const assetFile = './src/data/assets.txt'

export const startUp = (): string[] => {

    const status = resetFile(new Date());
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
    return resetFile(new Date());
}

export const quote = async(assets: string[]): Promise<string> => {
    const msg = log(new Date(), `Fetching market quotes: ${assets}`)
    const quotes = await getQuotes(assets);
    return new Date().toISOString();
}

export const post = async(assets: string[]): Promise<string> => {
    const msg = log(new Date(), `Cleaning parquets: ${assets}`)
    return writeCsvsToParquet(assets).then(dummy => {
        return assets.toString();
    }).catch((err) => {
        return err;
    })

}

export const dailyEx = '0 55 8 * * 1-5'
export const quoteEx = '0 */1 9-16 * * 1-5';
export const postEx = '0 5 16 * * 1-5';