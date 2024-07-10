import * as fs from 'fs';
import * as path from 'path';
import { promises as fsPromises } from 'fs';

const logDir = './logs';
const archiveDir = './archive';

export const isMarketHours = (timestamp: Date) => {
    const formattedTime = timestamp.toISOString().split('T')[1].split('.')[0];
    return (formattedTime >= '13:30:00') && (formattedTime < '20:00:00')
}

export const log = (timestamp: Date, message: string) => {
    const formattedTime = timestamp.toISOString().replace('T', ' ');
    const curDate = formattedTime.split(' ')[0].split('-').join('_');
    const curFile = path.join(logDir, curDate + '.txt');

    const logText = `[${formattedTime}] ${message}\n`
    appendToFile(curFile, logText);
}

export const resetFile = (timestamp: Date) => {
    const curDate = timestamp.toISOString().split('T')[0].split('-').join('_')
    const curFile = path.join(logDir, curDate + '.txt');

    const oldLogs = fs.readdirSync(logDir)

    oldLogs.filter((file) => file.endsWith('.txt')).forEach((file) => {
        const lf = path.join(logDir, file);
        const af = path.join(archiveDir, file);

        fs.renameSync(lf, af);
    })

    fs.writeFileSync(curFile, '', 'utf-8');
}

async function appendToFile(filePath: string, content: string): Promise<void> {
    try {
        await fsPromises.appendFile(filePath, content, 'utf-8');
    } catch (err) {
        console.error('Error appending content:', err);
    }
}