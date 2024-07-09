import * as fs from 'fs';
import { promises as fsPromises } from 'fs';

const logDir = './api/logs';

export const isMarketHours = (timestamp: Date) => {
    const formattedTime = timestamp.toISOString().split('T')[1].split('.')[0];
    return (formattedTime >= '13:30:00') && (formattedTime < '20:00:00')
}

export const log = (timestamp: Date, message: string) => {
    const formattedTime = timestamp.toISOString().replace('T', ' ');
    const curDate = formattedTime.split(' ')[0].split('-').join('_');
    const curFile = logDir + '/' + curDate + '.txt';

    const logText = `[${formattedTime}] ${message}\n`
    appendToFile(curFile, logText);
}

export const resetFile = (timestamp: Date) => {
    const curDate = timestamp.toISOString().split('T')[0].split('-').join('_')
    const curFile = logDir + '/' + curDate + '.txt';

    if (fs.existsSync(curFile)) {
        fs.renameSync(curFile, './api/archive/' + curDate + '.txt');
    }

    fs.writeFileSync(curFile, '', 'utf-8');
}

async function appendToFile(filePath: string, content: string): Promise<void> {
    try {
        await fsPromises.appendFile(filePath, content, 'utf-8');
    } catch (err) {
        console.error('Error appending content:', err);
    }
}