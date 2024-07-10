import path from 'path';
import * as fs from 'fs';
import { Request, Response, Router } from 'express';

export class LogController {
    path = '/';
    router = Router();

    logFile: string;
    todayDt: string;

    constructor() {
        this.todayDt = new Date().toISOString().split('T')[0].split('-').join('_');
        this.logFile = path.join('./logs', + this.todayDt + '.txt');
        this.router.get(this.path, this.reloadLogs.bind(this));
        this.router.get(this.path + 'live', this.getLogs.bind(this));
        this.router.get(this.path + ':date', this.getDateLogs.bind(this));
    }

    public async reloadLogs(req: Request, res: Response): Promise<Response> {
        res.status(200).sendFile(path.join(__dirname, '../../src/page.html'));
    };

    public async getLogs(req: Request, res: Response): Promise<Response> {
        if (fs.existsSync(this.logFile)) {
            try {
                const data = fs.readFileSync(this.logFile, 'utf8');
                res.setHeader('Content-Type', 'text/plain');
                res.status(200).send(data);
            } catch (err) {
                console.error('Error reading file:', err);
                res.status(500).send('Internal Server Error');
            }
        } else {
            res.status(404).send('File not found');
        }
    };

    public async getDateLogs(req: Request, res: Response): Promise<Response> {
        const oldLogs = path.join('./archive', req.params.date + '.txt');
        if (fs.existsSync(oldLogs)) {
            try {
                const data = fs.readFileSync(oldLogs, 'utf8');
                res.setHeader('Content-Type', 'text/plain');
                res.status(200).send(data);
            } catch (err) {
                console.error('Error reading file:', err);
                res.status(500).send('Internal Server Error');
            }
        } else {
            res.status(404).send('File not found');
        }
    };
}