import * as fs from 'fs';
import path from 'path';

const logDir = './logs';
const archiveDir = './archive';
const priceDir = './prices';

export const isMarketHours = (timestamp: Date): boolean => {
    const formattedTime = timestamp.toISOString().split('T')[1].split('.')[0];
    return (formattedTime >= '13:30:00') && (formattedTime < '20:00:00')
}

export const log = (timestamp: Date, message: string): string => {
    const formattedTime = timestamp.toISOString().replace('T', ' ');
    const curDate = formattedTime.split(' ')[0].split('-').join('_');
    const curFile = path.join(logDir, curDate + '.txt');

    const logText = `[${formattedTime}] ${message}\n`
    return appendToFile(curFile, logText);
}

export const resetFile = (timestamp: Date): string => {
    const curDate = timestamp.toISOString().split('T')[0].split('-').join('_')
    const curFile = path.join(logDir, curDate + '.txt');

    const oldLogs = fs.readdirSync(logDir)

    oldLogs.filter((file) => file.endsWith('.txt')).forEach((file) => {
        const lf = path.join(logDir, file);
        const af = path.join(archiveDir, file);

        fs.renameSync(lf, af);
    })

    fs.writeFileSync(curFile, '', 'utf-8');
    return `Created ${curFile}`
}

const appendToFile = (filePath: string, content: string): string => {
    try {
        fs.appendFileSync(filePath, content, 'utf-8');
        return 'Success';
    } catch (err) {
        console.error('Error appending content:', err);
        return 'Error';
    }
}

export const createDirs = (assets: string[]) => {
    assets.forEach((asset) => {
        const fpath = path.join(priceDir, asset)
        if (!fs.existsSync(fpath)) {
            fs.mkdirSync(fpath);
        }
    })
    return assets;
}