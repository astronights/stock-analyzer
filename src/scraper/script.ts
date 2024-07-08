import yahooFinance from 'yahoo-finance2';
import * as fs from 'fs';

import {log, resetFile} from './utils'

const assetFile = './src/data/assets.txt'

export const liveScript = () => {
    resetFile(new Date());
    log(new Date(), 'Starting Process');
    const assets = fs.readFileSync(assetFile, 'utf-8').split(',');
    log(new Date(), 'Assets: ' + assets.join(', '));
    log(new Date(), 'Completing Process');
}